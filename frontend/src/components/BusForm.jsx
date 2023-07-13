import { Col, Form, Modal, Row, message } from "antd";
import React from "react";
import { useDispatch } from "react-redux";
import { axiosInstance } from "../helpers/axiosInstance";
import { HideLoading, ShowLoading } from "../redux/alertsSlice";

const BusForm = ({
  showBusForm,
  setShowBusForm,
  type = "add",
  getData,
  selectedBus,
  setSelectedBus,
}) => {
  const dispatch = useDispatch();
  const onFinish = async (values) => {
    console.log(values);
    try {
      dispatch(ShowLoading());
      let response = null;
      if (type == "add") {
        response = await axiosInstance.post("/api/buses/add-bus", values);
      } else if (type == "edit") {
        response = await axiosInstance.post("/api/buses/update-bus", {
          ...values,
          _id: selectedBus._id,
        });
      }

      if (response.data.success) {
        message.success(response.data.message);
      } else {
        message.error(response.data.message);
      }
      getData();
      setShowBusForm(false);
      setSelectedBus(null);
      dispatch(HideLoading());
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  return (
    <div>
      <Modal
        title="Add Bus Details"
        open={showBusForm}
        onCancel={() => setShowBusForm(false)}
        footer={false}
        width={"50%"}
      >
        <Form layout="vertical" onFinish={onFinish} initialValues={selectedBus}>
          <Row>
            <Col lg={24} xs={24}>
              <Form.Item label="Bus Name" name="busName">
                <input type="text" className="bg-slate-100 p-2 w-full w-80" />
              </Form.Item>
            </Col>

            <Col lg={12} xs={24}>
              <Form.Item label="Bus Number" name="busNumber">
                <input type="text" className="bg-slate-100 p-2 w-full" />
              </Form.Item>
            </Col>

            <Col lg={12} xs={24}>
              <Form.Item label="Bus Capacity" name="busCapacity">
                <input type="number" className="bg-slate-100 ml-2 p-2 w-full" />
              </Form.Item>
            </Col>

            <Col lg={12} xs={24}>
              <Form.Item label="From" name="from">
                <input type="text" className="bg-slate-100 p-2 w-full" />
              </Form.Item>
            </Col>
            <Col lg={12} xs={24}>
              <Form.Item label="To" name="to">
                <input type="text" className="bg-slate-100 p-2 ml-2 w-full" />
              </Form.Item>
            </Col>
            <Col lg={12} xs={24}>
              <Form.Item label="Bus Departure Date" name="busDepartureDate">
                <input type="date" className="bg-slate-100 p-2 w-full" />
              </Form.Item>
            </Col>
            <Col lg={12} xs={24}>
              <Form.Item label="Bus Departure Time" name="busDepartureTime">
                <input type="time" className="bg-slate-100 p-2 ml-2 w-full" />
              </Form.Item>
            </Col>
            <Col lg={12} xs={24}>
              <Form.Item label="Bus Arrival Date" name="busArrivalDate">
                <input type="date" className="bg-slate-100 p-2 w-full" />
              </Form.Item>
            </Col>
            <Col lg={12} xs={24}>
              <Form.Item label="Bus Arrival Time" name="busArrivalTime">
                <input type="time" className="bg-slate-100 p-2 ml-2 w-full" />
              </Form.Item>
            </Col>

            <Col lg={12} xs={24}>
              <Form.Item label="Bus Type" name="type">
                {/* <select
                  name={(e) => e.target.name}
                  id=""
                  className="bg-slate-100 p-2 w-full"
                  onChange={(e) => e.target.value}
                  defaultValue="acSleeper"
                >
                  <option value="acSleeper" name="acSleeper">
                    AC Sleeper
                  </option>
                  <option value="nonAcSleeper" name="nonAcSleeper">
                    Non-AC Sleeper
                  </option>
                  <option value="acSitting" name="acSitting">
                    AC Sitting
                  </option>
                  <option value="nonAcSitting" name="nonAcSitting">
                    Non-AC Sitting
                  </option>
                </select> */}
                <input type="text" className="bg-slate-100 p-2 ml-2 w-full" />
              </Form.Item>
            </Col>
            <Col lg={12} xs={24}>
              <Form.Item label="Bus Fare" name="fare">
                <input type="number" className="bg-slate-100 p-2 ml-2 w-full" />
              </Form.Item>
            </Col>
            <button
              type="submit"
              className="bg-orange-700 px-8 py-2 rounded text-slate-100"
            >
              Add Bus
            </button>
          </Row>
        </Form>
      </Modal>
    </div>
  );
};

export default BusForm;
