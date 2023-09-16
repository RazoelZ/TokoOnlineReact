import React from 'react'
import { Modal, Button, Form } from 'react-bootstrap';
import { numberWithCommas } from '../util/utils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';

const ModalKeranjang = ({ showModal,
  handleClose,
  keranjangDetail,
  jumlah,
  keterangan, tambah,
  kurang,
  changeHandler,
  handleSubmit,
  totalHarga,
  handleDelete }) => {
  if (keranjangDetail) {
    return (
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{keranjangDetail.product.nama}
            {"  "}
            <strong>(Rp. {numberWithCommas(keranjangDetail.product.harga)})</strong>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Total Harga : </Form.Label>
              <p><strong>Rp. {numberWithCommas(totalHarga)}</strong></p>
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Jumlah : </Form.Label>
              <br />
              <Button variant="primary" size="sm" className="me-2">
                <FontAwesomeIcon icon={faMinus} onClick={() => kurang()} />
              </Button>
              <strong>{jumlah}</strong>
              <Button variant="primary" size="sm" className="ms-2">
                <FontAwesomeIcon icon={faPlus} onClick={() => tambah()} />
              </Button>

            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Keterangan : </Form.Label>
              <Form.Control as="textarea" rows={3} placeholder="Contoh : Pedas, Nasi Setengah" value={keterangan}
                onChange={(e) => changeHandler(e)}
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Simpan
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={() => handleDelete(keranjangDetail.id)}>
            <FontAwesomeIcon icon={faTrash} /> Hapus pesanan
          </Button>
        </Modal.Footer>
      </Modal>
    )
  } else {
    return (
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Kosong</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you are reading this text in a modal!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    )
  }

}

export default ModalKeranjang