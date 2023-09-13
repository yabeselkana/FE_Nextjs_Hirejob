import React, { useEffect, useState } from "react";
import style from "./ProfileWork.module.css";

import Image from "next/image";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot, faMailBulk, faPenFancy, faTrash } from "@fortawesome/free-solid-svg-icons";
import { faFacebook, faGithub, faGitlab, faInstagram, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import img from "../../Assets/img/Profile/Ellipse 330.png";
import img2 from "../../Assets/img/Profile/Portofolio/Rectangle 637.png";
import Head from "next/head";
import Script from "next/script";
import axios from "axios";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useRouter } from "next/router";
const ProfileWorks = ({ id }) => {
  const [idProfile, setIdProfile] = useState("");
  const [role, setRole] = useState("");
  useEffect(() => {
    setIdProfile(localStorage.getItem("idProfiles"));
    setRole(localStorage.getItem("role"));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const [loading, isLoading] = useState(false);
  const [worker, setWorker] = useState([{}]);
  useEffect(() => {
    isLoading(true);
    if (router.isReady) {
      axios
        .get(`https://be-hirejob.vercel.app/work/id_users/?iduser=${id}`)
        .then((res) => {
          setWorker(res.data.data[0]);
          isLoading(false);
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // const id_rekruter = localStorage.getItem("id");

  const [skills, setSkills] = useState([{}]);

  useEffect(() => {
    isLoading(true);

    if (router.isReady) {
      const fetchSkills = async () => {
        try {
          const response = await axios.get(`https://be-hirejob.vercel.app/skills/id_users/?iduser=${id}`);
          const data = response.data.data;
          console.log(data);
          isLoading(false);
          setSkills(data);
        } catch (error) {
          console.error(error);
        }
      };
      fetchSkills();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);
  const [experi, setExperi] = useState([{}]);
  useEffect(() => {
    isLoading(true);
    if (router.isReady) {
      axios
        .get(`https://be-hirejob.vercel.app/experience/id_users/?iduser=${id}`)
        .then((res) => {
          setExperi(res.data.data);
          isLoading(false);
          // console.log(product);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const [radios, setRadios] = useState([{}]);

  useEffect(() => {
    isLoading(true);

    if (router.isReady) {
      axios
        .get(`https://be-hirejob.vercel.app/portofolio/id_users/?iduser=${id}`)
        .then((res) => {
          setRadios(res.data.data);
          isLoading(false);
          // console.log(product);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const router = useRouter();
  const hiring = () => {
    router.push(`/Hiring/${id}`);
  };

  return (
    <>
      <Head>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/css/bootstrap.min.css" integrity="sha384-xOolHFLEh07PJGoPkLv1IbcEPTNtaed2xpHsD9ESMhqIYd0nLMwNLD69Npy4HI+N" crossorigin="anonymous" />
      </Head>
      <div className="container">
        <div className="row  justify-content-between">
          <div class={`col-10 col-md-3 bg-light ${style.leftSide}`}>
            {loading ? (
              <div>
                <Skeleton count={5} />
              </div>
            ) : (
              <div className="profileDesc">
                <div className={` mx-auto pb-4 pt-2 ${style.picture}`}>
                  <img crossOrigin="anonymouse" width={150} height={150} style={{ borderRadius: "100px" }} src={worker?.photo} alt="photoprofile" />
                </div>
                <h5 className="fw-bolder">{worker?.name}</h5>
                <span className={style.work}>{worker?.jobdesk}</span>
                <p className={style.domisili}>
                  <FontAwesomeIcon icon={faLocationDot} style={{ marginRight: "5px", height: 20 }} />
                  {worker?.tempat_kerja}
                </p>
                <span className={style.worker}>{worker?.status_kerja}</span>
                <p className={style.bio}>{worker?.deskripsi}</p>
              </div>
            )}

            <div className="skills ">
              <h5 className="fw-bolder">Skills</h5>
              {loading ? (
                <div>
                  <Skeleton count={5} />
                </div>
              ) : (
                <div className="listSkills">
                  {skills?.map((item, index) => (
                    <>
                      <p key={index.id} className={`text-wrap btn ml-2 me-2 mb-2 ${style.skills}`}>
                        {item?.name}
                      </p>
                    </>
                  ))}
                </div>
              )}
            </div>
            <div className="contact">
              <h5 className="fw-bolder pt-5 pb-2">Contact</h5>
              <p>
                <FontAwesomeIcon icon={faMailBulk} style={{ marginRight: "5px", height: 20 }} /> Louistommo@gmail.com
              </p>
              <p>
                <FontAwesomeIcon icon={faGithub} style={{ marginRight: "5px", height: 20 }} />
                @Louistommo
              </p>
              <p>
                <FontAwesomeIcon icon={faInstagram} style={{ marginRight: "5px", height: 20 }} />
                @Louist91
              </p>
              <p>
                <FontAwesomeIcon icon={faGitlab} style={{ marginRight: "5px", height: 20 }} />
                @Louistommo91
              </p>
            </div>
            <div className="hireButton d-grid">
              {role === "rekruter" ? (
                <button onClick={hiring} className={`btn ${style.btn}`}>
                  {" "}
                  Hire
                </button>
              ) : (
                <button className={`btn ${style.btn}`}> Edit Profile</button>
              )}
            </div>
          </div>
          <div class={`container  col-7 col-md-8 bg-light ${style.rightSide}`}>
            <ul className="nav nav-tabs" id="myTab" role="tablist">
              <li className="nav-item" role="presentation">
                <button className="nav-link active" id="home-tab" data-toggle="tab" data-target="#home" type="button" role="tab" aria-controls="home" aria-selected="true">
                  Portofolio
                </button>
              </li>
              <li className="nav-item">
                <a className="nav-link" id="profile-tab" data-toggle="tab" href="#profile" role="tab" aria-controls="profile" aria-selected="false">
                  Pengalaman kerja
                </a>
              </li>
            </ul>
            <div className="tab-content" id="myTabContent">
              {loading ? (
                <div>
                  <Skeleton count={5} />
                </div>
              ) : (
                <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                  {radios?.map((item, index) => (
                    <div key={index.id} className="card-body p-4 border row">
                      <div className={`col-2 ${style.image}  `}>
                        <img className={`${style.img_porto}`} src={item?.photo} crossOrigin="anonymouse" alt="photoWorker" />
                        {/* <im crossOrigin="anonymouse" width={100} height={100} src={item?.photo} alt="image "></im> */}
                      </div>

                      <div className="col-7 mt-2 ">
                        <h5 className="card-title mb-2 ">{item?.name}</h5>
                        <h6 className="card-subtitle mb-2 text-muted">{item?.link}</h6>
                        <h6 className="card-subtitle mb-2 text-muted">{item?.type_portofolio}</h6>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              {loading ? (
                <div>
                  <Skeleton count={5} />
                </div>
              ) : (
                <div className="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
                  {experi?.map((item, index) => (
                    <div key={index?.id} className="card-body p-4 border row">
                      <div className="col-9">
                        <h5 className="card-title mb-2">{item?.posisi}</h5>
                        <h6 className="card-subtitle mb-2 text-muted">{item?.nama_perusahaan}</h6>
                        <h6 className="card-subtitle mb-2 text-muted">
                          {item?.dari} - {item?.sampai}
                        </h6>
                        <p className="card-text"> {item?.deskripsi} </p>
                      </div>
                      <div className="col-13"></div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileWorks;
