/**
 * api.js — 0xRadar Dashboard API Client
 *
 * Wraps all backend API calls for the dashboard.
 * Falls back to mock data when backend is not connected (mock mode).
 *
 * Each function returns a Promise and throws on error.
 */

const API_BASE = window.API_BASE || 'https://api.0xradar.app';

// Make available globally for auth.js
window.API_BASE = API_BASE;

/**
 * Auth-aware fetch wrapper
 * @param {string} endpoint
 * @param {string} method
 * @param {object|null} body
 * @param {string|null} token
 */
async function apiFetch(endpoint, method = 'GET', body = null, token = null) {
  const headers = {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  };

  if (token) {
    headers['X-API-Key'] = token;
  }

  const options = { method, headers };
  if (body && ['POST', 'PUT', 'PATCH', 'DELETE'].includes(method)) {
    options.body = JSON.stringify(body);
  }

  const response = await fetch(API_BASE + endpoint, options);

  if (!response.ok) {
    const data = await response.json().catch(() => ({}));
    throw new Error(data.detail || data.error || `HTTP ${response.status}`);
  }

  return response.json();
}

// ─── User / Me ────────────────────────────────────────────────

/**
 * Get current user info
 * GET /v1/me
 * @param {string} token
 * @returns {Promise<object>}
 */
async function getMe(token) {
  // Mock mode: return demo user
  if (isMockMode()) return getMockUser();
  return apiFetch('/v1/me', 'GET', null, token);
}

/**
 * Update user info
 * PUT /v1/me
 * @param {string} token
 * @param {object} data
 * @returns {Promise<object>}
 */
async function updateMe(token, data) {
  return apiFetch('/v1/me', 'PUT', data, token);
}

// ─── API Keys ─────────────────────────────────────────────────

/**
 * Get user's API keys (hashed, prefix only)
 * GET /v1/me/api-keys
 * @param {string} token
 * @returns {Promise<object>}
 */
async function getApiKeys(token) {
  if (isMockMode()) return getMockApiKeys();
  return apiFetch('/v1/me/api-keys', 'GET', null, token);
}

/**
 * Generate new API key
 * POST /v1/me/api-keys
 * @param {string} token
 * @param {string} name
 * @param {string} tier
 * @returns {Promise<{id, key, prefix, name, created_at}>} — key is plaintext, shown once
 */
async function createApiKey(token, name = 'New Key', tier = 'pro') {
  if (isMockMode()) return getMockNewKey(name);
  return apiFetch('/v1/me/api-keys', 'POST', { name, tier }, token);
}

/**
 * Revoke an API key
 * DELETE /v1/me/api-keys/{id}
 * @param {string} token
 * @param {string} keyId
 */
async function revokeApiKey(token, keyId) {
  return apiFetch(`/v1/me/api-keys/${keyId}`, 'DELETE', null, token);
}

/**
 * Reveal API key (requires recent re-auth)
 * POST /v1/me/api-keys/reveal/{id}
 * @param {string} token
 * @param {string} keyId
 * @returns {Promise<{key: string}>}
 */
async function revealApiKey(token, keyId) {
  if (isMockMode()) return { key: 'mk_' + generateMockKey() };
  return apiFetch(`/v1/me/api-keys/reveal/${keyId}`, 'POST', null, token);
}

// ─── Usage Stats ──────────────────────────────────────────────

/**
 * Get usage stats for N days
 * GET /v1/me/usage?days=7
 * @param {string} token
 * @param {number} days
 * @returns {Promise<object>}
 */
async function getUsageStats(token, days = 7) {
  if (isMockMode()) return getMockUsage(days);
  return apiFetch(`/v1/me/usage?days=${days}`, 'GET', null, token);
}

/**
 * Get rate limit status
 * @param {string} token
 * @returns {Promise<object>}
 */
async function getRateLimitStatus(token) {
  if (isMockMode()) return getMockRateLimit();
  return apiFetch('/v1/me/rate-limit', 'GET', null, token);
}

// ─── Subscription / Orders ────────────────────────────────────

/**
 * Get current subscription
 * GET /v1/me/subscription
 * @param {string} token
 * @returns {Promise<object>}
 */
async function getSubscription(token) {
  if (isMockMode()) return getMockSubscription();
  return apiFetch('/v1/me/subscription', 'GET', null, token);
}

/**
 * Get payment history
 * GET /v1/me/orders
 * @param {string} token
 * @returns {Promise<object>}
 */
async function getOrders(token) {
  if (isMockMode()) return getMockOrders();
  return apiFetch('/v1/me/orders', 'GET', null, token);
}

