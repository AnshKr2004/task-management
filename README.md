# Task Management Application

A simple task management application built with Next.js, MongoDB, and deployed on Vercel.

## Features

- Create, read, update, and delete tasks
- Mark tasks as complete/incomplete
- Basic task details (title, description, due date)
- Data persistence using MongoDB
- Error handling and loading states

## Tech Stack

- Frontend: Next.js (App Router)
- Backend: Next.js Server Actions
- Database: MongoDB
- Deployment: Vercel

## Getting Started

1. Clone the repository: git clone https://github.com/AnshKr2004/task-management.git
cd task-management

2. Install dependencies: npm install

3. Create a `.env.local` file in the root directory and add your MongoDB connection string:
MONGODB_URI=your_mongodb_connection_string

4. Run the development server: npm run dev


5. Open http://localhost:3000 with your browser to see the result.

## Deployment

This application is designed to be deployed on Vercel. Follow these steps:

1. Push your code to a GitHub repository.
2. Go to https://vercel.com and sign in with your GitHub account.
3. Click "New Project" and select your task-management repository.
4. In the "Environment Variables" section, add your `MONGODB_URI`.
5. Click "Deploy" and wait for the deployment to complete.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the MIT License.