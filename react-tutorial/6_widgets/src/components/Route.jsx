import { useState, useEffect } from "react";

const Route = ({ path, children }) => {
  // window.location.pathname is always up to date and we could just use that
  // we use this piece of state only for the purpose of rerendering
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  // used to push an event listener the first time the Route component renders
  useEffect(() => {
    const onLocationChange = () => {
      setCurrentPath(window.location.pathname);
    };

    // pushing the event listener
    window.addEventListener("popstate", onLocationChange);

    // cleaning it up
    return () => window.removeEventListener("popstate", onLocationChange);
  }, []);

  // shows the child component if the corresponding path changes, otherwise doesn't show anything
  return currentPath === path ? children : null;
};

export default Route;
