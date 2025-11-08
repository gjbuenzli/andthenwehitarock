import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { RouterProvider, createBrowserRouter } from "react-router-dom"
import  Index  from "./pages/Index.tsx"

createRoot(document.getElementById("root")!).render(<App />);
const router = createBrowserRouter([
  {
    path: "/vite-react-router/",
    element: <App />,
    children: [
      {
        path: "/vite-react-router/",
        element: <Index />,
      },
      
    
    ],
  },
]);
