/**
 * Internationalization (i18n) functionality for FOSS4Gov
 * Handles loading language files, language switching, and applying translations
 */

// Available languages and their codes
const LANGUAGES = {
  en: {
    name: "English",
    file: "english.yaml"
  },
  fr: {
    name: "Français",
    file: "french.yaml"
  },
  de: {
    name: "Deutsch",
    file: "german.yaml"
  },
  nl: {
    name: "Nederlands",
    file: "dutch.yaml"
  },
  es: {
    name: "Español",
    file: "spanish.yaml"
  },
  it: {
    name: "Italiano",
    file: "italian.yaml"
  }
};

// Current language and translations
let currentLanguage = "en";
let translations = {};

/**
 * Detects the user's preferred language from browser settings
 * @returns {string} The language code (en, fr, de, etc.)
 */
function detectLanguage() {
  // Get browser language preferences
  const browserLangs = navigator.languages || [navigator.language || navigator.userLanguage];
  
  // Try to match with our available languages
  for (const lang of browserLangs) {
    const langCode = lang.split('-')[0].toLowerCase();
    if (LANGUAGES[langCode]) {
      return langCode;
    }
  }
  
  // Default to English if no match
  return "en";
}

/**
 * Loads translations from a YAML file
 * @param {string} lang - Language code to load
 * @returns {Promise} Promise resolving to the translations object
 */
/**
 * Loads translations for the specified language
 * @param {string} lang 
 * @returns {Promise<Object>}
 */
function loadTranslations(lang) {
  console.log(`Loading translations for: ${lang}`);
  
  // Skip fetch entirely and use fallback translations
  if (FALLBACK_TRANSLATIONS && FALLBACK_TRANSLATIONS[lang]) {
    console.log(`Using built-in fallback translations for ${lang}`);
    translations = FALLBACK_TRANSLATIONS[lang];
    return Promise.resolve(translations);
  }
  
  // Use fallback English if we don't have translations for this language
  if (lang !== 'en' && FALLBACK_TRANSLATIONS && FALLBACK_TRANSLATIONS['en']) {
    console.log(`No translations available for ${lang}, using English`);
    translations = FALLBACK_TRANSLATIONS['en'];
    return Promise.resolve(translations);
  }
  
  // If we reached here without returning, we don't have fallback translations
  return Promise.reject(new Error(`No translations available for ${lang}`));
}

/**
 * Get translation for a key, supporting nested keys
 * @param {string} key - Key in the format "section.subsection.item"
 * @returns {string|null} The translation or null if not found
 */
function getTranslation(key) {
  const keys = key.split('.');
  let result = translations;
  
  for (const k of keys) {
    if (result && typeof result === 'object' && k in result) {
      result = result[k];
    } else {
      return null;
    }
  }
  
  return typeof result === 'string' ? result : null;
}

/**
 * Applies translations to the current page
 */
function applyTranslations() {
  console.log('Applying translations to the page');
  if (!translations) {
    console.error('No translations loaded');
    return;
  }

  // Apply translations to elements with data-i18n attribute
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    const translation = getTranslation(key);
    
    if (translation) {
      // Check if the element is an input with placeholder
      if (el.tagName === 'INPUT' && el.hasAttribute('placeholder')) {
        el.placeholder = translation;
      } else if (el.tagName === 'INPUT' && el.type === 'submit') {
        el.value = translation;
      } else {
        el.textContent = translation;
      }
    } else {
      console.warn(`Translation not found for key: ${key}`);
    }
  });
  
  // Handle special cases like title
  const titleKey = document.querySelector('title').getAttribute('data-i18n');
  if (titleKey) {
    const titleTranslation = getTranslation(titleKey);
    if (titleTranslation) {
      document.title = titleTranslation;
    }
  }
  
  console.log('Translations applied');
}

/**
 * Changes the language and applies translations
 * @param {string} lang 
 */
