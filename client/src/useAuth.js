import React from "react";
import { useState, useEffect } from "react";

const useAuth = () => {
  const [accessToken, SetAccessToken] = useState();
  const [refreshToken, setRefreshToken] = useState();
  const [expiresIn, setExpiresIn] = useState();

  useEffect(() => {
    const fetchToken = async () => {
      const res = await fetch(`/login`);
      const data = await res.json();
      console.log(data);
    };

    fetchReservation();
  }, []);
};
