import React, { useEffect, useState } from "react";
import style from "./Hiring.module.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";

import axios from "axios";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import Navbar from "../../Components/Navbar";
import NavbarLogin from "../../Components/NavbarLogin/Index";
import FormEdit from "../../Components/FormEdit";
import { useRouter } from "next/router";
import { toast, ToastContainer } from "react-toastify";
import Image from "next/image";
const Hiring = () => {
  const router = useRouter();
  const id = router.query.id;
  const [token, setToken] = useState("");
  const [idLogin, setidLogin] = useState("");

  useEffect(() => {
    setToken(localStorage.getItem("token"));
    setidLogin(localStorage.getItem("idwork"));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [loading, isLoading] = useState(false);
  const [worker, setWorker] = useState([{}]);
  useEffect(() => {
    isLoading(true);
    axios
      .get(`https://be-hirejob.vercel.app/work/id_users/?iduser=${id}`)
      .then((res) => {
        setWorker(res.data.data[0]);
        console.log(res.data.data[0]);
        isLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // const id_rekruter = localStorage.getItem("id");

  const [skills, setSkills] = useState([{}]);

  useEffect(() => {
    isLoading(true);
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const [rekruters, setrekruters] = useState([]);

  console.log(idLogin);
  const [namePerusahan, setNamePerusahan] = useState("");
  const [PhonePerusahan, setPhonePerusahan] = useState("");

  useEffect(() => {
    axios
      .get(`https://be-hirejob.vercel.app/rekruter/id_users/?iduser=${idLogin}`)
      .then((res) => {
        setrekruters(res.data.data[0]);
        setNamePerusahan(res.data.data[0].name);
        setPhonePerusahan(res.data.data[0].phone);
        console.log(res.data.data[0]);
      })
      .catch((err) => {
        console.log(err);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [hiring, setHiring] = useState({
    // email: worker.email,
    project: "",
    // name: worker.name,
    // nama_perushan: namePerusahan,
    // phone: PhonePerusahan,
    deskripsi: "",
    // id_rekruter: idLogin,
  });

  const hendelChange = (e) => {
    setHiring({
      ...hiring,
      [e.target.name]: e.target.value,
      email: worker.email,
      name: worker.name,
      name_perusahan: namePerusahan,
      phone: PhonePerusahan,
      id_rekruter: idLogin,
      // ...selectedDate,
    });
  };

  const handleHiring = async (e) => {
    isLoading(true);
    e.preventDefault();

    axios
      .post("https://be-hirejob.vercel.app/hiring", hiring)
      .then((res) => {
        toast.success("Add Skill successful", {
          position: toast.POSITION.TOP_CENTER,
        });
        setHiring({
          project: "",
          deskripsi: "",
        });
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        isLoading(false);
      });
  };

  return (
    <>
      {!token ? <Navbar /> : <NavbarLogin />}
      <div className="container mt-4">
        <div className="row  justify-content-between">
          <div class={`col-10 col-md-3 bg-light ${style.leftSide}`}>
            {loading ? (
              <div>
                <Skeleton count={5} />
              </div>
            ) : (
              <div className="profileDesc">
                <div className={` mx-auto pb-4 pt-2 ${style.picture}`}>
                  <img crossOrigin="anonymouse" width={150} height={150} style={{ borderRadius: "100px" }} src={worker?.photo} alt="photoHirng" />
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
                      <p key={index} className={`text-wrap btn ml-2 me-2 mb-2 ${style.skills}`}>
                        {item?.name}
                      </p>
                    </>
                  ))}
                </div>
              )}
            </div>
          </div>
          <div class={`container  col-12 col-md-8 bg-light  ${style.rightSide}`}>
            <div className={`row inputEdit justify-content-center mb-3 mb-md-5 ${style.themeRow} ${style.rowOneRight}`}>
              <h1>Hubungi {worker?.name}</h1>
              <hr className={style.hr} />
              <p style={{ fontSize: "30px" }}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. In euismod ipsum et dui rhoncus auctor.</p>
              <FormEdit type={"text"} title={"Tujuan tentang pesan ini"} name={"project"} placeholder={"Projek"} value={hiring.project} onchange={hendelChange} />
              <FormEdit type={"textarea"} title={"Deskripsi"} name={"deskripsi"} placeholder={"Deskripsikan/jelaskan lebih detail "} value={hiring.deskripsi} onchange={hendelChange} />
              <div>
                <button className={`container btn btn-lg pb-1 btn-block ${style.btn}`} type="button" onClick={handleHiring}>
                  {loading ? <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true" /> : "Hire"}
                </button>
              </div>
            </div>
          </div>
        </div>
        <ToastContainer />
      </div>
    </>
  );
};

export default Hiring;
