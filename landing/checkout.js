/**
 * 0xRadar Checkout — Crypto-only payment flow (NOWPayments).
 *
 * All plans (Pro Monthly, Pro Yearly, Lifetime) pay with crypto:
 *   BTC, ETH, SOL, BNB, KAS, USDT, USDC.
 *
 * Vanilla JS, no build step. Runs on landing/index.html.
 *
 * Usage: Add <script src="checkout.js"></script> before </body>
 */

(function () {
  'use strict';

  const API_BASE = 'https://api.0xradar.app';

  const COINS = [
    { ticker: 'btc',  label: 'BTC',  icon: '₿', color: '#F7931A' },
    { ticker: 'eth',  label: 'ETH',  icon: 'Ξ', color: '#627EEA' },
    { ticker: 'sol',  label: 'SOL',  icon: '◎', color: '#14F195' },
    { ticker: 'bnb',  label: 'BNB',  icon: '◆', color: '#F3BA2F' },
    { ticker: 'kas',  label: 'KAS',  icon: 'K', color: '#00D1FF' },
    { ticker: 'usdt', label: 'USDT', icon: '₮', color: '#26A17B' },
    { ticker: 'usdc', label: 'USDC', icon: '$', color: '#2775CA' },
  ];

  const PLANS = {
    pro_monthly: { label: 'Pro Monthly', priceUsd: 9.99 },
    pro_yearly:  { label: 'Pro Yearly',  priceUsd: 99 },
    lifetime:    { label: 'Lifetime',    priceUsd: 199 },
  };

  let selectedCoin = COINS[1]; // default ETH
  let selectedPlan = 'lifetime';

  // ── DOM ──────────────────────────────────────────────────────────────────
  const $modal       = document.getElementById('crypto-modal');
  const $overlay     = document.getElementById('crypto-modal-overlay');
  const $btnMonthly  = document.getElementById('btn-subscribe-monthly');
  const $btnYearly   = document.getElementById('btn-subscribe-yearly');
  const $btnLifetime = document.getElementById('btn-buy-lifetime');
  const $emailInput  = document.getElementById('checkout-email');
  const $coinButtons = document.querySelectorAll('.checkout-coin-btn');
  const $payButton   = document.getElementById('btn-confirm-crypto');
  const $statusEl    = document.getElementById('checkout-status');
  const $planLabel   = document.getElementById('checkout-plan-label');

  // ── Helpers ──────────────────────────────────────────────────────────────

  function showModal(plan) {
    selectedPlan = plan;
    if ($planLabel) {
      $planLabel.textContent = PLANS[plan].label + ' — $' + PLANS[plan].priceUsd;
    }
    updatePayLabel();
    if ($overlay) $overlay.style.display = 'flex';
    if ($modal) $modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
  }

  function hideModal() {
    if ($overlay) $overlay.style.display = 'none';
    if ($modal) $modal.style.display = 'none';
    document.body.style.overflow = '';
  }

  function setStatus(msg, isError) {
    if (!$statusEl) return;
    $statusEl.textContent = msg;
    $statusEl.style.color = isError ? '#FF3B30' : '#00C851';
  }

  function setLoading(btn, loading) {
    if (!btn) return;
    btn.disabled = loading;
    if (loading) {
      btn.dataset.originalText = btn.dataset.originalText || btn.textContent;
      btn.textContent = '⏳ Loading...';
    } else {
      btn.textContent = btn.dataset.originalText || btn.textContent;
    }
  }

  function updatePayLabel() {
    if (!$payButton) return;
    const price = PLANS[selectedPlan].priceUsd;
    $payButton.textContent = 'Pay with ' + selectedCoin.label + ' — $' + price;
  }

  // ── Crypto Checkout ──────────────────────────────────────────────────────

  async function startCryptoCheckout() {
    const email = $emailInput ? $emailInput.value.trim() : '';
    if (!email || !email.includes('@')) {
      setStatus('Please enter your email first.', true);
      return;
    }

    setLoading($payButton, true);
    setStatus('Creating crypto invoice...', false);

    try {
      const resp = await fetch(`${API_BASE}/v1/checkout/crypto`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          plan: selectedPlan,
          email: email,
          coin: selectedCoin.ticker,
        }),
      });
      const data = await resp.json();

      if (data.url) {
        setStatus('Redirecting to payment page...', false);
        window.location.href = data.url;
      } else {
        setStatus(data.error || data.detail || 'Crypto payment failed. Please try again.', true);
      }
    } catch (err) {
      setStatus('Network error. Please check your connection and try again.', true);
      console.error('Crypto checkout error:', err);
    } finally {
      setLoading($payButton, false);
    }
  }

  function selectCoin(coin) {
    selectedCoin = coin;
    $coinButtons.forEach(function (btn) {
      btn.classList.toggle('active', btn.dataset.coin === coin.ticker);
    });
    updatePayLabel();
  }

  // ── Event Listeners ──────────────────────────────────────────────────────

  if ($btnMonthly) {
    $btnMonthly.addEventListener('click', function (e) {
      e.preventDefault();
      showModal('pro_monthly');
    });
  }
  if ($btnYearly) {
    $btnYearly.addEventListener('click', function (e) {
      e.preventDefault();
      showModal('pro_yearly');
    });
  }
  if ($btnLifetime) {
    $btnLifetime.addEventListener('click', function (e) {
      e.preventDefault();
      showModal('lifetime');
    });
  }

  if ($overlay) {
    $overlay.addEventListener('click', function (e) {
      if (e.target === $overlay) hideModal();
    });
  }

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') hideModal();
  });

  $coinButtons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      const ticker = btn.dataset.coin;
      const coin = COINS.find(function (c) { return c.ticker === ticker; });
      if (coin) selectCoin(coin);
    });
  });

  if ($payButton) {
    $payButton.addEventListener('click', startCryptoCheckout);
  }

  console.log('0xRadar crypto checkout ready ✓');

})();
