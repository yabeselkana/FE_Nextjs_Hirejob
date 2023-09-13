import React from "react";
import NavbarLogin from "../../Components/NavbarLogin/Index";
import Foot from "../../Components/Foot";
import CreateProfileRekruter from "../../Components/CreateProfileRekruter";
import { useRouter } from "next/router";

const ProfileRekrut = () => {
  const router = useRouter();
  const id = router.query.id;
  console.log(id);
  return (
    <div>
      <NavbarLogin />
      <CreateProfileRekruter id={id} />
      <Foot />
    </div>
  );
};

export default ProfileRekrut;
