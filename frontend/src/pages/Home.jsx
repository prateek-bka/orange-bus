import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { HideLoading, ShowLoading } from "../redux/alertsSlice";
import { axiosInstance } from "../helpers/axiosInstance";
import { Col, Row, message } from "antd";
import BusCard from "../components/BusCard";

const Home = () => {
  const { user } = useSelector((state) => state.users);
  const [buses, setBuses] = useState([]);
  const dispatch = useDispatch();

  const getBuses = async () => {
    try {
      dispatch(ShowLoading());
      const response = await axiosInstance.post("/api/buses/get-all-buses");
      dispatch(HideLoading());
      if (response.data.success) {
        setBuses(response.data.data);
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  useEffect(() => {
    getBuses();
  }, []);

  return (
    <div>
      <h2>Hi</h2>
      {user && <h1>Welcome {user?.name}</h1>}
      {user && <h1>{user.email}</h1>}
      <div>
        {buses.map((e, id) => {
          return (
            <Col>
              <BusCard e={e} />
            </Col>
          );
        })}
      </div>
    </div>
  );
};

export default Home;
