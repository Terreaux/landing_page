import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

import { ContactForm } from './ContactForm';

describe('ContactForm', () => {
  it('renders required fields and submit control', () => {
    render(<ContactForm />);
    expect(screen.getByLabelText('Name')).toBeInTheDocument();
    expect(screen.getByLabelText('Work Email')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /hello@terreaux/ })).toBeInTheDocument();
  });
});
