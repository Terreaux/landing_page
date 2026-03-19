import { useState, useEffect } from 'react';

interface SecurityContentProps {
  rootPath?: string;
}

const SECTIONS = [
  { id: 'security-approach', label: 'Security approach' },
  { id: 'infrastructure', label: 'Infrastructure' },
  { id: 'access-control', label: 'Access control' },
  { id: 'ai-data-handling', label: 'AI and data handling' },
  { id: 'export-control', label: 'Export-control' },
  { id: 'segregated-delivery', label: 'Segregated delivery' },
  { id: 'vendor-toolchain', label: 'Vendor and toolchain' },
  { id: 'incident-response', label: 'Incident response' },
  { id: 'shared-responsibility', label: 'Shared responsibility' },
  { id: 'project-controls', label: 'Project-specific' },
] as const;

const TRUST_ITEMS = [
  {
    label: 'Project-based access control',
    desc: 'Access is limited to named personnel with a defined need to know.',
  },
  {
    label: 'Controlled AI usage',
    desc: 'Model, tooling, and data flows are reviewed based on project sensitivity.',
  },
  {
    label: 'Segregated delivery options',
    desc: 'Sensitive work can be isolated in dedicated or client-managed environments.',
  },
  {
    label: 'Export-control-aware workflows',
    desc: 'Restricted engagements follow a separate intake and handling path.',
  },
  {
    label: 'Vendor and toolchain review',
    desc: 'Approved systems and providers are selected per project.',
  },
  {
    label: 'Incident response process',
    desc: 'Security issues are escalated, contained, and communicated through a defined path.',
  },
] as const;

// ─── Shared border token (matches site's blueprint line color) ───────────────
const B = 'rgba(209,228,176,0.12)';
const B_STRONG = 'rgba(209,228,176,0.2)';

function Eyebrow({
  children,
  accent = false,
}: {
  children: React.ReactNode;
  accent?: boolean;
}) {
  return (
    <p
      className={`mb-5 font-monoSans text-[0.65rem] font-semibold uppercase tracking-[0.18em] ${
        accent ? 'text-[#98f2be]' : 'text-[#b6bfab]'
      }`}
    >
      {children}
    </p>
  );
}

function SectionBlock({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      className="scroll-mt-28 py-11"
      style={{ borderBottom: `1px solid ${B}` }}
    >
      <Eyebrow>{title}</Eyebrow>
      <div className="space-y-4 text-[0.91rem] leading-[1.8] text-[#d0d9c3]">{children}</div>
    </section>
  );
}