function changeLanguage(lang) {
  console.log(`Changing language to: ${lang}`);
  currentLanguage = lang;
  loadTranslations(lang).then(() => {
    // Apply translations after they're loaded
    applyTranslations();
    
    // Save language preference
    localStorage.setItem('preferredLanguage', lang);
    
    // Update active language in UI
    document.querySelectorAll('.lang-list a').forEach(el => {
      if (el.getAttribute('data-lang') === lang) {
        el.classList.add('active');
      } else {
        el.classList.remove('active');
      }
    });
    
    console.log(`Language changed to: ${lang}`);
  }).catch(error => {
    console.error(`Failed to change language to ${lang}:`, error);
  });
}

/**
 * Initialize the internationalization system
 */
function initI18n() {
  // Check for saved language preference
  const savedLang = localStorage.getItem('preferredLanguage');
  
  // Detect language if no preference saved
  const detectedLang = detectLanguage();
  
  // Use saved language, detected language, or default to English
  currentLanguage = savedLang || detectedLang || 'en';
  
  console.log(`Initializing i18n with language: ${currentLanguage}`);
  
  // Create the language switcher UI
  createLanguageSwitcher();
  
  // Load translations and apply them
  loadTranslations(currentLanguage).then(() => {
    // Apply translations after they're loaded
    applyTranslations();
    
    // Mark the current language as active in the UI
    document.querySelectorAll('.lang-list a').forEach(el => {
      if (el.getAttribute('data-lang') === currentLanguage) {
        el.classList.add('active');
      }
    });
    
    console.log('i18n initialization complete');
  }).catch(error => {
    console.error('Failed to initialize i18n:', error);
  });
}

/**
 * Creates the language switcher UI
 */
function createLanguageSwitcher() {
  // Create the language switcher container
  const switcher = document.createElement('div');
  switcher.className = 'lang-switcher';
  
  // Create the language options
  const langList = document.createElement('div');
  langList.className = 'lang-list';
  
  // Create language label
  const label = document.createElement('span');
  label.className = 'lang-label';
  label.textContent = 'Language: ';
  langList.appendChild(label);
  
  Object.entries(LANGUAGES).forEach(([code, data]) => {
    const langLink = document.createElement('a');
    langLink.href = '#';
    langLink.setAttribute('data-lang', code);
    langLink.textContent = data.name;
    
    // Use a direct event handler with explicit binding for older browsers
    langLink.addEventListener('click', function(e) {
      e.preventDefault();
      console.log(`Language link clicked: ${code}`);
      changeLanguage(code);
      return false;
    });
    
    langList.appendChild(langLink);
  });
  
  // Add the language switcher to the header
  switcher.appendChild(langList);
  const header = document.querySelector('header .wrap');
  if (header) {
    header.appendChild(switcher);
  }
  
  // Add styles for the language switcher
  const style = document.createElement('style');
  style.textContent = `
    .lang-switcher {
      position: absolute;
      top: 1rem;
      right: 1rem;
      z-index: 100;
    }
    .lang-list {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
      background: var(--surface);
      padding: 0.5rem;
      border-radius: 0.5rem;
      border: 1px solid #1f2937;
      align-items: center;
      box-shadow: 0 2px 5px rgba(0,0,0,0.2);
    }
    .lang-label {
      color: var(--muted);
      margin-right: 0.25rem;
      font-weight: bold;
    }
    .lang-list a {
      color: var(--muted);
      text-decoration: none;
      padding: 0.25rem 0.5rem;
      border-radius: 0.25rem;
      cursor: pointer;
      transition: all 0.2s ease;
      border: 1px solid transparent;
    }
    .lang-list a.active {
      background: var(--accent);
      color: #0b0f14;
      font-weight: bold;
      border-color: #0b0f14;
    }
    .lang-list a:hover:not(.active) {
      color: var(--text);
      background: #1f2937;
      transform: translateY(-2px);
    }
  `;
  document.head.appendChild(style);
}

