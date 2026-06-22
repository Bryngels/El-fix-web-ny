# Deploy till Oderland via SFTP

Den här versionen är en statisk webbplats för vanligt webbhotell. Efter build
laddas innehållet i `out/` upp till Oderland via SFTP.

## 1. Bygg sidan

Kör från projektmappen:

```bash
npm install
npm run lint
npm run build
```

Efter build finns den färdiga webbplatsen i:

```text
out/
```

Det är innehållet i `out/` som ska laddas upp.

Kontrollera lokalt att mappen finns:

```bash
ls out
```

## 2. Hämta SFTP-uppgifter i Oderland

Logga in i Oderlands kundzon eller cPanel och kontrollera:

- SFTP-server
- SFTP-användare
- Lösenord eller SSH-nyckel
- Port, normalt `22`
- Webbroot för domänen, ofta `public_html/` eller en domänmapp under kontot

Använd alltid den webbroot som är kopplad till `el-fix.se`.

## 3. Ladda upp med ett SFTP-program

Exempel med Cyberduck, FileZilla eller Transmit:

1. Skapa en ny anslutning med protokollet `SFTP`.
2. Ange server, användare, lösenord/nyckel och port `22`.
3. Öppna webbrooten för `el-fix.se`.
4. Ta bort gamla webbplatsfiler i webbrooten. Radera inte systemmappar eller
   filer som Oderland uttryckligen kräver.
5. Öppna den lokala mappen `out/`.
6. Markera allt innehåll i `out/`.
7. Ladda upp filerna och mapparna till webbrooten.

Viktigt: ladda upp innehållet i `out/`, inte själva `out`-mappen.

## 4. Kontrollera efter uppladdning

Besök:

```text
https://el-fix.se/
```

Kontrollera även:

```text
https://el-fix.se/tjanster/elinstallation/
https://el-fix.se/tjanster/service-felsokning/
https://el-fix.se/tjanster/elbesiktning/
https://el-fix.se/tjanster/laddbox/
https://el-fix.se/elektriker-sundsvall/
```

Om en undersida ger 404, kontrollera att hela mappstrukturen från `out/` har
laddats upp och att filerna `index.html` finns kvar i respektive mapp.

## 5. Framtida uppdateringar

Vid ändringar:

```bash
npm install
npm run lint
npm run build
```

Ladda sedan upp det nya innehållet i `out/` till samma webbroot.
