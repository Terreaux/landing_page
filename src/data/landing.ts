export const serviceCards = [
  {
    title: 'Applied AI Systems',
    copy: 'Design and implementation of AI products mapped to business constraints and operational realities.'
  },
  {
    title: 'Agentic Systems',
    copy: 'Design and deployment of autonomous AI workflows that coordinate tools, data, and decisions in production.'
  },
  {
    title: 'Computer Vision',
    copy: 'Vision systems for inspection, perception, and automation with production-ready data and model pipelines.'
  },
  {
    title: 'AI Platform Ops (MLOps + LLMOps)',
    copy: 'Unified platform operations for model training, deployment, evaluation, monitoring, governance, and continuous iteration.'
  }
];

export const timelineItems = [
  {
    step: '01',
    title: 'Frame the opportunity',
    copy: 'We align outcomes, constraints, and success metrics before implementation starts.'
  },
  {
    step: '02',
    title: 'Build in production shape',
    copy: 'Data, modeling, infrastructure, and product interfaces are implemented as one coherent system.'
  },
  {
    step: '03',
    title: 'Stabilize and transfer',
    copy: 'We establish runbooks, metrics, and ownership workflows so your team can scale confidently.'
  }
];

export const heroWorkflowNodes = [
  { key: 'source-data', label: 'Data', variant: 'source', x: '14%', y: '20%' },
  { key: 'source-systems', label: 'Systems', variant: 'source', x: '12%', y: '50%' },
  { key: 'source-teams', label: 'Teams', variant: 'source', x: '16%', y: '80%' },
  { key: 'core-terreaux', label: 'Terreaux', variant: 'core', x: '50%', y: '50%' },
  { key: 'outcome-ai', label: 'AI Systems', variant: 'outcome', x: '84%', y: '22%' },
  { key: 'outcome-workflows', label: 'Agentic Ops', variant: 'outcome', x: '88%', y: '50%' },
  { key: 'outcome-vision', label: 'Vision Ops', variant: 'outcome', x: '82%', y: '78%' }
] as const;

export const heroWorkflowLinks = [
  { key: 'link-data', x1: 18, y1: 22, x2: 44, y2: 43 },
  { key: 'link-systems', x1: 17, y1: 50, x2: 42, y2: 50 },
  { key: 'link-teams', x1: 20, y1: 78, x2: 44, y2: 57 },
  { key: 'link-ai', x1: 56, y1: 44, x2: 79, y2: 24 },
  { key: 'link-workflows', x1: 58, y1: 50, x2: 83, y2: 50 },
  { key: 'link-vision', x1: 56, y1: 56, x2: 77, y2: 76 }
] as const;

export const manifoldLayers = [
  { x: '-8%', y: '7%', width: '120%', height: '20rem', speed: 0.03, rotate: '-4deg', opacity: 0.26 },
  { x: '-3%', y: '19%', width: '114%', height: '16rem', speed: -0.04, rotate: '3deg', opacity: 0.2 },
  { x: '-10%', y: '34%', width: '126%', height: '18rem', speed: 0.05, rotate: '-2deg', opacity: 0.23 },
  { x: '-2%', y: '48%', width: '112%', height: '15rem', speed: -0.03, rotate: '2deg', opacity: 0.19 },
  { x: '-8%', y: '62%', width: '118%', height: '18rem', speed: 0.04, rotate: '-3deg', opacity: 0.22 },
  { x: '-4%', y: '77%', width: '116%', height: '17rem', speed: -0.05, rotate: '3deg', opacity: 0.2 }
];

export const blueprintMeshes = [
  { x: '62%', y: '6%', width: '24rem', height: '15rem', speed: -0.03, rotate: '-9deg', opacity: 0.3, delay: '-2.2s', variant: 'arch' },
  { x: '10%', y: '30%', width: '23rem', height: '14rem', speed: 0.04, rotate: '8deg', opacity: 0.26, delay: '-4.4s', variant: 'slab' },
  { x: '58%', y: '57%', width: '26rem', height: '16rem', speed: -0.05, rotate: '-7deg', opacity: 0.28, delay: '-1.6s', variant: 'vault' },
  { x: '6%', y: '74%', width: '25rem', height: '15rem', speed: 0.03, rotate: '9deg', opacity: 0.24, delay: '-3.7s', variant: 'frame' }
];

