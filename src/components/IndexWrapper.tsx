import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Index from "@/pages/Index";

type UserType = "patient" | "caretaker" | null;

const IndexWrapper = () => {
  const location = useLocation();
  const [userType, setUserType] = useState<UserType>(null);
  const [isOnboarded, setIsOnboarded] = useState(false);

  useEffect(() => {
    const state = location.state as { loggedIn?: boolean; userType?: UserType };

    if (state?.loggedIn && state.userType) {
      setUserType(state.userType);
      setIsOnboarded(true);
    }
  }, [location.state]);

  return (
    <Index
      userType={userType}
      setUserType={setUserType}
      isOnboarded={isOnboarded}
      setIsOnboarded={setIsOnboarded}
    />
  );
};

export default IndexWrapper;
