import { ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { faqItems } from '../data/faq.ts';

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="section faq" id="faq" aria-labelledby="faq-title">
      <div className="container faq-wrap">
        <h2 id="faq-title">FAQ</h2>
        <div className="faq-list">
          {faqItems.map((item, index) => {
            const open = openIndex === index;
            const buttonId = `faq-button-${index}`;
            const panelId = `faq-panel-${index}`;
            return (
              <div key={item.question} className={open ? 'faq-item is-open' : 'faq-item'}>
                <h3>
                  <button
                    id={buttonId}
                    type="button"
                    aria-expanded={open}
                    aria-controls={panelId}
                    onClick={() => setOpenIndex(open ? null : index)}
                  >
                    <span>{item.question}</span>
                    <ChevronDown aria-hidden="true" />
                  </button>
                </h3>
                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  aria-hidden={!open}
                  className="faq-panel"
                >
                  <div className="faq-panel-inner">
                    <p>{item.answer}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
