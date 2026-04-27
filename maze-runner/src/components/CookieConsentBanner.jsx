import { useMemo, useState } from "react";
import styles from "../styles/CookieConsentBanner.module.css";
import {
  clearOptionalGameStorage,
  getDefaultConsent,
  readConsent,
  saveConsent,
} from "../utils/consent";

const consentCategories = [
  {
    key: "necessary",
    title: "Necessary",
    description:
      "Required for core app behavior such as routing, interface state, and storing your consent choice.",
    required: true,
  },
  {
    key: "preferences",
    title: "Preferences",
    description:
      "Allows the game to remember settings and local gameplay-related preferences between sessions.",
    required: false,
  },
  {
    key: "analytics",
    title: "Analytics",
    description:
      "Currently not used. This option remains disabled unless real analytics are added later.",
    required: false,
  },
  {
    key: "marketing",
    title: "Marketing",
    description:
      "Currently not used. No advertising or third-party marketing cookies are enabled in this project.",
    required: false,
  },
];

export default function CookieConsentBanner() {
  const existingConsent = useMemo(() => readConsent(), []);
  const [isOpen, setIsOpen] = useState(!existingConsent);
  const [formState, setFormState] = useState(
    existingConsent || getDefaultConsent()
  );

  const updateToggle = (key, value) => {
    setFormState((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const persistConsent = (nextConsent) => {
    const saved = saveConsent(nextConsent);

    if (!saved.preferences) {
      clearOptionalGameStorage();
    }

    setFormState(saved);
    setIsOpen(false);
    window.dispatchEvent(new CustomEvent("maze-consent-updated"));
  };

  const acceptAll = () => {
    persistConsent({
      necessary: true,
      preferences: true,
      analytics: false,
      marketing: false,
    });
  };

  const rejectOptional = () => {
    persistConsent({
      necessary: true,
      preferences: false,
      analytics: false,
      marketing: false,
    });
  };

  const saveSelected = () => {
    persistConsent(formState);
  };

  return (
    <>
      {isOpen && (
        <div className={styles.overlay} role="presentation">
          <section
            className={styles.panel}
            aria-label="Cookie preferences"
            aria-live="polite"
          >
            <p className={styles.eyebrow}>Privacy controls</p>
            <h2 className={styles.title}>Cookie and local storage settings</h2>
            <p className={styles.description}>
              Maze Runner stores consent settings and may store gameplay
              preferences in your browser. You can accept optional storage,
              reject it, or customize the categories below.
            </p>

            <div className={styles.categoryList}>
              {consentCategories.map((category) => (
                <label key={category.key} className={styles.categoryCard}>
                  <div className={styles.categoryText}>
                    <span className={styles.categoryTitle}>
                      {category.title}
                    </span>
                    <span className={styles.categoryDescription}>
                      {category.description}
                    </span>
                  </div>

                  <input
                    type="checkbox"
                    checked={Boolean(formState[category.key])}
                    disabled={category.required || category.key !== "preferences"}
                    onChange={(event) =>
                      updateToggle(category.key, event.target.checked)
                    }
                  />
                </label>
              ))}
            </div>

            <p className={styles.policyNote}>
              More details are documented in the project file
              {" "}
              <code>PRIVACY_POLICY.md</code>.
            </p>

            <div className={styles.actions}>
              <button
                type="button"
                className={styles.secondaryButton}
                onClick={rejectOptional}
              >
                Reject optional
              </button>
              <button
                type="button"
                className={styles.secondaryButton}
                onClick={saveSelected}
              >
                Save selection
              </button>
              <button
                type="button"
                className={styles.primaryButton}
                onClick={acceptAll}
              >
                Accept selected
              </button>
            </div>
          </section>
        </div>
      )}

      {!isOpen && (
        <button
          type="button"
          className={styles.manageButton}
          onClick={() => setIsOpen(true)}
        >
          Privacy settings
        </button>
      )}
    </>
  );
}
