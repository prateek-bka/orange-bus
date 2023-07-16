import React from "react";
import { useNavigate } from "react-router-dom";

const BusCard = ({ e }) => {
  const navigate = useNavigate();
  return (
    <div className="bg-orange-100 p-2 m-2 w-100">
      <h2 className="text-xl text-blue-700 font-bold">{e.busName}</h2>
      <div class="flex flex-column justify-between">
        <h3 className="text-lg text-green-700">
          From: <b>{e.from}</b>
        </h3>
        <h3 className="text-lg text-green-700">
          To: <b>{e.to}</b>
        </h3>
      </div>
      <div class="flex flex-column justify-between">
        <h3 className="text-lg text-green-700">
          Departure date: <b>{e.busDepartureDate.slice(0, 10)}</b>
        </h3>
        <h3 className="text-lg text-green-700">
          Departure time: <b>{e.busDepartureTime}</b>
        </h3>
      </div>
      <div class="flex flex-column justify-between">
        <h3 className="text-lg text-green-700">
          Bus Type: <b>{e.type}</b>
        </h3>
        <h3 className="text-lg text-green-700">
          Bus Fare: <b>Rs. {e.fare} /- only</b>
        </h3>
      </div>
      <button
        className="bg-red-500 px-4 py-2 mt-4 rounded text-gray-100"
        onClick={() => {
          //   console.log(`clicked ${e._id}`);
          navigate(`/book-now/${e._id}`);
        }}
      >
        Buy Ticket
      </button>
    </div>
  );
};

export default BusCard;
