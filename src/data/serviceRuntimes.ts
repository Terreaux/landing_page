export type HeroThoughtIconKey =
  | 'bot'
  | 'brainCircuit'
  | 'calendarDays'
  | 'camera'
  | 'cpu'
  | 'database'
  | 'eye'
  | 'fileText'
  | 'gitBranch'
  | 'messageSquare'
  | 'search'
  | 'shieldCheck'
  | 'workflow';

export interface HeroThoughtScenarioStep {
  icon: HeroThoughtIconKey;
  label: string;
}

export interface HeroThoughtScenario {
  id: string;
  label: string;
  prompt: string;
  resultLabel: string;
  response: string;
  chips?: string[];
  inventoryCards?: Array<{
    id: string;
    title: string;
    imageAlt: string;
    imageSrc: string;
    sku: string;
    available: string;
    inbound: string;
    location: string;
    statusLabel: string;
    statusTone?: 'ready' | 'watch' | 'risk';
    isComparisonFocus?: boolean;
  }>;
  steps: HeroThoughtScenarioStep[];
}

export const heroThoughtScenarios: HeroThoughtScenario[] = [
  {
    id: 'inventory-allocation',
    label: 'Supply Chain Agent',
    prompt:
      'Can we fulfill the Friday wholesale order on time using current inventory, inbound containers, and warehouse labor on hand?',
    resultLabel: 'Decision brief',
    response:
      'The agent would reserve in-stock pallets, pull the container arriving Thursday into the plan, and flag that one outbound shift needs two more pickers to hold the ship date.',
    chips: ['ERP inventory', 'Inbound ETA', 'Labor coverage'],
    inventoryCards: [
      {
        id: 'sensor-pallets',
        title: 'Sensor pallets',
        imageAlt: 'Stacked industrial sensor pallets',
        imageSrc: '/inventory-sensor-pallet.svg',
        sku: 'WS-2401',
        available: '128 units',
        inbound: '+64 Thu',
        location: 'Aisle B4',
        statusLabel: 'Ready now',
        statusTone: 'ready'
      },
      {
        id: 'actuator-kits',
        title: 'Actuator kits',
        imageAlt: 'Crated actuator kits arranged in a warehouse',
        imageSrc: '/inventory-actuator-kits.svg',
        sku: 'AK-118',
        available: '42 units',
        inbound: '+12 Thu',
        location: 'Aisle C2',
        statusLabel: 'Inbound Thu',
        statusTone: 'watch',
        isComparisonFocus: true
      },
      {
        id: 'control-housings',
        title: 'Control housings',
        imageAlt: 'Metal control housings prepared for shipment',
        imageSrc: '/inventory-control-housings.svg',
        sku: 'CH-77',
        available: '26 units',
        inbound: '+18 Thu',
        location: 'Aisle D1',
        statusLabel: 'Tight stock',
        statusTone: 'risk'
      }
    ],
    steps: [
      { icon: 'search', label: 'Read the fulfillment question and target ship window.' },
      { icon: 'database', label: 'Check live inventory, open transfers, and inbound receipts.' },
      { icon: 'workflow', label: 'Compare warehouse capacity against the required pick-pack load.' },
      { icon: 'shieldCheck', label: 'Return a recommendation with the operational constraint called out.' }
    ]
  },
  {
    id: 'replenishment-decision',
    label: 'Supply Chain Agent',
    prompt:
      'Which SKUs need replenishment this week once we factor sell-through, safety stock, and the next warehouse replenishment run?',
    resultLabel: 'Replenishment call',
    response:
      'The agent prioritizes the fast-moving SKUs that will breach safety stock in four days, defers the low-risk items already covered by inbound inventory, and stages the transfer list for ops review.',
    chips: ['Sell-through', 'Safety stock', 'Transfer queue'],
    steps: [
      { icon: 'bot', label: 'Limit the agent to replenishment planning for this lane.' },
      { icon: 'brainCircuit', label: 'Forecast near-term demand from current order velocity.' },
      { icon: 'gitBranch', label: 'Branch any borderline SKU into human review instead of auto-committing.' },
      { icon: 'shieldCheck', label: 'Write the transfer recommendation with assumptions and risk notes.' }
    ]
  },
  {
    id: 'dock-priority',
    label: 'Supply Chain Agent',
    prompt:
      'A carrier delay just hit the west dock. Which outbound orders should the warehouse reprioritize first to protect service levels?',
    resultLabel: 'Priority plan',
    response:
      'The agent moves the high-penalty retailer orders to the east dock, keeps the local shipments on the current lane, and marks two low-margin transfers as safe to slip by one day.',
    chips: ['Carrier ETA', 'Dock capacity', 'Order penalties'],
    steps: [
      { icon: 'camera', label: 'Pull the latest dock, carrier, and queue signals.' },
      { icon: 'eye', label: 'Review which orders are closest to service-level risk.' },
      { icon: 'cpu', label: 'Model the warehouse impact of each reroute option.' },
      { icon: 'fileText', label: 'Summarize the reprioritization plan for the floor lead.' }
    ]
  }
];

export interface VisionDetectionRegion {
  id: string;
  label: string;
  tone?: 'default' | 'risk';
  x: string;
  y: string;
  width: string;
  height: string;
}

