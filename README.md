# Avocat-IA

Avocat-IA is a powerful web application built using Next.js, Firebase, Google Genkit, and styled with Tailwind CSS. This document provides a comprehensive guide on the functionality and setup of the project.

## Features
- **Next.js**: A React framework enabling server-side rendering and static site generation.
- **Firebase**: For backend services including authentication, database, and hosting.
- **Google Genkit**: Integration with Google's Genkit for enhanced functionality.
- **Tailwind CSS**: Utility-first CSS framework for rapid UI design.

## Getting Started
### Prerequisites
- Node.js (>= 14.x)
- npm or yarn
- Firebase account

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/godfree12/avocat-IA.git
   cd avocat-IA
   ```
2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```
3. Set up Firebase:
   - Create a new Firebase project in the [Firebase Console](https://console.firebase.google.com/).
   - Enable authentication methods as per your requirements.
   - Configure Firestore database if needed.
4. Create a `.env.local` file in the root directory:
   ```plaintext
   NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
   ```
### Running the Application
Start the development server:
```bash
npm run dev
# or
yarn dev
```
Open your browser and navigate to `http://localhost:3000` to view the application.

## Contributing
1. Fork the repository.
2. Create a new branch (`git checkout -b feature/YourFeature`).
3. Make your changes and commit them (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature/YourFeature`).
5. Open a Pull Request.

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.