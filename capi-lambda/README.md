# Meta Conversions API relay (AWS Lambda)

A single AWS Lambda behind a public **Function URL** that forwards
`InitiateCheckout` events server-side to the Meta Conversions API. The static
landing page (GitHub Pages) can't run server code, so this is the "somewhere"
that holds the access token and talks to Meta.

- **Cost:** $0 — stays inside AWS's *always-free* Lambda tier (1M req/mo). A
  `$1` budget alarm is included as a safety net.
- **Dedup:** the browser pixel and this server event share an `event_id`
  (generated in `src/lib/track.ts`), so Meta counts each click once.

## One-time setup

### 1. Prerequisites
```bash
# Install the AWS + SAM CLIs (macOS / Homebrew)
brew install awscli aws-sam-cli
```
- An **AWS account** (free): https://aws.amazon.com
- A **Conversions API access token**: Events Manager → Pixel `4291041411181419`
  → **Settings** → Conversions API → **Generate access token**. Keep it secret.

### 2. Configure AWS credentials
Create an IAM user with programmatic access (or use IAM Identity Center), then:
```bash
aws configure   # paste Access Key ID + Secret, region e.g. us-east-1
```

### 3. Deploy
```bash
cd capi-lambda
sam build
sam deploy --guided
```
During `--guided` you'll be prompted for the template parameters:
- `FbAccessToken` — the token from step 1 (stored locally in the gitignored
  `samconfig.toml`, never committed)
- `PixelId` — defaults to `4291041411181419`
- `AllowOrigin` — defaults to `https://www.andthenwehitarock.com`
- `TestEventCode` — leave **blank** for production (see Testing below)
- `BudgetEmail` — where to send the $1 spend alert

When it finishes, copy the **`CapiUrl`** output (the Function URL).

### 4. Point the site at the endpoint
The Function URL is public/non-sensitive, so inject it at build time. Add it to
the site's GitHub Pages workflow as an env var (repo **Variable**, not secret):

```yaml
# .github/workflows/deploy.yml → "Build Project" step
      - name: Build Project
        run: npm run build
        env:
          VITE_CAPI_URL: ${{ vars.VITE_CAPI_URL }}
```
Set the value in the repo: Settings → Secrets and variables → Actions →
**Variables** → `VITE_CAPI_URL = <CapiUrl>`. Push to `main` to rebuild.

For local testing, add `VITE_CAPI_URL=<CapiUrl>` to a local `.env`.

## Testing before going live
1. In `sam deploy --guided`, set `TestEventCode` to the code from Events Manager
   → **Test Events**.
2. Load the site with `VITE_CAPI_URL` set, click a buy button.
3. You should see the `InitiateCheckout` appear in **Test Events**, marked as
   received from both **Browser** and **Server**, deduplicated by `event_id`.
4. Once verified, redeploy with `TestEventCode` blank so events flow to live
   optimization.

## Updating later
```bash
cd capi-lambda
sam build && sam deploy      # reuses saved samconfig.toml
```

## What it sends
`event_name: InitiateCheckout`, `action_source: website`, `event_source_url`,
and `user_data` of `{ client_ip_address, client_user_agent, fbp, fbc }` — the
same match keys the browser pixel has. No email/phone is collected, so nothing
is hashed. Amazon purchases are not visible to this (or any) pixel/CAPI setup.
