import { createBrowserRouter } from "react-router";
import { Home } from "./pages/Home";
import { BlogPost } from "./pages/BlogPost";
import { Contact } from "./pages/Contact";
import { About } from "./pages/About";
import { AllReviews } from "./pages/AllReviews";
import { Layout } from "./components/Layout";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: Home },
      { path: "post/:slug", Component: BlogPost },
      { path: "reviews", Component: AllReviews },
      { path: "about", Component: About },
      { path: "contact", Component: Contact },
    ],
  },
]);