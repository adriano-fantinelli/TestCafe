# TestCafe API Test Project

This project is a **TestCafe**-based test suite targeting a generic RESTful User Service in a microservices architecture. It assumes the presence of an API with the following endpoints:

### 🎯 Target Application (Expected API)

The tests are designed to work with an application exposing these endpoints:

| Method | Endpoint               | Description             |
|--------|------------------------|-------------------------|
| POST   | `/api/auth/login`     | Login and receive token |
| POST   | `/api/test/reset`     | Reset database state    |
| POST   | `/api/users`          | Create a new user       |
| GET    | `/api/users/:id`      | Get user by ID          |


---

### 📦 Structure

```
project-root/
├── tests/
│   └── UserTest.js            # Main TestCafe tests
├── utils/
│   ├── config.js           # Configuration (base URL, credentials)
│   └── helpers.js          # Auth, DB reset, user generator
└── README.md               # Project documentation
```

---

### ⚙️ How to Run

1. Start your API server locally on `http://localhost:3000`
2. Install dependencies:
3. Run the server:
   ```bash
    npm run server
   ```
4. Run the tests:
   ```bash
    npm run test
   ```

---

### ✅ Requirements

- Node.js (v14+)
