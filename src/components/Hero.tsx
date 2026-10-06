import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { siteConfig } from '../data/siteConfig.ts';
import { asset } from '../lib/assets.ts';
import { useMediaQuery } from '../lib/useMediaQuery.ts';
import { BuyLink } from './ActionLink.tsx';
import { Stars } from './Stars.tsx';

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const wide = useMediaQuery('(min-width: 900px)');
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, 36]);
  const parallax = !reduce && wide;

  return (
    <section className="hero" id="home" ref={sectionRef} aria-labelledby="hero-title">
      <div className="hero-bg-wrap">
        <motion.img
          className="hero-bg"
          src={asset('sihere-hero-background.png')}
          alt=""
          width={1800}
          height={698}
          fetchPriority="high"
          style={parallax ? { y } : undefined}
        />
      </div>
      <div className="hero-shade" />
      <Stars />
      <div className="container hero-grid">
        <div className="hero-copy">
          <h1 id="hero-title">SI IS HERE</h1>
          <p className="hero-sub">AI HAD ITS TURN.</p>
          <div className="hero-body">
            <p>The age of Artificial Intelligence was only the beginning. Now comes the next chapter.</p>
            <p>Super Intelligence has arrived.</p>
            <p>
              Welcome to {siteConfig.ticker} — an Ethereum-born meme celebrating the moment the internet
              stopped asking what AI could do and started wondering what comes after it.
            </p>
          </div>
          <div className="hero-actions">
            <BuyLink className="btn btn-primary">BUY {siteConfig.ticker}</BuyLink>
            <a className="btn btn-secondary" href="#community">
              JOIN THE SI ERA
            </a>
          </div>
          <p className="status-line">Ethereum • {siteConfig.ticker} • Super Intelligence Era</p>
        </div>
        <div className="hero-mascot">
          <img
            className="float-slow"
            src={asset('sihere-hero-character-transparent.png')}
            alt="Crowned SI king mascot in silver and royal blue, holding a glowing crystal marked SI."
            width={1000}
            height={914}
          />
        </div>
      </div>
    </section>
  );
}
