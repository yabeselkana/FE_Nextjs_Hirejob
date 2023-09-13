import { faHive } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import React from "react";
import style from "./Navbar.module.css";
import img from "../../Assets/img/Navbar/Mask Group (6).png";
import img2 from "../../Assets/img/lending_page/logo.png";
import Image from "next/image";
import Head from "next/head";

const Navbar = () => {
  return (
    <>
      <Head>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous" />
      </Head>

      <nav className="container navbar navbar-expand-lg navbar-light ">
        <Link className="navbar-brand" href={"/"}>
          <Image src={img2} alt="photoLogo"></Image>
        </Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarScroll" aria-controls="navbarScroll" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarScroll">
          <ul className="navbar-nav mr-auto my-2 my-lg-0 navbar-nav-scroll" style={{ maxHeight: 100 }}></ul>
          <form className="d-flex">
            <Link href={"/Authwork/Login"} className={`me-md-2 me-0  `}>
              <button className={` btn btn-outline-success ${style.btn1}`}> Masuk Untuk Pekerja</button>
            </Link>
            <Link href={"/Auth/Login"} className={`btn btn-outline-success me-md-2 me-0 ${style.btn1}`} type="button">
              Masuk Untuk Perekrut
            </Link>
          </form>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
