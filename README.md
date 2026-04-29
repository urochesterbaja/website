## University of Rochester BAJA SAE Website
This is the codebase for the University of Rochester BAJA SAE website. This document will outline:

-required libraries for local host/dev

-project architecture (apis, hosting)

Note that the sign-in information for all accounts as well as the DB architecture are stored in a separate document attached to the BAJA team's email address, and should remain PRIVATE.

### REQUIRED LIBRARIES/LOCAL HOST INSTRUCTIONS
#### Prerequisites:

Node.js v18+

Netlify CLI (npm install -g netlify-cli)

#### To run locally:

-clone the repo

-npm install

-netlify dev

#### To rebuild frontend for localhost:

-cd frontend

-npm run build

-cd -

-netlify dev

Local host is configured to run on port 5173 for Vite frontend hosting (can't use because requires backend for db calls) and 8000 for netlify dev.


### PROJECT ARCHITECTURE:

Core architecture:
Frontend & Backend File Storage: GitHub
Data Storage: MongoDB
Image Storage: Cloudinary
Hosting: Netlify

Other APIs: 
Authentication for admin page: Auth0
Google Sheets (email recepient list): Google Cloud Console (Sheets API)

Domain name: Namecheap

A note: Netlify free tier has a limit of 300 credits per month. Deploying a new build of the site costs 15 credits, and every time you push to the Git repo it triggers a deploy, so try to batch pushes and be as stingy as possible to prevent overloading credits. Use localhost:8000 via "netlify dev" to test everything before it reaches GitHub.

Another note: all .env variables are stored within the Netlify account. So long as you run via "netlify dev" instead of "cd frontend && npm run dev" these should populate automatically.

A third and final note: Read the document called "Website Document" in the BAJA google drive for information on the DB architecture. If it no longer exists email me at whager at duck dot com and I will send you my backup (which may not be up to date).
