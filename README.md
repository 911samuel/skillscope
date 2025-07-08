# SkillScope: Smart Skill Profiler

**Know Your Strengths, Unlock New Opportunities**

> A modern AI-powered web application that analyzes user skill profiles and suggests new areas to explore.
> Built as part of the technical evaluation for Muula Technologies Group, Inc.

---

## 🚀 Live Demo

* **Deployed Link:** [SkillScope Website](https://skillscope-abayizera-samuels-projects.vercel.app/)
* **Repository:** [SkillScope Repo](https://github.com/911samuel/skillscope.git)

---

## 📚 Table of Contents

* [Overview](#-overview)
* [Features](#-features)
* [Tech Stack](#-tech-stack)
* [AI Integration](#-ai-integration)
* [Architecture](#-architecture)
* [Setup & Installation](#-setup--installation)
* [Design Decisions](#-design-decisions)
* [Screenshots](#-screenshots)
* [Future Improvements](#-future-improvements)
* [License](#-license)

---

## 🔍 Overview

**SkillScope** is a user-focused, responsive web app designed to help individuals:

* Enter their primary skill along with a brief description of their experience.
* Receive an AI-generated professional profile summary.
* Get personalized suggestions for two additional skill areas to explore.

The application emphasizes an intuitive, mobile-friendly interface and clean, maintainable code using modern development practices.

---

## ✨ Features

✅ **Landing Page:**

* Hero section with headline, brief description, and call-to-action to start the skill check.

✅ **Form Page:**

* Collects user's name, email, primary skill, and a short experience description (max 300 characters).
* Basic client-side validation for required fields and email format.

✅ **AI Processing:**

* Sends form data to a serverless API route integrating with OpenRouter GPT-4 to generate intelligent feedback.
* Parses AI response to provide summary, strengths, areas for improvement, recommended learning paths, and career advice.

✅ **Results Page:**

* Displays a concise profile summary and recommended skill areas.
* Includes options to restart or share results (mock share via Twitter intent).

✅ **Responsive Design:**

* Optimized for mobile, tablet, and desktop devices.

✅ **Clean Code:**

* Modular components, clear comments, and separation of concerns.
* Custom toast notification system inspired by react-hot-toast for user feedback.

---

## 🛠 Tech Stack

| Technology          | Purpose                                  |
| ------------------- | ---------------------------------------- |
| **React (Next.js)** | Component-based frontend & routing       |
| **Tailwind CSS**    | Rapid styling with utility-first classes |
| **Vercel**          | Hosting + serverless functions (API)     |
| **OpenRouter GPT-4**| Generating AI-driven feedback            |
| **TypeScript**      | Type safety & enhanced developer tooling |

---

## 🧠 AI Integration

* **Provider:** OpenRouter GPT-4 (model: mistralai/mistral-7b-instruct:free)
* **Prompt Strategy:**

  * Analyzes user’s skill and experience text.
  * Generates:

    1. A brief 2-3 sentence professional summary.
    2. Lists of strengths and areas for improvement.
    3. Recommended learning paths or skills to develop.
    4. General career advice.
* **Secure:** API key stored in environment variables, not exposed to frontend.

---

## 🏗 Architecture

```plaintext
[ Client (Next.js) ]
       |
       | (Form submission)
       ↓
[ API Route (/api/skill-profile) ]
       |
       | (Fetch OpenRouter completion)
       ↓
[ OpenRouter ]
       ↓
[ API returns summary + suggestions ]
       |
       ↓
[ Client renders results page ]
```

---

## ⚙️ Setup & Installation

### Clone Repository

```bash
git clone https://github.com/yourusername/skillscope.git
cd skillscope
```

### Install Dependencies

```bash
npm install
# or
yarn install
```

### Environment Variables

Create a `.env.local` file:

```env
OPENROUTER_API_KEY=your_openrouter_api_key_here
```

### Run Locally

```bash
npm run dev
# or
yarn dev
```

Visit: `http://localhost:3000`

---

## 🎨 Design Decisions

* Used **Tailwind CSS** for rapid and responsive styling, ensuring consistent spacing, color themes, and easy future dark mode support.
* Chose **Next.js** to leverage built-in routing and API routes for serverless functions.
* Structured project with clear separation of:

  * `components` (UI)
  * `app` (pages and API routes)
  * `hooks` (custom hooks)
* Input validation is performed both on client (length checks, email format) and on the serverless function to ensure clean data sent to AI.
* Implemented a custom toast notification system inspired by react-hot-toast for user feedback.
* Optimized mobile-first with minimal DOM nesting and smart breakpoints.

---

## 📸 Screenshots

<details>
<summary>Click to view</summary>

**Home Page**  
![Home Page](./public/Screenshot%20(8).png)

**Skills Page**  
![Skills Page](./public/Screenshot%20(7).png)

**Results Page**  
![Results Page](./public/Screenshot%20(9).png)

</details>

---

## 🔮 Future Improvements

* Add persistent user history (optional sign-in with NextAuth).
* Include richer visualizations (like radar charts of skills).
* Allow users to download their skill profile as PDF.

---

## 📄 License

MIT — feel free to explore and extend.

---

## 🙌 Acknowledgements

* [OpenRouter](https://openrouter.ai/) for the powerful language models.
* [Tailwind CSS](https://tailwindcss.com/) for making design a delight.
* [Vercel](https://vercel.com/) for effortless deployment.

---
