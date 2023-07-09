import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const DefaultLayout = ({ children }) => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.users);

  const userMenu = [
    { name: "Home", path: "/", icon: "ri-home-line" },

    {
      name: "Profile",
      path: "/profile",
      icon: "ri-user-line",
    },
    {
      name: "Bookings",
      path: "/bookings",
      icon: "ri-calendar-fill",
    },
    {
      name: "Logout",
      path: "/logout",
      icon: "ri-logout-box-r-line",
    },
  ];

  const adminMenu = [
    { name: "Home", path: "/admin", icon: "ri-home-line" },
    {
      name: "Buses",
      path: "/admin/buses",
      icon: "ri-bus-line",
    },
    {
      name: "Users",
      path: "/admin/users",
      icon: "ri-user-line",
    },
    {
      name: "Bookings",
      path: "/admin/bookings",
      icon: "ri-calendar-fill",
    },
    {
      name: "Logout",
      path: "/logout",
      icon: "ri-logout-box-r-line",
    },
  ];

  const menuToBeRendered = user?.isAdmin ? adminMenu : userMenu;

  return (
    <div className="flex flex-column p-5 w-full border-4 border-yellow-500 border-dashed gap-4">
      {/* sidebar */}
      <div className="bg-orange-400 p-5 w-80 border-4 border-green-500">
        <h1 className="text-lg font-bold text-green-800">Welcome</h1>
        <h1 className="text-lg text-indigo-700 font-semibold">
          Name: {user?.name}
        </h1>
        <h1 className="text-md text-indigo-700 font-semibold">
          Email: {user?.email}
        </h1>

        <h1 className="text-md text-indigo-700 font-semibold">
          Role: {user?.isAdmin ? "Admin" : "User"}
        </h1>
        {/* <h2 className="text-xl font-semibold text-slate-700">{user?.name}</h2> */}
        {/* <h3 className="text-xl font-semibold text-slate-700">{user.email}</h3> */}
        {menuToBeRendered.map((item, index) => {
          return (
            <div
              className="text-xl m-4 flex items-center p-2 hover:text-white cursor-pointer hover:border-2 border-slate-400 p-2"
              onClick={() => {
                if (item.path === "/logout") {
                  localStorage.removeItem("token");
                  navigate("/login");
                } else {
                  navigate(item.path);
                }
              }}
            >
              <i className={item.icon} />
              <span className="text-lg px-2 font-semibold m-2">
                {item.name}
              </span>
            </div>
          );
        })}
      </div>
      {/* Body */}
      <div className="bg-slate-100 p-5 w-full border-4 border-red-500">
        {children}
      </div>
    </div>
  );
};

export default DefaultLayout;
