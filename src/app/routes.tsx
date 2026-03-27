import { createBrowserRouter } from "react-router";
import { Home } from "./pages/Home";
import { BlogPost } from "./pages/BlogPost";
import { Contact } from "./pages/Contact";
import { About } from "./pages/About";
import { AllReviews } from "./pages/AllReviews";
import { Layout } from "./components/Layout";
import { AdminLogin } from "./pages/AdminLogin";
import { AdminNewPost } from "./pages/AdminNewPost";

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
  // Admin routes (outside Layout — full screen)
  { path: "/admin", Component: AdminLogin },
  { path: "/admin/new", Component: AdminNewPost },
]);
