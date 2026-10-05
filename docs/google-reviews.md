# Google recenze na webu

Stránka `/recenze/` bere recenze z `content/google-reviews.json`. Workflow **Deploy to GitHub Pages** před každým sestavením spustí `scripts/sync-google-reviews.mjs`, který ten soubor přepíše aktuálními recenzemi z Google Business Profile. Běží při pushi do `main`, při ručním spuštění a každý den v 05:17 UTC (6:17 v zimě, 7:17 v létě).

Dokud nejsou v GitHubu nastavené tři secrets z kroku 8, synchronizace nic nedělá a web ukazuje seznam uložený v repozitáři.

## Co je dobré vědět předem

- **Zobrazí se všechny recenze.** Včetně negativních a těch bez textu. Krátké recenze dostanou na stránce největší písmo, takže i jednohvězdičková „Nic moc.“ bude hodně vidět.
- **Chyba synchronizace zastaví celé nasazení.** Týká se to i běžných pushů s úpravami webu. Naposledy nasazená verze zůstane online. Jak to rychle odblokovat je v části Když se to rozbije.
- **Schválení přístupu u Googlu není okamžité.** Počítejte s dny až týdny a s tím, že Google může žádost zamítnout.
- **Stažené recenze se do repozitáře neukládají.** Soubor se přepíše jen po dobu sestavení. V repozitáři zůstává ruční seznam jako záloha.

## Zapojení

### 1. Ověřte podmínky

Google přístup k API dává jen firmám, které splní obojí:

- Profil BTP je ověřený a aktivní aspoň 60 dní.
- V profilu je uvedený web firmy.

Celé nastavení dělejte pod Google účtem, který je vlastníkem nebo správcem profilu BTP.

### 2. Založte projekt v Google Cloud

