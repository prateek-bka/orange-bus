import { Button, Form, message } from "antd";
import React from "react";
import registerPagePic from "../resources/images/register_page_pic.png";
import { Link } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { HideLoading, ShowLoading } from "../redux/alertsSlice";

const Register = () => {
  const dispatch = useDispatch();
  const onFinish = async (values) => {
    // console.log(values);
    try {
      dispatch(ShowLoading());
      const response = await axios.post("/api/users/register", values);
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

  return (
    <>
      <div className="flex flex-column m-auto px-80 py-32">
        <img className="w-96 h-96" src={registerPagePic} />

        <div className="p-12">
          <h1 className="font-bold text-2xl">Register !</h1>
          <Form className="pt-4 w-96" layout="vertical" onFinish={onFinish}>
            <Form.Item label="Name" name="name">
              <input type="text" className="w-full p-1 bg-gray-100" />
            </Form.Item>
            <Form.Item label="Email" name="email">
              <input type="email" className="w-full p-1 bg-gray-100" />
            </Form.Item>
            <Form.Item
              label="Password"
              name="password"
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            >
              <input type="password" className="w-full p-1 bg-gray-100" />
            </Form.Item>
            <button
              type="submit"
              className="border border-gray-500 p-2 px-4 bg-blue-500 text-white"
            >
              Register
            </button>
          </Form>

          <div className="flex flex-column items-center">
            <h5 className="py-2">If already registered, Please login here</h5>
            <Link to={"/login"}>
              <Button type="link" className="">
                Login
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
