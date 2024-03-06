import axios from "axios";
import React, { useEffect, useState } from "react";
import req from "../utils/req";
import { useDispatch, useSelector } from "react-redux";
import { setLoggedUser } from "../Redux/reducers/loggedUserReducer";

const useUser = () => {
  // const [loggedUser, setLoggedUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const loggedUser = useSelector((state) => state.logger.loggedUser);
  useEffect(() => {
    setLoading(true);
    // axios.get(`${import.meta.env.VITE_BASE_URL}/me`, { withCredentials: true })
    req({
      uri: "me",
    }).then((res) => {
      // setLoggedUser(res.data);
      dispatch(setLoggedUser(res.data));
    });
    setLoading(false);
  }, []);
  if (loading) return <div className="">Loading...</div>;

  return {
    loggedUser,
    setLoggedUser,
    loading,
    setLoading,
  };
};

export default useUser;
