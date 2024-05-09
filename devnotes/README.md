# DevNotes - Example of full-stack Cloudflare Pages app with SvelteKit

This is an example of full-stack SvelteKit app using Cloudflare Pages as
a deployment environment.

The tech stack is as follows:

- SvelteKit
- Flowbite Svelte
    - TailwindCSS based component library
- Auth.js
    - Authentication library
- Cloudflare D1
    - Cloudflare native serverless relational database
- Wrangler
    - Development/deployment tool by Cloudflare

The app itself is very simple. It allows SSO login with Google and when you
log in first time an user is created in the database based on the received
token. Then the logged in user can add and delete notes that will be saved
on the Cloudflare D1 database.

## Getting started

To use this app few initial steps are required.

### Initialize database

Create database:

```bash
npm run create:database
```

Modify d1_databases in [wrangler.toml](./wrangler.toml) so it matches what the command printed. For example:

```toml
[[d1_databases]]
binding = "DB"
database_name = "prod-devnotes"
database_id = "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
```

Create database schema for the local database:

```bash
npm run create:schema:local
```

### Initialize authentication

This app uses Google SSO for the user logins. You need to setup this in Google Cloud.

1. Create an OAuth consent screen in APIs & Services
    - You need to add your email address to "Test users"
2. Create Credentials
    - Create OAuth 2.0 Client ID
    - Add URLs to the redirect URL
        - http://localhost:5173/auth/callback/google 
            - For local development
        - http://localhost:8788/auth/callback/google 
            - For preview build of app (with `npm run preview`)
        - https://example.com/auth/callback/google
            - Whatever domain you will be using in production
3. Add the client secrets to environment variables
    - For local development add them to `.env` and `.dev.vars` files at projects root:

        ```bash
        AUTH_GOOGLE_ID=YOUR-CLIENT-ID
        AUTH_GOOGLE_SECRET=YOUR-CLIENT-SECRET
        ```

    - The `.env` file is used when running `npm run dev` and `.dev.vars` when running `npm run preview`
    - In production you need to set them in Cloudflare
        - This is described in the deployment section of this document
4. Create Auth.js secret that it uses for encrypting cookies and tokens
    - Run `npm exec auth secret`
    - Locally you can add it to `.env` file at projects root:

        ```bash
        AUTH_SECRET=YOUR-SECRET
        ```

    - The `.env` file is used when running `npm run dev` and `.dev.vars` when running `npm run preview`
    - In production you need to set it in Cloudflare
        - This is described in the deployment section of this document

## Developing

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

## Deploying

Deploy the "infrastructure" by running:

```bash
npm run deploy
```

If this is your first deploy then you need to create the database schema:

```bash
npm run create:schema:remote
```

After the deployment you also need to set **ALL** the secrets for the Google SSO.
You should already have the values on your local `.env` or `.dev.vars`, but
it is recommended to create a new AUTH_SECRET for the production environment.

```bash
npm exec auth secret
```

Then create the variables in the cloud with Wrangler or from the Cloudflare
dashboard. The process is 

1. Log in to [Cloudflare dashboard](https://dash.cloudflare.com) and select your account.
2. Select Workers & Pages.
3. In Overview, select your Pages > Settings.
4. Under Production, select Add variable.
5. Input a Variable name and its value, which will be made available to your Pages app.
6. Select Encrypt to protect the secret’s value. This will prevent the value from being visible via Wrangler and the dashboard.
7. To add multiple secrets, select Add variable.
8. Select Save to implement your changes.

After adding the environment variables you need to deploy again:

```bash
npm run deploy
```

You will also need to update the redirect URL in gor Google OAuth 2.0 Client ID
to contain the URL where the app is deployed to:

- https://example.com/auth/callback/google
    - Use domain Cloudflare gave you instead of example.com