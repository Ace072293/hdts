# Help Desk Ticketing System

A full-stack help desk ticketing system for managing IT support requests, built with Node.js, Express, MongoDB, and React.

---

## Features

- User authentication (JWT)
- Role-based access (employee, tech support, administrator)
- Ticket creation, listing, and status management
- Assessment and recommendations by tech/admin
- Dashboard with ticket status pie chart
- Responsive UI with React and Tailwind CSS
- RESTful API with Express and Mongoose
- CI/CD with GitHub Actions

---

## Project Structure

```
.
├── backend/         # Express/Mongoose API
│   ├── models/
│   ├── routes/
│   └── server.js
├── frontend/        # React app
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   └── App.jsx
│   └── package.json
├── .github/
│   └── workflows/
│       └── ci.yml
├── README.md
└── ...
```

---

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- Yarn or npm
- MongoDB instance (local or cloud)

### Backend Setup

```sh
cd backend
cp .env.example .env   # Create your .env file
# Fill in MONGO_URI, JWT_SECRET, PORT in .env
yarn install           # or npm install
yarn start             # or npm start
```

### Frontend Setup

```sh
cd frontend
yarn install           # or npm install
yarn start             # or npm run start
```

### Environment Variables

- **backend/.env**
  ```
  MONGO_URI=your_mongodb_connection_string
  JWT_SECRET=your_jwt_secret
  PORT=5001
  ```

---

## Running Tests

Backend tests:
```sh
cd backend
npm test
```

---

## Deployment & CI

- CI/CD is configured via `.github/workflows/ci.yml`
- Secrets (MONGO_URI, JWT_SECRET, PORT) are managed in GitHub Actions

---

## API Endpoints

- `POST /api/auth/register` - Register user
- `POST /api/auth/login` - Login
- `GET /api/tickets` - List tickets
- `POST /api/tickets` - Create ticket
- `GET /api/tickets/:id` - Get ticket details
- `PUT /api/tickets/:id` - Update ticket (assessment, status, etc.)
- ...and more

---

## License

MIT

---

## Creator

- [Diocadez, John Ian Ace G.](n12300080@qut.edu.au)
- Student number: N12300080