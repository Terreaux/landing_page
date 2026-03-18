import { type CSSProperties } from 'react';

import {
  blueprintMeshes,
  blueprintPathsByVariant,
  manifoldLayers,
  meshLines
} from '@/data/landing';

export function LandingDecorations() {
  return (
    <>
      <div className="page-blueprint-guides" aria-hidden="true">
        <span className="blueprint-guide blueprint-guide-left" />
        <span className="blueprint-guide blueprint-guide-right" />
      </div>
      <div className="parallax-field" aria-hidden="true">
        {manifoldLayers.map((layer, index) => (
          <span
            key={`manifold-${index}`}
            className="parallax-manifold"
            style={
              {
                '--x': layer.x,
                '--y': layer.y,
                '--width': layer.width,
                '--height': layer.height,
                '--speed': `${layer.speed}`,
                '--rotate': layer.rotate,
                '--opacity': `${layer.opacity}`
              } as CSSProperties
            }
          />
        ))}
        {blueprintMeshes.map((mesh, index) => (
          <span
            key={`blueprint-mesh-${index}`}
            className="blueprint-mesh"
            style={
              {
                '--x': mesh.x,
                '--y': mesh.y,
                '--width': mesh.width,
                '--height': mesh.height,
                '--speed': `${mesh.speed}`,
                '--rotate': mesh.rotate,
                '--opacity': `${mesh.opacity}`,
                '--delay': mesh.delay
              } as CSSProperties
            }
          >
            <svg viewBox="0 0 520 340" preserveAspectRatio="none" aria-hidden="true">
              {(blueprintPathsByVariant[mesh.variant] ?? blueprintPathsByVariant.arch).map((shape, shapeIndex) => (
                <path key={`shape-${shapeIndex}`} className={shape.className} d={shape.d} />
              ))}
            </svg>
          </span>
        ))}
      </div>
    </>
  );
}
