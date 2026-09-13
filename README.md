# Anakin Locale Grounding Agent 🌍

An AI-powered localization agent built for the language_expansion platform (UC-2) that replaces robotic "translationese" with authentic, in-market phrasing harvested directly from the live web.

## The Problem
When deploying global software, standard LLM translations often fail to capture regional nuance. A literal translation of "Free Shipping" into Indonesian might be mathematically correct, but real Indonesian e-commerce shoppers say "Gratis Ongkir." Generating this genuine country-language wording purely from a model is where synthetic data is weakest.

## The Solution
**Anakin Locale Agent** acts as a bridge between LLMs and the real world. Instead of guessing, the agent dynamically sources authentic locale text at scale. 

Powered entirely by a local, on-device model (`clarion-qwen` via Ollama), it offers a fast, private, and fully offline-capable reasoning engine. When it needs live data, it leverages the **Anakin.io URL Scraper API** via a keyless "Zero Touch" architecture to bypass blockers, extract clean markdown, and summarize regional marketplaces, country TLDs, and local social forums.

## Key Features
* **🌍 242-Language Coverage Engine:** Tracks corpus coverage, translation quality, and phrase count across hundreds of locales.
* **🕵️‍♂️ Live Web Harvesting:** Continuously monitors regional sites (Shopee, Tokopedia, Lazada) to extract authentic e-commerce, UI, and support phrases.
* **🧠 Local AI Agent:** Features a chat interface powered by a completely local Ollama model. No API keys required, zero latency, total privacy.
* **🌐 Anakin.io Zero-Touch Scraping:** The local agent is equipped with a `scrape_url` tool that uses the Anakin API to seamlessly browse the live internet and extract structured Markdown data from any URL.
* **📊 Southeast Asia Pilot Dashboard:** A dedicated UI tracking a live training efficiency pilot in 6 SEA markets, comparing authentic vs. translated phrasing.

## How to Run
1. Start your local Ollama server:
   ```bash
   ollama serve
   ```
2. Install dependencies and run the Next.js frontend:
   ```bash
   npm install
   npm run dev
   ```
3. Open `http://localhost:3000` to interact with the agent!

## Tech Stack
* **Frontend/Backend:** Next.js, React, CSS Modules
* **AI Engine:** Ollama, `@ai-sdk/openai`, `clarion-qwen`
* **Data Ingestion:** Anakin.io URL Scraper API
