import React, { useState } from "react";
import style from "./ProfileRekruter.module.css";
import img from "../../Assets/img/Profile/Ellipse 330.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocation, faMailBulk } from "@fortawesome/free-solid-svg-icons";
import { faGithub, faInstagram } from "@fortawesome/free-brands-svg-icons";
import Image from "next/image";
import FormEdit from "../FormEdit";
import axios from "axios";
import { useEffect } from "react";
import { useRouter } from "next/router";
import ModalPhoto from "./modalPhoto";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { toast, ToastContainer } from "react-toastify";

const CreateProfileRekruter = ({ id }) => {
  const [idProfile, setIdProfile] = useState("");
  const [loading, isLoading] = useState(false);
  useEffect(() => {
    setIdProfile(localStorage.getItem("idwork"));
  });
  const [rekruter, setRekruter] = useState({
    name: "",
    bidang: "",
    provinsi: "",
    kota: "",
    email: "",
    email_perusahaan: "",
    linkedin: "",
    phone: "",
    deskripsi: "",
    id_users: id,
  });

  const handleChange = (e) => {
    setRekruter({
      ...rekruter,
      [e.target.name]: e.target.value,
      id_users: id,
    });

    console.log(rekruter);
  };

  const handleSubmit = async (e) => {
    isLoading(true);
    e.preventDefault();
    axios
      .post(`https://be-hirejob.vercel.app/rekruter`, rekruter)
      .then((result) => {
        toast.success("Add Rekruter successful", {
          position: toast.POSITION.TOP_CENTER,
        });
        console.log(result.data.data);
        localStorage.setItem("idwork", result.data.data.id);
        // localStorage.setItem("idworker", res.data.data.id);
        // router.push(`/ProfileWork/${id}`);
        // console.log(result);
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        isLoading(false);
      });
  };

  const router = useRouter();

  const [rekruters, setrekruters] = useState([{}]);
  useEffect(() => {
    isLoading(true);
    if (router.isReady) {
      axios
        .get(`https://be-hirejob.vercel.app/rekruter/id_users/?iduser=${id}`)
        .then((res) => {
          setrekruters(res.data.data[0]);
          console.log(res.data.data);
          localStorage.setItem("idwork", res.data.data[0].id_users);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          isLoading(false);
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.isReady]);

  const handleUpdate = async (e) => {
    const data = {
      // id: worker.id,
      name: rekruters.name,
      bidang: rekruters.bidang,
      provinsi: rekruters.provinsi,
      kota: rekruters.kota,
      email: rekruters.email,
      email_perusahaan: rekruters.email_perusahaan,
      linkedin: rekruters.linkedin,
      phone: rekruters.phone,
      deskripsi: rekruters.deskripsi,
      // id_users: rekruters.id_users,
    };

    setRekruter(data);
  };
  const handleSubmitupdate = async (e) => {
    isLoading(true);
    e.preventDefault();
    axios
      .put(`https://be-hirejob.vercel.app/rekruter/${rekruters?.id}`, rekruter)
      .then((result) => {
        toast.success("Update Rekruter successful", {
          position: toast.POSITION.TOP_CENTER,
        });
        console.log(result.data.data);
        localStorage.setItem("idwork", result.data.data.id);
        window.location.reload();
        // localStorage.setItem("idworker", res.data.data.id);
        // router.push(`/ProfileWork/${id}`);
        // console.log(result);
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
                  <img crossOrigin="anonymouse" width={150} height={150} style={{ borderRadius: "100px" }} src={rekruters?.photo} alt="photorekruter" />
                </div>
                <div className={` mx-auto pb-4 pt-2 ${style.picture}`}>
                  <ModalPhoto id={rekruters?.id}>Change Photo</ModalPhoto>
                </div>
                <h5 className="fw-bolder">{rekruters?.name}</h5>
                <span className={style.work}>{rekruters?.bidang}</span>
                <p className={style.address}>
                  <FontAwesomeIcon icon={faLocation} style={{ marginRight: "5px", height: 20 }} />
                  {rekruters?.kota}, {rekruters?.provinsi}
                </p>
                <span className={style.worker}>{rekruters?.deskripsi}</span>

                <div className={`row ${style.buttonLeft}`}>
                  <div className={`d-grid col-12 ${style.rowTwoLeft}`}>
                    <button className={`btn mb-2 ${style.btn}`} type="button" onClick={handleUpdate}>
                      Update
                    </button>
                    <button className={`btn ${style.btn}`}>Batal</button>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div class={`container  col-12 col-md-8 bg-light ${style.rightSide}`}>
            <div className="col-12">
              <div className={`row inputEdit justify-content-center mb-3 mb-md-5 ${style.themeRow} ${style.rowOneRight}`}>
                <div className="col-11">
                  <h3 className="pt-4">Data Diri</h3>
                  <hr className={style.hr} />
                  {/* <form onSubmit={handleSubmit}> */}
                  <FormEdit type={"text"} title={"Nama Perusahaan"} name={"name"} placeholder={"Masukan nama perusahan"} value={rekruter?.name} onchange={handleChange} />
                  <FormEdit type={"text"} title={"Bidang"} name={"bidang"} placeholder={"Masukan bidang perusahaan ex : Financial"} value={rekruter?.bidang} onchange={handleChange} />
                  <FormEdit type={"text"} title={"Provinsi"} name={"provinsi"} placeholder={"Masukan Provinsi"} value={rekruter?.provinsi} onchange={handleChange} />
                  <FormEdit type={"text"} title={"Kota"} name={"kota"} placeholder={"Masukan kota"} value={rekruter?.kota} onchange={handleChange} />
                  <FormEdit type={"textarea"} title={"Deskripsi singkat"} name={"deskripsi"} placeholder={"Tuliskan deskripsi singkat"} value={rekruter?.deskripsi} onchange={handleChange} />
                  <FormEdit type={"text"} title={"Email "} name={"email"} placeholder={"Masukan email"} value={rekruter?.email} onchange={handleChange} />
                  <FormEdit type={"text"} title={"Email Perrusahan"} name={"email_perusahaan"} placeholder={"email_perusahaan"} value={rekruter?.email_perusahaan} onchange={handleChange} />
                  <FormEdit type={"text"} title={"Nomor Telepon "} name={"phone"} placeholder={"Masukan nomor telepon"} value={rekruter?.phone} onchange={handleChange} />
                  <FormEdit type={"text"} title={"Linkedin"} name={"linkedin"} placeholder={"Linkedin"} value={rekruter?.linkedin} onchange={handleChange} />
                  {!idProfile ? (
                    <button className={`btn btn-lg pb-2 btn-block ${style.btn}`} type="button" onClick={handleSubmit}>
                      {loading ? <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true" /> : "Simpan"}
                    </button>
                  ) : (
                    <button className={`btn btn-lg pb-2 btn-block ${style.btn}`} type="button" onClick={handleSubmitupdate}>
                      {loading ? <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true" /> : "Update"}
                    </button>
                  )}
                  {/* </form> */}
                </div>
              </div>
            </div>
          </div>
        </div>
        <ToastContainer />
      </div>
    </>
  );
};

export default CreateProfileRekruter;
