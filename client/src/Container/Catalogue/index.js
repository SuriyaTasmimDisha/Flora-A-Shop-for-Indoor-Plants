import React, { useEffect } from 'react';
import Catalogue from '../../Components/Catalogue';
import LoadingBox from '../../Components/LoadingBox';
import MessageBox from '../../Components/MessageBox';
import { useSelector, useDispatch } from 'react-redux';
import { listProducts } from '../../Store/Actions/ProductActions';
import {Grid} from '@material-ui/core'

export default function CataloguePage() {
    const dispatch = useDispatch();
    const productList = useSelector((state) => state.productList);
    const { loading, error, products } = productList;

    useEffect(() => {
       dispatch(listProducts());
    }, [dispatch]);
    return (
        <div>
            <h1>All Plants</h1>
            { loading ? (
                <LoadingBox></LoadingBox>
            ) : error ? (
                <MessageBox variant='danger'>{error}</MessageBox>
            ) : (
                <Grid container spacing={3} justify='center'>
                {products.map((product) => (
                <Grid item xs={12} md={6} lg={3}>    
                <Catalogue key={product._id} product = {product} />
                </Grid>
                ))}
                </Grid>
            )}      
        </div>
    )
}
