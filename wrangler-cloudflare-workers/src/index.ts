/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npm run dev` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npm run deploy` to publish your worker
 *
 * Bind resources to your worker in `wrangler.toml`. After adding bindings, a type definition for the
 * `Env` object can be regenerated with `npm run cf-typegen`.
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

const template = `
<!doctype html>
<html>
  <head>
	<title>Example Cloudflare worker!</title>
  </head>
  <body>
	<p>Enjoy your random image!</p>
	<img src="https://source.unsplash.com/random/200x200?sig=1" />
  </body>
</html>
`;

export default {
	async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
		return new Response(
			template,
			{
				status: 200,
				headers: {
					'Content-Type': 'text/html'
				}
			}
		);
	},
};
