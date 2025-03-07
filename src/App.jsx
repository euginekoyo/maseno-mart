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
import { jwtDecode } from "jwt-decode"; // Fixed import statement
import SimpleBottomNavigation from "./components/SimpleBottomNavigation";

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
      {
        segment: "",
        title: "All",
        icon: <ArrowDownAZ color="#c95454" />,
        path: "/products",
      },
      {
        segment: "phone",
        title: "Phone & Accessories",
        icon: <MonitorSmartphone color="#c95454" />,
        path: "/products/phone",
      },
      {
        segment: "appliance",
        title: "Appliance",
        icon: <Unplug color="#c95454" />,
        path: "/products/appliance",
      },
      {
        segment: "clothes",
        title: "Clothes",
        icon: <Shirt color="#c95454" />,
        path: "/products/clothes",
      },
      {
        segment: "bags",
        title: "Bags",
        icon: <BriefcaseBusiness color="#c95454" />,
        path: "/products/bags",
      },
      {
        segment: "homeware",
        title: "Home & Kitchen",
        icon: <CookingPot color="#c95454" />,
        path: "/products/homeware",
      },
      {
        segment: "shoes",
        title: "Shoes",
        icon: <Footprints color="#c95454" />,
        path: "/products/shoes",
      },
    ],
  },
  {
    segment: "services",
    title: "Services",
    icon: <Pickaxe size={28} color="#c95454" />,
    path: "/services", // Fixed path (removed ./)
    children: [
      {
        segment: "",
        title: "All",
        icon: <ArrowDownAZ color="#c95454" />,
        path: "/services",
      },
      {
        segment: "photography",
        title: "Photography",
        icon: <Aperture color="#c95454" />,
        path: "/services/photography",
      },
      {
        segment: "hairdesign",
        title: "Hair Design",
        icon: <Unlink color="#c95454" />,
        path: "/services/hairdesign",
      },
      {
        segment: "gaming",
        title: "Gaming",
        icon: <Gamepad2 color="#c95454" />,
        path: "/services/gaming",
      },
      {
        segment: "bikehire",
        title: "Bike Hire",
        icon: <Bike color="#c95454" />,
        path: "/services/bikehire",
      }, // Fixed capitalization
      {
        segment: "cyberservices",
        title: "Cyber Services",
        icon: <Computer color="#c95454" />,
        path: "/services/cyberservices",
      },
    ],
  },
  {
    segment: "profile",
    title: "my profile",
    icon: <Computer color="#c95454" />,
    path: "/profile",
  },
];

function App() {
  const [session, setSession] = React.useState({
    user: {
      name: "User",
      email: "unknown@example.com",
      image: "https://avatars.githubusercontent.com/u/19550456",
    },
  });
  const authentication = React.useMemo(
    () => ({
      signIn: () => {
        const token = localStorage.getItem("token");
        if (token) {
          try {
            const decoded = jwtDecode(token);
            setSession({
              user: {
                name: decoded.name || "User",
                email: decoded.email || "unknown@example.com",
                image:
                  decoded.image ||
                  "https://avatars.githubusercontent.com/u/19550456",
              },
            });
            console.log("User signed in:", decoded); // Debugging
          } catch (error) {
            console.error("Invalid token:", error);
          }
        }
      },
      signOut: () => {
        localStorage.removeItem("token");
        setSession({ user: null });
        console.log("User signed out"); // Debugging
      },
    }),
    []
  );

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
              image:
                decoded.image ||
                "https://avatars.githubusercontent.com/u/19550456",
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

  return (
    <AppProvider
      session={session}
      authentication={authentication}
      navigation={Navigation.map((item) =>
        item.path
          ? {
              ...item,
              render: () => (
                <nav>
                  {session.user && session.user.name ? (
                    <div>
                      <img src={session.user.image} alt="User" width={40} />
                      <button onClick={authentication.signOut}>Sign Out</button>
                    </div>
                  ) : (
                    <NavLink to="/signin">Sign In</NavLink>
                  )}
                </nav>
              ),
            }
          : item
      )}
    >
      <Outlet />
    </AppProvider>
  );
}
export default App;
