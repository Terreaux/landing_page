import type { APIRoute } from 'astro';

export const prerender = false;

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const POST: APIRoute = async ({ request }) => {
  let payload: { name?: string; email?: string; company?: string; message?: string };

  try {
    payload = await request.json();
  } catch {
    return new Response(JSON.stringify({ error: 'Invalid JSON body.' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  const name = (payload.name ?? '').trim();
  const email = (payload.email ?? '').trim();
  const company = (payload.company ?? '').trim();
  const message = (payload.message ?? '').trim();

  if (!name || !email || !message) {
    return new Response(JSON.stringify({ error: 'Name, email, and message are required.' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  if (!emailPattern.test(email)) {
    return new Response(JSON.stringify({ error: 'Please enter a valid email address.' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  const resendApiKey = import.meta.env.RESEND_API_KEY;
  const toEmail = import.meta.env.CONTACT_TO_EMAIL ?? 'hello@terreaux.co';
  const fromEmail = import.meta.env.CONTACT_FROM_EMAIL ?? 'Terreaux <onboarding@resend.dev>';

  if (!resendApiKey) {
    return new Response(JSON.stringify({ error: 'Contact form is not configured yet. Set RESEND_API_KEY.' }), {
      status: 503,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  const emailBody = [
    `Name: ${name}`,
    `Email: ${email}`,
    `Company: ${company || 'N/A'}`,
    '',
    'Message:',
    message
  ].join('\n');

  const resendResponse = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${resendApiKey}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      from: fromEmail,
      to: [toEmail],
      reply_to: email,
      subject: `New inquiry from ${name}${company ? ` (${company})` : ''}`,
      text: emailBody
    })
  });

  if (!resendResponse.ok) {
    const resendError = await resendResponse.text();

    return new Response(JSON.stringify({ error: 'Unable to send message.', detail: resendError }), {
      status: 502,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  return new Response(JSON.stringify({ ok: true }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  });
};
