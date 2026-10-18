# Part 2 – Shared secrets file

> **Insecure on purpose.** The `.env` file is committed to this repo.

The secrets were moved out of [`app.js`](app.js) into a [`.env`](.env) file
that the [`dotenv`](https://www.npmjs.com/package/dotenv) package loads into
`process.env`. That is an improvement in code structure, but because `.env`
is pushed to GitHub, anyone who clones the repo gets every secret.

## Run

```bash
npm install
npm start
```

Then open <http://localhost:3000/?key=demo-api-key-1234567890>.
The app works straight after cloning because the secrets came with the code.

## Did GitHub complain?

No. GitHub accepted the push with no warning. GitHub secret scanning / push
protection only blocks values that match known provider token formats (AWS
keys, GitHub tokens, Stripe keys, …). Generic values such as
`DB_PASSWORD=SuperSecret123!` are not recognised, so nothing stops them from
being published.
