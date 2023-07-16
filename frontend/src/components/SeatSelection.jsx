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
     
      <Row gutter={[10, 10]}>
        {Array.from(Array(capacity).keys()).map((seat) => {
          return (
            <Col span={6}>
              <div
                className={
                  // check available seat
                  selectedSeats.includes(seat + 1)
                    ? "bg-orange-500 text-white text-xl font-bold border-2 border-orange-300 p-1 m-1"
                    : "border-2 border-orange-300 p-1 m-1"
                }
                onClick={() => selectedOrUnselectedSeats(seat + 1)}
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
