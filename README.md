# 🌾 MGNREGA District Performance Dashboard

A production-ready web application that brings MGNREGA open-data to citizens in a simple and understandable format — focusing on accessibility, low digital literacy users, and reliable data availability even when government APIs are down.

## 🎯 Problem

The Government of India provides MGNREGA performance data via an Open API, but citizens — especially in rural India — face challenges:

Cannot read raw JSON datasets

Low digital literacy

API may not always be available (rate-limits/downtime)

No simple tool to compare district performance month-wise

## ✅ Solution

This web-app converts complex API data into clear, visual, citizen-friendly cards, where users can:

Select month & district

View MGNREGA performance metrics instantly

Understand data in simple language

Get fallback cached data if API goes offline

(Bonus) Auto-detect district using location (planned/partial)

## 👩‍💻 Features
🎨 Simple UI	Clean design for low-literacy users
📊 District Metrics	Households worked, wages paid, workdays, etc.
📅 Month Filter	View past performance month-wise
🛑 Offline-Resilient	Caches data locally to avoid API failure
🌐 Fully Hosted	Backend + Frontend deployed
📍 Geo-suggestion	Detect district from user location (bonus)
⚡ Fast	React frontend + Express backend

## 🧠 Tech Stack
Layer	Technology
Frontend	React, Bootstrap, Axios
Backend	Node.js, Express
Cache/Data Storage	JSON persistence
API Source	data.gov.in MGNREGA API
Hosting	Render (Frontend & Backend)

## 🏗 Architecture Overview
User UI (React)
↓
API call
↓       
Backend (Node + Express)
↓
fetch + cache
↓       
Gov MGNREGA API
↓
fallback
↓       
Local JSON Cache (data/mgnregaData.json)


✅ Fetches live data
✅ Saves to local file
✅ Serves cached data when API down
✅ Scalable structure for DB upgrade later

## 📦 Folder Structure
MGNREGA/
 ┣ frontend/   → React UI
 ┣ backend/    → Node.js API + cache
 ┣ data/       → Cached JSON data
 ┗ README.md

## 🚀 How to Run Locally
Backend
cd backend
npm install
node server.js

Frontend
cd frontend
npm install
npm run dev

## 🌐 Live App

🔗 [Add your deployed Render/hosting URL here](https://mgnrega-e5fw.onrender.com/)

## 📍 Future Improvements

Database storage (MongoDB / PostgreSQL)

Graphs & trend analysis

Local language support (Hindi / regional languages)

Full geo-location district auto-detect

SMS-based access for non-smartphone users

Mobile app version

## ❤️ Purpose

To empower rural Indian citizens with transparent, understandable public data — strengthening trust & accountability in governance.

## 👩‍🏫 Made By : Parinika Kath
