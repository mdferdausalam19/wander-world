# 🌍 WanderWorld - Travel & Tourism Management System

A modern, full-featured MERN-based travel and tourism management system where users can explore destinations, share tourist spots, interact with dynamic features, and enjoy a seamless browsing experience enhanced with authentication, authorization, and real-time weather data.

🔗 **Live Website:** https://wanderworld-app.vercel.app/  
📦 **Repository:** https://github.com/mdferdausalam19/wander-world

---

## 📌 Overview

**WanderWorld** is a collaborative travel platform designed for adventure seekers. Users can browse tourist attractions, add their own destinations, manage their profile, interact with admin/host features, and enjoy smart UI components such as weather widgets, responsive navigation, and more.

The system supports three roles:

- **General User** → Browse, view details, like posts, explore weather info
- **Host** → Add, update, and delete destinations, manage personal posts
- **Admin** → Manage all users, hosts, and destinations; approve host requests; view admin stats, newsletter subscribers

---

## ✨ Key Features

- **🧑‍💻 Authentication & Authorization**

  - Firebase Authentication
  - JWT-based secure sessions
  - Role-based routes → User, Host, Admin

- **📍 Tourist Spot Management**

  - Add, update, and delete destinations (Host only)
  - Explore all destinations with filtering, sorting & searching
  - “Popular Destinations” section
  - Destination details page with likes & weather widget
  - Real-time Weather API (OpenWeather)

- **📊 Admin Dashboard**

  - Admin stats (total users, hosts, destinations, subscribers)
  - Destination management (view/delete any post)
  - Host approval/rejection system
  - All users table with enhanced columns
  - Newsletter subscribers table

- **☁️ Weather Integration**

  - Weather widget with:
    - Temperature
    - Feels Like
    - Last Updated
    - Humidity, Wind, etc.

- **📝 User Profile**

  - Update profile info
  - Request to become a host
  - View host status

- **💌 Newsletter System**
  - Add subscribers
  - Admin view of all subscribers

---

## 🛠️ Tech Stack

### 🌐 Frontend

- **Core:** React, Vite, Tailwind CSS
- **Navigation:** React Router
- **State Management:** TanStack React Query
- **Data Fetching:** Axios
- **Forms:** React Hook Form
- **Authentication:** Firebase
- **UI:** React Hot Toast, React Icons

### ⚙️ Backend

- **Core:** Node.js, Express.js
- **Database:** MongoDB (Atlas)
- **Authentication:** JWT, Cookie-parser
- **Environment:** dotenv, CORS
- **Weather API:** OpenWeather

---

## 📂 Project Structure

Here is a high-level overview of the project structure:

```
wander-world/
├── client/          # Frontend React application
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── contexts/
│   │   ├── firebase/
│   │   ├── hooks/
│   │   ├── layouts/
│   │   ├── pages/
│   │   ├── providers/
│   │   ├── routes/
│   │   └── ...
│   └── ...
├── server/          # Backend Express.js application
│   ├── index.js    # Main server file
│   └── ...
└── ...
```

---

## 🚀 Getting Started

### ✅ Prerequisites

- Node.js
- npm or yarn
- MongoDB account
- Firebase project
- OpenWeather API key

### ⚙️ Installation & Setup

1.  **Clone the repository:**

    ```sh
    git clone https://github.com/mdferdausalam19/wander-world.git
    cd wander-world
    ```

2.  **Set up the frontend:**

    ```sh
    cd client
    npm install
    ```

3.  **Set up the backend:**
    ```sh
    cd ../server
    npm install
    ```

### 🔑 Environment Variables

Create a `.env` file in both the `client` and `server` directories and add the necessary environment variables.

- **Client (`client/.env`):**

  ```env
  VITE_APIKEY="your_firebase_api_key"
  VITE_AUTHDOMAIN="your_firebase_auth_domain"
  VITE_PROJECTID="your_firebase_project_id"
  VITE_STORAGEBUCKET="your_firebase_storage_bucket"
  VITE_MESSAGINGSENDERID="your_firebase_messaging_sender_id"
  VITE_APPID="your_firebase_app_id"
  VITE_API_URL="your_api_url"
  ```

- **Server (`server/.env`):**
  ```env
  DATABASE_URI="your_mongodb_connection_string"
  ACCESS_TOKEN_SECRET="your_jwt_secret"
  OPENWEATHER_API_KEY="your_openweather_api_key"
  ```

### ▶️ Running the Application

1.  **Start the backend:**

    ```sh
    cd server
    npm start
    ```

2.  **Start the frontend:**
    ```sh
    cd client
    npm run dev
    ```

---

## 📈 Future Enhancements

- AI/ML-based personalized travel recommendations
- User reviews and ratings for tourist spots
- Interactive map view of all spots
- Social sharing for individual spots
- Interactive world map for destinations

---

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
