/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npm run dev` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npm run deploy` to publish your worker
 *
 * Bind resources to your worker in `wrangler.json`. After adding bindings, a type definition for the
 * `Env` object can be regenerated with `npm run cf-typegen`.
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

export default {
  async fetch(request, env, ctx) {
    // (1) PUTメソッドとContent-Typeをチェック
    if (request.method !== 'PUT') {
      return new Response('Method Not Allowed', { status: 405 });
    }
    const contentType = request.headers.get('Content-Type') || '';
    if (!contentType.includes('application/json')) {
      return new Response('Unsupported Media Type', { status: 415 });
    }

    // (2) リクエストボディをJSONとして読み取る
    let jsonData;
    try {
      jsonData = await request.json();
    } catch (e) {
      // JSONパースエラー（不正なJSON）
      return new Response('Invalid JSON', { status: 400 });
    }

    // (3) JSONを整形して文字列化（2スペースインデント）
    const formattedJson = JSON.stringify(jsonData, null, 2);

    // (4) 整形済みJSONをレスポンス（Content-Type: application/json）で返す
    return new Response(formattedJson, {
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
