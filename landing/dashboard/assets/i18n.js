/**
 * i18n.js — 0xRadar Dashboard Internationalization
 *
 * Supports: EN (default), TR
 * Usage: t('key') or t('key.subkey')
 * Locale auto-detected from browser or localStorage preference.
 */

const LOCALES = {
  en: {
    // Navigation
    'nav.dashboard': 'Dashboard',
    'nav.apiKeys': 'API Keys',
    'nav.subscription': 'Subscription',
    'nav.settings': 'Settings',
    'nav.logout': 'Logout',

    // Common
    'common.save': 'Save',
    'common.cancel': 'Cancel',
    'common.delete': 'Delete',
    'common.confirm': 'Confirm',
    'common.close': 'Close',
    'common.loading': 'Loading...',
    'common.copy': 'Copy',
    'copied': 'Copied!',
    'common.reveal': 'Reveal',
    'common.regenerate': 'Regenerate',
    'common.revoke': 'Revoke',

    // Login page
    'login.title': 'Sign in to 0xRadar',
    'login.subtitle': 'Enter your email and API key to access your dashboard',
    'login.email': 'Email address',
    'login.emailPlaceholder': 'you@example.com',
    'login.apiKey': 'API Key',
    'login.apiKeyPlaceholder': '0xr_live_...',
    'login.submit': 'Sign In',
    'login.signingIn': 'Signing in...',
    'login.error.invalid': 'Invalid email or API key',
    'login.error.connection': 'Cannot connect to server. Check your connection.',
    'login.footer': 'Don\'t have an account?',
    'login.signupLink': 'Get your API key at 0xradar.app',

    // Dashboard page
    'dash.welcome': 'Welcome back',
    'dash.plan.pro': 'Pro',
    'dash.plan.free': 'Free',
    'dash.plan.lifetime': 'Lifetime',
    'dash.plan.expires': 'Renews in',

    // API Keys section
    'keys.title': 'API Keys',
    'keys.subtitle': 'Manage your API keys. Plaintext keys are shown only once.',
    'keys.table.name': 'Name',
    'keys.table.prefix': 'Key',
    'keys.table.tier': 'Tier',
    'keys.table.lastUsed': 'Last Used',
    'keys.table.created': 'Created',
    'keys.table.actions': '',
    'keys.empty.title': 'No API keys yet',
    'keys.empty.desc': 'Generate your first key to start making API calls.',
    'keys.generate': 'Generate New Key',
    'keys.generateBtn': 'New Key',
    'key.revealWarning': 'This key will be shown only once. Save it now.',
    'key.revealExpired': 'Reveal requires recent re-authentication.',
    'key.revokeConfirm': 'Revoke this key? This action cannot be undone.',
    'key.revoked': 'Key revoked successfully.',
    'key.copied': 'Key copied to clipboard.',
    'key.tier.pro': 'Pro',
    'key.tier.dev': 'Dev',
    'key.tier.free': 'Free',
    'key.never': 'Never',

    // Usage stats section
    'usage.title': 'Usage Statistics',
    'usage.last7Days': 'Last 7 days',
    'usage.totalRequests': 'Total Requests',
    'usage.uniqueWallets': 'Unique Wallets',
    'usage.chainsQueried': 'Chains Queried',
    'usage.topEndpoints': 'Top Endpoints',
    'usage.endpoint.portfolio': '/v1/wallet/{address}/portfolio',
    'usage.endpoint.balances': '/v1/wallet/{address}/balances',
    'usage.endpoint.sweep': '/v1/sweep-quote/{address}',
    'usage.endpoint.health': '/v1/health',

    // Rate limit section
    'rateLimit.title': 'Rate Limit',
    'rateLimit.minute': 'This minute',
    'rateLimit.day': 'Today',
    'rateLimit.used': 'used',
    'rateLimit.of': 'of',
    'rateLimit.unlimited': 'Unlimited',

    // Subscription section
    'sub.title': 'Subscription',
    'sub.currentPlan': 'Current Plan',
    'sub.status': 'Status',
    'sub.currentPeriod': 'Current Period',
    'sub.renews': 'Renews',
    'sub.expires': 'Expires',
    'sub.cancel': 'Cancel Subscription',
    'sub.renewNow': 'Renew Now',
    'sub.upgradeLifetime': 'Upgrade to Lifetime',
    'sub.paymentHistory': 'Payment History',
    'sub.noHistory': 'No payments yet',
    'sub.order.id': 'Order ID',
    'sub.order.date': 'Date',
    'sub.order.amount': 'Amount',
    'sub.order.status': 'Status',
    'sub.order.invoice': 'Invoice',
    'sub.status.active': 'Active',
    'sub.status.cancelled': 'Cancelled',
    'sub.status.expired': 'Expired',

    // Settings page
    'settings.title': 'Account Settings',
    'settings.email': 'Email Address',
    'settings.emailDesc': 'Your account email. Used for login and billing.',
    'settings.emailChange': 'Change Email',
    'settings.notifications': 'Notification Preferences',
    'settings.notif.rateLimit': 'Rate limit warning (80% reached)',
    'settings.notif.expiry': 'Subscription expiring soon',
    'settings.notif.newFeatures': 'New feature announcements',
    'settings.dangerZone': 'Danger Zone',
    'settings.deleteAccount': 'Delete Account',
    'settings.deleteConfirm': 'Are you sure? This will permanently delete your account, all API keys, and usage history.',
    'settings.deleteFinal': 'Type your email to confirm:',
    'settings.deleted': 'Account deleted.',

    // Playground
    'playground.title': 'Quick Test',
    'playground.subtitle': 'Test the API with any wallet address',
    'playground.address': 'Wallet address',
    'playground.addressPlaceholder': '0x742d35Cc6634C0532925a3b844Bc9e7595f1b87',
    'playground.test': 'Test',
    'playground.testing': 'Testing...',
    'playground.result': 'Response',
    'playground.error': 'Error',
    'playground.copySnippet': 'Copy as cURL',
    'playground.copyPython': 'Copy as Python',
    'playground.copyJs': 'Copy as JavaScript',

    // Code snippets
    'snippet.curl': 'cURL',
    'snippet.python': 'Python',
    'snippet.javascript': 'JavaScript',

    // Toast messages
    'toast.saved': 'Saved successfully',
    'toast.error': 'Something went wrong',
    'toast.copied': 'Copied to clipboard',
    'toast.keyGenerated': 'API key generated — save it now, it won\'t be shown again',
    'toast.keyRevoked': 'API key revoked',
    'toast.loggedOut': 'Logged out',

    // Empty states
    'empty.noUsage': 'No usage data yet',
    'empty.noUsageDesc': 'Start making API calls to see your statistics here.',
    'empty.noKeys': 'No API keys',
    'empty.noKeysDesc': 'Generate a key to start using the 0xRadar API.',

    // Footer
    'footer.docs': 'Documentation',
    'footer.apiStatus': 'API Status',
    'footer.privacy': 'Privacy',
    'footer.terms': 'Terms',

    // Times
    'time.justNow': 'Just now',
    'time.minutesAgo': '{n} min ago',
    'time.hoursAgo': '{n} hr ago',
    'time.daysAgo': '{n} days ago',
    'time.today': 'Today',
    'time.yesterday': 'Yesterday'
  },

  tr: {
    // Navigation
    'nav.dashboard': 'Panel',
    'nav.apiKeys': 'API Anahtarları',
    'nav.subscription': 'Abonelik',
    'nav.settings': 'Ayarlar',
    'nav.logout': 'Çıkış',

    // Common
    'common.save': 'Kaydet',
    'common.cancel': 'İptal',
    'common.delete': 'Sil',
    'common.confirm': 'Onayla',
    'common.close': 'Kapat',
    'common.loading': 'Yükleniyor...',
    'common.copy': 'Kopyala',
    'copied': 'Kopyalandı!',
    'common.reveal': 'Göster',
    'common.regenerate': 'Yenile',
    'common.revoke': 'İptal Et',

    // Login page
    'login.title': '0xRadar\'a Giriş Yap',
    'login.subtitle': 'Panele erişmek için email ve API anahtarınızı girin',
    'login.email': 'E-posta adresi',
    'login.emailPlaceholder': 'ornek@mail.com',
    'login.apiKey': 'API Anahtarı',
    'login.apiKeyPlaceholder': '0xr_live_...',
    'login.submit': 'Giriş Yap',
    'login.signingIn': 'Giriş yapılıyor...',
    'login.error.invalid': 'Geçersiz e-posta veya API anahtarı',
    'login.error.connection': 'Sunucuya bağlanılamıyor. Bağlantınızı kontrol edin.',
    'login.footer': 'Hesabınız yok mu?',
    'login.signupLink': 'API anahtarınızı 0xradar.app adresinden alın',

    // Dashboard page
    'dash.welcome': 'Hoş geldiniz',
    'dash.plan.pro': 'Pro',
    'dash.plan.free': 'Ücretsiz',
    'dash.plan.lifetime': 'Lifetime',
    'dash.plan.expires': 'Yenilenme',

    // API Keys section
    'keys.title': 'API Anahtarları',
    'keys.subtitle': 'API anahtarlarınızı yönetin. Açık anahtarlar sadece bir kez gösterilir.',
    'keys.table.name': 'Ad',
    'keys.table.prefix': 'Anahtar',
    'keys.table.tier': 'Tier',
    'keys.table.lastUsed': 'Son Kullanım',
    'keys.table.created': 'Oluşturulma',
    'keys.table.actions': '',
    'keys.empty.title': 'Henüz API anahtarı yok',
    'keys.empty.desc': 'API çağrılarına başlamak için ilk anahtarınızı oluşturun.',
    'keys.generate': 'Yeni Anahtar Oluştur',
    'keys.generateBtn': 'Yeni Anahtar',
    'key.revealWarning': 'Bu anahtar sadece bir kez gösterilecek. Şimdi kaydedin.',
    'key.revealExpired': 'Göstermek için yeniden kimlik doğrulama gerekiyor.',
    'key.revokeConfirm': 'Bu anahtarı iptal etmek istediğinize emin misiniz? Bu işlem geri alınamaz.',
    'key.revoked': 'API anahtarı iptal edildi.',
    'key.copied': 'Anahtar panoya kopyalandı.',
    'key.tier.pro': 'Pro',
    'key.tier.dev': 'Geliştirici',
    'key.tier.free': 'Ücretsiz',
    'key.never': 'Hiç',

    // Usage stats section
    'usage.title': 'Kullanım İstatistikleri',
    'usage.last7Days': 'Son 7 gün',
    'usage.totalRequests': 'Toplam İstek',
    'usage.uniqueWallets': 'Benzersiz Cüzdan',
    'usage.chainsQueried': 'Sorgulanan Zincir',
    'usage.topEndpoints': 'En Çok Kullanılan Endpoints',
    'usage.endpoint.portfolio': '/v1/cüzdan/{adres}/portföy',
    'usage.endpoint.balances': '/v1/cüzdan/{adres}/bakiyeler',
    'usage.endpoint.sweep': '/v1/swap-teklif/{adres}',
    'usage.endpoint.health': '/v1/durum',

    // Rate limit section
    'rateLimit.title': 'Hız Limiti',
    'rateLimit.minute': 'Bu dakika',
    'rateLimit.day': 'Bugün',
    'rateLimit.used': 'kullanıldı',
    'rateLimit.of': '/',
    'rateLimit.unlimited': 'Sınırsız',

    // Subscription section
    'sub.title': 'Abonelik',
    'sub.currentPlan': 'Mevcut Plan',
    'sub.status': 'Durum',
    'sub.currentPeriod': 'Mevcut Dönem',
    'sub.renews': 'Yenilenme',
    'sub.expires': 'Bitiş',
    'sub.cancel': 'Aboneliği İptal Et',
    'sub.renewNow': 'Şimdi Yenile',
    'sub.upgradeLifetime': 'Lifetime\'a Yükselt',
    'sub.paymentHistory': 'Ödeme Geçmişi',
    'sub.noHistory': 'Henüz ödeme yok',
    'sub.order.id': 'Sipariş ID',
    'sub.order.date': 'Tarih',
    'sub.order.amount': 'Tutar',
    'sub.order.status': 'Durum',
    'sub.order.invoice': 'Fatura',
    'sub.status.active': 'Aktif',
    'sub.status.cancelled': 'İptal Edildi',
    'sub.status.expired': 'Süresi Doldu',

    // Settings page
    'settings.title': 'Hesap Ayarları',
    'settings.email': 'E-posta Adresi',
    'settings.emailDesc': 'Hesap e-postası. Giriş ve faturalandırma için kullanılır.',
    'settings.emailChange': 'E-postayı Değiştir',
    'settings.notifications': 'Bildirim Tercihleri',
    'settings.notif.rateLimit': 'Hız limiti uyarısı (%80\'e ulaşıldığında)',
    'settings.notif.expiry': 'Abonelik bitmek üzere',
    'settings.notif.newFeatures': 'Yeni özellik duyuruları',
    'settings.dangerZone': 'Tehlikeli Bölge',
    'settings.deleteAccount': 'Hesabı Sil',
    'settings.deleteConfirm': 'Emin misiniz? Bu, hesabınızı, tüm API anahtarlarınızı ve kullanım geçmişinizi kalıcı olarak silecektir.',
    'settings.deleteFinal': 'Onaylamak için e-posta adresinizi yazın:',
    'settings.deleted': 'Hesap silindi.',

    // Playground
    'playground.title': 'Hızlı Test',
    'playground.subtitle': 'Herhangi bir cüzdan adresiyle API\'yi test edin',
    'playground.address': 'Cüzdan adresi',
    'playground.addressPlaceholder': '0x742d35Cc6634C0532925a3b844Bc9e7595f1b87',
    'playground.test': 'Test Et',
    'playground.testing': 'Test ediliyor...',
    'playground.result': 'Yanıt',
    'playground.error': 'Hata',
    'playground.copySnippet': 'cURL olarak kopyala',
    'playground.copyPython': 'Python olarak kopyala',
    'playground.copyJs': 'JavaScript olarak kopyala',

    // Code snippets
    'snippet.curl': 'cURL',
    'snippet.python': 'Python',
    'snippet.javascript': 'JavaScript',

    // Toast messages
    'toast.saved': 'Başarıyla kaydedildi',
    'toast.error': 'Bir hata oluştu',
    'toast.copied': 'Panoya kopyalandı',
    'toast.keyGenerated': 'API anahtarı oluşturuldu — şimdi kaydedin, bir daha gösterilmeyecek',
    'toast.keyRevoked': 'API anahtarı iptal edildi',
    'toast.loggedOut': 'Çıkış yapıldı',

    // Empty states
    'empty.noUsage': 'Henüz kullanım verisi yok',
    'empty.noUsageDesc': 'İstatistiklerinizi görmek için API çağrıları yapmaya başlayın.',
    'empty.noKeys': 'API anahtarı yok',
    'empty.noKeysDesc': '0xRadar API\'yi kullanmaya başlamak için bir anahtar oluşturun.',

    // Footer
    'footer.docs': 'Dokümantasyon',
    'footer.apiStatus': 'API Durumu',
    'footer.privacy': 'Gizlilik',
    'footer.terms': 'Koşullar',

    // Times
    'time.justNow': 'Şimdi',
    'time.minutesAgo': '{n} dk önce',
    'time.hoursAgo': '{n} sa önce',
    'time.daysAgo': '{n} gün önce',
    'time.today': 'Bugün',
    'time.yesterday': 'Dün'
  }
};

