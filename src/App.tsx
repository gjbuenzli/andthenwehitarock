import type { RouteRecord } from "vite-react-ssg";
import Index from "./pages/Index";
import Chapters from "./pages/Chapters";
import NotFound from "./pages/NotFound";

// Routes as data (not <BrowserRouter> JSX) so vite-react-ssg can statically
// prerender each path to HTML at build time. Static landing page → React
// Query, the toast systems, and TooltipProvider were all unused dead weight
// and were removed earlier to shrink the bundle.
export const routes: RouteRecord[] = [
  { path: "/", element: <Index /> },
  { path: "/rock-sail-website-joy", element: <Index /> },
  { path: "/chapters", element: <Chapters /> },
  // ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE
  { path: "*", element: <NotFound /> },
];
