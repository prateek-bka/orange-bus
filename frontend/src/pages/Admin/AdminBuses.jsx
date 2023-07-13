import React, { useEffect, useState } from "react";
import PageTitle from "../../components/PageTitle";
import BusForm from "../../components/BusForm";
import { Button, Table, message } from "antd";
import { HideLoading, ShowLoading } from "../../redux/alertsSlice";
import { useDispatch } from "react-redux";
import { axiosInstance } from "../../helpers/axiosInstance";

const AdminBuses = () => {
  const [showBusForm, setShowBusForm] = useState(false);
  const [buses, setBuses] = useState([]);
  const [selectedBus, setSelectedBus] = useState(null);
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

  const deleteBus = async (id) => {
    try {
      dispatch(ShowLoading());
      const response = await axiosInstance.post("/api/buses/delete-bus", {
        _id: id,
      });
      dispatch(HideLoading());
      if (response.data.success) {
        message.success(response.data.message);
        getBuses();
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "busName",
    },
    { title: "Number", dataIndex: "busNumber" },
    {
      title: "Capacity",
      dataIndex: "busCapacity",
    },
    {
      title: "Bus Type",
      dataIndex: "type",
    },
    // {
    //   title: "from",
    //   dataIndex: "from",
    // },
    // {
    //   title: "to",
    //   dataIndex: "to",
    // },
    {
      title: "Departure Date",
      dataIndex: "busDepartureDate",
      render: (busDepartureDate) => busDepartureDate.slice(0, 10),
    },
    {
      title: "Departure Time",
      dataIndex: "busDepartureTime",
    },
    {
      title: "Arrival Date",
      dataIndex: "busArrivalDate",
      render: (busArrivalDate) => busArrivalDate.slice(0, 10),
    },
    {
      title: "Arrival Time",
      dataIndex: "busArrivalTime",
    },
    {
      title: "Ticket Cost",
      dataIndex: "fare",
    },
    {
      title: "Seats Booked",
      dataIndex: "seatsBooked",
    },
    {
      title: "Bus Status",
      dataIndex: "status",
    },
    {
      title: "Actions",
      dataIndex: "action",
      render: (action, record) => (
        <div className="flex flex-column gap-4 text-xl">
          <i
            class="ri-edit-line"
            onClick={() => {
              setSelectedBus(record);
              setShowBusForm(true);
            }}
          ></i>
          <i
            class="ri-delete-bin-line"
            onClick={() => deleteBus(record._id)}
          ></i>
        </div>
      ),
    },
  ];

  return (
    <div>
      <div>
        <PageTitle title="Buses" />
        <button
          className="bg-orange-700 p-2 rounded text-gray-100"
          onClick={() => {
            setShowBusForm(true);
          }}
        >
          Add Bus
        </button>
      </div>

      <Table columns={columns} dataSource={buses} size="small" />

      {showBusForm && (
        <BusForm
          showBusForm={showBusForm}
          setShowBusForm={setShowBusForm}
          type={selectedBus ? "edit" : "add"}
          selectedBus={selectedBus}
          setSelectedBus={setSelectedBus}
          getData={getBuses}
        />
      )}
    </div>
  );
};

export default AdminBuses;
