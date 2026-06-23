# El-Fix statisk webbplats

Statisk företagshemsida för El-Fix. Sidan är byggd för enkel drift på
Oderland eller annat vanligt webbhotell där färdiga HTML-, CSS-, JavaScript-
och bildfiler laddas upp med SFTP.

## Teknik

- Next.js med statisk export till `out/`
- React-komponenter för enkel framtida redigering
- Tailwind CSS via Next-byggkedjan
- Kontakt via telefon och förifylld mejllänk

## Kommandon

```bash
npm install
npm run dev
npm run lint
npm run build
```

Efter `npm run build` ligger den publicerbara webbplatsen i `out/`.

## Publicering på Oderland

1. Kör `npm install`.
2. Kör `npm run lint`.
3. Kör `npm run build`.
4. Öppna mappen `out/`.
5. Ladda upp innehållet i `out/` till webbrooten för `el-fix.se` via SFTP.

Se [DEPLOY.md](./DEPLOY.md) för exakt steg-för-steg-instruktion.

## Kontaktflöde

Kunder kontaktar El-Fix via telefon eller förifylld mejllänk. CTA:erna är
byggda för att fungera direkt på både mobil och desktop.

## Analytics

Google Analytics 4 laddas via `NEXT_PUBLIC_GA_MEASUREMENT_ID`. Google Tag
Manager laddas via `NEXT_PUBLIC_GTM_CONTAINER_ID`. Vid automatisk deploy till
Oderland sätts variablerna i GitHub Actions-workflowen.

CTA:er och kontaktlänkar skickar dataLayer-event för GTM med konsekventa
eventnamn: `click_phone`, `click_email`, `click_quote`, `click_contact` och
`generate_lead`.

## Namn och bolag

Använd `El-Fix` i löpande text. Använd `El-Fix i Norr AB` när juridisk person
eller en mer formell avsändare behöver framgå. Använd inte den tidigare
kortformen med AB-suffix.

## Viktiga filer

- `app/` innehåller sidorna.
- `components/` innehåller återanvändbara sidsektioner.
- `lib/site-content.ts` innehåller tjänster, kontaktuppgifter och lokala orter.
- `public/images/` innehåller logotyper och bilder.
- `public/robots.txt`, `public/sitemap.xml` och `public/.htaccess` följer med till `out/`.
- `out/` skapas vid build och är mappen som publiceras.
