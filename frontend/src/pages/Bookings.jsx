// import React, { useEffect, useState } from "react";
// import PageTitle from "../components/PageTitle";
// import BusForm from "../components/BusForm";
// import { Button, Table, message } from "antd";
// import { HideLoading, ShowLoading } from "../redux/alertsSlice";
// import { useDispatch } from "react-redux";
// import { axiosInstance } from "../helpers/axiosInstance";

// const Bookings = () => {
//   const dispatch = useDispatch();
//   const [buses, setBuses] = useState([]);

//   const getBookings = async () => {
//     try {
//       dispatch(ShowLoading());
//       const response = await axiosInstance.post(
//         "/api/buses/get-bookings-by-user-id"
//       );
//       dispatch(HideLoading());
//       if (response.data.success) {
//         setBuses(response.data.data);
//       } else {
//         message.error(response.data.message);
//       }
//     } catch (error) {
//       dispatch(HideLoading());
//       message.error(error.message);
//     }
//   };

//   useEffect(() => {
//     getBookings();
//   }, []);

//   const columns = [
//     {
//       title: "Bus Name",
//       dataIndex: "busName",
//       key: "busName",
//     },
//     { title: "Bus Number", dataIndex: "busNumber" },

//     {
//       title: "Bus Type",
//       dataIndex: "type",
//     },

//     {
//       title: "Departure Date",
//       dataIndex: "busDepartureDate",
//       render: (busDepartureDate) => busDepartureDate.slice(0, 10),
//     },
//     {
//       title: "Departure Time",
//       dataIndex: "busDepartureTime",
//     },
//     {
//       title: "Arrival Date",
//       dataIndex: "busArrivalDate",
//       render: (busArrivalDate) => busArrivalDate.slice(0, 10),
//     },
//     {
//       title: "Arrival Time",
//       dataIndex: "busArrivalTime",
//     },

//     {
//       title: "Seats Booked",
//       dataIndex: "seatsBooked",
//     },
//     {
//       title: "Ticket Cost",
//       dataIndex: "fare",
//     },
//   ];

//   return (
//     <div>
//       {" "}
//       {buses && <Table columns={columns} dataSource={buses} size="small" />}
//     </div>
//   );
// };

// export default Bookings;

import React from "react";

const Bookings = () => {
  return <div>Bookings</div>;
};

export default Bookings;
