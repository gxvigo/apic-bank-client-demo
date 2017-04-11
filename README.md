# apic-bank-client-demo


This project implements an sample Node.js Express application that acts as web client for APIs managed by IBM API Connect.
The API Connect API Definition implementation is stored in the project: 
https://github.com/gxvigo/open-bank-project-api

The web application run on developer machines on localhost:3000.

It has 2 pages implemented:
- index.html (main page)
- account.html

The lastest demonstrates 2 API calls to API Connect:
- GET https://datapower/openabank/sb/api/banks/tsb/accounts
- POST https://datapower/openabank/sb/api/banks/tsb/accounts


The docker images created from this application is named: apicwebclient (docker-compose)


Linked (consumes) project: https://github.com/gxvigo/open-bank-project-api


---


CORS

to avoif cross script issue (CORS) run the client in Chrome with "--disable-web-security --user-data-dir" flags. 
In a Mac`:
alias chromex='open /Applications/Google\ Chrome.app/ --args --disable-web-security --user-data-dir="$HOME/chromexProfile"'

