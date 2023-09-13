import axios from "axios";
import Swal from "sweetalert2";

// get All Recipe
export const getSkillByUser = (setSkill, id) => async (dispatch) => {
  try {
    axios.get(`${process.env.API_BACKEND}skills/worker/${id}`).then((response) => {
      setSkill(response.data.data);
    });
    dispatch({ type: "GET_SKILL_BY_USER", payload: "success" });
  } catch (error) {
    Swal.fire({
      //   text: `${error.response.data.message}`,
      icon: "warning",
    });
  }
};

// Create Skills
export const createSkill = (skill, id) => async (dispatch) => {
  try {
    axios.post(`${process.env.API_BACKEND}skills/addskills/${id}`, { name: skill }).then((res) => {
      console.log(res.data);
      Swal.fire({
        title: "Skill Added",
        text: `New product have been added`,
        icon: "success",
      });
    });
    dispatch({ type: "CREATE_SKILL", payload: "Skill Created" });
  } catch (error) {
    Swal.fire({
      text: error.response.data.message,
      icon: "warning",
    });
  }
};
