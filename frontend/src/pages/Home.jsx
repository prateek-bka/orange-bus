import React from "react";
import { useSelector } from "react-redux";

const Home = () => {
  const { user } = useSelector((state) => state.users);
  return (
    <div>
      <h2>Hi</h2>
      {user && <h1>Welcome {user?.name}</h1>}
      {user && <h1>{user.email}</h1>}
    </div>
  );
};

export default Home;
