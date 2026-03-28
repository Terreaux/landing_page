export interface ServiceHighlight {
  label: string;
  desc: string;
}

export interface ServiceShowcaseItem {
  kicker: string;
  title: string;
  desc: string;
}

export interface ServiceStep {
  step: string;
  title: string;
  desc: string;
}

export interface ServiceCapability {
  title: string;
  desc: string;
}

export interface ServiceOutcome {
  title: string;
  desc: string;
}

export interface ServicePageData {
  slug: string;
  title: string;
  copy: string;
  metaDescription: string;
  heroTitle: string;
  heroParagraphs: string[];
  highlights: ServiceHighlight[];
  useCasesLead: string;
  useCases: ServiceShowcaseItem[];
  deliveryModelLead: string;
  deliverySteps: ServiceStep[];
  systemComponentsLead: string;
  systemComponents: ServiceCapability[];
  operatingRequirementsLead: string;
  operatingRequirementsParagraphs: string[];
  operatingRequirements: string[];
  outcomesLead: string;
  outcomes: ServiceOutcome[];
  ctaTitle: string;
  ctaCopy: string;
}

export const servicePages: ServicePageData[] = [
  {
    slug: 'applied-ai-systems',
    title: 'Applied AI Systems',
    copy:
      'AI products aligned to business goals, technical constraints, and the operating reality of the teams using them.',
    metaDescription:
      'Applied AI systems by Terreaux: decision support, copilots, document intelligence, and production-ready workflows built around real operations.',
    heroTitle: 'Applied AI systems that fit the way your teams actually work',
    heroParagraphs: [
      'We design and deliver AI products that support real operating workflows, not generic demos. That means grounding models in the right data, shaping the product surface around the user, and adding the controls needed for production use.',
      'These engagements often combine retrieval, model routing, business logic, human review, and system integration into one coherent product that can be owned and extended over time.'
    ],
    highlights: [
      {
        label: 'Decision support',
        desc: 'Prioritization, recommendations, and scoring embedded into the work itself.'
      },
      {
        label: 'Copilot surfaces',
        desc: 'Operator-facing tools that speed up review, drafting, routing, and follow-up.'
      },
      {
        label: 'Document intelligence',
        desc: 'Extraction, structuring, and reasoning across records, manuals, forms, and cases.'
      },
      {
        label: 'Human review loops',
        desc: 'Approval paths, exception queues, and audit visibility for sensitive decisions.'
      }
    ],
    useCasesLead:
      'The strongest applied AI systems are anchored to a business workflow with a clear user, clear latency expectations, and clear ownership.',
    useCases: [
      {
        kicker: 'Internal operations',
        title: 'Operator copilots',
        desc: 'Assist internal teams with drafting, case review, escalation support, and next-best-action recommendations inside the systems they already use.'
      },
      {
        kicker: 'Knowledge workflows',
        title: 'Document and record intelligence',
        desc: 'Extract structure, summarize complex material, and connect source records into searchable, decision-ready workflows.'
      },
      {
        kicker: 'Business systems',
        title: 'Decision support products',
        desc: 'Combine business rules, historical context, and model outputs to guide prioritization, approvals, and resource allocation.'
      }
    ],
    deliveryModelLead:
      'Applied AI delivery usually starts with workflow clarity, then moves into product integration and operational hardening.',
    deliverySteps: [
      {
        step: '01',
        title: 'Map the operating workflow',
        desc: 'Define the task, the user, the source systems, the review path, and the cost of acceptable and unacceptable errors.'
      },
      {
        step: '02',
        title: 'Build the product surface',
        desc: 'Connect models, retrieval, business logic, APIs, and UI into the actual touchpoint where the work happens.'
      },
      {
        step: '03',
        title: 'Operationalize performance',
        desc: 'Add evaluation, feedback loops, logging, and rollout controls so the system can be measured and trusted in production.'
      }
    ],
    systemComponentsLead:
      'Most applied AI products require more than a model call. They need the surrounding system that makes the model useful and governable.',
    systemComponents: [
      {
        title: 'Product and API integration',
        desc: 'Embed AI behavior into internal tools, customer-facing products, and existing service layers.'
      },
      {
        title: 'Retrieval and context assembly',
        desc: 'Ground responses and recommendations in the right records, documents, and operational state.'
      },
      {
        title: 'Review and exception handling',
        desc: 'Route ambiguous cases to humans with enough context to resolve them quickly.'
      },
      {
        title: 'Instrumentation and control',
        desc: 'Track quality, cost, latency, and decision outcomes as part of the delivery surface.'
      }
    ],
    operatingRequirementsLead:
      'Production AI systems depend on operational boundaries, not just model quality.',
    operatingRequirementsParagraphs: [
      'Before build work starts, we usually define which systems are authoritative, where approvals belong, what the latency envelope looks like, and how much automation the workflow can safely absorb.',
      'That operating model determines data contracts, evaluation strategy, UI behavior, and the right handoff between model output and human action.'
    ],
    operatingRequirements: [
      'Connect the system to the actual source of truth instead of a sidecar export.',
      'Define acceptable failure modes and escalation paths early.',
      'Add human review where the workflow carries real financial or operational consequences.',
      'Measure quality against task-level outcomes rather than generic benchmark scores.'
    ],
    outcomesLead:
      'The goal is not novelty. It is a system that makes a real process faster, clearer, and easier to operate.',
    outcomes: [
      {
        title: 'Higher operator throughput',
        desc: 'Reduce manual synthesis, lookup, and drafting time across complex workflows.'
      },
      {
        title: 'More consistent decisions',
        desc: 'Standardize how teams apply guidance, evidence, and business rules under load.'
      },
      {
        title: 'Production-ready ownership',
        desc: 'Ship with enough visibility, controls, and runbooks for the system to be maintained responsibly.'
      }
    ],
    ctaTitle: 'Plan an applied AI engagement',
    ctaCopy:
      'We can scope product surfaces, workflow constraints, system architecture, and rollout paths for an applied AI system that needs to work in production.'
  },
  {
    slug: 'agentic-systems',
    title: 'Agentic Systems',
    copy:
      'Autonomous and human-supervised workflows coordinating tools, context, decisions, and execution in production.',
    metaDescription:
      'Agentic systems by Terreaux: tool-using agents, orchestration, approvals, observability, and production workflows built for bounded execution.',
    heroTitle: 'Agentic systems that can reason, call tools, and complete bounded work',
    heroParagraphs: [
      'We build agentic workflows for tasks that span multiple systems, require intermediate decisions, and benefit from structured execution instead of one-shot prompting.',
      'These systems work best when task boundaries are explicit, tool permissions are controlled, and human oversight is built into the runtime instead of bolted on afterward.'
    ],
    highlights: [
      {
        label: 'Tool orchestration',
        desc: 'Agents that use APIs, internal systems, search, and structured actions to move work forward.'
      },
      {
        label: 'Multi-step execution',
        desc: 'Planning, branching, retries, and stateful progression across a bounded workflow.'
      },
      {
        label: 'Supervisor patterns',
        desc: 'Human approvals, escalation points, and layered control over consequential actions.'
      },
      {
        label: 'Auditable actions',
        desc: 'Execution traces, action logs, and review visibility around what the agent did and why.'
      }
    ],
    useCasesLead:
      'Good agentic systems are designed around a constrained lane of work with clear tools, clear completion criteria, and clear fallback behavior.',
    useCases: [
      {
        kicker: 'Research and triage',
        title: 'Investigation agents',
        desc: 'Gather context across documents, systems, and APIs, then synthesize findings into a structured next action for a human or downstream system.'
      },
      {
        kicker: 'Operations execution',
        title: 'Case-handling workflows',
        desc: 'Coordinate retrieval, drafting, routing, updates, and approvals across multi-step service or back-office processes.'
      },
      {
        kicker: 'Internal automation',
        title: 'Tool-using process agents',
        desc: 'Handle repetitive work that requires looking things up, calling systems, and maintaining state across the run.'
      }
    ],
    deliveryModelLead:
      'Agentic delivery is usually about reducing ambiguity, tightening execution boundaries, and making the runtime observable.',
    deliverySteps: [
      {
        step: '01',
        title: 'Define the lane of work',
        desc: 'Specify the task boundary, available tools, termination conditions, and the actions that always require approval.'
      },
      {
        step: '02',
        title: 'Implement the runtime',
        desc: 'Build the orchestration layer, memory model, tool wrappers, retries, and handoff logic around the workflow.'
      },
      {
        step: '03',
        title: 'Add production controls',
        desc: 'Instrument tracing, action review, guardrails, and failure handling so the workflow can run safely at scale.'
      }
    ],
    systemComponentsLead:
      'A reliable agent is a runtime system, not just a prompt. The surrounding execution model usually determines whether the workflow is usable in practice.',
    systemComponents: [
      {
        title: 'Orchestration runtime',
        desc: 'State transitions, branching logic, retries, and structured execution around the task.'
      },
      {
        title: 'Tool contracts and permissions',
        desc: 'Safe interfaces to the systems the agent can read from, write to, or trigger.'
      },
      {
        title: 'Memory and context state',
        desc: 'Persistent task context, working memory, and decision history as the run unfolds.'
      },
      {
        title: 'Approval and supervision layers',
        desc: 'Human checkpoints for high-risk actions, exception cases, or low-confidence decisions.'
      }
    ],
    operatingRequirementsLead:
      'Agentic systems need stronger operational discipline than simple generation features because they act, not just answer.',
    operatingRequirementsParagraphs: [
      'We usually establish where the agent is allowed to read, what it is allowed to do, how it recovers from partial failure, and what a complete run looks like before implementation begins.',
      'That design work tends to matter more than model cleverness once the system is attached to production tools and real business processes.'
    ],
    operatingRequirements: [
      'Constrain the workflow to a bounded task with a clear completion signal.',
      'Make tool calls idempotent or reversible wherever possible.',
      'Require explicit approvals for actions with financial, security, or customer impact.',
      'Trace reasoning, actions, and outcomes so failures can be diagnosed and improved.'
    ],
    outcomesLead:
      'The target outcome is durable workflow automation with visibility, not a black-box agent that nobody wants to trust.',
    outcomes: [
      {
        title: 'Less swivel-chair work',
        desc: 'Reduce the manual coordination overhead between systems, people, and repeated decision points.'
      },
      {
        title: 'Faster cycle times',
        desc: 'Shorten the time between intake, analysis, action, and completion for bounded workflows.'
      },
      {
        title: 'More controllable automation',
        desc: 'Keep humans in the loop where needed while still moving repetitive work out of the critical path.'
      }
    ],
    ctaTitle: 'Scope an agentic workflow',
    ctaCopy:
      'We can help define the workflow boundary, runtime design, tool permissions, and supervision model for an agentic system that needs to hold up in production.'
  },
  {
    slug: 'computer-vision',
    title: 'Computer Vision',
    copy:
      'Vision systems for inspection, perception, and automation with production-ready data and model pipelines.',
    metaDescription:
      'Computer vision by Terreaux: object detection in video, mobile-device inspection flows, edge and cloud deployment, and production data pipelines.',
    heroTitle: 'Computer vision systems for video, mobile capture, and real-world operations',
    heroParagraphs: [
      'We build vision systems that have to work outside the lab: across live or recorded video, field capture on mobile devices, changing lighting conditions, and real deployment constraints.',
      'That usually means treating data pipelines, labeling quality, model evaluation, device constraints, and downstream integration as part of one delivery problem instead of separate projects.'
    ],
    highlights: [
      {
        label: 'Video detection',
        desc: 'Object detection, tracking, and event logic across live feeds or recorded footage.'
      },
      {
        label: 'Mobile-device workflows',
        desc: 'Capture and inspect images from phones or tablets with on-device or hybrid inference.'
      },
      {
        label: 'Edge and cloud deployment',
        desc: 'Choose the right serving path for latency, connectivity, hardware, and cost.'
      },
      {
        label: 'Data and evaluation pipelines',
        desc: 'Labeling, QA, regression testing, and production monitoring around model behavior.'
      }
    ],
    useCasesLead:
      'Vision systems are strongest when they are tied to a decision, an alert, or an automation path rather than a standalone model benchmark.',
    useCases: [
      {
        kicker: 'Video analytics',
        title: 'Object detection in operational video',
        desc: 'Detect vehicles, equipment, PPE, defects, inventory, or site events across camera feeds with thresholds, alerting, and review workflows.'
      },
      {
        kicker: 'Field inspection',
        title: 'Mobile-device capture and inspection',
        desc: 'Use phones or tablets to capture images in the field, run on-device or hybrid inference, and return structured guidance to the operator.'
      },
      {
        kicker: 'Automation systems',
        title: 'Perception for quality and control',
        desc: 'Connect classification, localization, and scene understanding to QA workflows, robotics, or downstream business logic.'
      }
    ],
    deliveryModelLead:
      'Computer vision delivery usually starts with acquisition conditions and labeling strategy, then moves through model training and deployment constraints together.',
    deliverySteps: [
      {
        step: '01',
        title: 'Define the visual operating envelope',
        desc: 'Map cameras, devices, motion, scene variation, environmental conditions, and the decisions the model needs to support.'
      },
      {
        step: '02',
        title: 'Build the data and model pipeline',
        desc: 'Establish collection, labeling, training, evaluation, and regression workflows around the target task.'
      },
      {
        step: '03',
        title: 'Deploy into the real workflow',
        desc: 'Integrate inference with video systems, mobile apps, edge hardware, alerts, review queues, and monitoring.'
      }
    ],
    systemComponentsLead:
      'Production vision systems often fail on data coverage or deployment fit before they fail on architecture. The surrounding pipeline matters as much as the model choice.',
    systemComponents: [
      {
        title: 'Data acquisition and labeling',
        desc: 'Capture representative imagery, define annotation standards, and maintain dataset quality as conditions change.'
      },
      {
        title: 'Model training and evaluation',
        desc: 'Train for the actual task and validate against scene variation, precision-recall tradeoffs, and failure modes that matter operationally.'
      },
      {
        title: 'Mobile and edge inference',
        desc: 'Optimize for device constraints, connectivity limits, thermal budgets, and local responsiveness.'
      },
      {
        title: 'Workflow integration',
        desc: 'Push detections into alerts, review tooling, dashboards, automation layers, or business systems that can act on them.'
      }
    ],
    operatingRequirementsLead:
      'Vision performance is inseparable from the acquisition environment, the hardware path, and the downstream action the system is supposed to drive.',
    operatingRequirementsParagraphs: [
      'We usually define how much scene variation the system needs to absorb, whether inference happens on-device, at the edge, or in the cloud, and what review process exists for borderline cases.',
      'Those decisions shape everything from annotation standards and model architecture to deployment packaging and monitoring.'
    ],
    operatingRequirements: [
      'Collect data that reflects real lighting, angle, motion, and device variability.',
      'Choose the serving path based on latency, bandwidth, and hardware constraints.',
      'Add review workflows for uncertain detections or business-critical decisions.',
      'Track model performance after deployment as the environment and inputs change.'
    ],
    outcomesLead:
      'The point of the system is operational lift: better inspection coverage, faster response, clearer QA signals, and workflows teams can actually run.',
    outcomes: [
      {
        title: 'Fewer missed events',
        desc: 'Increase coverage across video and image streams that humans cannot monitor consistently at scale.'
      },
      {
        title: 'Better field and QA workflows',
        desc: 'Give operators structured signals and mobile tools that help them act faster on what the model sees.'
      },
      {
        title: 'Deployment-ready perception',
        desc: 'Ship with the data, packaging, instrumentation, and runbooks needed for sustained operation.'
      }
    ],
    ctaTitle: 'Discuss a computer vision deployment',
    ctaCopy:
      'We can scope data collection, mobile or edge constraints, model evaluation, and the downstream workflow for a vision system that needs to operate in the real world.'
  },
  {
    slug: 'ai-platform-ops',
    title: 'AI Platform Ops (MLOps + LLMOps)',
    copy:
      'Operational foundations for training, deployment, evaluation, monitoring, and governance across ML and LLM systems.',
    metaDescription:
      'AI platform ops by Terreaux: model and prompt deployment pipelines, evaluation, observability, release controls, and governance for ML and LLM systems.',
    heroTitle: 'Platform foundations for shipping, evaluating, and governing AI systems',
    heroParagraphs: [
      'We help teams build the operational layer around ML and LLM systems so releases are reproducible, observable, and easier to manage over time.',
      'This work often spans evaluation pipelines, model and prompt versioning, release controls, monitoring, feedback loops, and the runbooks required for an internal team to own the platform confidently.'
    ],
    highlights: [
      {
        label: 'Evaluation pipelines',
        desc: 'Dataset-driven checks and regression suites for models, prompts, and end-to-end workflows.'
      },
      {
        label: 'Release controls',
        desc: 'Promotion gates, rollback paths, and repeatable deployment workflows across environments.'
      },
      {
        label: 'Observability',
        desc: 'Tracing, quality monitoring, latency and cost visibility, and drift detection.'
      },
      {
        label: 'Governance',
        desc: 'Versioning, ownership, approval boundaries, and policy-aware operating practices.'
      }
    ],
    useCasesLead:
      'AI platform work is about making the system operable by a team over time, not just making the first release succeed.',
    useCases: [
      {
        kicker: 'LLM delivery',
        title: 'Prompt and model release pipelines',
        desc: 'Version prompts, model configs, datasets, and evaluation suites so changes can be promoted with confidence.'
      },
      {
        kicker: 'ML systems',
        title: 'Training and deployment operations',
        desc: 'Support reproducible training, artifact management, deployment workflows, and rollback for model-backed products.'
      },
      {
        kicker: 'Platform governance',
        title: 'Monitoring and feedback loops',
        desc: 'Trace system behavior in production, collect structured feedback, and connect regressions back to concrete releases.'
      }
    ],
    deliveryModelLead:
      'Platform ops work usually starts with the current delivery path, then replaces ad hoc release habits with repeatable systems and explicit ownership.',
    deliverySteps: [
      {
        step: '01',
        title: 'Baseline the operating model',
        desc: 'Map environments, artifacts, datasets, owners, release paths, and the current sources of fragility.'
      },
      {
        step: '02',
        title: 'Automate promotion and evaluation',
        desc: 'Add evaluation suites, deployment pipelines, and release gates around prompts, models, and services.'
      },
      {
        step: '03',
        title: 'Operationalize monitoring and governance',
        desc: 'Establish traces, dashboards, incident visibility, version policies, and handoff documentation for ongoing ownership.'
      }
    ],
    systemComponentsLead:
      'The platform layer ties model development to production operations. Without it, teams end up shipping changes they cannot easily reproduce or explain.',
    systemComponents: [
      {
        title: 'Experiment and artifact tracking',
        desc: 'Version datasets, prompts, model artifacts, configs, and outputs so changes are attributable.'
      },
      {
        title: 'Deployment and promotion workflows',
        desc: 'Move changes across environments with explicit gates, rollback paths, and release discipline.'
      },
      {
        title: 'Tracing and quality monitoring',
        desc: 'Observe runtime behavior, latency, cost, usage patterns, and task-level quality after launch.'
      },
      {
        title: 'Governance and ownership',
        desc: 'Define who can change what, how releases are approved, and where operational accountability lives.'
      }
    ],
    operatingRequirementsLead:
      'Platform ops work is primarily about repeatability, visibility, and control across a moving AI stack.',
    operatingRequirementsParagraphs: [
      'We typically establish what should be versioned, what should be tested before release, how incidents get diagnosed, and what signals indicate that a model or prompt change is safe to promote.',
      'The exact implementation depends on the maturity of the existing stack, but the target is the same: fewer opaque releases and faster, safer iteration.'
    ],
    operatingRequirements: [
      'Version the assets that actually affect production behavior, not just the application code.',
      'Evaluate changes against realistic datasets and task-level success criteria before promotion.',
      'Make rollback and incident response part of the delivery path from the start.',
      'Assign clear ownership for data, prompts, models, infrastructure, and review policy.'
    ],
    outcomesLead:
      'A strong AI platform layer makes delivery faster precisely because it makes change safer and easier to understand.',
    outcomes: [
      {
        title: 'Safer releases',
        desc: 'Catch regressions earlier and reduce the operational risk of model and prompt changes.'
      },
      {
        title: 'Faster iteration',
        desc: 'Give teams repeatable workflows for experimenting, evaluating, and promoting improvements.'
      },
      {
        title: 'Clearer operational ownership',
        desc: 'Make it easier for an internal team to run the system, debug issues, and extend the platform over time.'
      }
    ],
    ctaTitle: 'Strengthen your AI platform operations',
    ctaCopy:
      'We can help define the release workflow, evaluation strategy, observability layer, and governance model for AI systems your team needs to maintain over time.'
  }
];

export const serviceCards = servicePages.map(({ slug, title, copy }) => ({
  slug,
  title,
  copy
}));

export function getServiceHref(rootPath: string, slug: string) {
  const base = (rootPath || '/').replace(/\/$/, '') || '/';
  const homeHref = base === '/' ? '/' : `${base}/`;
  return `${homeHref}services/${slug}/`;
}
