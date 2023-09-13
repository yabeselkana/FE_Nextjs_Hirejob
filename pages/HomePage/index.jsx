import React, { useEffect, useState } from "react";
import NavbarLogin from "../../Components/NavbarLogin/Index";
import Foot from "../../Components/Foot";
import Navbar from "../../Components/Navbar";
import style from "./HomePage.module.css";
import { useDispatch } from "react-redux";
import { getWorkers } from "../../redux/actions/wokerActions";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import CardList from "../../Components/CardList";
import Pagination from "../../Components/Pagination";

const HomePage = () => {
  const dispatch = useDispatch();
  const [worker, setWorker] = useState([{}]);
  useEffect(() => {
    isLoading(true);
    dispatch(getWorkers(setWorker, isLoading));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  const [search, setSearch] = useState("");

  const [loading, isLoading] = useState(false);

  // const handleSearch = async (e) => {
  //   // if (e.key === "Enter") {
  //   //   dispatch(getWorkers(search));
  //   // }
  // };
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(5);

  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;
  const currentPosts = worker.slice(firstPostIndex, lastPostIndex);
  const [login, setLogin] = useState("");
  const [id, setId] = useState("");

  useEffect(() => {
    setLogin(localStorage.getItem("token"));
    setId(localStorage.getItem("id"));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      {!login ? <Navbar /> : <NavbarLogin />}
      <section className="container">
        <div className={`${style.searching} mt-4 mb-4`} data-aos="zoom-out-down">
          <form className="d-flex" role="search">
            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" onChange={(e) => setSearch(e.target.value)} />
            <button className={` ${style.btnSearch} btn btn-outline-success"`} type="submit">
              Search
            </button>
            <select className={`${style.Drop} form-selec `} aria-label="Default select example">
              <option selected className={`${style.btnDrop}`}>
                Sort
              </option>
              <option value="1">a</option>
              <option value="2">b</option>
              <option value="3">c</option>
            </select>
            <div className={style.garisVertical}></div>
          </form>
        </div>

        <div className="row py-5" data-aos="zoom-out-up">
          <div className="col-12">
            {loading ? (
              <div>
                <Skeleton count={5} />
              </div>
            ) : (
              <div className="card" style={{ width: "100%" }}>
                {currentPosts
                  .filter((item) => {
                    return search.toLowerCase() === "" ? item : item.name.toLowerCase().includes(search);
                  })
                  .map((item, s) => (
                    <CardList name={item.name} photo={item.photo} domisili={item.domisili} jabatan={item.jobdesk} id={item.id_users} key={s} />
                  ))}
              </div>
            )}
          </div>
        </div>

        <Pagination className={`${style.pagination}`} totalPosts={worker.length} postsPerPage={postsPerPage} setCurrentPage={setCurrentPage} currentPage={currentPage} />
      </section>
      <Foot />
    </>
  );
};

export default HomePage;
