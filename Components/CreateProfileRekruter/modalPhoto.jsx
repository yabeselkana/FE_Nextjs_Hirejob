import axios from "axios";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { toast, ToastContainer } from "react-toastify";
function ModalPhoto({ id, photo, children }) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [isphoto, issetPhoto] = useState(null);

  const handleUpload = (e) => {
    issetPhoto(e.target.files[0]);
  };

  let hendelSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("photo", isphoto);
    axios
      .put(`https://be-hirejob.vercel.app/rekruter/photo/${id}`, formData)
      .then((res) => {
        console.log(res);
        toast.success("Update Photo Successful", {
          position: toast.POSITION.TOP_CENTER,
        });
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
          <Modal.Title>{children} Rekruter</Modal.Title>
        </Modal.Header>
        <form onSubmit={hendelSubmit}>
          <Modal.Body>
            <input type="file" placeholder="Title" accept=".jpg,.gif,.png" value={photo} name="photo" multiple onChange={handleUpload} />
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
        <ToastContainer />
      </Modal>
    </>
  );
}

export default ModalPhoto;
