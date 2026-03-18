import { heroWorkflowNodes } from '@/data/landing';

export function HeroWorkflow() {
  return (
    <div className="hero-workflow-shell" aria-hidden="true">
      <div className="hero-workflow">
        <div className="hero-workflow-header">
          <span className="hero-workflow-kicker">Operational Flow</span>
          <span className="hero-workflow-status">Live system shape</span>
        </div>
        <div className="hero-workflow-map">
          <div className="hero-workflow-column hero-workflow-column-left">
            <span className="hero-workflow-column-label">Inputs</span>
            {heroWorkflowNodes
              .filter((node) => node.variant === 'source')
              .map((node) => (
                <div
                  key={node.key}
                  className={`hero-workflow-node hero-workflow-node-${node.variant} hero-workflow-node-${node.key}`}
                >
                  <span className="hero-workflow-node-dot" />
                  <span className="hero-workflow-node-label">{node.label}</span>
                </div>
              ))}
          </div>
          <div className="hero-workflow-core-lane">
            <span className="hero-workflow-arrow" />
            <div className="hero-workflow-node hero-workflow-node-core hero-workflow-node-core-terreaux">
              <span className="hero-workflow-node-dot" />
              <span className="hero-workflow-node-label">Terreaux Core</span>
            </div>
            <span className="hero-workflow-arrow" />
          </div>
          <div className="hero-workflow-column hero-workflow-column-right">
            <span className="hero-workflow-column-label">Outcomes</span>
            {heroWorkflowNodes
              .filter((node) => node.variant === 'outcome')
              .map((node) => (
                <div
                  key={node.key}
                  className={`hero-workflow-node hero-workflow-node-${node.variant} hero-workflow-node-${node.key}`}
                >
                  <span className="hero-workflow-node-dot" />
                  <span className="hero-workflow-node-label">{node.label}</span>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