// Update loadCompanies function to use translations
async function loadCompanies() {
  const listContainer = document.getElementById('company-list');
  try {
    // Sample companies data for testing
    const sampleCompaniesData = `name,english,website,email,linkedin,github,otherRepo
OpenDrupal,Open Drupal,https://www.opendrupal.org,info@opendrupal.org,https://linkedin.com/company/opendrupal,https://github.com/opendrupal,
Acquia,,https://www.acquia.com,info@acquia.com,https://linkedin.com/company/acquia,https://github.com/acquia,
CivicActions,,https://civicactions.com,info@civicactions.com,https://linkedin.com/company/civicactions,https://github.com/civicactions,
Jadu,,https://www.jadu.net,info@jadu.net,https://linkedin.com/company/jadu,https://github.com/jadu,`;
    
    // Parse the CSV data directly
    const csvData = sampleCompaniesData;
    const rows = csvData.trim().split('\n');
    
    // Always skip the first row as it contains headers
    const dataRows = rows.slice(1);
             
    if (dataRows.length === 0 || (dataRows.length === 1 && dataRows[0].trim() === '')) {
      const emptyMessage = getTranslation('companies.empty') || 'No companies found';
      listContainer.innerHTML = `<p>${emptyMessage}</p>`;
      return;
    }
    
    listContainer.innerHTML = ''; // Clear "Loading..." message

    dataRows.forEach(rowStr => {
      if (rowStr.trim() === '') return;
      // Regex to split CSV row while respecting quotes
      const row = rowStr.match(/(".*?"|[^",]+)(?=\s*,|\s*$)/g) || [];
      const unquote = (s) => s.startsWith('"') && s.endsWith('"') ? s.slice(1, -1).replace(/""/g, '"') : s;

      const company = {
        name: unquote(row[0] || ''),
        english: unquote(row[1] || ''),
        website: unquote(row[2] || ''),
        email: unquote(row[3] || ''),
        linkedin: unquote(row[4] || ''),
        github: unquote(row[5] || ''),
        otherRepo: unquote(row[6] || '')
      };

      if (!company.name || !company.website) return; // Skip invalid rows

      const card = document.createElement('div');
      card.className = 'card';

      let links = [
        company.github ? `<a href="${company.github}">GitHub</a>` : null,
        company.linkedin ? `<a href="${company.linkedin}">LinkedIn</a>` : null,
        company.otherRepo ? `<a href="${company.otherRepo}">Git Repo</a>` : null,
        company.email ? `<a href="mailto:${company.email}">Email</a>` : null,
      ].filter(Boolean).join(' | ');

      card.innerHTML = `
        <h3><a href="${company.website}" rel="noopener noreferrer">${company.name}</a></h3>
        ${company.english ? `<p><em>(${company.english})</em></p>` : ''}
        ${links ? `<p class="links">${links}</p>` : ''}
      `;
      listContainer.appendChild(card);
    });
  } catch (error) {
    console.error('Error loading companies:', error);
    const errorMsg = getTranslation('companies.error') || 'Error loading companies: {error}';
    listContainer.innerHTML = `<p>${errorMsg.replace('{error}', error.message)}</p>`;
  }
}

// Update other functions to use translations
function setError(msg) {
  const el = document.getElementById("errorSummary");
  el.hidden = false;
  el.textContent = msg || getTranslation('form.validation.required_fields') || 'Please fill in all required fields';
}

function encodeIssue(fields) {
  const title = (getTranslation('issue.title') || 'Add {name} to FOSS4Gov').replace('{name}', fields.name);
  const companyDetails = getTranslation('issue.company_details') || 'Company Details:';
  const confirmation = getTranslation('issue.confirmation') || 'Confirmation:';
  const confirmationText = getTranslation('issue.confirmation_text') || 'I confirm this company meets the requirements for inclusion.';
  
  const bodyLines = [
    companyDetails,
    `- Name: ${fields.name}`,
    fields.english ? `- English alternative: ${fields.english}` : null,
    `- Website: ${fields.website}`,
    fields.email ? `- Info email: ${fields.email}` : null,
    fields.linkedin ? `- LinkedIn: ${fields.linkedin}` : null,
    fields.github ? `- GitHub: ${fields.github}` : null,
    fields.otherRepo ? `- Other public Git repo: ${fields.otherRepo}` : null,
    "\n" + confirmation,
    confirmationText
  ].filter(Boolean).join("\n");

  const params = new URLSearchParams({
    title,
    body: bodyLines
  });
  return params.toString();
}

// Export functions for use in the main script
window.i18n = {
  initI18n,
  changeLanguage,
  loadTranslations,
  currentTranslations: () => translations,
  loadCompanies: loadCompanies
};