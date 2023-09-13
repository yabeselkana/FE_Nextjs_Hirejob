import axios from "axios";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function ModalUpdate({ id, posisi, nama_perusahaan, dari, sampai, deskripsi, id_users, children }) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  let [data, setData] = useState({
    id,
    posisi,
    nama_perusahaan,
    dari,
    sampai,
    deskripsi,
    id_users,
  });

  let hendelChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
    console.log(data);
  };

  let hendelSubmit = (e) => {
    e.preventDefault();

    axios
      .put(`http://localhost:8080/experience/${id}`, data)
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
            <input className="form-control mt-3" type="text" placeholder="jobdesk" name="posisi" value={data.posisi} onChange={hendelChange} />
            <input className="form-control mt-3" type="text" placeholder="company_name" name="nama_perusahaan" value={data.nama_perusahaan} onChange={hendelChange} />
            <input className="form-control mt-3" type="text" placeholder="date_start" name="dari" value={data.dari} onChange={hendelChange} />
            <input className="form-control mt-3" type="text" placeholder="date_end" name="sampai" value={data.sampai} onChange={hendelChange} />
            <input className="form-control mt-3" type="text" placeholder="description" name="deskripsi" value={data.deskripsi} onChange={hendelChange} />
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

export default ModalUpdate;
