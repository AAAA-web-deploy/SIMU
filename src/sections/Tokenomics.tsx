import { AllocationChart } from '../components/AllocationChart.tsx';
import { TextLink } from '../components/TextLink.tsx';
import { buildTokenView } from '../lib/view.ts';

export function Tokenomics() {
  const view = buildTokenView();
  return (
    <section className="section section--ink" id="tokenomics" aria-labelledby="token-title">
      <div className="wrap">
        <p className="eyebrow">Tokenomics</p>
        <h2 id="token-title">THE NUMBERS, IN PLAIN SIGHT.</h2>
        <p className="lede">
          What we can say is in this table. Unpublished cells stay blank on purpose. Taxes, burns, locks, and ownership
          appear only when a value is published. Total supply and circulating supply are listed apart.
        </p>
        <div className="paper-sheet">
          <table className="fact-table">
            <caption className="visually-hidden">Published token facts</caption>
            <tbody>
              {view.tokenRows.map((row) => (
                <tr key={row.label}>
                  <th scope="row">{row.label}</th>
                  <td>
                    {row.href ? (
                      <TextLink href={row.href} external>
                        {row.value}
                      </TextLink>
                    ) : (
                      row.value
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {view.showAllocationChart ? <AllocationChart rows={view.allocations} /> : null}
        </div>
        <p className="fine">
          Buy tax: {view.buyTaxLabel}. Sell tax: {view.sellTaxLabel}. A tax that says “Not published” is not a tax of
          zero. Liquidity burn, a liquidity lock, and contract ownership are separate rows.
        </p>
      </div>
    </section>
  );
}