// ─── Core functions ────────────────────────────────────────────

let currentLocale = 'en';

/**
 * Get user's preferred locale
 * Priority: 1) URL param, 2) localStorage, 3) browser lang, 4) en
 */
function detectLocale() {
  // Check URL param
  const urlLocale = new URLSearchParams(window.location.search).get('lang');
  if (urlLocale && LOCALES[urlLocale]) return urlLocale;

  // Check localStorage
  const stored = localStorage.getItem('0xr_locale');
  if (stored && LOCALES[stored]) return stored;

  // Check browser
  const browserLang = navigator.language.split('-')[0];
  if (LOCALES[browserLang]) return browserLang;

  return 'en';
}

/**
 * Set locale and persist
 * @param {string} locale
 */
function setLocale(locale) {
  if (!LOCALES[locale]) locale = 'en';
  currentLocale = locale;
  localStorage.setItem('0xr_locale', locale);
  document.documentElement.lang = locale;
}

/**
 * Translate a key
 * @param {string} key - dot notation supported (e.g. 'nav.dashboard')
 * @param {object} [params] - replacement params like {n}
 * @returns {string}
 */
function t(key, params = {}) {
  const keys = key.split('.');
  let value = LOCALES[currentLocale];

  for (const k of keys) {
    if (value && typeof value === 'object' && k in value) {
      value = value[k];
    } else {
      // Fallback to English
      value = LOCALES['en'];
      for (const k2 of keys) {
        if (value && typeof value === 'object' && k2 in value) {
          value = value[k2];
        } else {
          return key; // Return key if not found in fallback either
        }
      }
      break;
    }
  }

  if (typeof value !== 'string') return key;

  // Replace placeholders like {n}
  return value.replace(/\{(\w+)\}/g, (_, name) => {
    return params[name] !== undefined ? params[name] : '{' + name + '}';
  });
}

