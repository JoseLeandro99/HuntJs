import React, { Component } from 'react'
import api from '../../services/api'
import { Link } from 'react-router-dom'

import './style.css'

export default class Main extends Component {

    state = {
        products: [],
        productInfo: {},
        page: 1,
    }

    componentDidMount() {
        this.LoadProducts()
    }

    LoadProducts = async(page = 1) => {
        const response = await api.get(`/Products?page=${page}`)

        const { docs, ...productInfo } = response.data
        
        this.setState({ products: docs, productInfo, page })
    }

    PrevPage = () => {
        const { page, productInfo } = this.state

        if (page === 1) return

        const pageNumber = page - 1

        this.LoadProducts(pageNumber)
    }
    
    NextPage = () => {
        const { page, productInfo } = this.state

        if (page === productInfo.pages) return

        const pageNumber = page + 1

        this.LoadProducts(pageNumber)
    }

    render() {
        const { products, productInfo, page } = this.state

        return(
            <div className="product-list">
                {products.map(product => (
                    <article key={product._id}>
                        <strong>{product.title}</strong>
                        <p>{product.description}</p>

                        <Link to={`/products/${product._id}`}>Acessar</Link>
                    </article>
                ))}
                <div className="actions">
                    <button disabled={page === 1} onClick={this.PrevPage}>Anterior</button>
                    <button disabled={page === productInfo.pages} onClick={this.NextPage}>Próxima</button>
                </div>
            </div>
        )
    }

}