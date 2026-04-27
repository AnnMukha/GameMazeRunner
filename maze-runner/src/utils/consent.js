const CONSENT_KEY = "mazeCookieConsent";
const CONSENT_VERSION = 1;

const defaultConsent = {
  necessary: true,
  preferences: false,
  analytics: false,
  marketing: false,
  version: CONSENT_VERSION,
  updatedAt: null,
};

export function getDefaultConsent() {
  return { ...defaultConsent };
}

export function readConsent() {
  try {
    const raw = localStorage.getItem(CONSENT_KEY);
    if (!raw) return null;

    const parsed = JSON.parse(raw);
    return {
      ...defaultConsent,
      ...parsed,
      necessary: true,
      version: CONSENT_VERSION,
    };
  } catch {
    return null;
  }
}

export function saveConsent(consent) {
  const normalized = {
    ...defaultConsent,
    ...consent,
    necessary: true,
    version: CONSENT_VERSION,
    updatedAt: new Date().toISOString(),
  };

  localStorage.setItem(CONSENT_KEY, JSON.stringify(normalized));
  return normalized;
}

export function hasPreferencesConsent() {
  const consent = readConsent();
  return Boolean(consent?.preferences);
}

export function clearOptionalGameStorage() {
  localStorage.removeItem("mazeSettings");
  localStorage.removeItem("mazeStats");
}

export function clearOptionalStats() {
  localStorage.removeItem("mazeStats");
}

export { CONSENT_KEY, CONSENT_VERSION };