export interface ConstructionVisionScenario {
  id: string;
  label: string;
  imageSrc: string;
  imageAlt: string;
  resultLabel: string;
  decision: string;
  chips: string[];
  handoffMode: 'message' | 'database';
  handoffLabel: string;
  handoffTarget: string;
  handoffText: string;
  handoffIcon: Extract<HeroThoughtIconKey, 'database' | 'messageSquare'>;
  handoffReplySender?: string;
  handoffReplyText?: string;
  handoffRows?: Array<{
    field: string;
    previous: string;
    next: string;
  }>;
  focusDetectionId: string;
  detections: VisionDetectionRegion[];
  steps: HeroThoughtScenarioStep[];
}

export const constructionVisionScenarios: ConstructionVisionScenario[] = [
  {
    id: 'roof-deck-edge-control',
    label: 'Roof deck edge control',
    imageSrc: '/construction-site.png',
    imageAlt: 'Construction crew working on a rooftop slab',
    resultLabel: 'Supervisor action',
    decision:
      'Message the scheduled roof supervisor to hold the material-handling activity at the scaffold edge until the staging zone is cleared and the near-edge worker is reset into a safer lane.',
    chips: ['Shift schedule', 'Supervisor contact', 'Suggested message'],
    handoffMode: 'message',
    handoffLabel: 'Agent message',
    handoffTarget: 'Jordan Alvarez | Channel 4 | ext. 214',
    handoffText:
      'Jordan, hold the scaffold-edge material move. Clear the staging zone and reset the near-edge worker into the interior lane before restart. Reply once the deck is clear.',
    handoffIcon: 'messageSquare',
    handoffReplySender: 'Jordan Alvarez',
    handoffReplyText: 'All clear',
    focusDetectionId: 'staging-edge',
    detections: [
      {
        id: 'top-crew',
        label: 'Crew cluster',
        x: '29%',
        y: '23%',
        width: '26%',
        height: '14%'
      },
      {
        id: 'center-crew',
        label: 'Active rebar work',
        x: '18%',
        y: '37%',
        width: '43%',
        height: '39%'
      },
      {
        id: 'staging-edge',
        label: 'Staging near edge',
        tone: 'risk',
        x: '72%',
        y: '23%',
        width: '23%',
        height: '38%'
      },
      {
        id: 'edge-access',
        label: 'Worker near edge',
        tone: 'risk',
        x: '67%',
        y: '49%',
        width: '18%',
        height: '24%'
      }
    ],
    steps: [
      { icon: 'camera', label: 'Lock detections across the crew, edge access, and staging area.' },
      { icon: 'eye', label: 'Check which workers and materials sit closest to the open access edge.' },
      { icon: 'cpu', label: 'Rank the immediate site risk from congestion and edge proximity.' },
      { icon: 'calendarDays', label: "Check today's site schedule for the supervisor assigned to this roof deck." },
      { icon: 'search', label: "Pull the assigned supervisor's contact information from the site roster." },
      { icon: 'messageSquare', label: 'Draft the recommended hold message and handoff note for the supervisor.' }
    ]
  },
  {
    id: 'ladder-ppe-compliance',
    label: 'Ladder PPE compliance',
    imageSrc: '/construction-equipment.png',
    imageAlt: 'Construction worker climbing a ladder beside an elevated deck',
    resultLabel: 'Inventory update',
    decision:
      'Mark one harness as active on this ladder-access route and decrement the available harness count for the deck inventory because the worker is already tied off and the OSHA ladder-access check passed.',
    chips: ['PPE confirmed', 'OSHA 1926.1053', 'Harness inventory'],
    handoffMode: 'database',
    handoffLabel: 'Database update',
    handoffTarget: 'Safety gear inventory',
    handoffText:
      '> inventory.update("roof_deck_b_harnesses").set({ available_harnesses: 17, active_in_use: 1 })',
    handoffIcon: 'database',
    handoffRows: [
      { field: 'available_harnesses', previous: '18', next: '17' },
      { field: 'active_in_use', previous: '0', next: '1' },
      { field: 'ladder_access_route', previous: 'unassigned', next: 'east_wall_access' },
      { field: 'compliance_sync', previous: 'pending', next: 'logged' }
    ],
    focusDetectionId: 'ladder-access',
    detections: [
      {
        id: 'climbing-worker',
        label: 'Climbing worker',
        x: '62%',
        y: '14%',
        width: '24%',
        height: '60%'
      },
      {
        id: 'visible-ppe',
        label: 'Hard hat + hi-vis',
        x: '65%',
        y: '16%',
        width: '16%',
        height: '30%'
      },
      {
        id: 'harness-check',
        label: 'Harness system',
        x: '63%',
        y: '26%',
        width: '17%',
        height: '28%'
      },
      {
        id: 'ladder-access',
        label: 'Ladder access',
        tone: 'risk',
        x: '72%',
        y: '2%',
        width: '18%',
        height: '94%'
      }
    ],
    steps: [
      { icon: 'camera', label: 'Lock detections on the ladder climber, PPE, harness, and access route.' },
      { icon: 'eye', label: 'Confirm the worker shows visible hard hat, hi-vis, gloves, and full-body harness.' },
      {
        icon: 'fileText',
        label: 'Check ladder access and fall protection requirements against OSHA 1926.1053 and site policy.'
      },
      { icon: 'cpu', label: 'Confirm the route remains compliant and no supervisor intervention is required.' },
      { icon: 'search', label: 'Read the current harness inventory assigned to this deck and access lane.' },
      { icon: 'database', label: 'Write back the updated available harness count and active-use status.' }
    ]
  }
];
