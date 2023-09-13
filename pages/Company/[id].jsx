import React from "react";
import NavbarLogin from "../../Components/NavbarLogin/Index";
import Foot from "../../Components/Foot";
import Companys from "../../Components/Company";
import { useRouter } from "next/router";

const Company = () => {
  const router = useRouter();
  const id = router.query.id;
  console.log(id);
  return (
    <>
      <NavbarLogin />
      <Companys id={id} />
      <Foot />
    </>
  );
};

export default Company;
