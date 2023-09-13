import { faBuilding, faMailBulk, faBell, faRightFromBracket, faGear, faLongArrowAltLeft, faMailForward, faEdit, faLongArrowAltUp, faPowerOff, faChartBar, faVoicemail, faMailReply } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import React from "react";
import Link from "next/link";
import style from "./Navbar.module.css";
import img from "../../Assets/img/Navbar/Mask Group (6).png";
import img2 from "../../Assets/img/lending_page/logo.png";
import { useState, useEffect } from "react";
import { faHive, faMailchimp } from "@fortawesome/free-brands-svg-icons";
import { useRouter } from "next/router";
import Head from "next/head";

const NavbarLogin = () => {
  const [id, setId] = useState("");
  const [idwork, setIdWork] = useState("");
  const [role, setRole] = useState("");
  const router = useRouter();

  useEffect(() => {
    setId(localStorage.getItem("idPofile"));
    setIdWork(localStorage.getItem("idwork"));
    setRole(localStorage.getItem("role"));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  });

  const clearLocal = () => {
    localStorage.clear();

    router.push("/");
    window.location.reload();
  };

  return (
    <>
      <Head>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous" />
      </Head>
      <>
        {/* Hello world */}
        <nav className=" container navbar navbar-expand-lg navbar-light bg-light">
          <Link className="  navbar-brand" href={"/"}>
            <Image src={img2} alt="photo3"></Image>
          </Link>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto"></ul>
            <form className="form-inline d-flex my-2 my-lg-0">
              <button className={`mr-3 ${style.notif}`} style={{ marginRight: "5px", fontSize: 25, color: "#5E50A1", height: 40 }}>
                <FontAwesomeIcon icon={faBell} />{" "}
              </button>
              <button className={`mr-3 ${style.message}`} style={{ marginRight: "5px", fontSize: 25, color: "#5E50A1", height: 40 }}>
                <FontAwesomeIcon icon={faMailBulk} />{" "}
              </button>
              {role === "rekruter" ? (
                <Link href={`/Company/${id} `}>
                  <div className="btn-group dropdown-center">
                    <Image className={`${style.img} img-fluid`} alt="photo1" src={img} style={{ marginRight: "5px", fontSize: 25, color: "#5E50A1", height: 40 }} />
                  </div>
                </Link>
              ) : (
                <Link href={`/ProfileWork/${id} `}>
                  <div className="btn-group dropdown-center">
                    <Image className={`${style.img} img-fluid`} alt="photo2" src={img} style={{ marginRight: "5px", fontSize: 25, color: "#5E50A1", height: 40 }} />
                  </div>
                </Link>
              )}
              <div className="btn-group dropdown-center">
                <button type="button" className={`dropdown-toggle  dropdown-toggle-split ${style["dropdown-toggle-split"]} ${style.toggleSplit}`} data-bs-toggle="dropdown" aria-expanded="false">
                  <span className="visually-hidden">Toggle Dropdown</span>
                </button>
                <ul className={`dropdown-menu ${style.drop}`}>
                  <li>
                    <Link className="dropdown-item" href={"/"} onClick={clearLocal}>
                      <FontAwesomeIcon icon={faPowerOff} /> Logout
                    </Link>
                  </li>
                  {role === "rekruter" ? (
                    <li>
                      <Link className="dropdown-item" href={`/ProfileRekrut/${id} `}>
                        <FontAwesomeIcon icon={faEdit} /> Edit Profile
                      </Link>
                    </li>
                  ) : (
                    <li>
                      <Link className="dropdown-item" href={`/Profile/${id} `}>
                        <FontAwesomeIcon icon={faEdit} /> Edit Profile
                      </Link>
                    </li>
                  )}
                </ul>
              </div>
            </form>
          </div>
        </nav>
      </>
    </>
  );
};

export default NavbarLogin;
