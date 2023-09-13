import React, { useEffect, useState } from "react";
import style from "./Company.module.css";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot, faMailBulk, faMailForward, faPhone } from "@fortawesome/free-solid-svg-icons";
import { faLinkedin } from "@fortawesome/free-brands-svg-icons";
import axios from "axios";

const Companys = ({ id }) => {
  const [rekruters, setrekruters] = useState([{}]);
  useEffect(() => {
    axios
      .get(`https://be-hirejob.vercel.app/rekruter/id_users/?iduser=${id}`)
      .then((res) => {
        setrekruters(res.data.data[0]);
        console.log(res.data.data);
        localStorage.setItem("idRekruter", res.data.data[0].id_users);
      })
      .catch((err) => {
        console.log(err);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className={`box ${style.box}`}>
        <div className="row justify-content-center">
          <div className={`col-10 col-md-7 ${style.colRow}`}>
            <div className={`${style["box-imgBackground"]} d-flex justify-content-end align-items-end`} style={{ backgroundColor: "#ffffff" }}>
              <img src={rekruters?.photo} className={`img-fluid ${style.img}`} alt="photoCompany" />
              <Link href={""} className="pe-4 pb-2">
                Edit Profile
              </Link>
            </div>
            <div className="box-content text-center">
              <h2>{rekruters?.name}</h2>
              <p>{rekruters?.bidang}</p>
              <p className="text-secondary">
                <FontAwesomeIcon icon={faLocationDot} /> {rekruters?.kota}, {rekruters?.provinsi}
              </p>
              <p className="px-5">{rekruters?.deskripsi}</p>
              <div className="row justify-content-center text-start ">
                <div className="col-6 col-md-3 d-grid text-center mb-4">
                  <div className="button d-grid">
                    {/* <Link href={`/ProfileRekrut/'${rekruters.id_users}'`}> */}
                    <button className="btn btn-primary" style={{ height: "50px", backgroundColor: "#5E50A1", borderColor: "#5E50A1" }}>
                      Edit Profile
                    </button>
                    {/* </Link> */}
                  </div>
                </div>
                <div className="col-12 d-grid justify-content-center mb-5">
                  <p>
                    <FontAwesomeIcon icon={faMailBulk} /> : {rekruters?.email}
                  </p>
                  <p>
                    <FontAwesomeIcon icon={faMailForward} />: {rekruters?.email_perusahaan}
                  </p>
                  <p>
                    <FontAwesomeIcon icon={faLinkedin} /> : {rekruters?.linkedin}
                  </p>
                  <p>
                    <FontAwesomeIcon icon={faPhone} /> : {rekruters?.phone}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Companys;
