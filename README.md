# El-Fix statisk webbplats

Statisk företagshemsida för El-Fix AB. Sidan är byggd för enkel drift på
Oderland eller annat vanligt webbhotell där färdiga HTML-, CSS-, JavaScript-
och bildfiler laddas upp med SFTP.

## Teknik

- Next.js med statisk export till `out/`
- React-komponenter för enkel framtida redigering
- Tailwind CSS via Next-byggkedjan
- Kontakt via telefon och förifylld mejllänk i version 1

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

## Viktiga filer

- `app/` innehåller sidorna.
- `components/` innehåller återanvändbara sidsektioner.
- `lib/site-content.ts` innehåller tjänster, kontaktuppgifter och lokala orter.
- `public/images/` innehåller logotyper och bilder.
- `out/` skapas vid build och är mappen som publiceras.
