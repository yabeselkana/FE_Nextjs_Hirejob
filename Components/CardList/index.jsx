import React, { useEffect, useState } from "react";
import imgs from "../../Assets/img/lending_page/Ellipse 323.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocation } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { faEye } from "@fortawesome/free-regular-svg-icons";
import Image from "next/image";
import axios from "axios";
import style from "../../pages/HomePage/HomePage.module.css";
import { useRouter } from "next/router";

const CardList = ({ name, id, jabatan, domisili, key, photo }) => {
  const [skills, setSkills] = useState([{}]);
  const router = useRouter();
  useEffect(() => {
    if (router.isReady) {
      axios
        .get(`https://be-hirejob.vercel.app/skills/id_users/?iduser=${id}`)
        .then((res) => {
          setSkills(res.data.data);
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);
  return (
    <>
      <ul key={key} className=" container list-group list-group-flush">
        <div className="row">
          <div className="col-sm-2 col-3 col-lg-2 d-flex  align-items-center">
            <img className=" container img-thumbnail" crossOrigin="anonymouse" width={150} height={250} src={photo} style={{ width: "90px", height: "80px", borderRadius: "80%" }} alt="photocart" />
          </div>
          <div className={`col-lg-7 col-9 col-sm-10 ${style.body}`}>
            <h4>{name}</h4>
            <span>{jabatan}</span>
            <p>
              <FontAwesomeIcon icon={faLocation} /> {domisili}
            </p>

            <div className={`d-flex ${style.listSkills}`}>
              {skills?.map((listskills, i) => (
                <>
                  <p key={i} className={`btn text-nowrap me-2 ${style.skills}`}>
                    {listskills.name}
                  </p>
                </>
              ))}
            </div>
          </div>
          <div className={`${style.see} see  col-5 col-md-3 d-grid justify-content-md-center justify-content-start align-items-center mt-lg-0 mt-2`}>
            <Link href={`/ProfileWork/${id}`} className={`btn text-wrap   btn-block ${style.seeProfil}`}>
              <FontAwesomeIcon icon={faEye} /> Profil
            </Link>
          </div>
        </div>
      </ul>
    </>
  );
};

export default CardList;
