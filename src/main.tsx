import { ViteReactSSG } from "vite-react-ssg";
import { routes } from "./App";
import "./index.css";

// vite-react-ssg renders each route to static HTML at build time, then
// hydrates on the client. First paint shows real content (cover, headline,
// buy buttons) before the JS bundle finishes — critical for ad traffic.
export const createRoot = ViteReactSSG({ routes });
