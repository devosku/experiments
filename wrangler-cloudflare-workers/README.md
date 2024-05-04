# Cloudflare Worker deployment example with Wrangler

This is a simple example on how to deploy Cloudlfare Workers with Wrangler with a custom domain that is
managed in Cloudflare.

## Project setup

This project requeires that you have a zone setup in Cloudflare. See
[Zone setups](https://developers.cloudflare.com/dns/zone-setups/) for more information.

I personally have the "Full setup" with `devosku.work` domain.

The project was created by running [create-cloudflare-cli command](https://developers.cloudflare.com/pages/get-started/c3):

```
npm create cloudflare@latest
```

This will launch an interactive client prompting you on what kind of project you want to create and where. This app
was created with the `"Hello World" Worker` template.

Then the [wrangler.toml](./wrangler.toml) was edited so that the default `workers.dev` domain was disabled and instead `devosku.work`
domain would be used. If you want to do this on your own domain then you have to edit the pattern.

```
workers_dev = false
route = { pattern = "workers-example.devosku.work", custom_domain = true }
```

## How to develop

Wrangler can run a local development server where you can develop your workers locally:

```
npm run dev
```

## How to deploy

You have to change the route in [wrangler.toml](./wrangler.toml) if you want to deploy to your own domain.

Running this should open a browser to login to your Cloudflare account and then it will deploy the worker there:

```
npm run deploy
```

## How to delete

To destroy the deployed worker you can run:

```
npm run delete
```

This will also remove the DNS record so it is pretty nice.

## Links

- [create-cloudflare-cli command](https://developers.cloudflare.com/pages/get-started/c3)
- [Zone setups](https://developers.cloudflare.com/dns/zone-setups/)
- [Getting started with Cloudflare Workers](https://developers.cloudflare.com/workers/configuration/routing/custom-domains/)
- [Custom Domains](https://developers.cloudflare.com/workers/configuration/routing/custom-domains/)