Na [console.cloud.google.com](https://console.cloud.google.com/) vytvořte nový projekt, třeba `btp-reviews`. Poznamenejte si jeho **Project number** z úvodní stránky projektu.

btp-reviews

### 3. Požádejte o přístup k API

Vyplňte kontaktní formulář GBP API, odkaz na něj je na stránce [Prerequisites](https://developers.google.com/my-business/content/prereqs). V rozbalovací nabídce zvolte **Application for Basic API Access**. Použijte e-mail, který je u profilu BTP veden jako vlastník nebo správce.

Schválení poznáte v Google Cloud podle kvóty u Business Profile API:

| Kvóta | Stav |
| --- | --- |
| 0 QPM | Zatím neschváleno. Každý dotaz selže. |
| 300 QPM | Schváleno, můžete pokračovat. |

### 4. Zapněte tři API

V **APIs & Services > Library** zapněte:

- `Google My Business API` (odtud se čtou recenze)
- `My Business Account Management API`
- `My Business Business Information API`

Samotné zapnutí nestačí. Bez schválení z kroku 3 zůstane kvóta na nule.

### 5. Přepněte aplikaci do produkce

V **Google Auth Platform > Audience** (dříve OAuth consent screen) nastavte typ uživatelů **External** a klikněte na **Publish app**, aby byl stav **In production**.

Tento krok nepřeskakujte. Ve stavu **Testing** přestane přístupový token po 7 dnech platit, synchronizace začne padat a s ní i každé nasazení webu. Ověření aplikace Googlem potřeba není, používáte ji jen vy.

### 6. Vytvořte OAuth klienta

V **Google Auth Platform > Clients** (dříve APIs & Services > Credentials) zvolte **Create client**:

- Application type: **Web application**
- Authorized redirect URI: `https://developers.google.com/oauthplayground`

Uložte si **Client ID** a **Client secret**.

### 7. Získejte refresh token

Otevřete [OAuth 2.0 Playground](https://developers.google.com/oauthplayground).

1. Klikněte na ozubené kolo vpravo nahoře a nastavte:
   - OAuth flow: **Server-side**
   - Access type: **Offline**
   - zaškrtněte **Use your own OAuth credentials** a vložte Client ID a Client secret z kroku 6
2. V kroku 1 vlevo vložte do pole pro vlastní scope `https://www.googleapis.com/auth/business.manage` a klikněte na **Authorize APIs**.
3. Přihlaste se účtem, který spravuje profil BTP. Google ukáže varování, že aplikace není ověřená. Pokračujte přes **Advanced** a potvrďte přístup.
4. V kroku 2 klikněte na **Exchange authorization code for tokens** a zkopírujte **Refresh token**.

Pokud se pole Refresh token nevyplní, nebyl nastavený Access type Offline. Opravte nastavení a autorizaci zopakujte.

### 8. Uložte tři secrets do GitHubu

V repozitáři `pytrck/btpweb` otevřete **Settings > Secrets and variables > Actions > New repository secret** a přidejte:

| Název | Hodnota |
| --- | --- |
| `GOOGLE_BP_CLIENT_ID` | Client ID z kroku 6 |
| `GOOGLE_BP_CLIENT_SECRET` | Client secret z kroku 6 |
| `GOOGLE_BP_REFRESH_TOKEN` | Refresh token z kroku 7 |

Totéž z terminálu, hodnotu vložíte až na výzvu:

```powershell
gh secret set GOOGLE_BP_CLIENT_ID
gh secret set GOOGLE_BP_CLIENT_SECRET
gh secret set GOOGLE_BP_REFRESH_TOKEN
```

Musí být nastavené všechny tři. Hodnoty nikdy neukládejte do repozitáře.

### 9. Spusťte první synchronizaci

V záložce **Actions** otevřete **Deploy to GitHub Pages** a klikněte na **Run workflow**. V kroku **Sync Google reviews** má být řádek:

```text
Google review sync: saved 12 reviews from the BTP profile.
```

Číslo je počet stažených recenzí. Když tam místo toho je `credentials absent; using the verified snapshot`, secrets se nenačetly a web jede ze zálohy.

## Ověření na vlastním počítači

Skript jde pustit i lokálně. Přepíše `content/google-reviews.json`, takže výsledek hned uvidíte na `npm run dev`.

```powershell
$env:GOOGLE_BP_CLIENT_ID = "..."
$env:GOOGLE_BP_CLIENT_SECRET = "..."
$env:GOOGLE_BP_REFRESH_TOKEN = "..."
node scripts/sync-google-reviews.mjs
```

Při prvním běhu zkontrolujte dvě věci:

- Texty recenzí neobsahují dovětek `(Translated by Google)`. Kdyby ano, je potřeba do skriptu doplnit jeho odříznutí.
- Jména a počet recenzí odpovídají tomu, co vidíte na Googlu.

Přepsaný soubor klidně commitněte, stane se novou zálohou pro případ výpadku.

## Když se to rozbije

Chybu najdete v logu kroku **Sync Google reviews**.

| Hláška | Příčina | Oprava |
| --- | --- | --- |
| `Google OAuth failed (400)` | Refresh token přestal platit. Nejčastěji aplikace zůstala ve stavu Testing, někdo odebral přístup v nastavení Google účtu, nebo se token 6 měsíců nepoužil. | Zkontrolujte krok 5, zopakujte krok 7 a přepište secret `GOOGLE_BP_REFRESH_TOKEN`. |
| `Google OAuth failed (401)` | Nesedí Client ID nebo Client secret. | Zkontrolujte hodnoty z kroku 6 a secrets přepište. |
| `request failed (429)` | Nejčastěji projekt nemá schválený přístup a kvóta je 0 QPM. | Počkejte na schválení z kroku 3. |
| `request failed (403)` | Některé API není zapnuté, nebo účet nemá k profilu přístup. | Zkontrolujte krok 4 a roli účtu u profilu BTP. |
| `location ... was not found for this account` | Token patří účtu, který profil BTP nespravuje. | Zopakujte krok 7 pod správným účtem. |
| `set all three GOOGLE_BP_* credentials` | Jeden nebo dva secrets chybí. | Doplňte je podle kroku 8. |

**Rychlé odblokování nasazení:** smažte v GitHubu všechny tři secrets. Synchronizace se přeskočí a web se sestaví ze seznamu v repozitáři. Recenze přidané od poslední úpravy toho souboru z webu dočasně zmizí, dokud synchronizaci neopravíte.

**Denní běh se sám vypnul:** GitHub u veřejných repozitářů vypíná plánované workflow po 60 dnech bez aktivity v repozitáři. Znovu ho zapnete v záložce **Actions**.

## Odkazy

- [Podmínky a žádost o přístup](https://developers.google.com/my-business/content/prereqs)
- [Základní nastavení projektu a OAuth klienta](https://developers.google.com/my-business/content/basic-setup)
- [Výpis recenzí v API](https://developers.google.com/my-business/reference/rest/v4/accounts.locations.reviews/list)
- [Stavy Testing a In production](https://support.google.com/cloud/answer/15549945)
- [Kdy refresh token přestane platit](https://developers.google.com/identity/protocols/oauth2#expiration)
