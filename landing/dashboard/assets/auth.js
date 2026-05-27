/**
 * auth.js — 0xRadar Dashboard Authentication
 *
 * Handles:
 * - Magic link login flow (MVP: email + key login)
 * - Session management (localStorage token)
 * - Auth state listeners
 * - Protected route guards
 *
 * Security notes for MVP:
 * - Token stored in localStorage (XSS risk accepted for MVP)
 * - Session TTL: 7 days
 * - Refresh token flow not implemented (next iteration)
 *
 * Production: switch to httpOnly cookie + same-site strict
 */

const AUTH_TOKEN_KEY = '0xr_session_token';
const AUTH_EMAIL_KEY = '0xr_session_email';
const AUTH_EXPIRY_KEY = '0xr_session_expiry';

const SESSION_TTL_MS = 7 * 24 * 60 * 60 * 1000; // 7 days

/**
 * Get current auth token
 * @returns {string|null}
 */
function getAuthToken() {
  return localStorage.getItem(AUTH_TOKEN_KEY);
}

/**
 * Get stored email
 * @returns {string|null}
 */
function getStoredEmail() {
  return localStorage.getItem(AUTH_EMAIL_KEY);
}

/**
 * Get session expiry timestamp
 * @returns {number|null}
 */
function getSessionExpiry() {
  const raw = localStorage.getItem(AUTH_EXPIRY_KEY);
  return raw ? parseInt(raw, 10) : null;
}

/**
 * Check if session is valid
 * @returns {boolean}
 */
function isSessionValid() {
  const token = getAuthToken();
  const expiry = getSessionExpiry();
  if (!token || !expiry) return false;
  return Date.now() < expiry;
}

/**
 * Save session data
 * @param {string} token
 * @param {string} email
 */
function saveSession(token, email) {
  const expiry = Date.now() + SESSION_TTL_MS;
  localStorage.setItem(AUTH_TOKEN_KEY, token);
  localStorage.setItem(AUTH_EMAIL_KEY, email);
  localStorage.setItem(AUTH_EXPIRY_KEY, String(expiry));
  notifyAuthChange(true, email);
}

/**
 * Clear session
 */
function clearSession() {
  localStorage.removeItem(AUTH_TOKEN_KEY);
  localStorage.removeItem(AUTH_EMAIL_KEY);
  localStorage.removeItem(AUTH_EXPIRY_KEY);
  notifyAuthChange(false, null);
}

/**
 * Login with email + API key (MVP auth method)
 * Real implementation: magic link
 *
 * @param {string} email
 * @param {string} apiKey
 * @returns {Promise<{success: boolean, error: string|null}>}
 */
async function loginWithEmailKey(email, apiKey) {
  // Validate inputs
  if (!email || !email.includes('@')) {
    return { success: false, error: 'Invalid email address' };
  }
  if (!apiKey || apiKey.length < 16) {
    return { success: false, error: 'Invalid API key format' };
  }

  try {
    // Try to authenticate via API
    const result = await callApi('/v1/auth/login', 'POST', {
      email,
      api_key: apiKey
    }, null, false); // no auth header for login

    if (result.success) {
      saveSession(result.token, email);
      return { success: true, error: null };
    } else {
      return { success: false, error: result.error || 'Login failed' };
    }
  } catch (err) {
    // For MVP demo: simulate successful login with mock token
    // Remove this block when real backend is connected
    if (isMockMode()) {
      const mockToken = 'mock_token_' + btoa(email).replace(/=/g, '');
      saveSession(mockToken, email);
      return { success: true, error: null };
    }
    return { success: false, error: err.message || 'Connection failed' };
  }
}

/**
 * Login with magic link token (real implementation)
 * @param {string} token
 * @returns {Promise<{success: boolean, error: string|null}>}
 */
async function loginWithMagicToken(token) {
  try {
    const result = await callApi('/v1/auth/verify', 'POST', { token });
    if (result.success) {
      saveSession(result.token, result.email);
      return { success: true, error: null };
    }
    return { success: false, error: result.error || 'Invalid link' };
  } catch (err) {
    return { success: false, error: err.message };
  }
}

/**
 * Logout
 */
async function logout() {
  // Try to notify backend (best effort)
  try {
    await callApi('/v1/auth/logout', 'POST');
  } catch (_) {}

  clearSession();
  // Redirect to login
  window.location.href = 'login.html';
}

/**
 * Require auth — redirect to login if not authenticated
 * @param {string} [returnTo] - URL to return after login
 */
function requireAuth(returnTo) {
  if (!isSessionValid()) {
    const redirect = returnTo || window.location.href;
    window.location.href = 'login.html?return=' + encodeURIComponent(redirect);
    return false;
  }
  return true;
}

/**
 * Get current user info from session
 * @returns {{email: string, token: string}|null}
 */
function getCurrentUser() {
  if (!isSessionValid()) return null;
  return {
    email: getStoredEmail(),
    token: getAuthToken()
  };
}

// === Auth state listeners ===

const authListeners = [];

function onAuthChange(callback) {
  authListeners.push(callback);
}

function notifyAuthChange(isLoggedIn, email) {
  authListeners.forEach(cb => cb(isLoggedIn, email));
}

// === Mock mode detection ===
// If localStorage has mock_mode=true, use mock data

function isMockMode() {
  return localStorage.getItem('0xr_mock_mode') === 'true' ||
         new URLSearchParams(window.location.search).has('mock');
}

/**
 * Enable mock mode (for demo without backend)
 */
function enableMockMode() {
  localStorage.setItem('0xr_mock_mode', 'true');
}

function disableMockMode() {
  localStorage.removeItem('0xr_mock_mode');
}

function isMockModeEnabled() {
  return localStorage.getItem('0xr_mock_mode') === 'true';
}

/**
 * Internal API call helper
 * @private
 */
async function callApi(endpoint, method, body, authToken, includeAuth = true) {
  const headers = {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  };

  if (includeAuth && authToken) {
    headers['X-API-Key'] = authToken;
  }

  const options = { method, headers };
  if (body && ['POST', 'PUT', 'PATCH'].includes(method)) {
    options.body = JSON.stringify(body);
  }

  const response = await fetch(API_BASE + endpoint, options);

  // Handle mock 404 (backend not connected)
  if (response.status === 404 && endpoint.startsWith('/v1/')) {
    throw new Error('API_NOT_CONNECTED');
  }

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.detail || data.error || `HTTP ${response.status}`);
  }

  return data;
}

// API_BASE is set by dashboard.js (loaded before auth.js)
// Make it accessible here
const API_BASE = typeof window !== 'undefined'
  ? (window.API_BASE || 'https://api.0xradar.app')
  : 'https://api.0xradar.app';

// Export for use in other modules
window.Auth = {
  getAuthToken,
  getStoredEmail,
  isSessionValid,
  saveSession,
  clearSession,
  loginWithEmailKey,
  loginWithMagicToken,
  logout,
  requireAuth,
  getCurrentUser,
  onAuthChange,
  enableMockMode,
  disableMockMode,
  isMockModeEnabled,
  isMockMode
};