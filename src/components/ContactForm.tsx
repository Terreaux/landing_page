import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { getRootPath } from '@/lib/utils';

type SubmitState = 'idle' | 'submitting' | 'success' | 'error';

export function ContactForm() {
  const [state, setState] = useState<SubmitState>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const formspreeEndpoint = String(import.meta.env.PUBLIC_FORMSPREE_ENDPOINT ?? 'https://formspree.io/f/mojkqnbl').trim();
  const thankYouPath = `${getRootPath()}thank-you/`;

  const isSubmitting = state === 'submitting';

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;

    if (!formspreeEndpoint) {
      setState('error');
      setErrorMessage('Feedback form is not configured yet. Please try again later.');
      return;
    }

    setState('submitting');
    setErrorMessage('');

    const formData = new FormData(form);

    try {
      const response = await fetch(formspreeEndpoint, {
        method: 'POST',
        headers: {
          Accept: 'application/json'
        },
        body: formData
      });

      if (!response.ok) {
        let message = 'Unable to send feedback right now. Please try again.';

        try {
          const data = (await response.json()) as { errors?: Array<{ message?: string }> };
          message = data.errors?.[0]?.message || message;
        } catch {
          // Ignore JSON parsing issues and keep the fallback message.
        }

        throw new Error(message);
      }

      setState('success');
      form.reset();
      const fullUrl = thankYouPath.startsWith('http')
        ? thankYouPath
        : `${window.location.origin}${thankYouPath.startsWith('/') ? thankYouPath : `/${thankYouPath}`}`;
      window.location.replace(fullUrl);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unable to send feedback right now.';
      setState('error');
      setErrorMessage(message);
    }
  };

  return (
    <form className="space-y-4" method="POST" action={formspreeEndpoint} onSubmit={handleSubmit}>
      <input type="hidden" name="_next" value={`${getRootPath()}thank-you/?from=contact`} />
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="name">Name</Label>
          <Input id="name" name="name" autoComplete="name" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Work Email</Label>
          <Input id="email" name="email" type="email" autoComplete="email" required />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="company">Company</Label>
        <Input id="company" name="company" autoComplete="organization" />
      </div>

      <div className="space-y-2">
        <Label htmlFor="message">Project Brief</Label>
        <Textarea
          id="message"
          name="message"
          required
          placeholder="What are you building, what constraints are you working with, and what timeline matters most?"
        />
      </div>

      <div className="flex flex-wrap items-center gap-3 pt-2">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Sending...' : 'hello@terreaux.co'}
        </Button>
      </div>

      {state === 'success' ? (
        <p className="text-sm text-[#d4f5d0]">Thanks. Your message has been sent.</p>
      ) : null}
      {state === 'error' ? <p className="text-sm text-[#ffb2b2]">{errorMessage || 'Something went wrong. Please try again.'}</p> : null}
    </form>
  );
}
