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
  Plus,
  Pickaxe,
  Footprints,
  Aperture,
  Unlink,
  Gamepad2,
  Bike,
  Computer,
  ArrowDownAZ,
} from "lucide-react";
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
        segment: "all",
        title: "All",
        icon: <ArrowDownAZ color="#c95454" />,
        path: "/products",
      },
      {
        segment: "phone",
        title: "Phone & Accessories",
        icon: <MonitorSmartphone color="#c95454" />,
        path: "/phone",
      },
      {
        segment: "appliance", // ✅ Fixed capitalization
        title: "Appliance",
        icon: <Unplug color="#c95454" />,
        path: "/appliance",
      },
      {
        segment: "clothes",
        title: "Clothes",
        icon: <Shirt color="#c95454" />,
        path: "/clothes",
      },
      {
        segment: "bags",
        title: "Bags",
        icon: <BriefcaseBusiness color="#c95454" />,
        path: "/bags",
      },
      {
        segment: "homeware",
        title: "Home & Kitchen",
        icon: <CookingPot color="#c95454" />,
        path: "/homeware",
      },
      {
        segment: "shoes",
        title: "Shoes",
        icon: <Footprints color="#c95454" />,
        path: "/shoes",
      },
    ],
  },
  {
    segment: "services",
    title: "Services",
    icon: <Pickaxe size={28} color="#c95454" />,
    path: "./services",
    children: [
      {
        segment: "allServices",
        title: "All",
        icon: <ArrowDownAZ color="#c95454" />,
        path: "/services",
      },
      {
        segment: "photography",
        title: "photography",
        icon: <Aperture color="#c95454" />,
        path: "/photography",
      },
      {
        segment: "HairDesign",
        title: "HairDesign",
        icon: <Unlink color="#c95454" />,
        path: "/hairdesign",
      },
      {
        segment: "Gaming",
        title: "Gaming",
        icon: <Gamepad2 color="#c95454" />,
        path: "/gaming",
      },
      {
        segment: "Bikehire",
        title: "Bikehire",
        icon: <Bike color="#c95454" />,
        path: "/Bikehire",
      },
      {
        segment: "CyberServices",
        title: "CyberService",
        icon: <Computer color="#c95454" />,
        path: "/cyberService",
      },
    ],
  },
  
];

function App() {
  const [session, setSession] = React.useState({
    user: {
      name: "Bharat Kashyap",
      email: "bharatkashyap@outlook.com",
      image: "https://avatars.githubusercontent.com/u/19550456",
    },
  });

  const authentication = React.useMemo(() => {
    return {
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
        setSession(null);
      },
    };
  }, []);
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
