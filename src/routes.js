import Dashboard from "views/Dashboard.jsx";
import UserProfile from "views/UserProfile.jsx";
import TableList from "views/TableList.jsx";
import Typography from "views/Typography.jsx";
import Icons from "views/Icons.jsx";
import Maps from "views/Maps.jsx";
import Notifications from "views/Notifications.jsx";
import Upgrade from "views/Upgrade.jsx";
import ViewPlayers from "views/Players/ViewPlayers";
import EditPlayer from "./views/Players/EditPlayer";
import Player from "./views/Players/Player";

import AddUser from "views/Players/AddUser.jsx";
import Login from "./views/Login";
import ViewGames from "./views/Games/ViewGames";
import AddGames from "./views/Games/AddGames";

const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "pe-7s-graph",
    component: Dashboard,
    layout: "/admin",
    protected: true
  },
  {
    path: "/user",
    name: "User Profile",
    icon: "pe-7s-user",
    component: UserProfile,
    layout: "/admin"
  },
  {
    path: "/table",
    name: "Table List",
    icon: "pe-7s-note2",
    component: TableList,
    layout: "/admin"
  },
  {
    path: "/typography",
    name: "Typography",
    icon: "pe-7s-news-paper",
    component: Typography,
    layout: "/admin"
  },
  {
    path: "/icons",
    name: "Icons",
    icon: "pe-7s-science",
    component: Icons,
    layout: "/admin"
  },
  {
    path: "/maps",
    name: "Maps",
    icon: "pe-7s-map-marker",
    component: Maps,
    layout: "/admin"
  },
  {
    path: "/notifications",
    name: "Notifications",
    icon: "pe-7s-bell",
    component: Notifications,
    layout: "/admin"
  },
  {
    path: "/add-player",
    name: "Add Player",
    icon: "pe-7s-add-user",
    component: AddUser,
    layout: "/admin"
  },
  {
    path: "/players",
    name: "Players",
    icon: "pe-7s-add-user",
    component: ViewPlayers,
    layout: "/admin"
  },
  {
    path: "/player/edit/:id",
    redirect: true,
    component: EditPlayer,
    layout: "/admin"
  },
  {
    path: "/player/stats/:id",
    redirect: true,
    component: Player,
    layout: "/admin"
  },
  {
    path: "/games",
    name: "Games",
    icon: "pe-7s-map-marker",
    component: ViewGames,
    layout: "/admin"
  },
  {
    path: "/add-game",
    redirect: true,
    name: "New Game",
    icon: "pe-7s-map-marker",
    component: AddGames,
    layout: "/admin"
  },
  {
    path: "",
    name: "Login",
    component: Login,
    layout: "/login"
  }
];

export default dashboardRoutes;
