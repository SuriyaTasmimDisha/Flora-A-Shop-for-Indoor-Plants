import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import LoadingBox from '../../Components/LoadingBox';
import MessageBox from '../../Components/MessageBox';
import { PRODUCT_UPDATE_RESET } from '../../Constants/ProductConstants';
import { detailsProduct, updateProduct } from '../../Store/Actions/ProductActions';

export default function ProductEdit(props) {
  const productId = props.match.params.id;
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [image, setImage] = useState('');
  const [price, setPrice] = useState('');
  const [countInStock, setCountInStock] = useState('');
  const [details, setDetails] = useState('');
  const [plantCare, setPlantCare] = useState('');

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;
  
  const productUpdate = useSelector((state) => state.productUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = productUpdate;
  
  const dispatch = useDispatch();
  useEffect(() =>  {
    if (successUpdate) {
      props.history.push('/productlist');
    }
    if (!product || product._id !== productId || successUpdate) {
      dispatch({ type: PRODUCT_UPDATE_RESET });
      dispatch(detailsProduct(productId));
    } else {
        setName(product.name);
        setCategory(product.category);
        setImage(product.image);
        setPrice(product.price);
        setCountInStock(product.countInStock);
        setDetails(product.details);
        setPlantCare(product.plantCare);
    }
  }, [product, dispatch, productId, successUpdate, props.history]);
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateProduct({
        _id: productId,
        name,
        category,
        image,
        price,
        countInStock,
        details,
        plantCare,
      })
    );
  };
  const [loadingUpload, setLoadingUpload] = useState(false);
  const [errorUpload, setErrorUpload] = useState('');

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const bodyFormData = new FormData();
    bodyFormData.append('image', file);
    setLoadingUpload(true);
    try {
      const { data } = await axios.post('/uploads', bodyFormData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${userInfo.token}`,
        },
      });
      setImage(data);
      setLoadingUpload(false);
    } catch (error) {
      setErrorUpload(error.message);
      setLoadingUpload(false);
    }
  };

  return (
    <div>
      <form className="form" onSubmit={submitHandler}>
        <div>
          <h1>Edit Product {productId}</h1>
        </div>
        {loadingUpdate && <LoadingBox></LoadingBox>}
        {errorUpdate && <MessageBox variant="danger">{errorUpdate}</MessageBox>}
        {loading ? (
          <LoadingBox></LoadingBox>
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <>
            <div>
              <label htmlFor="name">Name</label>
              <input
                id="name"
                type="text"
                placeholder="Enter name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></input>
            </div>
            <div>
              <label htmlFor="category">Category</label>
              <input
                id="category"
                type="text"
                placeholder="Enter category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              ></input>
            </div>
            <div>
              <label htmlFor="image">Image</label>
              <input
                id="image"
                type="text"
                placeholder="Enter image"
                value={image}
                onChange={(e) => setImage(e.target.value)}
              ></input>
            </div>
             <div>
              <label htmlFor="imageFile">Image File</label>
              <input
                type="file"
                id="imageFile"
                label="Choose Image"
                onChange={uploadFileHandler}
              ></input>
              {loadingUpload && <LoadingBox></LoadingBox>}
              {errorUpload && (
                <MessageBox variant="danger">{errorUpload}</MessageBox>
              )}
            </div>
            <div>
              <label htmlFor="price">Price</label>
              <input
                id="price"
                type="text"
                placeholder="Enter price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              ></input>
            </div>
            <div>
              <label htmlFor="details">Details</label>
              <textarea
                id="details"
                rows="3"
                type="text"
                placeholder="Enter Details"
                value={details}
                onChange={(e) => setDetails(e.target.value)}
              ></textarea>
            </div>
            <div>
              <label htmlFor="plantCare">Plant Care</label>
              <input
                id="plantCare"
                type="text"
                placeholder="Enter Plant Care"
                value={plantCare}
                onChange={(e) => setPlantCare(e.target.value)}
              ></input>
            </div>
            <div>
              <label htmlFor="countInStock">Count In Stock</label>
              <input
                id="countInStock"
                type="text"
                placeholder="Enter countInStock"
                value={countInStock}
                onChange={(e) => setCountInStock(e.target.value)}
              ></input>
            </div>
            <div>
              <label></label>
              <button type="submit">
                Update
              </button>
            </div>
          </>
        )}
      </form>
    </div>
  );
}