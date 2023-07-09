import { message } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { SetUser } from "../redux/usersSlice";
import { HideLoading, ShowLoading } from "../redux/alertsSlice";
import DefaultLayout from "./DefaultLayout";

const ProtectedRoute = ({ children }) => {
  const dispatch = useDispatch();
  // const [loading, setLoading] = useState(false);
  const { loading } = useSelector((state) => state.alerts);
  const navigate = useNavigate();

  const validateToken = async () => {
    try {
      dispatch(ShowLoading());
      const response = await axios.post(
        "/api/users/get-user-by-id",
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.data.success) {
        // setLoading(false);
        dispatch(HideLoading());
        dispatch(SetUser(response.data.data));
      } else {
        // setLoading(false);
        dispatch(HideLoading());
        navigate("/login");
      }
    } catch (error) {
      // setLoading(false);
      dispatch(HideLoading());
      localStorage.removeItem("token");
      message.error(error.data.message);
      navigate("/login");
    }
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      validateToken();
    } else {
      navigate("/login");
    }
  }, []);

  return <>{!loading && <DefaultLayout>{children}</DefaultLayout>}</>;
};

export default ProtectedRoute;
