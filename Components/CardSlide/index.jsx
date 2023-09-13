import style from "./Slide.module.css";
import { Swiper, SwiperSlide } from "swiper/react";

import img from "../../Assets/img/lending_page/Ellipse 323.png";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
// import { Image } from "react-bootstrap";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import { useEffect, useState } from "react";

import Image from "next/image";
import { useDispatch } from "react-redux";
import { getWorkers } from "../../redux/actions/wokerActions";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
const CardSlide = () => {
  const dispatch = useDispatch();
  const [loading, isLoading] = useState(false);
  const [worker, setWorker] = useState([{}]);
  useEffect(() => {
    isLoading(true);
    dispatch(getWorkers(setWorker, isLoading));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);
  return (
    <>
      {loading ? (
        <div>
          <Skeleton count={5} />
        </div>
      ) : (
        <Swiper
          // install Swiper modules
          modules={[Navigation, Pagination, Scrollbar, A11y]}
          spaceBetween={10}
          slidesPerView={3}
          navigation={{}}
          pagination={{ clickable: true }}
          scrollbar={{ draggable: true }}
          breakpoints={{
            "@0.00": {
              slidesPerView: 1,
              spaceBetween: 50,
            },
            "@0.75": {
              slidesPerView: 2,
              spaceBetween: 10,
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 30,
            },
            "@1.00": {
              slidesPerView: 3,
              spaceBetween: 30,
            },
            "@1.50": {
              slidesPerView: 3,
              spaceBetween: 30,
            },
          }}
          onSwiper={(swiper) => console.log(swiper)}
          onSlideChange={() => console.log("slide change")}
          className="mySwiper swiper-container"
        >
          {worker.map((item, index) => (
            <SwiperSlide>
              <div key={index} className={`card ${style.card} text-center`} style={{ width: "18rem" }}>
                <img alt="photoSlide" crossOrigin="anonymouse" width={150} height={150} src={item.photo} className={style.cardImg} />
                <div className="card-body">
                  <h5 className="card-title">{item?.name}</h5>
                  <p className="card-text ">{item?.jobdesk}</p>
                  <p className="card-text">{item?.deskripsi}</p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </>
  );
};

export default CardSlide;
