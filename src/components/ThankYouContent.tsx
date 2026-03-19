import { useEffect, useState } from 'react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getRootPath } from '@/lib/utils';

const contactContent = {
  title: 'Your message is in.',
  body: 'We will review your note and follow up with practical next steps. If your request is time-sensitive, contact us directly and include your timeline.',
  nextStep: 'Expect a reply with scope alignment, delivery approach, and recommended timing.',
  showSendAnother: true,
};

const scheduleContent = {
  title: "You're all set.",
  body: "We've received your booking. A calendar invite is on its way, and we look forward to speaking with you.",
  nextStep: 'Check your inbox for the meeting details. See you soon.',
  showSendAnother: false,
};

export function ThankYouContent() {
  const [content, setContent] = useState(contactContent);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const from = params.get('from');
    setContent(from === 'schedule' ? scheduleContent : contactContent);
    setMounted(true);
  }, []);

  const rootPath = getRootPath();

  if (!mounted) {
    return (
      <section className="rounded-3xl border border-[#bcd69f59] bg-[linear-gradient(175deg,rgba(16,21,14,0.95),rgba(8,10,7,0.99))] p-[clamp(1.2rem,3vw,2.2rem)]">
        <p className="eyebrow">Thank You</p>
        <h1 className="max-w-[16ch] font-display text-[clamp(2rem,5vw,4.2rem)] leading-[1.04] text-[#f7f9f2]">
          {contactContent.title}
        </h1>
        <p className="mt-4 max-w-[60ch] text-[#d0d9c3]">{contactContent.body}</p>
      </section>
    );
  }

  return (
    <section className="rounded-3xl border border-[#bcd69f59] bg-[linear-gradient(175deg,rgba(16,21,14,0.95),rgba(8,10,7,0.99))] p-[clamp(1.2rem,3vw,2.2rem)]">
      <p className="eyebrow">Thank You</p>
      <h1 className="max-w-[16ch] font-display text-[clamp(2rem,5vw,4.2rem)] leading-[1.04] text-[#f7f9f2]">
        {content.title}
      </h1>
      <p className="mt-4 max-w-[60ch] text-[#d0d9c3]">{content.body}</p>

      <div className="mt-8 grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Email</CardTitle>
          </CardHeader>
          <CardContent>
            <a
              href="mailto:hello@terreaux.co"
              className="inline-block text-[#c3e8b1] no-underline transition-colors hover:text-[#f7f9f2]"
            >
              hello@terreaux.co
            </a>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Next Step</CardTitle>
          </CardHeader>
          <CardContent>{content.nextStep}</CardContent>
        </Card>
      </div>

      <div className="mt-8 flex flex-wrap gap-3">
        <a
          href={rootPath}
          className="inline-flex items-center justify-center rounded-full border border-[#c3e8b1] px-5 py-3 font-display text-sm tracking-[0.08em] text-[#f7f9f2] no-underline transition-colors hover:bg-[#c3e8b1] hover:text-[#0b100a]"
        >
          Back Home
        </a>
        {content.showSendAnother && (
          <a
            href={`${rootPath}contact/`}
            className="inline-flex items-center justify-center rounded-full border border-[#d1e4b033] px-5 py-3 font-display text-sm tracking-[0.08em] text-[#d0d9c3] no-underline transition-colors hover:border-[#c3e8b1] hover:text-[#f7f9f2]"
          >
            Send Another Message
          </a>
        )}
      </div>
    </section>
  );
}
