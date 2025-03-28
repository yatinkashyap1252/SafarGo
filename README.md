# Safargo - React Native App

Welcome to **Safargo** — a feature-rich ride-booking app built with **React Native**. Safargo provides a seamless and intuitive experience for users to book rides, make payments, and manage accounts. With clean UI components and a scalable architecture, Safargo is designed to enhance your ride-booking experience.

## 🚀 Features

- **Authentication System**: Users can sign up, sign in, and manage their accounts securely using JWT authentication.
- **Ride Management**: Book, confirm, and find rides with ease using a streamlined interface.
- **Payment Integration**: Integrated with **Stripe** for secure and seamless payments.
- **Driver Management**: Manage driver accounts and view ride details.
- **Interactive Maps**: Integrated map functionality using **Google Maps** for navigation and location services.
- **Custom Alerts**: Custom-designed alert dialogs to ensure better user communication.
- **Cache Management**: Efficient caching of ride details for offline access.
- **Error Handling**: Detailed error messages to guide users when issues occur.
- **Mock Data**: Predefined ride data for testing using mock APIs.

## 🛠️ Project Structure

Here’s a detailed breakdown of the core folders and their purpose:

### **app**
- Contains the core application logic and routes.
- **api**: Manages API interactions for rides, payments, and user management.
  - `ride`: APIs for creating and retrieving ride details.
  - `stripe`: Payment gateway API endpoints for transactions, driver payments, and user billing.
  - `auth`: Authentication APIs for sign-up, sign-in, and account management.
- **auth**: Includes authentication screens such as `sign-in`, `sign-up`, and a `welcome` screen.
- **root**: Core navigation with tab layouts and root-level screens for ride booking and confirmation.

### **components**
- Reusable UI components to ensure a clean and modular codebase.
  - `DriverCard.tsx`: Displays driver information.
  - `RideCard.tsx`: Summarizes ride details.
  - `InputFields.tsx`: Custom input fields for data entry.
  - `Map.tsx`: Renders map views using Google Maps.
  - `Payment.tsx`: Handles payment UI interactions.

### **constants**
- Centralized storage for application-wide constants including mock data using `mockRides.ts`.

### **lib**
- Custom libraries to handle API requests (`fetch.ts`) and map utilities (`map.ts`).

### **store**
- Global state management using a state management solution (Redux, Zustand, or Context API).

### **types**
- TypeScript definitions to ensure type safety throughout the app.

### **utils**
- Utility functions like `formatDate.ts` to format dates cleanly.

## 📦 Installation

Follow these steps to get started:

1. Clone the repository:
    ```bash
    git clone https://github.com/yatinkashyap1252/safargo.git
    cd safargo
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Set up environment variables by creating a `.env` file:
    ```bash
    API_URL=your_api_url
    STRIPE_PUBLIC_KEY=your_stripe_key
    ```

4. Run the app on your device using Expo:
    ```bash
    npx expo start
    ```

5. Install Expo Go on your mobile device to scan the QR code and test the app.

## 🧪 Testing

You can run unit and integration tests using the following command:
```bash
npm test
```

Ensure you have relevant test files using Jest or React Testing Library for component testing.

## 📊 API Endpoints

The app interacts with the following APIs:
- **Authentication**: `/api/auth/sign-in`, `/api/auth/sign-up`, `/api/auth/welcome`
- **Rides**: `/api/ride/create`, `/api/ride/[id]`
- **Payments**: `/api/stripe/create`, `/api/stripe/pay`, `/api/stripe/driver`

## 🤝 Contribution Guidelines

Contributions are welcome! Follow these steps to contribute:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature-name`).
3. Commit your changes (`git commit -m 'Add new feature'`).
4. Push to your branch (`git push origin feature/your-feature-name`).
5. Open a pull request.

Make sure to add appropriate comments and documentation for your code.

## 🐛 Bug Reporting

If you encounter any bugs, please submit an issue with detailed information:
- Steps to reproduce
- Expected behavior
- Actual behavior
- Screenshots (if applicable)

## 📧 Contact

For questions, feedback, or collaboration requests, reach out at `yatinkashyap1252@gmail.com`.

---

Enjoy using Safargo and experience the future of ride booking! 🚗✨

