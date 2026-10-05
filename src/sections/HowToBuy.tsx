import { buildTokenView } from '../lib/view.ts';
import { TextLink } from '../components/TextLink.tsx';

export function HowToBuy() {
  const view = buildTokenView();
  return (
    <section className="section section--paper" id="how-to-buy" aria-labelledby="buy-title">
      <div className="wrap buy-layout">
        <div>
          <p className="eyebrow eyebrow--ink">How to buy</p>
          <h2 id="buy-title">YOUR FIRST PATROL</h2>
          <p>
            Trading, when it exists, happens on Uniswap. This website never connects a wallet, never asks for a seed
            phrase, and never sends a swap.
          </p>
          {view.purchaseEnabled ? (
            <p className="notice">
              The official swap page is open.{' '}
              <TextLink href={view.primaryCta.href} external>
                Buy $NWDOG on Uniswap
              </TextLink>
            </p>
          ) : (
            <p className="notice">
              Trading is not available yet. The steps below stay up so the route is clear later. There is no swap form
              on this page.
            </p>
          )}
          {view.configNote ? <p>{view.configNote}</p> : null}
        </div>
        <ol className="steps">
          <li>
            <h3>Set up a wallet</h3>
            <p>Set up an Ethereum-compatible wallet using its official website or app.</p>
          </li>
          <li>
            <h3>Get ETH on Ethereum</h3>
            <p>Obtain ETH on Ethereum mainnet and leave enough for transaction fees.</p>
          </li>
          <li>
            <h3>Open Uniswap and check the contract</h3>
            <p>
              Open the configured official Uniswap destination and verify the full token contract address.
              {view.purchaseEnabled ? (
                <>
                  {' '}
                  The published page is{' '}
                  <TextLink href={view.primaryCta.href} external>
                    Uniswap
                  </TextLink>
                  . Compare every character with the address on this site.
                </>
              ) : (
                <> The official Uniswap link is not published yet, so there is nowhere on this site to trade.</>
              )}
            </p>
          </li>
          <li>
            <h3>Read the quote, then decide</h3>
            <p>
              Review the quote, fees, price impact, minimum received, and requested approvals before confirming in the
              wallet. Slippage tolerance does not remove price or execution risk. Do not sign a transaction you do not
              understand.
            </p>
          </li>
        </ol>
      </div>
    </section>
  );
}
