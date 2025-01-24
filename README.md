# Frontend - VTEAM ZOOMIES

Detta är webb-applikationen för vårt elsparkcykel-system. Applikationen är byggd med React.js tillsammans med vite, där frontend kommunicerar Kommunikation med backend via vårat REST-API.

Systemet är en del av ett större system som hanteras via ett centralt repo, kallat vteam. I vteam repot finns instruktioner för att sätta upp hela systemet, inklusive backend, databaser och mobil-appen.

Man kan logga in som kund och administratör och genomföra CRUD-operationer för att skapa, läsa, uppdatera och radera data relaterat till elsparkcykelsystemet.

## Viktiga punkter
- Repot fokuserar på frontend-delen och hanteras med Docker som en del av systemet.
- För att systemet ska fungera korrekt behöver repon klonas i en specifik ordning.
- Testning sker med npm-skript:
```bash
npm test
eller
npm test:coverage
```
## Installation och körning
Då detta är en del av ett större system så behöver vi göra enligt följande:
- Klona i rätt ordning för att säkerställa att alla tjänster startas korrekt med:
```bash
docker-compose up --build
```
- Lokal utveckling:
Du kan även köra projektet lokalt för utveckling:
```bash
git clone https://github.com/<ditt-username>/<frontend-repo>.git
cd <frontend-repo>
npm install
npm start
```
Detta kommer starta applikationen på http://localhost:3000






## Förutsättningar

Innan du startar projektet behöver du följande:
- Node.js (version 16 eller högre)
- npm eller yarn för att installera beroenden




Översikt av de viktigaste filerna och mapparna:
```bash
src/
├── components/       # Återanvändbara komponenter
├── pages/            # Sidor
├── utils/            # Hjälpfunktioner (API-anrop)
├── styles/           # SCSS för projektet
├── App.js            # Huvudkomponent
├── index.js          # Projektets ingångspunkt
├── .env              # Miljövariabler
```