/**
 * Create checkout session for renewal/upgrade
 * POST /v1/me/checkout
 * @param {string} token
 * @param {string} plan - 'pro_monthly' | 'pro_lifetime' | 'free'
 * @returns {Promise<{checkout_url: string}>}
 */
async function createCheckout(token, plan) {
  if (isMockMode()) return { checkout_url: 'https://0xradar.app/checkout?plan=' + plan + '&mock=1' };
  return apiFetch('/v1/me/checkout', 'POST', { plan }, token);
}

/**
 * Delete account
 * DELETE /v1/me/account
 * @param {string} token
 * @returns {Promise<void>}
 */
async function deleteAccount(token) {
  return apiFetch('/v1/me/account', 'DELETE', null, token);
}

// ─── Mock Data Generators ─────────────────────────────────────

function isMockMode() {
  return localStorage.getItem('0xr_mock_mode') === 'true' ||
         new URLSearchParams(window.location.search).has('mock');
}

function generateMockKey() {
  return Math.random().toString(36).substring(2, 18) +
         Math.random().toString(36).substring(2, 10);
}

function getMockUser() {
  return {
    email: 'dev@0xradar.app',
    tier: 'pro',
    plan: 'pro_monthly',
    expires_at: '2026-06-27T00:00:00Z',
    created_at: '2026-05-01T00:00:00Z'
  };
}

function getMockApiKeys() {
  return {
    keys: [
      {
        id: 'key_1a2b3c4d5e',
        prefix: '0xr_prod_',
        name: 'Production Key',
        tier: 'pro',
        created_at: '2026-05-01T00:00:00Z',
        last_used_at: '2026-05-27T08:30:00Z',
        expires_at: null
      },
      {
        id: 'key_7f8g9h0i1j',
        prefix: '0xr_dev_',
        name: 'Dev Key',
        tier: 'dev',
        created_at: '2026-05-10T00:00:00Z',
        last_used_at: '2026-05-26T14:22:00Z',
        expires_at: null
      }
    ]
  };
}

function getMockNewKey(name) {
  const id = 'key_' + Math.random().toString(36).substring(2, 10);
  const key = '0xr_live_' + generateMockKey() + generateMockKey();
  return {
    id,
    key, // plaintext — shown once
    prefix: '0xr_live_',
    name,
    tier: 'pro',
    created_at: new Date().toISOString(),
    expires_at: null
  };
}

function getMockUsage(days = 7) {
  const now = Date.now();
  const data = [];
  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(now - i * 86400000);
    const dateStr = date.toISOString().split('T')[0];
    data.push({
      date: dateStr,
      requests: Math.floor(Math.random() * 800) + 200,
      wallets: Math.floor(Math.random() * 50) + 10,
      chains_hit: ['ethereum', 'arbitrum', 'base', 'polygon'].slice(0, Math.floor(Math.random() * 4) + 1)
    });
  }
  return { days, data };
}

function getMockRateLimit() {
  return {
    minute: { used: 12, limit: 60 },
    day: { used: 4210, limit: 100000 }
  };
}

function getMockSubscription() {
  return {
    plan: 'pro_monthly',
    tier: 'pro',
    status: 'active',
    current_period_start: '2026-05-27T00:00:00Z',
    current_period_end: '2026-06-27T00:00:00Z',
    price_usd: 9.99,
    cancel_at_period_end: false
  };
}

function getMockOrders() {
  return {
    orders: [
      {
        id: 'order_abc123',
        plan: 'pro_monthly',
        amount_usd: 9.99,
        status: 'completed',
        created_at: '2026-05-01T10:23:00Z',
        invoice_url: '#mock-invoice-1'
      },
      {
        id: 'order_def456',
        plan: 'pro_monthly',
        amount_usd: 9.99,
        status: 'completed',
        created_at: '2026-04-01T09:15:00Z',
        invoice_url: '#mock-invoice-2'
      },
      {
        id: 'order_ghi789',
        plan: 'pro_monthly',
        amount_usd: 9.99,
        status: 'completed',
        created_at: '2026-03-01T14:44:00Z',
        invoice_url: '#mock-invoice-3'
      }
    ]
  };
}

// ─── API Playground Tester ────────────────────────────────────

/**
 * Test an endpoint from the playground
 * @param {string} address
 * @param {string} token
 * @returns {Promise<object>}
 */
async function testPortfolioEndpoint(address, token) {
  return apiFetch(`/v1/wallet/${address}/portfolio`, 'GET', null, token);
}

// Export all functions
window.Api = {
  getMe,
  updateMe,
  getApiKeys,
  createApiKey,
  revokeApiKey,
  revealApiKey,
  getUsageStats,
  getRateLimitStatus,
  getSubscription,
  getOrders,
  createCheckout,
  deleteAccount,
  testPortfolioEndpoint,
  API_BASE
};