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
  
  // Always ensure we have the fallback translations
  if (FALLBACK_TRANSLATIONS && FALLBACK_TRANSLATIONS[lang]) {
    console.log(`Found fallback translations for ${lang}`);
    translations = FALLBACK_TRANSLATIONS[lang];
    
    // Special debug for German
    if (lang === 'de') {
      console.log('German translations loaded:', translations);
      console.log('App title:', translations.app?.title);
      console.log('Form name label:', translations.form?.name);
    }
    
    // If we're running from a file:// URL, don't try to fetch YAML files
    // as it will be blocked by CORS. Instead, just use the fallback translations.
    if (window.location.protocol === 'file:') {
      console.log('Running from file:// protocol, using fallback translations only');
      return Promise.resolve(translations);
    }
  } else if (lang !== 'en' && FALLBACK_TRANSLATIONS && FALLBACK_TRANSLATIONS['en']) {
    console.log(`No fallback translations for ${lang}, using English fallback`);
    translations = FALLBACK_TRANSLATIONS['en'];
    if (window.location.protocol === 'file:') {
      return Promise.resolve(translations);
    }
  }
  
  // If we're running from a server (http/https), try to load YAML files
  if (LANGUAGES[lang] && LANGUAGES[lang].file) {
    const langFile = `./lang/${LANGUAGES[lang].file}`;
    console.log(`Attempting to load language file: ${langFile}`);
    
    return fetch(langFile)
      .then(response => {
        if (!response.ok) {
          throw new Error(`Failed to load language file: ${response.status} ${response.statusText}`);
        }
        return response.text();
      })
      .then(yamlText => {
        try {
          // Parse YAML content
          const yamlData = jsyaml.load(yamlText);
          console.log(`Successfully loaded and parsed YAML for ${lang}`);
          
          // Merge with fallback translations to ensure we have complete data
          const merged = {};
          
          // Use fallback translations as a base
          if (FALLBACK_TRANSLATIONS && FALLBACK_TRANSLATIONS[lang]) {
            Object.assign(merged, FALLBACK_TRANSLATIONS[lang]);
          }
          
          // Merge with YAML data, giving priority to YAML
          if (yamlData) {
            // Merge top-level properties
            Object.keys(yamlData).forEach(key => {
              if (typeof yamlData[key] === 'object' && yamlData[key] !== null) {
                // For objects, merge deeply
                merged[key] = merged[key] || {};
                Object.assign(merged[key], yamlData[key]);
              } else {
                // For primitives, just replace
                merged[key] = yamlData[key];
              }
            });
            
            // Special handling for app properties that might be at root level
            if (yamlData.app) {
              merged.app = merged.app || {};
              Object.assign(merged.app, yamlData.app);
            }
          }
          
          translations = merged;
          return translations;
        } catch (error) {
          console.error(`Error parsing YAML for ${lang}:`, error);
          throw error;
        }
      })
      .catch(error => {
        console.error(`Error loading language file for ${lang}:`, error);
        // Fall back to built-in translations
        if (FALLBACK_TRANSLATIONS && FALLBACK_TRANSLATIONS[lang]) {
          console.log(`Using fallback translations for ${lang}`);
          translations = FALLBACK_TRANSLATIONS[lang];
          return translations;
        }
        throw error;
      });
  }
  
  // If we can't load from file, use fallback translations
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
  if (!key) return null;
  if (!translations) return null;
  
  const keys = key.split('.');
  let result = translations;
  
  // Debug for important keys
  if (key === 'app.title' || key === 'form.name') {
    console.log(`Looking up translation for "${key}" in language ${currentLanguage}`);
  }
  
  for (const k of keys) {
    if (result && typeof result === 'object' && k in result) {
      result = result[k];
    } else {
      // If we can't find it, try in fallback directly
      if (FALLBACK_TRANSLATIONS && FALLBACK_TRANSLATIONS[currentLanguage]) {
        let fallbackResult = FALLBACK_TRANSLATIONS[currentLanguage];
        let found = true;
        
        for (const fallbackKey of keys) {
          if (fallbackResult && typeof fallbackResult === 'object' && fallbackKey in fallbackResult) {
            fallbackResult = fallbackResult[fallbackKey];
          } else {
            found = false;
            break;
          }
        }
        
        if (found && typeof fallbackResult === 'string') {
          if (key === 'app.title' || key === 'form.name') {
            console.log(`Found "${key}" in fallback translations: "${fallbackResult}"`);
          }
          return fallbackResult;
        }
      }
      
      if (key === 'app.title' || key === 'form.name') {
        console.log(`Translation not found for "${key}"`);
      }
      return null;
    }
  }
  
  if (key === 'app.title' || key === 'form.name') {
    console.log(`Found translation for "${key}": "${result}"`);
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
  
  console.log(`Current language: ${currentLanguage}`);
  console.log('Translation object keys:', Object.keys(translations));
  
  // For German debug
  if (currentLanguage === 'de') {
    console.log('German app title:', translations.app?.title);
    console.log('German form name:', translations.form?.name);
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
      
      // Debug for specific elements (in German)
      if (currentLanguage === 'de' && (key === 'app.title' || key === 'form.name')) {
        console.log(`Applied translation for ${key}: "${translation}"`);
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
  
  // Set the HTML lang attribute for the whole page
  const htmlRoot = document.getElementById('htmlRoot');
  if (htmlRoot) {
    htmlRoot.setAttribute('lang', lang);
    console.log(`Set HTML lang attribute to: ${lang}`);
  }
  
  // Ensure we have at least the fallback translations loaded immediately
  if (FALLBACK_TRANSLATIONS && FALLBACK_TRANSLATIONS[lang]) {
    translations = FALLBACK_TRANSLATIONS[lang];
    applyTranslations();
  }
  
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
  // Check for lang param in URL
  const urlParams = new URLSearchParams(window.location.search);
  const urlLang = urlParams.get('lang');
  // Check for saved language preference
  const savedLang = localStorage.getItem('preferredLanguage');
  // Detect language if no preference saved
  const detectedLang = detectLanguage();
  // Use lang from URL, then saved, then detected, then default to English
  currentLanguage = urlLang || savedLang || detectedLang || 'en';
  console.log(`Initializing i18n with language: ${currentLanguage}`);
  
  // Set the HTML lang attribute for the whole page
  const htmlRoot = document.getElementById('htmlRoot');
  if (htmlRoot) {
    htmlRoot.setAttribute('lang', currentLanguage);
    console.log(`Set HTML lang attribute to: ${currentLanguage}`);
  } else {
    console.error('Could not find HTML root element to set language');
  }
  
  // Create the language switcher UI
  createLanguageSwitcher();
  
  // Ensure we have the fallback translations loaded first
  if (FALLBACK_TRANSLATIONS && FALLBACK_TRANSLATIONS[currentLanguage]) {
    translations = FALLBACK_TRANSLATIONS[currentLanguage];
    applyTranslations();
  } else if (FALLBACK_TRANSLATIONS && FALLBACK_TRANSLATIONS['en']) {
    translations = FALLBACK_TRANSLATIONS['en'];
    applyTranslations();
  }
  
  // Then try to load and apply translations from YAML files
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
  switcher.setAttribute('role', 'navigation');
  switcher.setAttribute('aria-label', 'Language selection');
  
  // Create the language options
  const langList = document.createElement('div');
  langList.className = 'lang-list';
  
  // Create language label
  const label = document.createElement('span');
  label.className = 'lang-label';
  label.id = 'lang-selector-label';
  label.textContent = 'Language: ';
  langList.appendChild(label);
  langList.setAttribute('aria-labelledby', 'lang-selector-label');
  
  Object.entries(LANGUAGES).forEach(([code, data]) => {
    const langLink = document.createElement('a');
    // Set the URL to ?lang=xx, preserving other query params
    const url = new URL(window.location.href);
    url.searchParams.set('lang', code);
    langLink.href = url.pathname + url.search;
    langLink.setAttribute('data-lang', code);
    langLink.setAttribute('lang', code);  // Add lang attribute for screen readers and browsers
    langLink.textContent = data.name;
    langLink.setAttribute('aria-label', `Switch to ${data.name}`);
    langLink.setAttribute('role', 'button');
    langLink.addEventListener('click', function(e) {
      e.preventDefault();
      // Change the URL and reload the page
      window.location.href = langLink.href;
      return false;
    });
    // Add keyboard event listener
    langLink.addEventListener('keydown', function(e) {
      // Handle Enter and Space
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        window.location.href = langLink.href;
      }
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
      border: 1px solid var(--border);
      align-items: center;
      box-shadow: 0 2px 5px rgba(0,0,0,0.2);
    }
    .lang-label {
      color: var(--muted);
      margin-right: 0.25rem;
      font-weight: bold;
    }
    .lang-list a {
      color: var(--text);
      text-decoration: none;
      padding: 0.25rem 0.5rem;
      border-radius: 0.25rem;
      cursor: pointer;
      transition: all 0.2s ease;
      border: 1px solid transparent;
      display: inline-block;
    }
    .lang-list a.active {
      background: var(--accent);
      color: #0b0f14;
      font-weight: bold;
      border-color: #0b0f14;
    }
    .lang-list a:hover:not(.active) {
      background: var(--border);
      transform: translateY(-2px);
    }
    .lang-list a:focus {
      outline: 3px solid var(--focus);
      outline-offset: 2px;
      text-decoration: underline;
    }
  `;
  document.head.appendChild(style);
}

// Update loadCompanies function to use translations
async function loadCompanies() {
  const listContainer = document.getElementById('company-list');
  try {
    console.log("Attempting to fetch companies.csv...");
    
    // Add cache-busting query parameter to prevent browser caching
    const cacheBuster = `?nocache=${new Date().getTime()}`;
    
    // Set up fetch options to disable caching
    const fetchOptions = {
      method: 'GET',
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0'
      },
      cache: 'no-store'
    };
    
    // Fetch the actual companies.csv file with cache busting
    const response = await fetch('companies.csv' + cacheBuster, fetchOptions);
    if (!response.ok) {
      console.error(`CSV fetch failed with status: ${response.status} ${response.statusText}`);
      throw new Error(`Failed to load companies: ${response.status} ${response.statusText}`);
    }
    
    console.log("CSV fetch successful, parsing data...");
    // Parse the CSV data
    const csvData = await response.text();
    console.log("CSV data:", csvData.substring(0, 100) + "..."); // Log the first 100 chars
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
        english_name: unquote(row[1] || ''),
        website: unquote(row[2] || ''),
        info_email: unquote(row[3] || ''),
        linkedin: unquote(row[4] || ''),
        github: unquote(row[5] || ''),
        other_repo: unquote(row[6] || '')
      };

      if (!company.name || !company.website) return; // Skip invalid rows

      const card = document.createElement('div');
      card.className = 'card';

      // Create links without tabindex
      let links = [];
      if (company.github) {
        links.push(`<a href="${company.github}">GitHub</a>`);
      }
      if (company.linkedin) {
        links.push(`<a href="${company.linkedin}">LinkedIn</a>`);
      }
      if (company.other_repo) {
        links.push(`<a href="${company.other_repo}">Git Repo</a>`);
      }
      if (company.info_email) {
        links.push(`<a href="mailto:${company.info_email}">Email</a>`);
      }
      
      const linksHtml = links.length > 0 ? links.join(' | ') : '';

      card.innerHTML = `
        <h3><a href="${company.website}" rel="noopener noreferrer">${company.name}</a></h3>
        ${company.english_name ? `<p><em>(${company.english_name})</em></p>` : ''}
        ${linksHtml ? `<p class="links">${linksHtml}</p>` : ''}
      `;
      listContainer.appendChild(card);
    });
  } catch (error) {
    console.error('Error loading companies:', error);
    const errorMsg = getTranslation('companies.error') || 'Error loading companies: {error}';
    listContainer.innerHTML = `<p>${errorMsg.replace('{error}', error.message)}</p>`;
    
    // Additional error details for debugging
    console.log("Browser location:", window.location.href);
    console.log("Trying to fetch from:", new URL('companies.csv', window.location.href).href);
    
    // Try a fallback approach with sample data if fetch fails
    console.log("Attempting fallback with sample data...");
    try {
      const fallbackData = `name,english_name,website,info_email,linkedin,github,other_repo
"Example Company","Example Inc.","https://example.org","info@example.org","https://www.linkedin.com/company/example","https://github.com/example",""
"Example Company 2","Example Inc. 2","https://example.com","info@example.com","https://www.linkedin.com/company/example","https://github.com/example",""`;
      
      const fallbackRows = fallbackData.trim().split('\n');
      const fallbackDataRows = fallbackRows.slice(1);
      
      listContainer.innerHTML = '<p><strong>Using fallback sample data (CSV fetch failed)</strong></p>';
      
      fallbackDataRows.forEach(rowStr => {
        if (rowStr.trim() === '') return;
        const row = rowStr.match(/(".*?"|[^",]+)(?=\s*,|\s*$)/g) || [];
        const unquote = (s) => s.startsWith('"') && s.endsWith('"') ? s.slice(1, -1).replace(/""/g, '"') : s;

        const company = {
          name: unquote(row[0] || ''),
          english_name: unquote(row[1] || ''),
          website: unquote(row[2] || ''),
          info_email: unquote(row[3] || ''),
          linkedin: unquote(row[4] || ''),
          github: unquote(row[5] || ''),
          other_repo: unquote(row[6] || '')
        };

        if (!company.name || !company.website) return;

        const card = document.createElement('div');
        card.className = 'card';

        let links = [];
        if (company.github) links.push(`<a href="${company.github}">GitHub</a>`);
        if (company.linkedin) links.push(`<a href="${company.linkedin}">LinkedIn</a>`);
        if (company.other_repo) links.push(`<a href="${company.other_repo}">Git Repo</a>`);
        if (company.info_email) links.push(`<a href="mailto:${company.info_email}">Email</a>`);
        
        const linksHtml = links.length > 0 ? links.join(' | ') : '';

        card.innerHTML = `
          <h3><a href="${company.website}" rel="noopener noreferrer">${company.name}</a></h3>
          ${company.english_name ? `<p><em>(${company.english_name})</em></p>` : ''}
          ${linksHtml ? `<p class="links">${linksHtml}</p>` : ''}
        `;
        listContainer.appendChild(card);
      });
    } catch (fallbackError) {
      console.error('Fallback also failed:', fallbackError);
    }
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
  get currentLanguage() { return currentLanguage; },
  currentTranslations: () => {
    // Return the current translations object, or a fallback if it's empty
    if (translations && Object.keys(translations).length > 0) {
      return translations;
    }
    
    // If translations are empty, try to use the fallback
    if (FALLBACK_TRANSLATIONS && FALLBACK_TRANSLATIONS[currentLanguage]) {
      return FALLBACK_TRANSLATIONS[currentLanguage];
    }
    
    // Last resort, use English fallback
    if (FALLBACK_TRANSLATIONS && FALLBACK_TRANSLATIONS['en']) {
      return FALLBACK_TRANSLATIONS['en'];
    }
    
    return {};
  },
  loadCompanies: loadCompanies
};