import { DISCLOSURE, RISK } from '../config/content.ts';
import { logoFull } from '../config/assets.ts';
import { tokenConfig } from '../config/token.ts';
import { buildTokenView } from '../lib/view.ts';
import { TextLink } from './TextLink.tsx';

export function Footer() {
  const view = buildTokenView();
  return (
    <footer className="site-footer">
      <div className="wrap footer-grid">
        <div>
          <img
            src={logoFull.png}
            width={logoFull.width}
            height={logoFull.height}
            alt=""
          />
          <p className="footer-name">Night Watch Dog</p>
          <p className="footer-ticker">${tokenConfig.ticker}</p>
        </div>
        <div>
          <h2>Official links</h2>
          {view.socials.length === 0 && !view.chart && !view.docs ? (
            <p>Social channels, a chart, and extra documentation are not published yet.</p>
          ) : null}
          <ul className="footer-links">
            {view.socials.map((item) => (
              <li key={item.label}>
                <TextLink href={item.href} external>
                  {item.label}
                </TextLink>
              </li>
            ))}
            {view.chart ? (
              <li>
                <TextLink href={view.chart.href} external>
                  Chart
                </TextLink>
              </li>
            ) : null}
            {view.docs ? (
              <li>
                <TextLink href={view.docs.href} external>
                  Documentation
                </TextLink>
              </li>
            ) : null}
            <li>
              <a className="text-link" href="#faq">
                FAQ
              </a>
            </li>
            <li>
              <a className="text-link" href="#verification">
                Verification
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h2>Contract</h2>
          <p>{view.networkLabel}</p>
          {view.contract.address ? (
            <p className="address">{view.contract.address}</p>
          ) : (
            <p>{view.contract.message}</p>
          )}
          {view.contract.etherscanUrl ? (
            <p>
              <TextLink href={view.contract.etherscanUrl} external>
                View on Etherscan
              </TextLink>
            </p>
          ) : null}
        </div>
      </div>
      <div className="wrap footer-notes">
        <p>{DISCLOSURE}</p>
        <p>{RISK}</p>
        {view.chainProblem ? <p>{view.chainProblem}</p> : null}
        <p>© 2026 Night Watch Dog</p>
      </div>
    </footer>
  );
}
