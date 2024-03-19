import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { items } from './Data'
import Product from './Product'

const ProductDetail = ({ cart, setCart }) => {
  const { id } = useParams();

  const [product, setProduct] = useState({});
  const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {
    const filterProduct = items.filter((product) => product.id == id)
    // console.log(filterProduct);
    setProduct(filterProduct[0])

    const relatedProducts = items.filter((v) => v.category === product.category)
    // console.log(relatedProducts);
    setRelatedProducts(relatedProducts)
  }, [id, product.category])

  const addToCart = (id, price, title, description, imgSrc) => {
    const obj = {
      id, price, title, description, imgSrc
    }
    setCart([...cart, obj])
    console.log("cart element = ", cart);

  }
  return (
    <>
      <div className="container con">
        <div className="img">
          <img src={product.imgSrc} alt="" />
        </div>
        <div className='text-center'>
          <h1 className="card-title">{product.title}</h1>
          <p className="card-text">{product.description}</p>
          <button className='btn btn-primary mx-3'>{product.price} ₹</button>
          <button
            className='btn btn-warning'
            onClick={() => addToCart(product.id, product.price, product.title, product.description, product.imgSrc)}
          >Add To Cart</button>
        </div>
      </div>
      <Product cart={cart} setCart={setCart} items={relatedProducts} />
    </>
  );
}

export default ProductDetail;