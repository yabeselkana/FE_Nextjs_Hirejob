import React from "react";
import NavbarLogin from "../../Components/NavbarLogin/Index";
import Foot from "../../Components/Foot";
import CreateProfile from "../../Components/CreateProfile";
import { useRouter } from "next/router";

const Profile = () => {
  const router = useRouter();
  const id = router.query.id;
  console.log(id);
  return (
    <div>
      <NavbarLogin />
      <CreateProfile id={id} />
      <Foot />
    </div>
  );
};

export default Profile;
