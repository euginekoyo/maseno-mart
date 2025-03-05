import * as React from "react";
import { AppProvider } from "@toolpad/core/AppProvider";
import { Outlet } from "react-router-dom";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  SquareStack,
  MonitorSmartphone,
  Unplug,
  Shirt,
  BriefcaseBusiness,
  CookingPot,
  ArrowDownAZ,
  Pickaxe,
  Footprints,
  Aperture,
  Unlink,
  Gamepad2,
  Bike,
  Computer,
} from "lucide-react";
import {jwtDecode} from "jwt-decode"; // Fixed import statement

const Navigation = [
  {
    segment: "",
    title: "Dashboard",
    icon: <LayoutDashboard size={28} color="#c95454" />,
    path: "/",
  },
  {
    segment: "products",
    title: "Products",
    icon: <SquareStack size={28} color="#c95454" />,
    path: "/products",
    children: [
      { segment: "all", title: "All", icon: <ArrowDownAZ color="#c95454" />, path: "/products" },
      { segment: "phone", title: "Phone & Accessories", icon: <MonitorSmartphone color="#c95454" />, path: "/phone" },
      { segment: "appliance", title: "Appliance", icon: <Unplug color="#c95454" />, path: "/appliance" },
      { segment: "clothes", title: "Clothes", icon: <Shirt color="#c95454" />, path: "/clothes" },
      { segment: "bags", title: "Bags", icon: <BriefcaseBusiness color="#c95454" />, path: "/bags" },
      { segment: "homeware", title: "Home & Kitchen", icon: <CookingPot color="#c95454" />, path: "/homeware" },
      { segment: "shoes", title: "Shoes", icon: <Footprints color="#c95454" />, path: "/shoes" },
    ],
  },
  {
    segment: "services",
    title: "Services",
    icon: <Pickaxe size={28} color="#c95454" />,
    path: "/services", // Fixed path (removed ./)
    children: [
      { segment: "allServices", title: "All", icon: <ArrowDownAZ color="#c95454" />, path: "/services" },
      { segment: "photography", title: "Photography", icon: <Aperture color="#c95454" />, path: "/photography" },
      { segment: "hairdesign", title: "Hair Design", icon: <Unlink color="#c95454" />, path: "/hairdesign" },
      { segment: "gaming", title: "Gaming", icon: <Gamepad2 color="#c95454" />, path: "/gaming" },
      { segment: "bikehire", title: "Bike Hire", icon: <Bike color="#c95454" />, path: "/bikehire" }, // Fixed capitalization
      { segment: "cyberservices", title: "Cyber Services", icon: <Computer color="#c95454" />, path: "/cyberservices" },
    ],
  },
];

function App() {
  const [session, setSession] = React.useState({
    user: {
      name: "New",
      email: "new@outlook.com",
      image: "https://avatars.githubusercontent.com/u/19550456",
    },
  });

  React.useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      try {
        const decoded = jwtDecode(token);

        if (decoded.exp * 1000 < Date.now()) {
          localStorage.removeItem("token");
          setSession({ user: null }); // Reset session if token expired
        } else {
          setSession({
            user: {
              name: decoded.name || "User",
              email: decoded.email || "unknown@example.com",
              image: decoded.image || "https://avatars.githubusercontent.com/u/19550456",
            },
          });
        }
      } catch (error) {
        console.error("Invalid token:", error);
        localStorage.removeItem("token");
        setSession({ user: null });
      }
    }
  }, []);

  const authentication = React.useMemo(() => ({
    signIn: () => {
      setSession({
        user: {
          name: "Bharat Kashyap",
          email: "bharatkashyap@outlook.com",
          image: "https://avatars.githubusercontent.com/u/19550456",
        },
      });
    },
    signOut: () => {
      localStorage.removeItem("token");
      setSession({ user: null });
    },
  }), []);

  return (
    <AppProvider
      navigation={Navigation.map((item) =>
        item.path
          ? {
              ...item,
              render: () => (
                <NavLink
                  to={item.path}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  {item.icon} {item.title}
                </NavLink>
              ),
            }
          : item
      )}
      session={session}
      authentication={authentication}
    >
      <Outlet />
    </AppProvider>
  );
}

export default App;
