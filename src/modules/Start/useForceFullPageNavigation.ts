import { useEffect } from "react";
import { useLocation } from "react-router-dom"; // For React Router

const useForceFullPageReloadOnNavigation = () => {
  const location = useLocation(); // React Router (uncomment if using React Router)

  useEffect(() => {
    const handleRouteChange = () => {
      window.location.href = window.location.href;
    };

    return () => {
      console.log("hii");
      handleRouteChange();
    };
  }, [location]); // Use [location] instead of [router] for React Router
};

export default useForceFullPageReloadOnNavigation;
