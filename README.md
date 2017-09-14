# IdPortl

## Description

An application which allows a user to enter their details and upload forms to verify their identity.

Built using React, Redux, Node (Express).

## Getting Started

1. Clone the repo to your local machine.
2. Run ```npm install``` to install node modules.
3. Run ```npm run start``` to start the application.
4. Visit ```localhost:8080``` to access the UI.

## Details

Project took roughly 15 hours to complete.

### What went well?

- Reusable form state class allows for more forms to be added in the future.
- Multiple file upload and aggregated upload status (percentage complete) in one request made for cleaner and simpler user experience.

### Possible next steps

- Implement a 'user' reducer to store user state in the redux store.
- Save user details to a database such as firebase.
- Possible design changes.
- More sophisticated form fields and validation (e.g. Split address fields, dropdown options for foreign passports with regex validation based on passport type.)

### Performance optimisations added

- JS file minification during compilation using ```--optimize-minimize``` flag.

### Libraries used

- Axios was used to http requests.
- Multer was used as an express middleware to process multiple file uploads.
- Validate.js was used to help build reusuable validation 