function CalloutSection({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-28 py-11" style={{ borderBottom: `1px solid ${B}` }}>
      {/* schematic frame */}
      <div
        className="relative px-6 py-8 md:px-8 md:py-10"
        style={{
          border: `1px solid rgba(152,242,190,0.2)`,
          background: 'rgba(152,242,190,0.035)',
        }}
      >
        {/* corner marks — top-left */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -left-px -top-px h-3 w-3"
          style={{
            borderTop: `2px solid rgba(152,242,190,0.5)`,
            borderLeft: `2px solid rgba(152,242,190,0.5)`,
          }}
        />
        {/* corner marks — top-right */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -right-px -top-px h-3 w-3"
          style={{
            borderTop: `2px solid rgba(152,242,190,0.5)`,
            borderRight: `2px solid rgba(152,242,190,0.5)`,
          }}
        />
        {/* corner marks — bottom-left */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-px -left-px h-3 w-3"
          style={{
            borderBottom: `2px solid rgba(152,242,190,0.5)`,
            borderLeft: `2px solid rgba(152,242,190,0.5)`,
          }}
        />
        {/* corner marks — bottom-right */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-px -right-px h-3 w-3"
          style={{
            borderBottom: `2px solid rgba(152,242,190,0.5)`,
            borderRight: `2px solid rgba(152,242,190,0.5)`,
          }}
        />

        <Eyebrow accent>{title}</Eyebrow>
        <div className="space-y-4 text-[0.91rem] leading-[1.8] text-[#d0d9c3]">
          {children}
        </div>
      </div>
    </section>
  );
}

function Lead({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[0.96rem] font-semibold leading-[1.72] text-[#f7f9f2]">{children}</p>
  );
}

export function SecurityContent({ rootPath = '/' }: SecurityContentProps) {
  const base = (rootPath || '/').replace(/\/$/, '') || '/';
  const homeHref = base === '/' ? '/' : `${base}/`;

  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const intersecting = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (intersecting.length > 0) {
          setActiveSection(intersecting[0].target.id);
        }
      },
      { rootMargin: '-12% 0px -78% 0px', threshold: 0 }
    );

    SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="text-[#f7f9f2]">

      {/* ── Hero ── */}
      <div style={{ borderBottom: `1px solid ${B_STRONG}` }}>
        <div className="mx-auto w-[min(980px,92vw)] py-16 md:py-24">
          <p className="mb-4 font-monoSans text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-[#b6bfab]">
            Security
          </p>
          <h1 className="max-w-[22ch] font-display text-[clamp(1.9rem,3.8vw,3rem)] font-bold leading-[1.1] tracking-[-0.01em] text-[#f7f9f2]">
            Security for sensitive AI and software engagements
          </h1>
          <div className="mt-7 max-w-[58ch] space-y-4 text-[0.91rem] leading-[1.82] text-[#d0d9c3]">
            <p>
              We build AI systems, data products, and technical software for organizations that
              care about confidentiality, reliability, and operational discipline. Some engagements
              may involve sensitive technical information, restricted workflows, or
              export-control-aware handling requirements. For those projects, we define controls
              before work begins and tailor the delivery model to the risk profile of the work.
            </p>
            <p>
              Our approach is practical, project-specific, and built around clear boundaries: who
              can access what, which tools are approved, where data lives, and how delivery
              happens.
            </p>
          </div>
        </div>
      </div>

      {/* ── Trust strip ── */}
      <div
        style={{
          borderBottom: `1px solid ${B_STRONG}`,
          background: 'rgba(0,0,0,0.28)',
        }}
      >
        <div className="mx-auto w-[min(980px,92vw)] py-10">
          <div className="grid grid-cols-1 gap-x-10 gap-y-7 sm:grid-cols-2 lg:grid-cols-3">
            {TRUST_ITEMS.map((item) => (
              <div key={item.label} className="flex flex-col gap-2">
                <p className="font-monoSans text-[0.65rem] font-semibold uppercase tracking-[0.15em] text-[#98f2be]">
                  {item.label}
                </p>
                <p className="text-[0.84rem] leading-[1.65] text-[#b6bfab]">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Main content + TOC ── */}
      <div className="mx-auto w-[min(980px,92vw)] py-6">
        <div className="flex gap-14">

          {/* Sticky TOC — xl only */}
          <aside className="hidden xl:block xl:w-[160px] xl:flex-shrink-0">
            <div className="sticky top-28 pt-12">
              <p className="mb-4 font-monoSans text-[0.6rem] font-semibold uppercase tracking-[0.2em] text-[#6b7362]">
                On this page
              </p>
              <nav className="space-y-3">
                {SECTIONS.map(({ id, label }) => (
                  <a
                    key={id}
                    href={`#${id}`}
                    className={`block font-monoSans text-[0.72rem] leading-[1.4] transition-colors duration-150 ${
                      activeSection === id
                        ? 'text-[#98f2be]'
                        : 'text-[#6b7362] hover:text-[#b6bfab]'
                    }`}
                  >
                    {label}
                  </a>
                ))}
              </nav>
            </div>
          </aside>

          {/* Section content */}
          <div className="min-w-0 flex-1">
            <div className="max-w-[62ch]">

              <SectionBlock id="security-approach" title="Security approach">
                <Lead>Security is part of delivery, not a layer added after the fact.</Lead>
                <p>
                  We design each engagement around a few core principles. Access is provisioned by
                  project, not by convenience. Permissions are scoped to the minimum systems and
                  data needed to deliver the work. Sensitive projects may use segregated
                  environments, dedicated repositories, restricted communications paths, or
                  customer-managed infrastructure. Tooling choices, including AI tooling, are
                  reviewed based on the nature of the data and the obligations associated with the
                  engagement.
                </p>
                <p>
                  For projects with elevated security or compliance needs, we adapt the operating
                  model rather than forcing the work into a generic delivery stack.
                </p>
              </SectionBlock>

              <SectionBlock id="infrastructure" title="Infrastructure and technical safeguards">
                <p>
                  Depending on project scope, our baseline safeguards may include encrypted data
                  transmission, encrypted storage on supported managed infrastructure, strong
                  authentication for core systems, managed secret handling, version-controlled
                  delivery workflows, and logging or audit visibility where supported.
                </p>
                <p>
                  Administrative access is restricted and used only when necessary. Sensitive
                  systems and environments are limited to named personnel. Backup and recovery
                  practices are defined based on the hosting and delivery model used for the
                  engagement.
                </p>
                <p>
                  Where a project requires tighter boundaries, work may be delivered inside a
                  client-managed environment or a designated segregated environment rather than
                  through a standard toolchain.
                </p>
              </SectionBlock>

              <SectionBlock id="access-control" title="Access control">
                <Lead>
                  Access is granted on a need-to-know basis and reviewed against actual project
                  responsibilities.
                </Lead>
                <p>
                  Repositories, environments, documents, storage locations, and cloud resources
                  are scoped to the personnel assigned to the engagement. Administrative
                  permissions are more tightly limited than standard project access. Access is
                  updated or revoked when roles change or when project involvement ends.
                </p>
                <p>
                  Sensitive engagements may require explicit approval before access is granted to
                  specific systems or datasets. External collaborators or subcontractors are not
                  included in restricted projects unless explicitly authorized and subject to the
                  same handling requirements.
                </p>
              </SectionBlock>

              <SectionBlock id="ai-data-handling" title="AI and data handling">
                <Lead>
                  AI projects introduce additional confidentiality and workflow risks that require
                  explicit controls.
                </Lead>
                <p>
                  We do not use client data to train internal models unless that use is explicitly
                  agreed in writing. Model and provider choices are reviewed based on the
                  sensitivity of the project. For some engagements, public or general-purpose AI
                  tooling may be limited or disallowed. Prompt flows, generated artifacts,
                  evaluation pipelines, and derived outputs may be constrained to approved systems
                  only.
                </p>
                <p>
                  Where needed, we can work within customer-approved environments,
                  customer-managed infrastructure, or isolated project setups to enforce tighter
                  control over data movement and tool usage.
                </p>
              </SectionBlock>

              <CalloutSection id="export-control" title="Export-control-sensitive engagements">
                <p>
                  Some engagements may involve export-controlled technical information, restricted
                  documentation, or customer-specific handling requirements. These projects follow
                  a separate review and delivery path.
                </p>
                <p>
                  Before work begins, we define the authorized personnel, approved tools, storage
                  boundaries, communication channels, sharing rules, and delivery environment for
                  the engagement. Where required by project scope, access can be restricted to
                  authorized U.S. persons on a need-to-know basis.
                </p>
                <p>
                  We do not assume that standard collaboration tools, cloud workflows, or AI model
                  endpoints are appropriate for restricted work. Tooling and delivery patterns are
                  evaluated project by project. In some cases, that means limiting vendors,
                  disabling certain workflows, or operating only within customer-managed systems.
                </p>
                <p
                  className="text-[0.82rem] italic text-[#98f2be]/70"
                  style={{ borderTop: `1px solid rgba(152,242,190,0.15)`, paddingTop: '1rem' }}
                >
                  Note: legal classification, export classification, and formal regulatory
                  interpretation remain the client's responsibility unless explicitly included in
                  the engagement scope.
                </p>
              </CalloutSection>

              <SectionBlock
                id="segregated-delivery"
                title="Customer-managed and segregated delivery"
              >
                <Lead>For higher-assurance projects, we can adapt how delivery happens.</Lead>
                <p>
                  This may include working directly in a client's cloud environment, using
                  dedicated repositories or storage locations for a single engagement, separating
                  restricted work from standard delivery systems, or limiting the project to
                  approved source-control, documentation, communication, and deployment workflows.
                </p>
                <p>
                  This model is often appropriate when work involves sensitive industrial systems,
                  defense-adjacent workflows, proprietary internal data, or restricted technical
                  documentation.
                </p>
              </SectionBlock>

              <SectionBlock id="vendor-toolchain" title="Vendor and toolchain review">
                <Lead>
                  The systems used to deliver a project are part of the security posture of that
                  project.
                </Lead>
                <p>
                  For sensitive engagements, we review the project toolchain before work begins.
                  This can include cloud providers, source control, CI/CD systems, model
                  providers, documentation tools, ticketing systems, monitoring tools, storage
                  systems, and communication platforms.
                </p>
                <p>
                  Not every tool is appropriate for every project. Where necessary, we narrow the
                  toolchain to approved vendors and approved environments only.
                </p>
              </SectionBlock>

              <SectionBlock id="incident-response" title="Incident response">
                <p>
                  If we identify a security issue affecting project systems, data, or delivery
                  workflows, we respond through a defined escalation path.
                </p>
                <p>
                  That process includes triage, containment, impact assessment, preservation of
                  relevant evidence where available, customer notification through the agreed
                  communication channel, and remediation planning.
                </p>
                <p>
                  For projects with additional contractual or operational requirements,
                  incident-handling expectations can be aligned during onboarding.
                </p>
              </SectionBlock>

              <SectionBlock id="shared-responsibility" title="Shared responsibility">
                <Lead>Security in consulting engagements is shared.</Lead>
                <p>
                  We are responsible for the controls and practices within the agreed scope of our
                  delivery. Clients remain responsible for their own system configurations,
                  internal access decisions, legal classifications, and broader regulatory
                  obligations unless those responsibilities are explicitly assigned to us in
                  writing.
                </p>
                <p>
                  Where a project depends on customer infrastructure, customer policies, or
                  customer-approved tooling, the final control posture is shaped jointly.
                </p>
              </SectionBlock>

              {/* Last section — no border-b */}
              <section id="project-controls" className="scroll-mt-28 py-11">
                <Eyebrow>Project-specific controls</Eyebrow>
                <div className="space-y-4 text-[0.91rem] leading-[1.8] text-[#d0d9c3]">
                  <p>
                    Not every engagement needs the same level of rigor. We define the appropriate
                    control model based on the sensitivity of the work, the systems involved, and
                    the client's requirements.
                  </p>
                  <p>
                    During scoping, we can discuss restricted-access workflows,
                    approved-tooling-only delivery, segregated environments, customer-managed
                    infrastructure, and AI-tool usage restrictions for sensitive projects.
                  </p>
                </div>
              </section>

            </div>
          </div>
        </div>
      </div>

      {/* ── Contact block ── */}
      <div style={{ borderTop: `1px solid ${B_STRONG}`, background: 'rgba(0,0,0,0.3)' }}>
        <div className="mx-auto w-[min(980px,92vw)] py-14">
          <div className="max-w-[62ch] xl:ml-[174px]">
            <p className="mb-1 font-monoSans text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-[#b6bfab]">
              Contact
            </p>
            <h2 className="mb-5 font-display text-[1.4rem] font-bold leading-[1.2] text-[#f7f9f2]">
              Security questions
            </h2>
            <p className="mb-5 text-[0.91rem] leading-[1.8] text-[#d0d9c3]">
              For security questions or project-specific requirements, contact:
            </p>
            <a
              href="mailto:security@terreaux.co"
              className="inline-block font-monoSans text-[0.88rem] text-[#98f2be] underline decoration-[#98f2be]/30 underline-offset-4 transition-colors hover:text-[#c3e8b1] hover:decoration-[#c3e8b1]/50"
            >
              security@terreaux.co
            </a>
            <p className="mt-6 text-[0.91rem] leading-[1.8] text-[#d0d9c3]">
              We are happy to discuss environment setup, access boundaries, tooling restrictions,
              and delivery options during the engagement process.
            </p>

            <div className="mt-10">
              <a
                href={homeHref}
                className="inline-flex items-center justify-center rounded-full border border-[#c3e8b1] px-5 py-3 font-display text-sm tracking-[0.08em] text-[#f7f9f2] no-underline transition-colors hover:bg-[#c3e8b1] hover:text-[#0b100a]"
              >
                Back Home
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* ── Footnote ── */}
      <div style={{ borderTop: `1px solid ${B}` }}>
        <div className="mx-auto w-[min(980px,92vw)] py-6">
          <p className="max-w-[62ch] text-[0.78rem] leading-[1.65] text-[#6b7362] xl:ml-[174px]">
            Controls vary by project scope and client requirements. We do not publish unsupported
            certification or compliance claims, and we align project controls to the actual
            delivery model in use.
          </p>
        </div>
      </div>

    </div>
  );
}
