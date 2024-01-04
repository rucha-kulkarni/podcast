import { signOut } from "firebase/auth";
import React from "react";
import { useSelector } from "react-redux";
import Button from "../components/Common/Button";
import Header from "../components/Common/Header";
import { auth } from "../firebase";
import { toast } from "react-toastify";
import Loader from "../components/Common/Loader";

function Profile() {
  const user = useSelector((state) => state.user.user);
  console.log("My User", user);
  if (!user) {
    return <Loader />;
  }

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        toast.success("User Logged Out!");
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  return (
    <div>
      <Header />
      <div className="profile">
        <p>
          <span>Name</span>
          <br /> {user.name}
        </p>
        <p>
          <span>Email</span>
          <br /> {user.email}
        </p>
        <Button text={"Logout"} onClick={handleLogout} width={"100px"} />
      </div>
    </div>
  );
}

export default Profile;
