/**
 * Fallback translations for all supported languages
 */
const FALLBACK_TRANSLATIONS = {
  en: {
    app: {
      title: "FOSS4Gov",
      tagline: "Open Source Companies for Government",
      description: "Open innovation allows governments to adapt, experiment, and avoid lock-in. Collaboration is essential to healthy democracies. Public code strengthens digital public goods."
    },
    nav: {
      home: "Home",
      companies: "Companies",
      contribute: "Contribute",
      add_company: "Add your company",
      create_issue: "Create a GitHub Issue"
    },
    contribute: {
      title: "How to contribute",
      step1: "Fork the repository.",
      step2: "Add your company to the companies.csv file and submit a Pull Request.",
      step3: "Or, create a GitHub Issue with the same details using the form below.",
      merit_notice: "No ads, no pay-to-play. Listing is merit based and focused on real FOSS contributions to digital public goods.",
      data_notice: "This page does not collect or store form data. The form below generates a prefilled GitHub Issue link or PR payload for you to submit to the repository."
    },
    companies: {
      title: "Listed Companies",
      loading: "Loading companies...",
      empty: "No companies found.",
      error: "Error loading companies: {error}"
    },
    criteria: {
      title: "Listing criteria",
      item1: "Active use of FOSS in delivery of government digital services.",
      item2: "Documented contributions to upstream projects. Examples include merged pull requests, maintainership, or financial support with transparency.",
      item3: "Clear governance and security practices. Preference for OSI-approved licenses."
    },
    form: {
      title: "Generate your submission",
      required_notice: "Fields marked with * are required.",
      name: "Company name *",
      english: "English alternative (if applicable)",
      website: "Website *",
      email: "Info email",
      linkedin: "LinkedIn profile",
      github: "GitHub profile",
      other_repo: "Other public Git repository",
      build_issue: "Build GitHub Issue",
      build_csv: "Build CSV row for PR",
      submit: "Submit",
      validation: {
        required_fields: "Please fill in all required fields.",
        invalid_url: "Please enter a valid URL.",
        invalid_email: "Please enter a valid email address.",
        error_heading: "Form Error:"
      },
      output: {
        issue_link: "GitHub Issue Link:",
        csv_row: "CSV Row:"
      }
    },
    issue: {
      title: "Add {name} to FOSS4Gov",
      company_details: "Company Details:",
      confirmation: "Confirmation:",
      confirmation_text: "I confirm this company meets the requirements for inclusion."
    },
    navigation: {
      skip_to_form: "Skip to submission form"
    },
    footer: {
      privacy: "Built for openness and speed. No trackers. No cookies.",
      accessibility: "Keyboard tips: Tab to move focus. Shift+Tab to go back. Enter to activate buttons and links.",
      a11y_info: "This site aims to meet WCAG 2.2 AA standards with proper keyboard navigation, focus indicators, color contrast, and screen reader support.",
      report_issues: "Report accessibility issues"
    }
  },
  fr: {
    app: {
      title: "FOSS4Gov",
      tagline: "Entreprises Open Source pour le Gouvernement",
      description: "L'innovation ouverte permet aux gouvernements de s'adapter, d'expérimenter et d'éviter l'enfermement. La collaboration est essentielle aux démocraties saines. Le code public renforce les biens publics numériques."
    },
    nav: {
      home: "Accueil",
      companies: "Entreprises",
      contribute: "Contribuer",
      add_company: "Ajouter votre entreprise",
      create_issue: "Créer un problème GitHub"
    },
    contribute: {
      title: "Comment contribuer",
      step1: "Forkez le dépôt.",
      step2: "Ajoutez votre entreprise au fichier companies.csv et soumettez une Pull Request.",
      step3: "Ou créez un problème GitHub avec les mêmes détails en utilisant le formulaire ci-dessous.",
      merit_notice: "Pas de publicité, pas de paiement pour jouer. La liste est basée sur le mérite et se concentre sur les contributions FOSS réelles aux biens publics numériques.",
      data_notice: "Cette page ne collecte ni ne stocke les données du formulaire. Le formulaire ci-dessous génère un lien de problème GitHub prérempli ou une charge utile PR à soumettre au dépôt."
    },
    companies: {
      title: "Entreprises Listées",
      loading: "Chargement des entreprises...",
      empty: "Aucune entreprise trouvée.",
      error: "Erreur lors du chargement des entreprises: {error}"
    },
    criteria: {
      title: "Critères d'inscription",
      item1: "Utilisation active de FOSS dans la prestation de services numériques gouvernementaux.",
      item2: "Contributions documentées aux projets en amont. Les exemples incluent les pull requests fusionnées, la maintenance ou le soutien financier avec transparence.",
      item3: "Pratiques claires de gouvernance et de sécurité. Préférence pour les licences approuvées par l'OSI."
    },
    form: {
      title: "Générer votre soumission",
      required_notice: "Les champs marqués d'un * sont obligatoires.",
      name: "Nom de l'entreprise *",
      english: "Alternative en anglais (si applicable)",
      website: "Site Web *",
      email: "Email d'info",
      linkedin: "Profil LinkedIn",
      github: "Profil GitHub",
      other_repo: "Autre dépôt Git public",
      build_issue: "Construire un problème GitHub",
      build_csv: "Construire une ligne CSV pour PR",
      submit: "Soumettre",
      validation: {
        required_fields: "Veuillez remplir tous les champs obligatoires.",
        invalid_url: "Veuillez entrer une URL valide.",
        invalid_email: "Veuillez entrer une adresse email valide.",
        error_heading: "Erreur de formulaire:"
      },
      output: {
        issue_link: "Lien de l'Issue GitHub:",
        csv_row: "Ligne CSV:"
      }
    },
    issue: {
      title: "Ajouter {name} à FOSS4Gov",
      company_details: "Détails de l'Entreprise:",
      confirmation: "Confirmation:",
      confirmation_text: "Je confirme que cette entreprise répond aux critères d'inclusion."
    },
    navigation: {
      skip_to_form: "Passer au formulaire de soumission"
    },
    footer: {
      privacy: "Construit pour l'ouverture et la rapidité. Pas de trackers. Pas de cookies.",
      accessibility: "Conseils clavier: Tab pour déplacer le focus. Shift+Tab pour revenir en arrière. Entrée pour activer les boutons et les liens.",
      a11y_info: "Ce site vise à respecter les normes WCAG 2.2 AA avec une navigation au clavier appropriée, des indicateurs de focus, un contraste de couleur et une prise en charge des lecteurs d'écran.",
      report_issues: "Signaler des problèmes d'accessibilité"
    }
  },
  de: {
    app: {
      title: "FOSS4Gov",
      tagline: "Open-Source-Unternehmen für die Regierung",
      description: "Offene Innovation ermöglicht es Regierungen, sich anzupassen, zu experimentieren und Abhängigkeiten zu vermeiden. Zusammenarbeit ist wesentlich für gesunde Demokratien. Öffentlicher Code stärkt digitale öffentliche Güter."
    },
    nav: {
      home: "Startseite",
      companies: "Unternehmen",
      contribute: "Beitragen",
      add_company: "Fügen Sie Ihr Unternehmen hinzu",
      create_issue: "GitHub-Issue erstellen"
    },
    contribute: {
      title: "Wie man beiträgt",
      step1: "Forken Sie das Repository.",
      step2: "Fügen Sie Ihr Unternehmen zur Datei companies.csv hinzu und reichen Sie einen Pull Request ein.",
      step3: "Oder erstellen Sie ein GitHub-Issue mit denselben Details über das untenstehende Formular.",
      merit_notice: "Keine Werbung, kein Pay-to-Play. Die Auflistung basiert auf Verdiensten und konzentriert sich auf echte FOSS-Beiträge zu digitalen öffentlichen Gütern.",
      data_notice: "Diese Seite sammelt oder speichert keine Formulardaten. Das untenstehende Formular generiert einen vorausgefüllten GitHub-Issue-Link oder PR-Payload zur Einreichung im Repository."
    },
    companies: {
      title: "Gelistete Unternehmen",
      loading: "Unternehmen werden geladen...",
      empty: "Keine Unternehmen gefunden.",
      error: "Fehler beim Laden der Unternehmen: {error}"
    },
    criteria: {
      title: "Aufnahmekriterien",
      item1: "Aktive Nutzung von FOSS bei der Bereitstellung digitaler Regierungsdienste.",
      item2: "Dokumentierte Beiträge zu Upstream-Projekten. Beispiele sind zusammengeführte Pull-Requests, Wartung oder finanzielle Unterstützung mit Transparenz.",
      item3: "Klare Governance- und Sicherheitspraktiken. Präferenz für OSI-genehmigte Lizenzen."
    },
    form: {
      title: "Generieren Sie Ihre Einreichung",
      required_notice: "Felder mit * sind Pflichtfelder.",
      name: "Firmenname *",
      english: "Englische Alternative (falls zutreffend)",
      website: "Webseite *",
      email: "Info-E-Mail",
      linkedin: "LinkedIn-Profil",
      github: "GitHub-Profil",
      other_repo: "Anderes öffentliches Git-Repository",
      build_issue: "GitHub-Issue erstellen",
      build_csv: "CSV-Zeile für PR erstellen",
      submit: "Einreichen",
      validation: {
        required_fields: "Bitte füllen Sie alle Pflichtfelder aus.",
        invalid_url: "Bitte geben Sie eine gültige URL ein."
      },
      output: {
        issue_link: "GitHub-Issue-Link:",
        csv_row: "CSV-Zeile:"
      }
    },
    issue: {
      title: "Füge {name} zu FOSS4Gov hinzu",
      company_details: "Unternehmensdetails:",
      confirmation: "Bestätigung:",
      confirmation_text: "Ich bestätige, dass dieses Unternehmen die Anforderungen für die Aufnahme erfüllt."
    },
    footer: {
      privacy: "Für Offenheit und Geschwindigkeit gebaut. Keine Tracker. Keine Cookies.",
      accessibility: "Tastatur-Tipps: Tab um den Fokus zu bewegen. Shift+Tab um zurückzugehen. Enter um Schaltflächen und Links zu aktivieren."
    }
  },
  nl: {
    app: {
      title: "FOSS4Gov",
      tagline: "Open Source Bedrijven voor de Overheid",
      description: "Open innovatie stelt overheden in staat om zich aan te passen, te experimenteren en lock-in te voorkomen. Samenwerking is essentieel voor gezonde democratieën. Publieke code versterkt digitale publieke goederen."
    },
    nav: {
      home: "Home",
      companies: "Bedrijven",
      contribute: "Bijdragen",
      add_company: "Voeg uw bedrijf toe",
      create_issue: "Maak een GitHub-probleem aan"
    },
    contribute: {
      title: "Hoe bij te dragen",
      step1: "Fork de repository.",
      step2: "Voeg uw bedrijf toe aan het companies.csv-bestand en dien een Pull Request in.",
      step3: "Of maak een GitHub-probleem aan met dezelfde details via het onderstaande formulier.",
      merit_notice: "Geen advertenties, geen pay-to-play. Opname is gebaseerd op verdiensten en gericht op echte FOSS-bijdragen aan digitale publieke goederen.",
      data_notice: "Deze pagina verzamelt of bewaart geen formuliergegevens. Het onderstaande formulier genereert een vooraf ingevulde GitHub-probleemlink of PR-payload om in te dienen bij de repository."
    },
    companies: {
      title: "Geregistreerde Bedrijven",
      loading: "Bedrijven laden...",
      empty: "Geen bedrijven gevonden.",
      error: "Fout bij het laden van bedrijven: {error}"
    },
    criteria: {
      title: "Criteria voor opname",
      item1: "Actief gebruik van FOSS bij het leveren van digitale overheidsdiensten.",
      item2: "Gedocumenteerde bijdragen aan upstream projecten. Voorbeelden zijn samengevoegde pull requests, onderhoud of financiële ondersteuning met transparantie.",
      item3: "Duidelijke governance- en beveiligingspraktijken. Voorkeur voor OSI-goedgekeurde licenties."
    },
    form: {
      title: "Genereer uw inzending",
      required_notice: "Velden gemarkeerd met * zijn verplicht.",
      name: "Bedrijfsnaam *",
      english: "Engelse alternatief (indien van toepassing)",
      website: "Website *",
      email: "Info e-mail",
      linkedin: "LinkedIn-profiel",
      github: "GitHub-profiel",
      other_repo: "Andere openbare Git-repository",
      build_issue: "Bouw GitHub-probleem",
      build_csv: "Bouw CSV-rij voor PR",
      submit: "Indienen",
      validation: {
        required_fields: "Vul alle verplichte velden in.",
        invalid_url: "Voer een geldige URL in."
      },
      output: {
        issue_link: "GitHub Issue Link:",
        csv_row: "CSV-rij:"
      }
    },
    issue: {
      title: "Voeg {name} toe aan FOSS4Gov",
      company_details: "Bedrijfsgegevens:",
      confirmation: "Bevestiging:",
      confirmation_text: "Ik bevestig dat dit bedrijf voldoet aan de vereisten voor opname."
    },
    footer: {
      privacy: "Gebouwd voor openheid en snelheid. Geen trackers. Geen cookies.",
      accessibility: "Toetsenbordtips: Tab om focus te verplaatsen. Shift+Tab om terug te gaan. Enter om knoppen en links te activeren."
    }
  },
  es: {
    app: {
      title: "FOSS4Gov",
      tagline: "Empresas de Código Abierto para el Gobierno",
      description: "La innovación abierta permite a los gobiernos adaptarse, experimentar y evitar el bloqueo. La colaboración es esencial para las democracias saludables. El código público fortalece los bienes públicos digitales."
    },
    nav: {
      home: "Inicio",
      companies: "Empresas",
      contribute: "Contribuir",
      add_company: "Agregue su empresa",
      create_issue: "Crear un Issue de GitHub"
    },
    contribute: {
      title: "Cómo contribuir",
      step1: "Haga un fork del repositorio.",
      step2: "Agregue su empresa al archivo companies.csv y envíe un Pull Request.",
      step3: "O cree un Issue de GitHub con los mismos detalles usando el formulario a continuación.",
      merit_notice: "Sin anuncios, sin pago por jugar. La lista se basa en el mérito y se centra en contribuciones reales de FOSS a los bienes públicos digitales.",
      data_notice: "Esta página no recopila ni almacena datos del formulario. El formulario a continuación genera un enlace de Issue de GitHub prellenado o una carga útil de PR para que la envíe al repositorio."
    },
    companies: {
      title: "Empresas Listadas",
      loading: "Cargando empresas...",
      empty: "No se encontraron empresas.",
      error: "Error al cargar empresas: {error}"
    },
    criteria: {
      title: "Criterios de listado",
      item1: "Uso activo de FOSS en la entrega de servicios digitales gubernamentales.",
      item2: "Contribuciones documentadas a proyectos upstream. Los ejemplos incluyen pull requests fusionados, mantenimiento o apoyo financiero con transparencia.",
      item3: "Prácticas claras de gobernanza y seguridad. Preferencia por licencias aprobadas por OSI."
    },
    form: {
      title: "Genere su presentación",
      required_notice: "Los campos marcados con * son obligatorios.",
      name: "Nombre de la empresa *",
      english: "Alternativa en inglés (si aplica)",
      website: "Sitio web *",
      email: "Correo electrónico de info",
      linkedin: "Perfil de LinkedIn",
      github: "Perfil de GitHub",
      other_repo: "Otro repositorio Git público",
      build_issue: "Construir Issue de GitHub",
      build_csv: "Construir fila CSV para PR",
      submit: "Enviar",
      validation: {
        required_fields: "Por favor complete todos los campos obligatorios.",
        invalid_url: "Por favor ingrese una URL válida."
      },
      output: {
        issue_link: "Enlace de Issue de GitHub:",
        csv_row: "Fila CSV:"
      }
    },
    issue: {
      title: "Agregar {name} a FOSS4Gov",
      company_details: "Detalles de la empresa:",
      confirmation: "Confirmación:",
      confirmation_text: "Confirmo que esta empresa cumple con los requisitos para su inclusión."
    },
    footer: {
      privacy: "Construido para la apertura y la velocidad. Sin rastreadores. Sin cookies.",
      accessibility: "Consejos de teclado: Tab para mover el foco. Shift+Tab para retroceder. Enter para activar botones y enlaces."
    }
  },
  it: {
    app: {
      title: "FOSS4Gov",
      tagline: "Aziende Open Source per il Governo",
      description: "L'innovazione aperta consente ai governi di adattarsi, sperimentare ed evitare il lock-in. La collaborazione è essenziale per democrazie sane. Il codice pubblico rafforza i beni pubblici digitali."
    },
    nav: {
      home: "Home",
      companies: "Aziende",
      contribute: "Contribuire",
      add_company: "Aggiungi la tua azienda",
      create_issue: "Crea un Issue GitHub"
    },
    contribute: {
      title: "Come contribuire",
      step1: "Fai un fork del repository.",
      step2: "Aggiungi la tua azienda al file companies.csv e invia una Pull Request.",
      step3: "Oppure, crea un Issue GitHub con gli stessi dettagli usando il modulo qui sotto.",
      merit_notice: "Niente pubblicità, niente pay-to-play. L'inserimento si basa sul merito e si concentra su contributi FOSS reali ai beni pubblici digitali.",
      data_notice: "Questa pagina non raccoglie né memorizza i dati del modulo. Il modulo qui sotto genera un link a un Issue GitHub precompilato o un payload PR da inviare al repository."
    },
    companies: {
      title: "Aziende Elencate",
      loading: "Caricamento aziende...",
      empty: "Nessuna azienda trovata.",
      error: "Errore nel caricamento delle aziende: {error}"
    },
    criteria: {
      title: "Criteri di inserimento",
      item1: "Uso attivo di FOSS nella fornitura di servizi digitali governativi.",
      item2: "Contributi documentati a progetti upstream. Gli esempi includono pull request unite, mantenimento o supporto finanziario con trasparenza.",
      item3: "Pratiche chiare di governance e sicurezza. Preferenza per le licenze approvate da OSI."
    },
    form: {
      title: "Genera la tua sottomissione",
      required_notice: "I campi contrassegnati con * sono obbligatori.",
      name: "Nome dell'azienda *",
      english: "Alternativa inglese (se applicabile)",
      website: "Sito web *",
      email: "Email informativa",
      linkedin: "Profilo LinkedIn",
      github: "Profilo GitHub",
      other_repo: "Altro repository Git pubblico",
      build_issue: "Costruisci Issue GitHub",
      build_csv: "Costruisci riga CSV per PR",
      submit: "Invia",
      validation: {
        required_fields: "Si prega di compilare tutti i campi obbligatori.",
        invalid_url: "Si prega di inserire un URL valido."
      },
      output: {
        issue_link: "Link Issue GitHub:",
        csv_row: "Riga CSV:"
      }
    },
    issue: {
      title: "Aggiungi {name} a FOSS4Gov",
      company_details: "Dettagli dell'azienda:",
      confirmation: "Conferma:",
      confirmation_text: "Confermo che questa azienda soddisfa i requisiti per l'inclusione."
    },
    footer: {
      privacy: "Costruito per l'apertura e la velocità. Nessun tracker. Nessun cookie.",
      accessibility: "Suggerimenti per la tastiera: Tab per spostare il focus. Shift+Tab per tornare indietro. Invio per attivare pulsanti e collegamenti."
    }
  }
};
