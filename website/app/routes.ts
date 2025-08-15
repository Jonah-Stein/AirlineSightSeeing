import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [index("./pages/home.tsx"),
    route("/discover", "./pages/discover.tsx"),
    route("/profile", "./pages/my-profile.tsx"),
    route("/profile/:username", "./pages/profile.tsx"),
    route("/landmarks", "./pages/landmarks.tsx"),
    route("/auth", "./pages/auth.tsx")
] satisfies RouteConfig;
