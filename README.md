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

## 🔐 Role-Based Control (RBC) and Supabase Row Level Security (RLS)

This project uses a **Role-Based Control (RBC)** system to ensure users only access the data and actions allowed for their role. The supported roles are:

-   **policy_holder** – Can view and update only their own policies.
-   **agent** – Can view policies assigned to their clients and update statuses.
-   **admin** – Full access to all policies and user management features.

### 🔐 Frontend RBC (React)

-   Upon login, user role metadata is retrieved from Supabase.
-   The React UI dynamically adapts based on the role:
    -   `policy_holder` sees only their policy details.
    -   `agent` can manage their client list and policies.
    -   `admin` has access to all dashboard features.
-   Routes, buttons, and forms are conditionally rendered based on role.
-   Global Redux state holds user role after login and is used to guard navigation and actions.

### 🔐 Backend RBC (Supabase RLS)

-   **Row Level Security (RLS)** is enabled on the `policies` table.
-   Supabase policies are written to ensure users **can only read or modify rows they are authorized for**.
-   For example:
    -   A `policy_holder` can only `SELECT` or `UPDATE` rows where `user_id = auth.uid()`
    -   An `agent` can only access policies they are linked to via a join table or foreign key.
    -   An `admin` bypasses row filters via a `role = 'admin'` policy.

### ✅ Security

Even if someone bypasses the frontend and directly uses Supabase API, RLS ensures data cannot be read, updated, or deleted unless they meet role conditions.

This makes the app secure by enforcing business rules both in UI and at the data layer.

## 📊 Charting Implementation and Data Handling for Visualizations

This project uses **[Recharts](https://recharts.org/)** for building interactive and responsive charts within the insurance policy dashboard. Recharts was chosen for its simplicity, TypeScript support, and seamless integration with React and Tailwind.

### ✅ Why Recharts?

-   Built with React in mind
-   Strong TypeScript support
-   Responsive and composable chart components
-   Easy to integrate with filtered Supabase data
-   Customizable tooltips, legends, and axes

---

### 📈 Implemented Charts

The dashboard includes dynamic visualizations for policy insights:

1. **Stacked Bar Chart** – Shows policy count by type (e.g., term, health) and status (active, expired, lapsed).
2. **Line Chart** – Displays total premium coverage trend over time.
3. **Pie Chart** – Illustrates distribution of policies by region or agent.

Each chart:

-   Updates based on user filters (e.g., policy type, date range, user role)
-   Is responsive and adapts to desktop and mobile views
-   Pulls data dynamically from Supabase and handles loading/errors gracefully

---

### 🔄 Data Handling Flow

1. **Fetch policy data** from Supabase using `select()` queries with filters and pagination as needed.
2. **Transform data** into chart-ready structures inside hooks or utility functions (e.g., grouped by type, status, or date).
3. **Feed transformed data** into chart components from Recharts using props.
4. Charts update in real time as filters change, or when new data is inserted (Realtime support planned as a stretch goal).

---

### 🔐 Role-based Filtering

-   `policy_holder` sees only their own data in charts
-   `agent` sees aggregate data for their assigned clients
-   `admin` sees the full dataset across all policies and users

These filters are enforced both:

-   In the frontend (through Supabase queries)
-   And via Supabase **Row Level Security (RLS)** rules on the `policies` table
