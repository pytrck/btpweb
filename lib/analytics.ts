/**
 * Fire an Umami event from code. Attribute-based events (data-umami-event) cover
 * plain clicks; this is for the things only JS knows - a form actually sent, a
 * scroll threshold crossed.
 *
 * No-ops silently when the tracker isn't on the page, which is the normal state
 * before consent is granted or while site.umamiId is empty. Nothing to guard at
 * the call sites.
 */
export function track(name: string, data?: Record<string, string | number>) {
  (window as unknown as { umami?: { track: (n: string, d?: unknown) => void } }).umami?.track(
    name,
    data,
  );
}
