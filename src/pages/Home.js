import React, { Component } from 'react'
import { Col, Container, Row } from 'react-bootstrap';
import { Hasil, ListCategories, Menus } from '../component';
import { API_URL } from '../util/constants';
import axios from 'axios';
import swal from 'sweetalert';

export default class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      menus: [],
      ChoosenCategory: "Makanan"
    }
  }

  componentDidMount() {
    axios.get(API_URL + "products?category.nama=" + this.state.ChoosenCategory).then(res => {
      const menus = res.data;
      this.setState({ menus });
    })
      .catch(error => {
        console.log(error);
      })

    this.getListKerangjang();
  }

  // componentDidUpdate(prevState) {
  //   if (this.state.keranjangs !== prevState.keranjangs) {
  //     axios.get(API_URL + "keranjangs").then(res => {
  //       const keranjangs = res.data;
  //       this.setState({ keranjangs });
  //     }
  //     ).catch(error => {
  //       console.log(error);
  //     })
  //   }
  // }

  getListKerangjang = () => {
    axios.get(API_URL + "keranjangs").then(res => {
      const keranjangs = res.data;
      this.setState({ keranjangs });
    }
    ).catch(error => {
      console.log(error);
    })
  }

  changeCategory = (value) => {
    this.setState({
      ChoosenCategory: value,
      menus: [],
      keranjangs: []
    })

    axios.get(API_URL + "products?category.nama=" + value).then(res => {
      const menus = res.data;
      this.setState({ menus });
    })
      .catch(error => {
        console.log(error);
      })
  }

  masukKeranjang = (value) => {

    const keranjangpesanan = {
      jumlah: 1,
      total_harga: value.harga,
      product: value
    }

    axios.get(API_URL + "keranjangs?product.id=" + value.id).then(res => {
      if (res.data.length === 0) {
        axios.post(API_URL + "keranjangs", keranjangpesanan).then(res => {
          this.getListKerangjang();
          swal({
            title: "Sukses",
            text: "Sukses Masuk Keranjang",
            icon: "success",
            button: false,
            timer: 1500
          });
        })
          .catch(error => {
            console.log(error);
          })
      } else {
        keranjangpesanan.jumlah = res.data[0].jumlah + 1;
        keranjangpesanan.total_harga = res.data[0].total_harga + value.harga;

        axios.put(API_URL + "keranjangs/" + res.data[0].id, keranjangpesanan).then(res => {
          swal({
            title: "Sukses",
            text: "Sukses Masuk Keranjang",
            icon: "success",
            button: false,
            timer: 1500
          });
        })
          .catch(error => {
            console.log(error);
          })
      }
    })
  }

  render() {
    const { menus, ChoosenCategory, keranjangs } = this.state;
    return (
      <div className='mt-3'>
        <Container fluid>
          <Row>
            <ListCategories
              changeCategory={this.changeCategory}
              ChoosenCategory={ChoosenCategory} />
            <Col>
              <h4><strong>Daftar Produk</strong></h4>
              <hr />
              <Row className='overflow-auto menu'>
                {menus && menus.map((menu) => (
                  <Menus
                    key={menu.id}
                    menu={menu}
                    masukKeranjang={this.masukKeranjang} />
                ))}
              </Row>
            </Col>
            <Hasil keranjangs={keranjangs} {...this.props} getListKerangjang={this.getListKerangjang} />
          </Row>
        </Container>
      </div>
    )
  }
}


