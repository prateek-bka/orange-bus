import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { HideLoading, ShowLoading } from "../../redux/alertsSlice";
import { axiosInstance } from "../../helpers/axiosInstance";
import { Col, Row, message } from "antd";
import SeatSelection from "../../components/SeatSelection";
import StripeCheckout from "react-stripe-checkout";

const BookNow = () => {
  const [bookedBus, setBookedBus] = useState([]);
  const dispatch = useDispatch();
  const params = useParams();

  const [selectedSeats, setSelectedSeats] = useState([]);

  const bookNow = async (transactionId) => {
    try {
      dispatch(ShowLoading());
      const response = await axiosInstance.post("/api/bookings/book-seat", {
        bus: bookedBus._id,
        seats: selectedSeats,
        transactionId,
      });
      dispatch(HideLoading());
      if (response.data.success) {
        message.success(response.data.message);
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

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

  const onToken = async (token) => {
    // console.log(token);
    try {
      dispatch(ShowLoading());
      const response = await axiosInstance.post("/api/bookings/make-payment", {
        token,
        amount: selectedSeats.length * bookedBus.fare * 100,
      });
      dispatch(HideLoading());
      if (response.data.success) {
        message.success(response.data.message);
        bookNow(response.data.data.transactionId);
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

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
            </h3>{" "}
            <div className="font-bold text-2xl text-orange-500 py-4">
              <h1>Selected seat number: {selectedSeats.join(",")}</h1>
              <h1>Total Cost: Rs. {bookedBus.fare * selectedSeats.length}</h1>
            </div>
            <StripeCheckout
              token={onToken}
              stripeKey="pk_test_51NUtVaSDCYJjaMYAf4ZBSHVBh1TFAxB3ihdamLKe9OtycQYWHNGHrN57M1ucpBX3dakUinH2wXmaK3SOAdNJbz5j0034RWY0LJ"
              billingAddress
              amount={selectedSeats.length * bookedBus.fare * 100}
              currency="inr"
            >
              <button
                className="border-2 p-2 bg-orange-600 text-slate-100 text-xl"
                onClick={bookNow}
                disabled={selectedSeats.length === 0}
              >
                Book Now
              </button>
            </StripeCheckout>
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
