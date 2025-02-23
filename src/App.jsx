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
  Footprints,
} from "lucide-react";

const Navigation = [
  {
    kind: "header",
    title: "Main Menu", // ✅ Added a meaningful title
  },
  {
    segment: "",
    title: "Dashboard",
    icon: <LayoutDashboard size={28} color="#c95454" />,
    path: "/",
  },
  {
    segment: "category",
    title: "Category",
    icon: <SquareStack size={28} color="#c95454" />,
    path: "/categories",
    children: [
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
    segment: "addProduct",
    title: "Add Product",
    icon: <Plus size={28} color="#c95454" />,
    path: "addProduct",
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
