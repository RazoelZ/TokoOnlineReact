import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Button, Image } from 'react-bootstrap'
import axios from 'axios'
import { API_URL } from '../util/constants'

export default class Sukses extends Component {
  componentDidMount() {
    axios.get(API_URL + 'keranjangs').then((res) => {
      const keranjangs = res.data
      keranjangs.map(function (item) {
        return axios
          .delete(API_URL + 'keranjangs/' + item.id)
          .then((res) => console.log(res))
          .catch((error) => console.log(error))
      })
    }).catch((error) => {
      console.log(error)
    })
  }
  render() {
    return (
      <div className='mt-4 text-center'>
        <Image src="assets/images/done.png" width={500} />
        <h2>Sukses</h2>
        <p>Terimakasih banyak monyet</p>
        <Button className='btn btn-primary' as={Link} to="/">Kembali</Button>
      </div>
    )
  }
}
