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
    phone: "",
    password: "",
  });
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const changeHandler = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
    console.log(data);
  };

  const onClick = (e) => {
    isLoading(true);
    e.preventDefault();
    if (passwordConfirm !== data.password) {
      toast.error("Passwords do not match", {
        position: toast.POSITION.TOP_CENTER,
      });
      isLoading(false);
    } else {
      axios
        .post("https://be-hirejob.vercel.app/users/registerWork", data)
        .then((res) => {
          if (res) {
            toast
              .success("Registration successful", {
                position: toast.POSITION.TOP_CENTER,
              })
              .then((result) => {
                router.push("/Authwork/Login");
              })
              .catch((err) => {
                console.log(err);
              });
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
        <InputForm title="Name" name="name" placeholder="Nama Lengkap" value={data.name} type="text" onchange={(e) => changeHandler(e)} req={"required"} />
        <InputForm title="Email Address" placeholder="yabes@gmail.com" value={data.email} name="email" type="text" onchange={(e) => changeHandler(e)} req={"required"} />
        <InputForm title="No Handphone" placeholder="0812981XXXX" value={data.phone_number} name="phone" type="number" onchange={(e) => changeHandler(e)} />
        <InputForm title="Password" name="password" placeholder="password" value={data.password} type="password" onchange={(e) => changeHandler(e)} req={"required"} />
        <InputForm title="Confirm Password" placeholder="password" name="confirmPassword" type="password" onchange={(e) => setPasswordConfirm(e.target.value)} req={"required"} />

        <div className="d-grid mb-2 mt-3">
          <button className={`btn ${style.btn} text-light`} onClick={onClick} /* disabled={!(checkTerms && data.name && data.email && data.password && data.phone_number)} */>
            {loading ? <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true" /> : "Register"}
          </button>
        </div>
        <ToastContainer />
        <div className={`loginLink text-center mt-3 ${style.formLabel}`}>
          <p>
            Already have account?{" "}
            <Link href={"/Authwork/Login"} style={{ textDecoration: "none", color: "rgb(239, 200, 26)" }}>
              {" "}
              Log in Here
            </Link>
          </p>
        </div>
      </Bg_Auth>
    </>
  );
};

export default Register;
