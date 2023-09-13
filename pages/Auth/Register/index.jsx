import React, { useState } from "react";
import Bg_Auth from "../../../Components/Bg_Auth";
import InputForm from "../../../Components/InputForm";
import style from "../../../Components/Bg_Auth/style.module.css";
import Link from "next/link";

import axios from "axios";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Register = () => {
  const [loading, isLoading] = useState(false);
  const [data, setData] = useState({
    name: "",
    email: "",
    perusahaan: "",
    jabatan: "",
    password: "",
    phone: "",
    role: "rekruter",
  });

  const changeHandler = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };
  const [passwordConfirm, setPasswordConfirm] = useState("");

  let onClick = (e) => {
    e.preventDefault();
    isLoading(true);
    if (passwordConfirm !== data.password) {
      toast.error("Passwords do not match", {
        position: toast.POSITION.TOP_CENTER,
      });
      isLoading(false);
    } else {
      axios
        .post("https://be-hirejob.vercel.app/users/registerRekrut", data)
        .then((res) => {
          console.log(res);
          if (res) {
            toast.success("Registration successful", {
              position: toast.POSITION.TOP_CENTER,
            });

            router.push("/Auth/Login");
          }
        })
        .catch((err) => {
          console.error("Registration failed:", err);
          // setTimeout(() => {
          //   // Display a success notification
          //   toast.error(err.response.data.message, {
          //     position: toast.POSITION.TOP_CENTER,
          //   });
          //   // Reset the form or perform any other necessary actions
          //   // e.target.reset();
          // }, 1000);
        })
        .finally(() => {
          isLoading(false);
        });
    }
  };

  return (
    <>
      <Bg_Auth title="Halo, Pewpeople" description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. In euismod ipsum et dui rhoncus auctor.">
        <form>
          <InputForm title="Name" name="name" value={data.name} type="text" onchange={(e) => changeHandler(e)} req={"required"} />
          <InputForm title="Email Address" value={data.email} name="email" type="text" onchange={(e) => changeHandler(e)} req={"required"} />
          <InputForm title="Perusahaan" value={data.perusahaan} name="perusahaan" type="text" onchange={(e) => changeHandler(e)} />
          <InputForm title="Jabatan" value={data.jabatan} name="jabatan" type="text" onchange={(e) => changeHandler(e)} />
          <InputForm title="No Handphone" value={data.phone_number} name="phone" type="number" onchange={(e) => changeHandler(e)} />
          <InputForm title="Password" name="password" value={data.password} type="password" onchange={(e) => changeHandler(e)} req={"required"} />
          <InputForm title="Confirm Password" name="confirmPassword" type="password" onchange={(e) => setPasswordConfirm(e.target.value)} req={"required"} />

          {/* <div className="form-check mb-3 customCheck">
            <input className="form-check-input" type="checkbox" value="" id={style.flexCheckDefault} />
            <label className={`form-check-label ${style.formLabel}`} for={style.flexCheckDefault}>
              I agree to terms & conditions
            </label>
          </div> */}
          <div className="d-grid mb-2 mt-3">
            <button className={`btn ${style.btn} text-light`} type="submit" onClick={onClick} /* disabled={!(checkTerms && data.name && data.email && data.password && data.phone_number)} */>
              {loading ? <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true" /> : "Register"}
            </button>
          </div>
        </form>
        <div className={`loginLink text-center mt-3 ${style.formLabel}`}>
          <p>
            Already have account?{" "}
            <Link href={"/Auth/Login"} style={{ textDecoration: "none", color: "rgb(239, 200, 26)" }}>
              {" "}
              Log in Here
            </Link>
          </p>
        </div>
        <ToastContainer />
      </Bg_Auth>
    </>
  );
};

export default Register;