/**
 * Format relative time
 * @param {string} dateStr - ISO date string
 * @returns {string}
 */
function formatRelativeTime(dateStr) {
  if (!dateStr) return t('key.never');

  const date = new Date(dateStr);
  const now = Date.now();
  const diff = now - date.getTime();

  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);

  if (minutes < 1) return t('time.justNow');
  if (minutes < 60) return t('time.minutesAgo', { n: minutes });
  if (hours < 24) return t('time.hoursAgo', { n: hours });
  if (days < 30) return t('time.daysAgo', { n: days });

  return date.toLocaleDateString();
}

/**
 * Format date for display
 * @param {string} dateStr
 * @returns {string}
 */
function formatDate(dateStr) {
  if (!dateStr) return '—';
  const date = new Date(dateStr);
  return date.toLocaleDateString(currentLocale === 'tr' ? 'tr-TR' : 'en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
}

/**
 * Format datetime for display
 * @param {string} dateStr
 * @returns {string}
 */
function formatDateTime(dateStr) {
  if (!dateStr) return '—';
  const date = new Date(dateStr);
  return date.toLocaleDateString(currentLocale === 'tr' ? 'tr-TR' : 'en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
}

/**
 * Format number with separators
 * @param {number} num
 * @returns {string}
 */
function formatNumber(num) {
  return new Intl.NumberFormat(currentLocale === 'tr' ? 'tr-TR' : 'en-US').format(num);
}

/**
 * Format currency (USD)
 * @param {number} amount
 * @returns {string}
 */
function formatCurrency(amount) {
  return new Intl.NumberFormat(currentLocale === 'tr' ? 'tr-TR' : 'en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(amount);
}

/**
 * Get countdown text for expiry date
 * @param {string} expiryStr
 * @returns {string}
 */
function getCountdown(expiryStr) {
  if (!expiryStr) return null;
  const expiry = new Date(expiryStr);
  const now = Date.now();
  const diff = expiry - now;

  if (diff <= 0) return t('sub.status.expired');

  const days = Math.floor(diff / 86400000);
  const hours = Math.floor((diff % 86400000) / 3600000);

  if (days > 30) return formatDate(expiryStr);
  if (days > 0) return `${days}d ${hours}h`;
  if (hours > 0) return `${hours}h`;
  return t('time.justNow');
}

// Initialize on load
function initI18n() {
  setLocale(detectLocale());
}

// Export
window.I18n = {
  t,
  setLocale,
  getLocale: () => currentLocale,
  formatRelativeTime,
  formatDate,
  formatDateTime,
  formatNumber,
  formatCurrency,
  getCountdown
};