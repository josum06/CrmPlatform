# CRM Platform

A full-stack Customer Relationship Management (CRM) platform built using the MERN stack. Designed to manage campaigns, customers, orders, and customer segmentation efficiently.

---

## 🚀 Features

- 🔐 **User Authentication** (Google Oauth 2.0)
- 🧑‍🤝‍🧑 **Customer Management** (CRUD)
- 📢 **Campaign Management**
- 📦 **Order Management**
- 🧩 **Customer Segmentation Builder**
- ⚙️ **Dynamic Query Builder**
- 📊 **MongoDB Integration with Mongoose**
- 🎯 Clean modular backend structure (controllers, services, routes, utils)

---

## 🛠️ Tech Stack

### Frontend:
- React.js
- React Router
- Context API
- Tailwind CSS 

### Backend:
- Node.js
- Express.js
- MongoDB
- Mongoose
- dotenv

---

## 📁 Project Structure

```
CRM-Platform/
│
├── crm-backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── services/
│   ├── utils/
│   ├── db.js
│   ├── server.js
│   └── config.env
│
├── crm-frontend/
│   └── src/
│       ├── components/
│       ├── Context/
│       ├── pages/
│       ├── App.jsx
│       ├── main.jsx
│       └── index.css
```

---

## 🔧 Installation & Setup

### 1. Clone the repository:
```bash
git clone https://github.com/VaibhavSinha25/CRM.git
cd crm
```

### 2. Setup Backend:
```bash
cd crm-backend
npm install
```

- Create a `.env` file:
```env
MONGO_URL=your_mongodb_connection_string
PORT=3000
```

- Start backend server:
```bash
node server.js
```

### 3. Setup Frontend:
```bash
cd ../crm-frontend
npm install
npm run dev
```

---

## 🌐 API Endpoints

- `GET /api/customers`
- `POST /api/customers`

- `POST /api/orders`
  
- `GET /api/segments`
- `POST /api/segments`
- `GET /api/segments/preview`
  
- `GET /api/campaigns`
- `POST /api/campaigns`


---

## 🧩 Future Improvements

- Role-based access control
- Notification system (email/SMS)
- Data analytics dashboards

---

## 📄 License

This project is licensed under the MIT License. Feel free to use and extend.

---

## 🙏 Acknowledgements

- [Node.js](https://nodejs.org/)
- [React](https://reactjs.org/)
- [MongoDB](https://www.mongodb.com/)
- [Mongoose](https://mongoosejs.com/)
- [VS Code](https://code.visualstudio.com/)
