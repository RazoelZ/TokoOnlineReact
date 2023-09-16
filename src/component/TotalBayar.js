import React, { Component } from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import { numberWithCommas } from '../util/utils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { API_URL } from '../util/constants';
import { Link } from 'react-router-dom';


import axios from 'axios';

export default class TotalBayar extends Component {

  submitTotalBayar = (totalBayar) => {
    const pesanan = {
      total_bayar: totalBayar,
      menus: this.props.keranjangs
    }

    axios.post(API_URL + "pesanans", pesanan).then((res) => {
    })
  }

  render() {
    // Check if this.props.keranjangs exists and is an array before reducing
    const keranjangs = this.props.keranjangs || [];
    const totalBayar = keranjangs.reduce(function (result, item) {
      return result + item.total_harga;
    }, 0);

    return (
      <>
        {/* web */}
        <div className='fixed-bottom d-none d-md-block'>
          <Row>
            <Col md={{ span: 3, offset: 9 }} className='px-4'>
              <h4>Total Harga : {" "}<strong className='float-right ms-4'>Rp. {numberWithCommas(totalBayar)}</strong></h4>
              <div className='d-grid gap-4'>
                <Button variant="primary" className="mb-3 mt-4 mr-2" size="md"
                  onClick={() => this.submitTotalBayar(totalBayar)} as={Link} to='/sukses'>
                  <FontAwesomeIcon icon={faShoppingCart} className="ms--5 me-2" /> <strong>BAYAR</strong>
                </Button>
              </div>
            </Col>
          </Row>
        </div>

        {/* mobile */}
        <div className='d-sm-block d-md-none'>
          <Row>
            <Col md={{ span: 3, offset: 9 }} className='px-4'>
              <h4>Total Harga : {" "}<strong className='float-right ms-4'>Rp. {numberWithCommas(totalBayar)}</strong></h4>
              <div className='d-grid gap-4'>
                <Button variant="primary" className="mb-3 mt-4 mr-2" size="md"
                  onClick={() => this.submitTotalBayar(totalBayar)} as={Link} to='/sukses'>
                  <FontAwesomeIcon icon={faShoppingCart} className="ms--5 me-2" /> <strong>BAYAR</strong>
                </Button>
              </div>
            </Col>
          </Row>
        </div>
      </>

    )
  }
}
