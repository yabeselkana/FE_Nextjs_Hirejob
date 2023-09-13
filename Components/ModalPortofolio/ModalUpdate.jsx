import axios from "axios";
import { useState } from "react";
import { Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function ModalUpdates({ id, name, link, type_portofolio, children }) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  let [data, setData] = useState({
    id,
    name,
    link,
    type_portofolio,
  });

  let hendelChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
    console.log(data);
  };

  const [radios, setRadio] = useState("");

  const changeRadio = (e) => {
    setRadio({
      ...radios,
      [e.target.name]: e.target.id,
    });
    console.log(radios);
  };

  let hendelSubmit = (e) => {
    e.preventDefault();

    axios
      .put(`http://localhost:8080/portofolio/${id}`, data)
      .then((res) => {
        console.log(res);
        alert("Experient Update");
        setShow(false);
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
        alert(err);
        setShow(false);
      });
  };

  return (
    <>
      <Button variant="warning" onClick={handleShow}>
        {children}
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{children} Product</Modal.Title>
        </Modal.Header>
        <form onSubmit={hendelSubmit}>
          <Modal.Body>
            <input className="form-control mt-3" type="text" placeholder="Name" name="name" value={data?.name} onChange={hendelChange} />
            <input className="form-control mt-3" type="text" placeholder="repo_link" name="link" value={data?.link} onChange={hendelChange} />
            <Form>
              {["radio"].map((type) => (
                <div key={`inline-${type}`} className="mb-3">
                  <Form.Check inline label="Aplikasi Mobile" name="type_portofolio" type={type} id={`Web Browser`} value={radios.type_portofolio} onChange={changeRadio} />
                  <Form.Check inline label="Web Browser" name="type_portofolio" type={type} id={`Aplikasi Mobile`} value={radios.type_portofolio} onChange={changeRadio} />
                </div>
              ))}
            </Form>

            <input type="file" />
          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <button type="submit" className="btn btn-primary">
              {children}
            </button>
          </Modal.Footer>
        </form>
      </Modal>
    </>
  );
}

export default ModalUpdates;
