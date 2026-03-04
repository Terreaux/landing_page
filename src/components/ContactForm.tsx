import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

type SubmitState = 'idle' | 'submitting' | 'error';

export function ContactForm() {
  const [state, setState] = useState<SubmitState>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const isSubmitting = state === 'submitting';

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
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
      const lines = [
        `Name: ${payload.name}`,
        `Email: ${payload.email}`,
        `Company: ${payload.company || 'N/A'}`,
        '',
        'Message:',
        payload.message
      ];
      const subject = encodeURIComponent(`New inquiry from ${payload.name}${payload.company ? ` (${payload.company})` : ''}`);
      const body = encodeURIComponent(lines.join('\n'));
      window.location.href = `mailto:hello@terreaux.co?subject=${subject}&body=${body}`;
      setState('idle');
      event.currentTarget.reset();
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unable to open your email client right now.';
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
          {isSubmitting ? 'Sending...' : 'hello@terreaux.co'}
        </Button>
      </div>

      {state === 'error' ? <p className="text-sm text-[#ffb2b2]">{errorMessage || 'Something went wrong. Please try again.'}</p> : null}
    </form>
  );
}
