import React, { useEffect } from "react";
import Router from "next/router";

const withAuth = (WrappedComponent) => {
  const HOC = (props) => {
    useEffect(() => {
      const token = localStorage.getItem("token");
      if (!token) {
        Router.push("/admin");
      }
    }, []);

    return <WrappedComponent {...props} />;
  };

  return HOC;
};

export default withAuth;
