import style from "../../Components/Bg_Auth/style.module.css";

const InputForm = (props) => {
  const changeHandler = (e) => {
    props.onchange(e);
  };

  return (
    <>
      <div className="mb-3">
        <label for={props.name} className={`form-label ${style.formLabel}`}>
          {props.title}
        </label>
        <div className={style.controlStyle}>
          <input type={props.type} value={props.value} className={`form-control ${style.formControl}`} id={props.name} name={props.name} placeholder={props.placeholder} onChange={changeHandler} required={props.req} />
        </div>
      </div>
    </>
  );
};

export default InputForm;
