
# RSVP Frontend 🎉

This is the frontend application for the **RSVP Manager**, a web-based tool built to manage guest responses and event attendance seamlessly. The application provides an intuitive and responsive UI that allows users to RSVP for events, manage their submissions, and view confirmations in real time.

---

## 🚀 Features

- 📅 Event RSVP form with name, email, and attendance fields
- 🌐 Real-time guest list updates
- 💻 Responsive UI built with Tailwind CSS
- 🔄 Integrated with Flask + PostgreSQL backend

---

## 🛠️ Tech Stack

- **Frontend:** React.js (v18+)
- **Styling:** Tailwind CSS
- **Routing & State:** React Router DOM, useState/useEffect
- **Form Handling:** Controlled components, form validation
- **API Integration:** Axios
- **Backend:** Flask (see [`rsvp-backend`](https://github.com/ramyaachanta/rsvp-backend))

---

## 📦 Installation & Setup

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/ramyaachanta/rsvp-frontend.git
   cd rsvp-frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Access the app**
   Open [http://localhost:3000](http://localhost:3000) in your browser.

> ✅ Ensure the backend server is running on the expected port (default: `localhost:5000`).

---

## 🧪 Folder Structure

```
rsvp-frontend/
├── public/
├── src/
│   ├── components/        # Reusable UI components
│   ├── pages/             # Form, OTP verification, confirmation pages
│   ├── services/          # API calls via Axios
│   ├── App.js             # Routing and layout
│   └── index.js           # Entry point
└── tailwind.config.js     # Tailwind configuration
```

---

## 🤝 Acknowledgments

- Built as part of a full-stack portfolio project.
- Special thanks to the backend team and Flask integration support.

---

## 📬 Contact

For any queries or collaborations:

**Ramya Sri Achanta**  
📧 [ramyaachanta@gmail.com](mailto:ramyaachanta@gmail.com)  
🌐 [Portfolio](https://ramyaachanta.github.io/Portfolio/)  
🔗 [LinkedIn](https://www.linkedin.com/in/ramyaachanta)

---

## 📄 License

This project is licensed under the MIT License. See `LICENSE` for more details.
