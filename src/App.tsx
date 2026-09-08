import type { RouteRecord } from "vite-react-ssg";
import Index from "./pages/Index";
import Chapters from "./pages/Chapters";
import CruisingHacks from "./pages/CruisingHacks";
import CruisingHackDetail from "./pages/CruisingHackDetail";
import NotFound from "./pages/NotFound";
import { LandingPageView } from "./components/LandingPageView";
import { PAGE_EXPERIMENTS } from "./config/pageExperiments";

// Routes as data (not <BrowserRouter> JSX) so vite-react-ssg can statically
// prerender each path to HTML at build time. Static landing page → React
// Query, the toast systems, and TooltipProvider were all unused dead weight
// and were removed earlier to shrink the bundle.
export const routes: RouteRecord[] = [
  { path: "/", element: <Index /> },
  { path: "/rock-sail-website-joy", element: <Index /> },
  { path: "/chapters", element: <Chapters /> },
  { path: "/cruising-hacks", element: <CruisingHacks /> },
  { path: "/cruising-hacks/:slug", element: <CruisingHackDetail /> },
  // Persistent, ad-addressable pages — each its own A/B experiment:
  // /general, /paperback, /kindle-free, /kindle-buy, /audiobook.
  ...PAGE_EXPERIMENTS.map((page) => ({
    path: `/${page.slug}`,
    element: <LandingPageView page={page} />,
  })),
  // ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE
  { path: "*", element: <NotFound /> },
];
