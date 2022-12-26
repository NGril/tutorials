import React from "react";

const Link = ({ className, href, children }) => {
  const onClick = (event) => {
    // if we want to open link in new tab by using ctrl or command clicks
    if (event.metaKey || event.ctrlKey) {
      return;
    }

    // prevents default browser refresh
    event.preventDefault();

    // changes the window url
    window.history.pushState({}, "", href);

    // dispatches a new event
    const navEvent = new PopStateEvent("popstate");
    window.dispatchEvent(navEvent);
  };

  return (
    <a onClick={onClick} className={className} href={href}>
      {children}
    </a>
  );
};

export default Link;
