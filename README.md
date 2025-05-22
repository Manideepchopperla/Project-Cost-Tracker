# 🧾 Project Cost Tracker

A minimal yet powerful React-based web app that helps users manage and track project expenses efficiently. Supports itemized cost breakdowns, authentication, and dynamic total cost display with data persisted on Firebase Firestore.

---

## 🚀 Features

- 🔐 User Authentication with Firebase
- 📦 Add, Edit, Delete **Items** (e.g., hardware, software, services)
- 💸 Add, Edit, Delete **Other Costs** (e.g., taxes, shipping)
- 🧮 Dynamic Total Cost Calculation
- ☁️ Real-time Cloud Data Persistence with Firebase Firestore
- 💅 Responsive UI with Chakra UI
- 📊 Optional: Filtering, Sorting, Charts, Offline Persistence

---

## 🛠️ Tech Stack

| Role | Tech |
|------|------|
| Frontend | React.js(Vite) |
| State Management | Redux Toolkit |
| UI Components | Chakra UI |
| Authentication | Firebase Auth |
| Database | Firebase Firestore |
| Hosting | Vercel  |

---
# ⚙️ Project Setup

 1. **Clone the Repository**

    ```bash
        git clone https://github.com/Manideepchopperla/Project-Cost-Tracker.git
        cd Project-Cost-Tracker
    ```
 2. **Install dependencies & Start the development server** :

    ```bash
      npm install
      npm run dev
    ```
 3. Open your browser and navigate to `http://localhost:5173` to view the app.

## 4. **Detailed Firebase Explanation & Setup: **

  ### 4.1 What is Firebase?
    
   Firebase is a cloud platform by Google that provides backend services, so you don’t have to build your own server. It includes:
    
   - **Firestore:** A scalable NoSQL cloud database to store and sync app data.
   - **Authentication:** Ready-made solutions for user sign-up, login, and identity management.
    
  This lets you focus on frontend development while Firebase handles backend infrastructure.
    
  ---
    
  ### 4.2 How Firestore Works
   
   - Data is stored as **collections** of **documents**.
   - Each document contains **fields** (key-value pairs).
   - For example, a user document can store their project items and other costs as subcollections.
  - Firestore allows **real-time updates**; any changes reflect immediately in your app.
    
    ---
    
    ### 4.3 Firebase Authentication Overview
    
    - Users can sign up or sign in using email/password or Google accounts.
    - Firebase manages user sessions securely.
    - Once logged in, users can only access their own data in Firestore.
    - Firebase provides easy SDKs to implement auth in React apps.
    
    ---
    
    ### 4.4 Setting Up Firebase Project (Step-by-step)
    
    1. **Create Firebase Project:**
        - Go to [Firebase Console](https://console.firebase.google.com/).
        - Click "Add project" and enter project name (e.g., "project-cost-tracker").
        - Follow the setup wizard, disable Google Analytics for simplicity.
      
    2. **Enable Firestore:**
        - In the Firebase console, go to **Firestore Database**.
        - Click "Create database".
        - Select production mode (you can also start in test mode but for learning production mode is recommended).
        - Choose your location.
        - Go to Firestore Database → Rules
        - Replace your rules with this (only for dev):
          ```js
            rules_version = '2';
            service cloud.firestore {
              match /databases/{database}/documents {
                match /{document=**} {
                  allow read, write: if true;
                }
              }
            }
          ```
        - Click Publish
    
      
    3. **Enable Authentication:**
        - Go to **Authentication** section.
        - Click on **Get started**.
        - Enable **Email/Password** provider and **Google** provider.
        - Optionally enable other Sign-in providers.
      
    4. **Add Web App to Firebase Project:**
        - In the Firebase console, click the gear icon/Settings icon → **Project settings**.
        - Select **Your apps** tab → Add Web app.
        - Register your app (give it a name).
        - Copy the Firebase config object (contains apiKey, authDomain, etc.).
        - This config will be used in your React app.
    5. **Configure .env file**:
        - Create a .env File at root Directory.
        ```bash
            VITE_API_KEY: Your apiKey from Firebase Config Object
            VITE_AUTH_DOMAIN: Your authDomain from Firebase Config Object
            VITE_PROJECT_ID: Your projectId from Firebase Config Object
            VITE_STORAGE_BUCKET: Your storageBucket from Firebase Config Object
            VITE_MESSAGING_SENDER_ID: Your messagingSenderId from Firebase Config Object
            VITE_APP_ID: Your appId from Firebase Config Object
            VITE_MEASUREMENT_ID: Your measurementId from Firebase Config Object
        ```
    
        **Note:** Do not commit this .env file to the repository..

## Contact

For any inquiries, please reach out to:

- **Name:** Manideep Chopperla
- **Email:** [manideepchopperla1808@gmail.com](mailto:manideepchopperla1808@gmail.com)
- **GitHub:** [Manideepchopperla](https://github.com/Manideepchopperla)
    

