import React, { Component } from 'react';
import { Badge, Card, Col, ListGroupItem, Row } from 'react-bootstrap';
import { ListGroup } from 'react-bootstrap';
import { numberWithCommas } from '../util/utils';
import TotalBayar from './TotalBayar';
import ModalKeranjang from './ModalKeranjang';
import axios from 'axios';
import { API_URL } from '../util/constants';
import swal from 'sweetalert';

export default class Hasil extends Component {
  constructor(props) {
    super(props)

    this.state = {
      showModal: false,
      keranjangDetail: false,
      jumlah: 0,
      keterangan: '',
      totalHarga: 0,
    }
  }

  handleShow = (menuKeranjang) => {
    this.setState({
      showModal: true,
      keranjangDetail: menuKeranjang,
      jumlah: menuKeranjang.jumlah,
      keterangan: menuKeranjang.keterangan,
      totalHarga: menuKeranjang.total_harga,
    })
  }

  handleClose = () => {
    this.setState({
      showModal: false
    })
  }

  tambah = () => {
    this.setState({
      jumlah: this.state.jumlah + 1,
      totalHarga: this.state.keranjangDetail.product.harga * (this.state.jumlah + 1)
    })
  }

  kurang = () => {
    if (this.state.jumlah !== 1) {
      this.setState({
        jumlah: this.state.jumlah - 1,
        totalHarga: this.state.keranjangDetail.product.harga * (this.state.jumlah - 1)
      })
    }
  }

  changeHandler = (event) => {
    this.setState({
      keterangan: event.target.value
    })
  }

  handleSubmit = (event) => {
    event.preventDefault();

    this.handleClose();

    const data = {
      jumlah: this.state.jumlah,
      total_harga: this.state.totalHarga,
      product: this.state.keranjangDetail.product,
      keterangan: this.state.keterangan
    }

    axios.put(API_URL + "keranjangs/" + this.state.keranjangDetail.id, data)
      .then((res) => {
        this.props.getListKerangjang();
        swal({
          title: "Update Pesanan",
          text: "Pesanan Anda berhasil diupdate",
          icon: "success",
          button: false,
          timer: 1500
        });

      }
      ).catch((err) => {
        console.log(err);
      }
      )
  }

  handleDelete = (id) => {

    this.handleClose();

    axios.delete(API_URL + "keranjangs/" + id)
      .then((res) => {
        this.props.getListKerangjang();
        swal({
          title: "Hapus Pesanan",
          text: "Pesanan Anda berhasil di hapus" + this.state.keranjangDetail.product.nama,
          icon: "error",
          button: false,
          timer: 1500
        });

      }
      ).catch((err) => {
        console.log(err);
      }
      )
  }

  render() {
    const { keranjangs } = this.props;

    return (
      <Col md={3} mt="2">
        <h4><strong>Hasil</strong></h4>
        <hr />
        {keranjangs && keranjangs.length !== 0 && (
          <Card className='overflow-auto hasil'>
            <ListGroup variant="flush">
              {keranjangs.map((menuKeranjang) => (
                <ListGroupItem key={menuKeranjang.id} onClick={() => this.handleShow(menuKeranjang)}>
                  <Row>
                    <Col xs={2}>
                      <Badge pill variant="success">
                        {menuKeranjang.jumlah}
                      </Badge>
                    </Col>
                    <Col>
                      <h5>{menuKeranjang.product.nama}</h5>
                      Rp. {numberWithCommas(menuKeranjang.product.harga)}
                    </Col>
                    <Col>
                      <strong className="float-end">
                        Rp. {numberWithCommas(menuKeranjang.total_harga)}
                      </strong>
                    </Col>
                  </Row>
                </ListGroupItem>

              ))}

              <ModalKeranjang handleClose={this.handleClose}
                {...this.state}
                tambah={this.tambah}
                kurang={this.kurang}
                changeHandler={this.changeHandler}
                handleSubmit={this.handleSubmit}
                handleDelete={this.handleDelete} />
            </ListGroup>
          </Card>
        )
        }
        <TotalBayar keranjangs={keranjangs} {...this.props} />
      </Col >
    );
  }
}
