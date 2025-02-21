import * as React from "react";
import { AppProvider } from "@toolpad/core/AppProvider";
import { Outlet } from "react-router-dom";

import {
  ShoppingBasket,
  LayoutDashboard,
  SquareStack,
  MonitorSmartphone,
  Unplug,
  Shirt,
  BriefcaseBusiness,
  CookingPot,
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
  },
  {
    segment: "category",
    title: "Category",
    icon: <SquareStack size={28} color="#c95454" />,
    children: [
      {
        segment: "phone",
        title: "Phone & Accessories",
        icon: <MonitorSmartphone color="#c95454" />,
      },
      {
        segment: "appliance", // ✅ Fixed capitalization
        title: "Appliance",
        icon: <Unplug color="#c95454" />,
      },
      {
        segment: "clothes",
        title: "Clothes",
        icon: <Shirt color="#c95454" />,
      },
      {
        segment: "bags",
        title: "Bags",
        icon: <BriefcaseBusiness color="#c95454" />, // ✅ Fixed typo (icons -> icon)
      },
      {
        segment: "home",
        title: "Home & Kitchen",
        icon: <CookingPot color="#c95454" />,
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
      navigation={Navigation}
      session={session}
      authentication={authentication}
    >
      <Outlet />
    </AppProvider>
  );
}

export default App;
