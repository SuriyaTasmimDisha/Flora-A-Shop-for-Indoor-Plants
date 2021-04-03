import React from 'react'
import { Link } from 'react-router-dom'

export default function Catalogue({ product }) {
    return (
       <div key={product._id} className="card">
                    <Link to={`/catalogue/${product._id}`}>
                    <img className="medium" src={product.image} alt={product.name} />
                    </Link>
                    <div className="card-body">
                        <Link to={`/catalogue/${product._id}`}>
                            <h2 className="plant-title">{product.name}</h2>
                        </Link>
                        <div className="price">
                           ${product.price}
                        </div>
                    </div>
                </div>
    )
}
