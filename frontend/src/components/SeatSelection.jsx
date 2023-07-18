import { Col, Row } from "antd";
import React from "react";

const SeatSelection = ({ selectedSeats, setSelectedSeats, bookedBus }) => {
  const capacity = bookedBus.busCapacity;
  const selectedOrUnselectedSeats = (seatNumber) => {
    if (selectedSeats.includes(seatNumber)) {
      setSelectedSeats(selectedSeats.filter((seat) => seat !== seatNumber));
    } else {
      setSelectedSeats([...selectedSeats, seatNumber]);
    }
  };

  return (
    <div>
      <h3 className="text-xl font-bold text-green-700 p-2 m-2">
        Capacity Left{" "}
        <b>{bookedBus.busCapacity - bookedBus.seatsBooked.length}</b>
      </h3>
      <Row gutter={[10, 10]}>
        {Array.from(Array(capacity).keys()).map((seat) => {
          const isSeatBooked = bookedBus.seatsBooked.includes(seat + 1);
          const isSelected = selectedSeats.includes(seat + 1);
          const seatClass = isSeatBooked
            ? "bg-gray-500"
            : isSelected
            ? "bg-orange-500 text-white text-xl font-bold"
            : "";

          return (
            <Col span={6} key={seat}>
              <div
                className={`border-2 border-orange-300 p-1 m-1 ${seatClass}`}
                onClick={() =>
                  !isSeatBooked && selectedOrUnselectedSeats(seat + 1)
                }
              >
                {seat + 1}
              </div>
            </Col>
          );
        })}
      </Row>
    </div>
  );
};

export default SeatSelection;
