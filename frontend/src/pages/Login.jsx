import { Button, Form, message } from "antd";
import React from "react";
import loginPagePic from "../resources/images/login_page_pic.png";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { HideLoading, ShowLoading } from "../redux/alertsSlice";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onFinish = async (values) => {
    // console.log(values);
    try {
      dispatch(ShowLoading());
      const response = await axios.post("/api/users/login", values);
      dispatch(HideLoading());
      if (response.data.success) {
        message.success(response.data.message);
        localStorage.setItem("token", response.data.data);
        navigate("/");
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
        <img className="w-96 h-96" src={loginPagePic} />

        <div className="p-16">
          <h1 className="font-bold text-2xl">Login !</h1>
          <Form className="pt-4 w-96" layout="vertical" onFinish={onFinish}>
            <Form.Item label="Email" name="email">
              <input type="text" className="w-full p-1 bg-gray-100" />
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
              Login
            </button>
          </Form>

          <div className="py-2 flex flex-column items-center">
            <h5 className="py-2">If not registered, Please register here</h5>
            <Link to="/register">
              <Button type="link" className="">
                Register
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
