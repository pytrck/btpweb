// Run with: node scripts/check-cookie-consent.cjs
const assert = require("node:assert/strict");
const fs = require("node:fs");
const vm = require("node:vm");
const ts = require("typescript");
const React = require("react");

const source = fs.readFileSync("components/layout/CookieConsent.tsx", "utf8");
const compiled = ts.transpileModule(source, {
  compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX },
}).outputText;

function setup(saved = null, blocked = false, analyticsId = "test-id") {
  let value = saved, cursor = 0, reloaded = false, locale = "en";
  const slots = [], effects = [], scripts = [], listeners = {};
  const sandbox = {
    exports: {}, Date, JSON,
    localStorage: {
      getItem: () => { if (blocked) throw Error("blocked"); return value; },
      setItem: (_, next) => { if (blocked) throw Error("blocked"); value = next; },
    },
    document: {
      createElement: () => ({ dataset: {} }),
      head: { appendChild: script => scripts.push(script) },
      getElementById: () => ({ focus() {} }),
    },
    window: {
      location: { reload: () => { reloaded = true; }, hostname: "breakthepattern.cz" },
      addEventListener: (name, fn) => { listeners[name] = fn; },
      removeEventListener() {},
    },
    require: name => {
      if (name === "react") return {
        useState(initial) {
          const i = cursor++;
          if (!(i in slots)) slots[i] = initial;
          return [slots[i], next => { slots[i] = next; }];
        },
        useRef(initial) { const i = cursor++; return slots[i] ||= { current: initial }; },
        useEffect(fn, deps) {
          const i = cursor++;
          if (!slots[i] || deps.some((dep, j) => !Object.is(dep, slots[i][j]))) effects.push(fn);
          slots[i] = deps;
        },
      };
      if (name === "next-intl") return { useLocale: () => locale };
      if (name === "framer-motion") return { AnimatePresence: "presence", motion: { section: "section" }, useReducedMotion: () => true };
      return require(name);
    },
  };
  vm.runInNewContext(compiled, sandbox);
  function render() {
    let tree;
    for (let i = 0; i < 3; i++) {
      cursor = 0;
      tree = sandbox.exports.CookieConsent({ analyticsId, analyticsHost: "https://cloud.umami.is" });
      effects.splice(0).forEach(fn => fn());
    }
    return tree;
  }
  function nodes(tree) {
    return React.Children.toArray(tree).flatMap(node => React.isValidElement(node) ? [node, ...nodes(node.props.children)] : []);
  }
  return {
    read: sandbox.exports.readConsent, render, scripts,
    click: text => { const node = nodes(render()).find(n => n.type === "button" && n.props.children === text); assert.ok(node, text); node.props.onClick(); render(); },
    open: () => nodes(render()).some(n => n.props.id === "cookie-consent"),
    reopen: () => { nodes(render()).find(n => n.type === "button" && n.props["aria-controls"] === "cookie-consent").props.onClick(); render(); },
    saved: () => JSON.parse(value), reloaded: () => reloaded,
    revokeElsewhere: () => { value = null; listeners.storage({ key: null }); },
    locale: next => { locale = next; },
    hostname: next => { sandbox.window.location.hostname = next; },
  };
}

for (const value of [null, "broken", "{}", JSON.stringify({ analytics: "yes", at: Date.now() }),
  JSON.stringify({ analytics: true, at: Date.now() - 181 * 86400000 }),
  JSON.stringify({ analytics: true, at: Date.now() + 86400000 })]) {
  const app = setup(value);
  assert.equal(app.read(), null);
  assert.equal(app.open(), true);
  assert.equal(app.scripts.length, 0);
}
const denied = setup();
denied.click("Only necessary");
assert.equal(denied.open(), false);
assert.equal(denied.saved().analytics, false);
assert.equal(denied.scripts.length, 0);
assert.equal(setup(JSON.stringify(denied.saved())).open(), false);

const accepted = setup();
accepted.click("Allow analytics");
assert.equal(accepted.saved().analytics, true);
assert.equal(accepted.open(), false);
assert.equal(accepted.scripts[0].dataset.websiteId, "test-id");
assert.equal(accepted.scripts[0].src, "https://cloud.umami.is/script.js");
// hostUrl must match the script origin: the tracker otherwise beacons to its own
// default host, which the page's connect-src blocks - silently collecting nothing.
assert.equal(accepted.scripts[0].dataset.hostUrl, "https://cloud.umami.is");
assert.equal(accepted.scripts[0].dataset.performance, "true");
assert.equal(accepted.scripts[0].dataset.domains, "breakthepattern.cz,www.breakthepattern.cz");
// recorder.js complements script.js - it has no pageview/event tracking of its
// own, so replacing rather than adding would silently drop all tracking.
assert.equal(accepted.scripts.length, 2);
assert.equal(accepted.scripts[1].src, "https://cloud.umami.is/recorder.js");
assert.equal(accepted.scripts[1].dataset.websiteId, "test-id");
assert.equal(accepted.scripts[1].dataset.hostUrl, "https://cloud.umami.is");
accepted.reopen();
assert.equal(accepted.open(), true);
accepted.click("Only necessary");
assert.equal(accepted.reloaded(), true);
assert.equal(accepted.saved().analytics, false);

const returning = setup(JSON.stringify({ analytics: true, at: Date.now() }));
assert.equal(returning.open(), false);
assert.equal(returning.scripts.length, 2);
returning.revokeElsewhere();
assert.equal(returning.reloaded(), true);

const blocked = setup(null, true);
blocked.click("Allow analytics");
assert.equal(blocked.open(), true);
assert.equal(blocked.scripts.length, 0);
blocked.click("Only necessary");
assert.equal(blocked.open(), false);

// Off-domain (localhost, preview): tracker still loads and filters itself via
// data-domains, but the recorder has no such option and must be withheld.
const offDomain = setup();
offDomain.hostname("localhost");
offDomain.click("Allow analytics");
assert.equal(offDomain.scripts.length, 1);
assert.equal(offDomain.scripts[0].src, "https://cloud.umami.is/script.js");

const disabled = setup(null, false, "");
disabled.click("Allow analytics");
assert.equal(disabled.scripts.length, 0);
const czech = setup();
czech.locale("cs");
czech.click("Jen nezbytné");
assert.equal(czech.saved().analytics, false);
console.log("Consent checks passed: defaults, expiry, both locales, persistence, analytics gating, tracker config, withdrawal, cross-tab sync, blocked storage.");
