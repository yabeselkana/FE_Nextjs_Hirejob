import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import style from "./style.module.css";
import React from "react";
import { faBuilding } from "@fortawesome/free-regular-svg-icons";
import Head from "next/head";

import img from "../../Assets/img/auth/Group 978.png";
import Image from "next/image";

const Bg_Auth = ({ children, title, description }) => {
  return (
    <>
      <Head>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/css/bootstrap.min.css" integrity="sha384-xOolHFLEh07PJGoPkLv1IbcEPTNtaed2xpHsD9ESMhqIYd0nLMwNLD69Npy4HI+N" crossorigin="anonymous" />
      </Head>
      <main>
        <div className={`${style.authContainer} container-fluid loginPage`}>
          <div className={`row`}>
            <div className={`col-md-6 ${style.sideLeft} position-sticky d-md-flex flex-column justify-content-center align-items-center d-none`}>
              <div className={style.Banner}>
                <Image height={50} alt="Picture of the author" src={img}></Image>
                {/* <FontAwesomeIcon icon={faBuilding} className={style.FontAwesome} /> */}
              </div>
              <p>Temukan developer berbakat & terbaik di berbagai bidang keahlian</p>
            </div>
            <div className={`col-md-6 ${style.sideRight} pt-3 min-vh-100 d-grid `}>
              <div className="inputGroup">
                <div className="row justify-content-center">
                  <div className="col-lg-10 col-md-10 col-sm-8 col-10">
                    <header className="text-start">
                      <h3 className="">{title}</h3>
                      <p className="mb-2">{description}</p>
                    </header>
                  </div>
                </div>
                <div className={`${style.inputField} text-start mt-4`}>
                  <div className="row justify-content-center">
                    <div className="col-lg-10 col-md-10 col-sm-8 col-10">{children}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Bg_Auth;
