export type ContactVariant = 'landing' | 'page';

export interface ContactCopy {
  eyebrow: string;
  headline: string;
  body: string;
}

/** Single body + headline; eyebrow differs by surface. */
const shared: Pick<ContactCopy, 'headline' | 'body'> = {
  headline: 'Tell us what you need to ship.',
  body: "Share your objective, constraints, and timeline. We'll follow up with a practical plan for scope, approach, and delivery."
};

export function getContactCopy(variant: ContactVariant): ContactCopy {
  return {
    ...shared,
    eyebrow: variant === 'page' ? 'Contact' : "Let's Build"
  };
}
