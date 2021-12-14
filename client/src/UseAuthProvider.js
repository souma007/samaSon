import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const UseAuthContext = createContext(null);

const UseAuthProvider = ({ children }) => {
  const [code, setCode] = useState(null);
  const [accessToken, setAccessToken] = useState();
  // const [refreshToken, setRefreshToken] = useState();
  // const [expiresIn, setExpiresIn] = useState();

  console.log(code);
  // useEffect(() => {
  //   axios
  //     .post("/login", {
  //       code,
  //     })
  //     .then((res) => {
  //       setAccessToken(res.data.accessToken);
  //       setRefreshToken(res.data.refreshToken);
  //       setExpiresIn(res.data.expiresIn);
  //       // window.history.pushState({}, null, "/dashboard");
  //     })
  //     .catch(() => {
  //       window.location = "/";
  //     });
  // // }, [code]);

  // useEffect(() => {
  //   if (!refreshToken || !expiresIn) return;
  //   const interval = setInterval(() => {
  //     axios
  //       .post("/refresh", {
  //         refreshToken,
  //       })
  //       .then((res) => {
  //         setAccessToken(res.data.accessToken);
  //         setExpiresIn(res.data.expiresIn);
  //       })
  //       .catch(() => {
  //         window.location = "/";
  //       });
  //   }, (expiresIn - 60) * 1000);

  //   return () => clearInterval(interval);
  // }, [refreshToken, expiresIn]);

  return (
    <UseAuthContext.Provider
      value={{ accessToken, setAccessToken, setCode, code }}
    >
      {children}
    </UseAuthContext.Provider>
  );
};

export default UseAuthProvider;
