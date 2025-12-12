# Digital Sovereignty Through Open Source (foss4gov)

**foss4gov** is a community-driven initiative building a global directory of service companies that use and contribute to Free and Open Source Software (FOSS) for government digital services.

🔗 **Live Site:** [https://mgifford.github.io/foss4gov/](https://mgifford.github.io/foss4gov/)

## 🎯 Mission

Open innovation enables governments to adapt, experiment, and avoid vendor lock-in. Collaboration is essential to healthy democracies, and public code strengthens digital public goods.

This project aims to promote **Digital Sovereignty** by highlighting companies that demonstrate:
* Active use of FOSS in government digital service delivery.
* Documented contributions to upstream projects.
* Clear governance and security practices.

## 📋 How It Works

This is a static website hosted on GitHub Pages. It relies on a simple CSV file (`companies.csv`) as its database. The site uses JavaScript to parse and display the list of companies, making it lightweight, fast, and easy to maintain without a backend.

### Key Features
* **Zero-dependency:** Pure HTML, CSS, and JavaScript.
* **Open Data:** All company data is stored in a publicly accessible CSV file.
* **Accessible:** Designed to meet WCAG 2.2 AA standards (keyboard navigation, high contrast, screen reader support).
* **Merit-based:** No ads or pay-to-play; listings are based on FOSS contributions.

## 🤝 How to Contribute

We welcome contributions! There are two primary ways to add your company to the list:

### Option 1: Pull Request (Recommended)
1.  **Fork** this repository.
2.  Edit the `companies.csv` file.
3.  Add your company details as a new row.
4.  Submit a **Pull Request** to the `main` branch.

### Option 2: GitHub Issue
1.  Visit the [How to Contribute](https://mgifford.github.io/foss4gov/#form) section on the live site.
2.  Fill out the "Generate your submission" form.
3.  Click **"Build GitHub Issue"** to generate a pre-filled issue link.
4.  Submit the issue, and a maintainer will add the data for you.

## ✅ Listing Criteria

To be listed, a company must generally meet the following criteria:
* **Active FOSS Usage:** Delivering government services using open technologies.
* **Upstream Contributions:** Merged pull requests, maintainership, or transparent financial support of open source projects.
* **Licensing:** Preference for OSI-approved licenses.

## 🛠️ Local Development

To run this project locally, you don't need any complex build tools.

1.  Clone the repository:
    ```bash
    git clone [https://github.com/mgifford/foss4gov.git](https://github.com/mgifford/foss4gov.git)
    cd foss4gov
    ```
2.  Open `index.html` in your web browser.
    * *Note: Because the site fetches a local CSV file, some browsers may block the request due to CORS policies if you open the file directly (e.g., `file://...`). It is recommended to run a simple local server.*
3.  Using Python (optional but recommended):
    ```bash
    python3 -m http.server
    ```
    Then visit `http://localhost:8000`.

## 🌍 Internationalization (i18n)

The project includes basic support for internationalization (see `lang/` directory and `i18n.js`). Contributions to translate the interface into other languages are welcome.

## 🤖 AI Disclosure

AI tools were used to assist in the creation of this tool. Please review code and data with care.

## 📄 License

This project is licensed under the **GNU Affero General Public License v3.0 (AGPL-3.0)**. See the [LICENSE](LICENSE) file for details.


