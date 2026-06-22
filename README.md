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

## Drift

Ladda upp innehållet i `out/` till webbrooten hos Oderland enligt
instruktionen i `DEPLOY.md`.

## Kontaktflöde

Kunder kontaktar El-Fix via telefon eller förifylld mejllänk. CTA:erna är
byggda för att fungera direkt på både mobil och desktop.
