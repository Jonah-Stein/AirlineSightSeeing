import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [index("./pages/home.tsx"),
    route("/discover", "./pages/discover.tsx"),
    route("/profile/:username", "./pages/profile.tsx"),
    route("/landmarks", "./pages/landmarks.tsx")
] satisfies RouteConfig;
