# El-Fix modern site

El-Fix i Norr AB är en installatör med riktiga elektriker och en del i
Elkedjan.

Modern Sites/Vinext-webb för El-Fix med fokus på:

- professionell och trygg presentation av elinstallation, service, besiktning,
  laddbox, solenergi och energioptimering
- enkla offert- och bokningsflöden för kunder
- GDPR-anpassad förstapartsdata med separata samtycken för statistik och
  marknadsföring
- D1-lagring av leads, bokningsönskemål, samtycken och besökshändelser
- valfria webhooks till CRM, kalender och analys

## Kommandon

```bash
npm install
npm run dev
npm run db:generate
npm run lint
npm run build
```

## Miljövariabler

Lokalt finns nycklarna i `.env.example`. I Sites ska runtime-värden sättas via
miljövariabelhantering, inte i `.openai/hosting.json`.

- `CRM_WEBHOOK_URL`: tar emot offertförfrågningar och bokningsleads
- `CALENDAR_WEBHOOK_URL`: tar emot bokningsönskemål och rutt-/kalenderdata
- `ANALYTICS_WEBHOOK_URL`: valfri spegling av samtyckesstyrd statistik

## Data

`.openai/hosting.json` deklarerar D1-bindningen `DB`. Schema finns i
`db/schema.ts` och migreringar i `drizzle/`.

Tabeller:

- `leads`
- `booking_requests`
- `consent_records`
- `visitor_events`

Besöksstatistik lagrar inte IP-adress. Marknadsföringsuppföljning kräver
aktivt samtycke.
