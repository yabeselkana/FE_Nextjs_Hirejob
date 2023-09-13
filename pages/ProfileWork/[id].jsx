import React from "react";
import NavbarLogin from "../../Components/NavbarLogin/Index";
import Foot from "../../Components/Foot";
import ProfileWorks from "../../Components/ProfileWork";
import { useRouter } from "next/router";

const ProfileWork = () => {
  const router = useRouter();
  const id = router.query.id;
  console.log(id);
  return (
    <>
      <NavbarLogin />
      <ProfileWorks id={id} />
      <Foot />
    </>
  );
};

export default ProfileWork;
