import axios from "axios";
import Swal from "sweetalert2";

export const getWorkers = (setWorker, isLoading) => async (dispatch) => {
  try {
    axios.get(`https://be-hirejob.vercel.app/work`).then((response) => {
      setWorker(response.data.data);
      isLoading(false);
    });
    dispatch({ type: "GET_ALL_WORKERS", payload: "success" });
  } catch (error) {
    Swal.fire({
      text: `${error.response.data.message}`,
      icon: "warning",
    });
  }
};

export const getDetailWorker = (setWorker, id) => async (dispatch) => {
  try {
    console.log(id);
    if (id) {
      console.log(id);
      axios.get(`${process.env.API_BACKEND}work/${id}`).then((response) => {
        console.log(response);
        setWorker(response?.data?.data?.[0]);
      });
      dispatch({ type: "GET_DETAIL_WORKER", payload: "success" });
    }
  } catch (error) {
    Swal.fire({
      text: error.response.data.data.message,
      icon: "warning",
    });
  }
};

export const updateWorker = (worker, id) => async (dispatch) => {
  try {
    const token = localStorage.getItem("token");
    const formData = new FormData();
    for (let attr in worker) {
      formData.append(attr, worker[attr]);
    }

    axios
      .put(`${process.env.API_BACKEND}workers/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        Swal.fire({
          title: res.data.message,
          icon: "success",
        });
      });
    dispatch({ type: "UPDATE_WORKER", payload: "Recipe Updated success" });
  } catch (error) {
    console.log(error);
    Swal.fire({
      // text: error.response.data.message,
      icon: "warning",
    });
  }
};
