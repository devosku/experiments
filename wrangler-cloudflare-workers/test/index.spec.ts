// test/index.spec.ts
import { env, createExecutionContext, waitOnExecutionContext, SELF } from 'cloudflare:test';
import { describe, it, expect } from 'vitest';
import worker from '../src/index';

// For now, you'll need to do something like this to get a correctly-typed
// `Request` to pass to `worker.fetch()`.
const IncomingRequest = Request<unknown, IncomingRequestCfProperties>;

const expectedResponse = `
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

describe('Test example worker', () => {
	it('Responds with status 200', async () => {
		const request = new IncomingRequest('https://example.com');
		const ctx = createExecutionContext();
		const response = await worker.fetch(request, env, ctx);
		await waitOnExecutionContext(ctx);
		expect(response.status).toEqual(200);
	});

	it('Responds with correct HTML (unit style)', async () => {
		const request = new IncomingRequest('http://example.com');
		// Create an empty context to pass to `worker.fetch()`.
		const ctx = createExecutionContext();
		const response = await worker.fetch(request, env, ctx);
		// Wait for all `Promise`s passed to `ctx.waitUntil()` to settle before running test assertions
		await waitOnExecutionContext(ctx);
		expect(await response.text()).toMatch(expectedResponse);
	});

	it('responds with correct HTML (integration style)', async () => {
		const response = await SELF.fetch('https://example.com');
		expect(await response.text()).toMatch(expectedResponse);
	});
});
