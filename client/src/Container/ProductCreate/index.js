import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import LoadingBox from '../../Components/LoadingBox';
import MessageBox from '../../Components/MessageBox';
import { PRODUCT_CREATE_RESET } from '../../Constants/ProductConstants';
import { createProduct } from '../../Store/Actions/ProductActions';

export default function ProductCreate(props) {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [image, setImage] = useState('');
  const [price, setPrice] = useState('');
  const [countInStock, setCountInStock] = useState('');
  const [details, setDetails] = useState('');
  const [plantCare, setPlantCare] = useState('');

  const productCreate = useSelector((state) => state.productCreate);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    product: createdProduct,
  } = productCreate;
  
  const dispatch = useDispatch();
  useEffect(() => {
      if (successCreate) {
      dispatch({ type: PRODUCT_CREATE_RESET });
      props.history.push(`/product/${createdProduct._id}/edit`);
    }
  }, [createProduct, dispatch, props.history, successCreate]);

  const submitHandler = (e) => {
  e.preventDefault();
  dispatch(createProduct(name, category, image, price, countInStock, details, plantCare));
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
          <h1>Create Product</h1>
        </div>

        {loadingCreate && <LoadingBox></LoadingBox>}
        {errorCreate && <MessageBox variant="danger">{errorCreate}</MessageBox>} 
            <div>
              <label htmlFor="name">Name</label>
              <input
                id="name"
                type="text"
                placeholder="Enter name"
                required
                onChange={(e) => setName(e.target.value)}
              ></input>
            </div>
            <div>
              <label htmlFor="category">Category</label>
              <input
                id="category"
                type="text"
                placeholder="Enter category"
                required
                onChange={(e) => setCategory(e.target.value)}
              ></input>
            </div>
             <div>
              <label htmlFor="imageFile">Enter Image</label>
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
                required
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
                required
                onChange={(e) => setDetails(e.target.value)}
              ></textarea>
            </div>
            <div>
              <label htmlFor="plantCare">Plant Care</label>
              <input
                id="plantCare"
                type="text"
                placeholder="Enter Plant Care"
                required
                onChange={(e) => setPlantCare(e.target.value)}
              ></input>
            </div>
            <div>
              <label htmlFor="countInStock">Count In Stock</label>
              <input
                id="countInStock"
                type="text"
                placeholder="Enter countInStock"
                required
                onChange={(e) => setCountInStock(e.target.value)}
              ></input>
            </div>
            <div>
              <button type="submit">
                Create Product
              </button>
            </div>
      </form>
    </div>
  );
}