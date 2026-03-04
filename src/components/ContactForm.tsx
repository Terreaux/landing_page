import { useMemo, useState } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

type SubmitState = 'idle' | 'submitting' | 'success' | 'error';

export function ContactForm() {
  const [state, setState] = useState<SubmitState>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const isSubmitting = state === 'submitting';

  const statusCopy = useMemo(() => {
    if (state === 'success') {
      return { className: 'text-[#b7ffdb]', text: 'Message sent. We will get back to you shortly.' };
    }

    if (state === 'error') {
      return { className: 'text-[#ffb2b2]', text: errorMessage || 'Something went wrong. Please try again.' };
    }

    return null;
  }, [errorMessage, state]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setState('submitting');
    setErrorMessage('');

    const formData = new FormData(event.currentTarget);
    const payload = {
      name: String(formData.get('name') ?? '').trim(),
      email: String(formData.get('email') ?? '').trim(),
      company: String(formData.get('company') ?? '').trim(),
      message: String(formData.get('message') ?? '').trim()
    };

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      const data = (await response.json()) as { error?: string };

      if (!response.ok) {
        throw new Error(data.error || 'Unable to send your message right now.');
      }

      setState('success');
      event.currentTarget.reset();
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unable to send your message right now.';
      setState('error');
      setErrorMessage(message);
    }
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
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
          {isSubmitting ? 'Sending...' : 'Send Inquiry'}
        </Button>
        <a className="text-sm text-[#c4ceba] underline-offset-4 hover:underline" href="mailto:hello@terreaux.co">
          or email hello@terreaux.co
        </a>
      </div>

      {statusCopy ? <p className={`text-sm ${statusCopy.className}`}>{statusCopy.text}</p> : null}
    </form>
  );
}
