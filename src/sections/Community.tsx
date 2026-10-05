import { bannerArt, brandDownloads } from '../config/assets.ts';
import { BadgeCreator } from '../components/BadgeCreator.tsx';
import { Picture } from '../components/Picture.tsx';
import { TextLink } from '../components/TextLink.tsx';
import { buildTokenView } from '../lib/view.ts';

export function Community() {
  const view = buildTokenView();
  return (
    <section className="section section--paper" id="community" aria-labelledby="community-title">
      <div className="wrap">
        <p className="eyebrow eyebrow--ink">Community</p>
        <h2 id="community-title">CLOCK IN. BRING MEMES.</h2>
        <p className="lede">
          Participation is open without buying, holding, or connecting a wallet. There is no member count on this page
          because none has been published.
        </p>
        <div className="community-grid">
          <div>
            {view.socials.length === 0 ? (
              <p>Official X and Telegram links are not published yet. The badge maker and artwork downloads still work.</p>
            ) : (
              <ul className="social-list">
                {view.socials.map((item) => (
                  <li key={item.label}>
                    <TextLink href={item.href} external>
                      {item.label}
                    </TextLink>
                  </li>
                ))}
              </ul>
            )}
            <h3>Brand files</h3>
            <p>
              Name-only and no-text badge files were not in the supplied art set. The downloads below are the files we
              do have.
            </p>
            <ul className="download-list">
              {brandDownloads.map((file) => (
                <li key={file.href}>
                  <a className="text-link" href={file.href} download={file.filename}>
                    {file.label}
                  </a>
                </li>
              ))}
            </ul>
            <Picture
              avif={bannerArt.avif}
              webp={bannerArt.webp}
              fallback={bannerArt.jpg}
              alt={bannerArt.alt}
              width={bannerArt.width}
              height={bannerArt.height}
              className="banner-preview"
            />
          </div>
          <BadgeCreator />
        </div>
      </div>
    </section>
  );
}
