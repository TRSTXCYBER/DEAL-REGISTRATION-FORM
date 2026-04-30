const webhookUrl = import.meta.env.VITE_GHL_WEBHOOK_URL

if (!webhookUrl) {
  // eslint-disable-next-line no-console
  console.warn('[webhook] Missing VITE_GHL_WEBHOOK_URL. Webhook POST will be skipped.')
}

// POST the raw form values (keyed by field id) to the GoHighLevel webhook.
// Keeping the payload shape close to the form so it's easy to map inside GHL.
export async function postToGhlWebhook(values) {
  if (!webhookUrl) return { ok: false, skipped: true }

  const payload = {
    ...values,
    submitted_at: new Date().toISOString(),
  }

  const res = await fetch(webhookUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })

  if (!res.ok) {
    const text = await res.text().catch(() => '')
    // eslint-disable-next-line no-console
    console.error('[webhook] POST failed:', res.status, text)
    throw new Error(`Webhook POST failed: ${res.status}`)
  }
  return { ok: true }
}
