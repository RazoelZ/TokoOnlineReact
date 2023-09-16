import React from 'react'
import { Card, Col } from 'react-bootstrap'
import { numberWithCommas } from '../util/utils'

export const Menus = ({ menu, masukKeranjang }) => {
  return (
    <Col md={4} cs={6} className='mb-4'>
      <Card style={{ width: '18rem' }}
        onClick={() => masukKeranjang(menu)}>
        <Card.Img variant="top" src={"assets/images/" + menu.category.nama.toLowerCase() + "/" + menu.gambar} />
        <Card.Body>
          <Card.Title>{menu.nama}</Card.Title>
          <Card.Text>
            Rp. {numberWithCommas(menu.harga)} <strong>({menu.kode})</strong>
          </Card.Text>
        </Card.Body>
      </Card>
    </Col >
  )
}

export default Menus
