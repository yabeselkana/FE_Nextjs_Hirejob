import axios from "axios";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function ModalDeletes({ id, name_portfolio, children }) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  let hendelDelete = (e) => {
    axios
      .delete(`http://localhost:8080/portofolio/${id}`)
      .then((res) => {
        console.log(res);
        alert("Delete Successs");
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
      <Button className="ml-2" variant="danger" onClick={handleShow}>
        {children}
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{children} Experience</Modal.Title>
        </Modal.Header>
        <form onSubmit={hendelDelete}>
          <Modal.Body>
            <h5 className="text-center">Are sure want to delete this Experience {name_portfolio}?</h5>
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

export default ModalDeletes;
