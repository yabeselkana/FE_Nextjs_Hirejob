import style from "../../../Components/Bg_Auth/style.module.css";
import React, { useState } from "react";
import Bg_Auth from "../../../Components/Bg_Auth";
import Link from "next/link";
import InputForm from "../../../Components/InputForm";
import axios from "axios";
import { useRouter } from "next/router";
import Swal from "sweetalert2";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Login = () => {
  const [loading, isLoading] = useState(false);
  let [data, setData] = useState({
    email: "",
    password: "",
  });
  const router = useRouter();
  let onChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
    console.log(data);
  };

  let onClick = (e) => {
    isLoading(true);
    axios
      .post("https://be-hirejob.vercel.app/users/login", data)
      .then((res) => {
        console.log(res.data.data);
        localStorage.setItem("token", res.data.data.token);
        localStorage.setItem("idPofile", res.data.data.id);
        localStorage.setItem("role", res.data.data.role);

        if (res) {
          Swal.fire("Login Success", "Your account Success Login", "success")
            .then((result) => {
              router.push("/");
            })
            .catch((err) => {});
          // return navigate("/home");
        }
      })
      .catch((err) => {
        console.error("Login failed:", err);
        toast.error("Login failed. Please check your credentials.", {
          position: toast.POSITION.TOP_CENTER,
        });
      })
      .finally(() => {
        isLoading(false);
      });
  };

  return (
    <>
      <div className="row"></div>
      <Bg_Auth title="Halo, Pewpeople" description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. In euismod ipsum et dui rhoncus auctor.">
        <InputForm title="Email" name="email" value={data.email} type="email" onchange={(e) => onChange(e)} />
        <InputForm title="Password" name="password" value={data.password} type="password" onchange={(e) => onChange(e)} />

        <div className="d-grid mb-2 mt-5 text-light">
          <button className={`btn ${style.btn} text-light border`} type="submit" onClick={onClick}>
            {loading ? <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true" /> : "Login"}
          </button>
        </div>
        <ToastContainer />
        <div className="forgotPassword text-end mb-3">
          <Link to={"/forgot-password"} className={`link-dark text-decoration-none ${style.formLabel}`} style={{ fontSize: "14px" }} href="">
            Forgot Password?
          </Link>
        </div>
        <div className={`loginLink text-center mt-3 ${style.formLabel}`}>
          <p>
            Don’t have an account?{" "}
            <Link href={"/Auth/Register"} style={{ textDecoration: "none", color: "rgb(88, 85, 173)" }}>
              {" "}
              Sign Up
            </Link>
          </p>
        </div>
      </Bg_Auth>
    </>
  );
};

export default Login;
