# CRM App

An insurance policy management dashboard & analytics platform built with **React**, **TypeScript**, and **Vite**.

Live URL: [https://crmapp-33o.pages.dev](https://crmapp-33o.pages.dev)

## 🚀 Project Setup

This project was bootstrapped using **Vite** with the **React + TypeScript** template.

Tech Stack:

-   Frontend Framework: **React 18** (JSX + TypeScript)
-   Build Tool: **Vite**
-   Language: **TypeScript** (Strict mode enabled)
-   Deployment: **Cloudflare Pages**

## 🛠 Running Instructions (Local Development)

Follow these steps to set up and run the project locally:

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/crmApp.git
cd crmApp
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Start the Development Server

```bash
npm run dev
```

This will start and open the application locally at: http://localhost:5173/

##🏗 Building for Production

### To create a production-ready build:

```bash
npm run build
```

The optimized static files will be generated inside the dist/ folder.

## 📦 Justification for the Chosen State Management Library

For state management, we have chosen **Redux Toolkit** (RTK) for the following reasons:

1. **Standardization and Best Practices**:  
   Redux Toolkit is the officially recommended approach for writing Redux logic. It enforces best practices such as immutability, structured slices, and cleaner action handling out of the box.

2. **Scalability and Predictability**:  
   Given that the project involves managing authentication flows, role-based access control, and complex policy data, Redux Toolkit offers a predictable and centralized store architecture which will be easier to scale and maintain as the project grows.

3. **Simplified Redux Development**:  
   RTK abstracts a lot of the boilerplate that classic Redux required (e.g., separate action types, action creators, reducers), making it faster and cleaner to build state logic using slices and async thunks.

4. **Efficient Async Handling**:  
   With `createAsyncThunk` and integrated middleware support, RTK provides a powerful way to handle asynchronous operations like API calls to Supabase (e.g., login, fetch policies) while automatically managing loading, success, and error states.

5. **Strong TypeScript Support**:  
   Redux Toolkit is built with TypeScript in mind. It ensures type safety across the actions, reducers, and selectors, minimizing runtime errors and improving developer experience.

6. **Community Adoption and Ecosystem**:  
   RTK is widely adopted across the React community, ensuring excellent documentation, ongoing maintenance, and compatibility with other libraries like React Query, Formik, and even Supabase client SDK.

7. **Future Integration Ready**:  
   As the project plans to add features like dashboard analytics, dynamic filtering, pagination, and real-time updates, Redux Toolkit provides a robust foundation for managing derived state and complex UI states.

---

### Summary:

Redux Toolkit strikes the right balance between **simplicity, structure, and scalability**, making it the ideal choice for this project given the expected complexity of authentication, role-based control, and data visualization features.
