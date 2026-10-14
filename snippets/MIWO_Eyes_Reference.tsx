// Optional low-dependency, accessibility-aware sample. Render as inline SVG so pupils move separately.
// Original character sprite must take over in the subsequent full-body reveal.
import * as React from 'react';
type Props = { reducedMotion?: boolean; className?: string };
export function MIWOEyes({ reducedMotion = false, className = '' }: Props) {
  const [focus, setFocus] = React.useState({ x: 0, y: 0 });
  React.useEffect(() => {
    if (reducedMotion) return;
    const steps = [{x:-12,y:0},{x:13,y:2},{x:6,y:-13},{x:0,y:0}];
    let i = 0;
    const id = window.setInterval(() => { setFocus(steps[i++ % steps.length]); }, 480);
    return () => window.clearInterval(id);
  }, [reducedMotion]);
  return <svg className={className} viewBox="0 0 620 290" role="img" aria-label="MIWO glances around with curious wide eyes">
    <path d="M65 65 Q145 45 220 52 M350 41 Q441 26 524 62" stroke="#fff8e9" strokeWidth="8" fill="none" strokeLinecap="round" />
    <ellipse cx="175" cy="171" rx="105" ry="116" fill="#fff9e8" />
    <ellipse cx="427" cy="155" rx="115" ry="131" fill="#fff9e8" />
    <g style={{transform:`translate(${focus.x}px, ${focus.y}px)`,transition:'transform 200ms ease-out'}}>
      <circle cx="205" cy="165" r="22" fill="#181625" />
      <circle cx="470" cy="149" r="23" fill="#181625" />
    </g>
  </svg>;
}
