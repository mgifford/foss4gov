# FOSS4Gov Internationalization

This README explains how the internationalization (i18n) system works in the FOSS4Gov project.

## Overview

The i18n system is designed to support multiple languages through translations stored in YAML files. However, to ensure the application works correctly even when YAML files cannot be loaded (e.g., due to server path issues), the system includes fallback translations directly in JavaScript.

## Files

- **i18n.js**: Main internationalization implementation
- **translations.js**: Contains fallback translations for all supported languages
- **lang/*.yaml**: YAML files with translations (optional, used if available)

## How it Works

1. The system first tries to detect the user's preferred language based on browser settings
2. It then tries to load translations from the corresponding YAML file in the `lang/` directory
3. If the file cannot be loaded, it falls back to the built-in translations in `translations.js`
4. The language switcher in the UI allows users to manually change the language

## Supported Languages

- English (en)
- French (fr)
- German (de)
- Dutch (nl)
- Spanish (es)
- Italian (it)

## Debugging

If you're experiencing issues with the language switching:

1. Open your browser's developer console (F12 or Ctrl+Shift+I)
2. Look for any errors related to loading language files
3. Try using the `language-test.html` page to test the i18n system in isolation

## Server Setup

The application expects language files to be accessible at `/lang/[language-code].yaml` relative to the application's URL. If you're experiencing 404 errors when loading language files, you may need to:

1. Ensure the `lang/` directory is in the correct location
2. Configure your web server to serve the files correctly
3. Update the paths in `i18n.js` if necessary

## Deployment Notes

When deploying to a production environment:

1. Make sure all language files are included
2. If using a different directory structure, update the paths in `i18n.js`
3. Test language switching before and after deployment

## Troubleshooting

If language switching doesn't work:

1. Check if the language switcher appears in the UI
2. Look for console errors when clicking language options
3. Verify that `translations.js` is being loaded correctly
4. Try accessing the YAML files directly in your browser to confirm they're accessible