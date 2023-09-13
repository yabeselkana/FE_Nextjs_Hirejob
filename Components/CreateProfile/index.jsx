import React, { use, useEffect, useState } from "react";
import style from "./Profile.module.css";
import img from "../../Assets/img/Profile/Ellipse 330.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocation, faMailBulk } from "@fortawesome/free-solid-svg-icons";
import { faGithub, faInstagram } from "@fortawesome/free-brands-svg-icons";
import Image from "next/image";
import FormEdit from "../FormEdit";
import axios from "axios";
import { Form, Toast } from "react-bootstrap";
import ModalUpdate from "../Modal/ModalUpdate";
import ModalDelete from "../Modal/ModalDelete";
import ModalUpdates from "../ModalPortofolio/ModalUpdate";
import ModalDeletes from "../ModalPortofolio/ModalDelete";
import { useRouter } from "next/router";
import ModalPhotoWorker from "./modalPhotoWorker";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { toast, ToastContainer } from "react-toastify";

const CreateProfile = ({ id }) => {
  const [idProfile, setIdProfile] = useState("");
  const [loading, isLoading] = useState(false);

  useEffect(() => {
    setIdProfile(localStorage.getItem("idwork"));
  });

  const [rekruter, setRekruter] = useState({
    name: "",
    jobdesk: "",
    domisili: "",
    status_kerja: "",
    tempat_kerja: "",
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

  const handleChangeup = (e) => {
    setRekruter({
      ...rekruter,
      [e.target.name]: e.target.value,
      id_users: id,
    });
    console.log(rekruter);
  };

  const [skill, setSkill] = useState({
    name: "",
    id_users: id,
  });

  const hendleChamgeSklii = (e) => {
    setSkill({
      ...skill,
      [e.target.name]: e.target.value,
      id_users: id,
    });

    console.log(skill);
  };

  const handleSkill = async (e) => {
    isLoading(true);
    e.preventDefault();
    axios
      .post("https://be-hirejob.vercel.app/skills", skill)
      .then((res) => {
        toast.success("Add Skill successful", {
          position: toast.POSITION.TOP_CENTER,
        });
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        isLoading(false);
      });
  };

  // useEffect(() => {
  //   axios
  //     .get(`http://localhost:8080/skills/id_users/?iduser=${id}`)
  //     .then((res) => {
  //       setSkills(res.data.data[0]);
  //       console.log(res);
  //       // localStorage.setItem("idwork", res.data.data[0].id);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }, []);

  const [experience, setExperience] = useState({
    jobdesk: "",
    company_name: "",
    description: "",
    date_start: "",
    date_end: "",
  });

  const changeExperience = (e) => {
    setExperience({
      ...experience,
      [e.target.name]: e.target.value,
      id_users: id,
      // ...selectedDate,
    });
    console.log(experience);
  };

  const handleExperience = async (e) => {
    isLoading(true);
    e.preventDefault();

    axios
      .post("https://be-hirejob.vercel.app/experience", experience)
      .then((res) => {
        toast.success("Add Experience successful", {
          position: toast.POSITION.TOP_CENTER,
        });
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        isLoading(false);
      });
  };

  const [experi, setExperi] = useState([{}]);
  useEffect(() => {
    isLoading(true);
    axios
      .get(`https://be-hirejob.vercel.app/experience/id_users/?iduser=${id}`)
      .then((res) => {
        setExperi(res.data.data);
        // console.log(product);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        isLoading(false);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  // PORTOFOLIO

  const [portfolio, setPortfolio] = useState({
    name_portfolio: "",
    repo_link: "",
    id_users: id,
  });

  const [photo, setPhoto] = useState(null);

  const handleUpload = (e) => {
    setPhoto(e.target.files[0]);
  };

  const changePortfolio = (e) => {
    setPortfolio({
      ...portfolio,
      [e.target.name]: e.target.value,
      id_users: id,
    });

    console.log(portfolio.id_users);
  };

  const [radio, setRadio] = useState("");

  const changeRadio = (e) => {
    setRadio({
      ...radio,
      [e.target.name]: e.target.id,
    });
    console.log(radio);
  };

  // const [radios, setRadios] = useState("");

  const handlePortfolio = async (e) => {
    e.preventDefault();
    // const setRadios = {
    //   id_users: id,
    // };
    isLoading(true);
    const formData = new FormData();
    formData.append("name_portfolio", portfolio.name_portfolio);
    formData.append("repo_link", portfolio.repo_link);
    formData.append("type_portfolio", radio.type_portfolio);
    formData.append("photo", photo);
    formData.append("id_users", portfolio.id_users);

    // console.log(formData.append("users_id", portfolio.id_users));

    axios
      .post("https://be-hirejob.vercel.app/portofolio", formData)
      .then((res) => {
        toast.success("Add Portofolio successful", {
          position: toast.POSITION.TOP_CENTER,
        });
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        isLoading(false);
      });
  };

  const [radios, setRadios] = useState([{}]);

  useEffect(() => {
    isLoading(true);
    if (router.isReady) {
      axios
        .get(`https://be-hirejob.vercel.app/portofolio/id_users/?iduser=${id}`)
        .then((res) => {
          setRadios(res.data.data);
          // console.log(product);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          isLoading(false);
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const router = useRouter();
  const handleSubmit = async (e) => {
    isLoading(true);
    e.preventDefault();
    axios
      .post(`https://be-hirejob.vercel.app/work`, rekruter)
      .then((result) => {
        toast.success("Create successful", {
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

  const handleUpdate = async (e) => {
    const data = {
      // id: worker.id,
      name: worker.name,
      jobdesk: worker.jobdesk,
      domisili: worker.domisili,
      status_kerja: worker.status_kerja,
      tempat_kerja: worker.tempat_kerja,
      deskripsi: worker.deskripsi,
      // id_users: id,
    };

    setRekruter(data);
  };

  const handleSubmitupdate = async (e) => {
    isLoading(true);
    e.preventDefault();
    axios
      .put(`https://be-hirejob.vercel.app/work/${worker.id}`, rekruter)
      .then((result) => {
        toast.success("Update successful", {
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
  // const [skills, setSkills] = useState("");

  const [worker, setWorker] = useState([[]]);
  useEffect(() => {
    isLoading(true);
    if (router.isReady) {
      axios
        .get(`https://be-hirejob.vercel.app/work/id_users/?iduser=${id}`)
        .then((res) => {
          setWorker(res.data.data[0]);
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

    // axios
    //   .get(`http://localhost:8080/skills/id_users/?iduser=${id}`)
    //   .then((res) => {
    //     setSkills(res.data.data);
    //     console.log(res);

    //     // localStorage.setItem("idwork", res.data.data[0].id);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.isReady]);

  const [skills, setSkills] = useState([{}]);

  useEffect(() => {
    isLoading(true);
    const fetchSkills = async () => {
      if (router.isReady) {
        try {
          const res = await axios.get(`https://be-hirejob.vercel.app/skills/id_users/?iduser=${id}`);
          const data = res.data.data;
          console.log(data);
          isLoading(false);
          setSkills(data);
        } catch (error) {
          console.error(error);
        }
      }
    };

    fetchSkills();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.isReady]);

  // useEffect(() => {
  //   axios
  //     .get(`http://localhost:8000/Register/${id}`)
  //     .then((res) => {
  //       setRegis(res.data);
  //       // console.log(product);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }, [id]);

  return (
    <>
      {/* <p>{id}</p> */}
      <div className="pt-4 container">
        <div className="row  justify-content-between ">
          <div class={`col-12 col-md-3 bg-light  ${style.leftSide}`}>
            {loading ? (
              <div>
                <Skeleton count={5} />
              </div>
            ) : (
              <div className="profileDesc">
                <div className={` mx-auto pb-4 pt-2 ${style.picture}`}>
                  <img crossOrigin="anonymouse" width={150} height={150} style={{ borderRadius: "100px" }} src={worker?.photo} alt="photoWork" />
                </div>
                <div className={` mx-auto pb-4 pt-2 ${style.picture}`}>
                  <ModalPhotoWorker id={worker?.id}>Change Photo</ModalPhotoWorker>
                </div>
                <h5 className="fw-bolder">{worker?.name}</h5>
                <span className={style.work}>{worker?.jobdesk}</span>
                <p className={worker?.domisili}>
                  <FontAwesomeIcon icon={faLocation} style={{ marginRight: "5px", height: 20 }} />
                  {worker?.domisili}
                </p>
                <span className={style.worker}>{worker?.status_kerja}</span>
                <div className={` ${style.buttonLeft} buttonLeft border`}>
                  <div className={` ${style.rowTwoLeft} rowTwoLeft`}>
                    <butto className={`btn mb-2 ${style.btn}`} type="button" style={{ height: 50 }} onClick={handleUpdate}>
                      Update
                    </butto>
                    <button className={`btn ${style.btn}`}>Prevew</button>
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
                  {!idProfile ? (
                    <form onSubmit={handleSubmit}>
                      <FormEdit type={"text"} title={"Nama Lengkap"} name={"name"} placeholder={"Masukan nama lengkap"} value={rekruter?.name} onchange={handleChange} />
                      <FormEdit type={"text"} title={"Job Desk"} name={"jobdesk"} placeholder={"Jobdesk"} value={rekruter?.jobdesk} onchange={handleChange} />
                      <FormEdit type={"text"} title={"Domisili"} name={"domisili"} placeholder={"Domisili"} value={rekruter?.domisili} onchange={handleChange} />
                      <FormEdit type={"text"} title={"Status Kerja"} name={"status_kerja"} placeholder={"Status Kerja"} value={rekruter?.status_kerja} onchange={handleChange} />
                      <FormEdit type={"text"} title={"Tempat Kerja"} name={"tempat_kerja"} placeholder={"Tempat Kerja"} value={rekruter?.tempat_kerja} onchange={handleChange} />
                      <FormEdit type={"textarea"} title={"Deskripsi"} name={"deskripsi"} placeholder={"Deskripsi Pekerjaan"} value={rekruter?.deskripsi} onchange={handleChange} />

                      <button className={`btn mb-2 ${style.btn}`} type="button" style={{ height: 50 }} onClick={handleSubmit}>
                        {loading ? <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true" /> : "Simpan"}
                      </button>
                    </form>
                  ) : (
                    <form onSubmit={handleSubmit}>
                      <FormEdit type={"text"} title={"Nama Lengkap"} name={"name"} placeholder={"Masukan nama lengkap"} value={rekruter.name} onchange={handleChangeup} />
                      <FormEdit type={"text"} title={"Job Desk"} name={"jobdesk"} placeholder={"Jobdesk"} value={rekruter.jobdesk} onchange={handleChangeup} />
                      <FormEdit type={"text"} title={"Domisili"} name={"domisili"} placeholder={"Domisili"} value={rekruter?.domisili} onchange={handleChangeup} />
                      <FormEdit type={"text"} title={"Status Kerja"} name={"status_kerja"} placeholder={"Status Kerja"} value={rekruter?.status_kerja} onchange={handleChangeup} />
                      <FormEdit type={"text"} title={"Tempat Kerja"} name={"tempat_kerja"} placeholder={"Tempat Kerja"} value={rekruter?.tempat_kerja} onchange={handleChangeup} />
                      <FormEdit type={"textarea"} title={"Deskripsi"} name={"deskripsi"} placeholder={"Deskripsi Pekerjaan"} value={rekruter?.deskripsi} onchange={handleChangeup} />

                      <button className={`btn mb-2 ${style.btn}`} type="button" style={{ height: 50 }} onClick={handleSubmitupdate}>
                        {loading ? <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true" /> : "Ubah"}
                      </button>
                    </form>
                  )}
                </div>
              </div>
              <div className={`row inputEdit justify-content-center mb-3 mb-md-5 ${style.themeRow} ${style.rowOneRight}`}>
                <div className="col-12">
                  <h3 className="pt-4">Skill</h3>
                  <hr className={style.hr} />
                  {loading ? (
                    <div>
                      <Skeleton count={5} />
                    </div>
                  ) : (
                    <div className={`d-flex container ${style.listSkills}`}>
                      {skills?.map((listskills, i) => (
                        <>
                          <p key={i} className={` btn text-nowrap me-2 ${style.skills}`}>
                            {listskills.name}
                          </p>
                        </>
                      ))}
                    </div>
                  )}

                  <hr className={style.hr} />
                  <div className="row">
                    <div className="col-12 col-md-9">
                      <FormEdit type={"no-title"} name={"name"} placeholder={"Ex: Java"} onchange={hendleChamgeSklii} />
                    </div>
                    <div className="col-12 col-md-3 mb-4 mb-md-0 d-grid align-items-center">
                      <button className="btn btn-warning" style={{ height: "50px" }} onClick={handleSkill}>
                        {loading ? <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true" /> : "Simpan"}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className={`row inputEdit justify-content-center mb-3 mb-md-5 ${style.themeRow} ${style.rowOneRight}`}>
                <div className="col-11 mb-5">
                  <h3 className="pt-4">Pengalaman Kerja</h3>
                  <hr className={style.hr} />
                  {loading ? (
                    <div>
                      <Skeleton count={5} />
                    </div>
                  ) : (
                    <div>
                      {experi?.map((item, xe) => (
                        <div className=" container card-body border p-4 row" key={xe}>
                          <div className="col-1"></div>
                          <div className="col-7">
                            <h4 className={` ${style.tirlecard} mb-2 card-title`}>{item?.posisi}</h4>
                            <h6 className="card-subtitle mb-2 text-muted">{item?.nama_perusahaan}</h6>
                            <h6 className="card-subtitle mb-2 text-muted">
                              {item?.dari} - {item?.sampai}
                            </h6>
                            <p className="card-text"> {item?.deskripsi} </p>
                          </div>
                          <div className="col-3">
                            <ModalUpdate
                              className="btn btn-warning m-4"
                              id={item?.id}
                              posisi={item?.posisi}
                              nama_perusahaan={item?.nama_perusahaan}
                              dari={item?.dari}
                              sampai={item?.sampai}
                              deskripsi={item?.deskripsi}
                              id_users={item?.id_users}
                            >
                              Edit
                            </ModalUpdate>
                            <ModalDelete id={item?.id} posisi={item?.posisi}>
                              X
                            </ModalDelete>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  <hr className={style.hr} />
                  <form onSubmit={handleExperience}>
                    <FormEdit type={"text"} title={"Posisi"} name={"jobdesk"} placeholder={"Web Developer"} value={experience.jobdesk} onchange={changeExperience} req={"required"} />
                    <div className="row" style={{ marginTop: "-20px", marginBottom: "-20px" }}>
                      <div className="col-12 col-md-6 ">
                        <FormEdit type={"text"} title={"Nama perusahaan"} name={"company_name"} placeholder={"PT Harus bisa"} value={experience.company_name} onchange={changeExperience} req={"required"} />
                      </div>
                      <div className="col-12 col-md-3">
                        <p className=" mt-4">Dari Bulan/tahun</p>
                        <input className={` ${style.date} `} type="date" name={"date_start"} id="dateInput" value={experience.date_start} onChange={changeExperience} />
                      </div>
                      <div className="col-12 col-md-3">
                        <p className=" mt-4">Sampai Bulan/tahun</p>
                        <input className={` ${style.date}  `} type="date" name={"date_end"} id="dateInput" value={experience.date_end} onChange={changeExperience} />
                      </div>
                    </div>
                    <FormEdit type={"textarea"} title={"Deskripsi Singkat"} name={"description"} placeholder={"Deskripsikan pekerjaan anda"} value={experience.description} onchange={changeExperience} />
                    <hr />
                    <div className="button d-grid">
                      <button type="submit" className="btn btn-warning d-grid" style={{ height: "50px", lineHeight: "36px" }}>
                        {loading ? <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true" /> : "Simpan"}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
              <div className={`row inputEdit justify-content-center mb-3 mb-md-5 ${style.themeRow} ${style.rowOneRight}`}>
                <div className="col-11 mb-5">
                  <h3 className="pt-4">Portofolio</h3>
                  <hr className={style.hr} />
                  {loading ? (
                    <div>
                      <Skeleton count={5} />
                    </div>
                  ) : (
                    <div>
                      {radios?.map((item, y) => (
                        <div key={y} className="card-body p-4 border row">
                          <div className={`col-2 ${style.image}  `}>
                            <img className={`${style.img_porto}`} src={item?.photo} crossOrigin="anonymouse" alt="photoPortofolio" />
                            {/* <im crossOrigin="anonymouse" width={100} height={100} src={item?.photo} alt="image "></im> */}
                          </div>

                          <div className="col-7 mt-2 ">
                            <h5 className={`card-title ${style.tirlecard} mb-2`}>{item?.name}</h5>
                            <h6 className="card-subtitle mb-2 text-muted">{item?.link}</h6>
                            <h6 className="card-subtitle mb-2 text-muted">{item?.type_portofolio}</h6>
                          </div>
                          <div className="col-3">
                            <ModalUpdates className="btn btn-warning m-4 mb-2" id={item?.id} name={item?.name} link={item?.link} type_portofolio={item?.type_portofolio}>
                              Edit
                            </ModalUpdates>
                            <ModalDeletes id={item?.id} name_portfolio={item?.name}>
                              X
                            </ModalDeletes>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  <hr className={style.hr} />
                  <form onSubmit={handlePortfolio}>
                    <FormEdit type={"text"} title={"Nama aplikasi"} value={portfolio?.name_portfolio} name={"name_portfolio"} placeholder={"Masukan nama aplikasi"} onchange={changePortfolio} />
                    <FormEdit type={"text"} title={"Link Repository"} value={portfolio?.repo_link} name={"repo_link"} placeholder={"Masukan link repository"} onchange={changePortfolio} />
                    <div>
                      {["radio"].map((type) => (
                        <div key={`inline-${type}`} className="mb-3">
                          <Form.Check inline label="Aplikasi Mobile" name="type_portfolio" type={type} id={`Web Browser`} value={radio?.type_portfolio} onChange={changeRadio} />
                          <Form.Check inline label="Web Browser" name="type_portfolio" type={type} id={`Aplikasi Mobile`} value={radio?.type_portfolio} onChange={changeRadio} />
                        </div>
                      ))}
                    </div>
                    <div></div>
                    <input type="file" placeholder="Title" accept=".jpg,.gif,.png" value={portfolio?.photo} name="photo" multiple onChange={handleUpload} />
                    <hr />
                    <div className="button d-grid">
                      <button type="submit" className="btn btn-warning d-grid" style={{ height: "50px", lineHeight: "36px" }}>
                        {loading ? <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true" /> : "Simpan"}
                      </button>
                    </div>
                  </form>
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

export default CreateProfile;
