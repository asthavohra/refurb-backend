## Setup

<br>

1. Generate `API_KEY` for the backend service, all incoming request should have this key or else server will reject the request and will respond back with `401 HTTP STATUS`.

   ```
   $ npm install uuid
   $ node
   Welcome to Node.js v14.17.6.
   > const { v4: uuidv4 } = require("uuid");
   > uuidv4()
   '232c4ce8-b0f9-4b85-94a0-d56bac7ac18d'

   ```

2. Export the `API_KEY` to the `ENVIRONMENT`

   ### Windows (Powershell)

   ```
   $Env:API_KEY='232c4ce8-b0f9-4b85-94a0-d56bac7ac18d'
   ```

   ### Linux/Unix/Macos

   ```
   API_KEY='232c4ce8-b0f9-4b85-94a0-d56bac7ac18d'
   ```

3. Get the firebase config from the [firebase console](https://console.firebase.google.com/project/_/settings/general), you can find the steps [here](https://support.google.com/firebase/answer/7015592?hl=en#web&zippy=%2Cin-this-article). Copy the `project_id`, `private_key` & `client_email` from the config json file. Export all these variables to the `ENVIRONMENT`, alternatively you can add them in the bash profile too.

   ### Windows (Powershell)

   ```
   $Env:FIREBASE_CLIENT_EMAIL='<client_email>'
   $Env:FIREBASE_PROJECT_ID='<project_id>'
   $Env:FIREBASE_PRIVATE_KEY='<private_key>'
   ```

   ### Linux/Unix/Macos

   ```
   FIREBASE_CLIENT_EMAIL='<client_email>'
   FIREBASE_PROJECT_ID='<project_id>'
   FIREBASE_PRIVATE_KEY='<private_key>'
   ```

4. Get Stripe's secret key from the the [dashboard](https://dashboard.stripe.com/), you can find it under Developers tab and export it to the `ENVIRONMENT`.

   ### Windows (Powershell)

   ```
   $Env:PORT='9999'
   ```

   ### Linux/Unix/Macos

   ```
   API_KEY='9999'
   ```

5. By default the app runs on `8080` port, you can overide the value by setting the port in th `ENVIRONMENT`

   ### Windows (Powershell)

   ```
   $Env:PORT='9999'
   ```

   ### Linux/Unix/Macos

   ```
   API_KEY='9999'
   ```

6. To start the server run
   ```
   npm start
   ```