export const meshLines = Array.from({ length: 10 }, (_, index) => ({
  key: `lower-${index}`,
  d: 'M-120 620C150 410 340 740 568 596C772 468 980 704 1218 586C1452 466 1650 618 1960 554',
  offset: `${index * 18 - 48}px`,
  stroke: index % 5 === 0 ? '0.95' : '0.78',
  opacity: `${0.12 + (index % 3) * 0.03}`,
  phase: `${10 + (index % 6) * 3}px`,
  duration: `${24 + (index % 5) * 3}s`,
  delay: `${index * -0.7}s`
})).concat(
  Array.from({ length: 6 }, (_, index) => ({
    key: `upper-${index}`,
    d: 'M-100 418C148 232 350 526 574 422C790 322 996 520 1212 418C1434 320 1628 484 1944 428',
    offset: `${index * 16 - 34}px`,
    stroke: index % 4 === 0 ? '0.85' : '0.72',
    opacity: `${0.1 + (index % 2) * 0.03}`,
    phase: `${8 + (index % 5) * 2.5}px`,
    duration: `${20 + (index % 4) * 2.6}s`,
    delay: `${index * -0.9}s`
  }))
);

export const blueprintPathsByVariant: Record<string, Array<{ className: string; d: string }>> = {
  arch: [
    { className: 'blueprint-stroke blueprint-grid', d: 'M52 272L344 228L466 292L178 328Z' },
    { className: 'blueprint-stroke', d: 'M52 272L178 328M344 228L466 292M52 272L176 206L466 166L344 228Z' },
    { className: 'blueprint-stroke blueprint-thin', d: 'M88 267L214 323M124 262L250 318M160 257L286 313M196 252L322 308M232 247L358 303M268 242L394 298M304 237L430 293' },
    { className: 'blueprint-stroke blueprint-thin', d: 'M78 279L370 236M104 290L396 247M130 301L422 258M156 312L448 269' },
    { className: 'blueprint-stroke', d: 'M258 236A90 90 0 0 1 392 150A90 90 0 0 1 458 258' },
    { className: 'blueprint-stroke blueprint-thin', d: 'M272 230A72 72 0 0 1 378 166A72 72 0 0 1 442 252' },
    { className: 'blueprint-stroke blueprint-thin', d: 'M288 224A54 54 0 0 1 362 182A54 54 0 0 1 426 246' }
  ],
  slab: [
    { className: 'blueprint-stroke blueprint-grid', d: 'M70 264L330 218L452 282L196 322Z' },
    { className: 'blueprint-stroke', d: 'M70 264L196 322M330 218L452 282M70 264L198 192L452 154L330 218Z' },
    { className: 'blueprint-stroke blueprint-thin', d: 'M102 259L226 317M134 254L258 312M166 249L290 307M198 244L322 302M230 239L354 297M262 234L386 292' },
    { className: 'blueprint-stroke blueprint-thin', d: 'M92 275L352 229M118 286L378 240M144 297L404 251M170 308L430 262' },
    { className: 'blueprint-stroke', d: 'M132 196L132 112L388 74L388 158M170 191L170 107L426 69L426 153' },
    { className: 'blueprint-stroke blueprint-thin', d: 'M132 112L388 74M170 107L426 69' }
  ],
  vault: [
    { className: 'blueprint-stroke blueprint-grid', d: 'M58 274L340 232L468 292L182 330Z' },
    { className: 'blueprint-stroke', d: 'M58 274L182 330M340 232L468 292M58 274L182 202L468 160L340 232Z' },
    { className: 'blueprint-stroke blueprint-thin', d: 'M92 269L216 325M126 264L250 320M160 259L284 315M194 254L318 310M228 249L352 305M262 244L386 300M296 239L420 295' },
    { className: 'blueprint-stroke', d: 'M210 232A110 82 0 0 1 412 186A110 82 0 0 1 454 276' },
    { className: 'blueprint-stroke blueprint-thin', d: 'M230 228A88 66 0 0 1 394 192A88 66 0 0 1 436 270' },
    { className: 'blueprint-stroke blueprint-thin', d: 'M250 224A66 50 0 0 1 376 198A66 50 0 0 1 418 264' },
    { className: 'blueprint-stroke', d: 'M308 236L308 96M332 233L332 92M356 230L356 88' }
  ],
  frame: [
    { className: 'blueprint-stroke blueprint-grid', d: 'M72 278L332 228L450 290L190 334Z' },
    { className: 'blueprint-stroke', d: 'M72 278L190 334M332 228L450 290M72 278L194 206L450 166L332 228Z' },
    { className: 'blueprint-stroke blueprint-thin', d: 'M102 272L220 328M132 266L250 322M162 260L280 316M192 254L310 310M222 248L340 304M252 242L370 298' },
    { className: 'blueprint-stroke', d: 'M138 202L138 120L396 80L396 164M186 194L186 112L444 72L444 156' },
    { className: 'blueprint-stroke blueprint-thin', d: 'M138 120L396 80M186 112L444 72M138 202L396 164M186 194L444 156' },
    { className: 'blueprint-stroke', d: 'M286 232L286 96L312 92L312 228M312 228L370 220M286 232L344 224' }
  ]
};
