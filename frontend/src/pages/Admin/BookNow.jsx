import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { HideLoading, ShowLoading } from "../../redux/alertsSlice";
import { axiosInstance } from "../../helpers/axiosInstance";
import { Col, Row, message } from "antd";
import SeatSelection from "../../components/SeatSelection";

const BookNow = () => {
  const [bookedBus, setBookedBus] = useState([]);
  const dispatch = useDispatch();
  const params = useParams();

  const [selectedSeats, setSelectedSeats] = useState([]);

  const getBus = async () => {
    try {
      dispatch(ShowLoading());
      const response = await axiosInstance.post("/api/buses/get-bus-by-id", {
        _id: params.id,
      });
      dispatch(HideLoading());
      if (response.data.success) {
        setBookedBus(response.data.data);
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  useEffect(() => {
    getBus();
  }, []);
  return (
    <div>
      {bookedBus && (
        <Row>
          <Col>
            <h1 className="text-xl text-blue-700 font-bold">
              {bookedBus.busName}
            </h1>
            <h3 className="text-lg text-green-700">
              Departure date: <b>{bookedBus.busDepartureDate}</b>
            </h3>
            <h3 className="text-lg text-green-700">
              Departure time: <b>{bookedBus.busDepartureTime}</b>
            </h3>
            <h3 className="text-lg text-green-700">
              Bus Type: <b>{bookedBus.type}</b>
            </h3>
            <h3 className="text-lg text-green-700">
              Bus Fare: <b>Rs. {bookedBus.fare} /- only</b>
            </h3>
            <div className="font-bold text-2xl text-orange-500 py-4">
              <h1>Selected seat number: {selectedSeats.join(",")}</h1>
              <h1>Total Cost: Rs. {bookedBus.fare * selectedSeats.length}</h1>
            </div>
          </Col>

          <Col className="my-16 mx-20" lg={12}>
            <h1 className="font-bold text-xl text-orange-700 p-4">
              Bus Seat Structure
            </h1>
            <SeatSelection
              bookedBus={bookedBus}
              selectedSeats={selectedSeats}
              setSelectedSeats={setSelectedSeats}
            />
          </Col>
        </Row>
      )}
    </div>
  );
};

export default BookNow;
