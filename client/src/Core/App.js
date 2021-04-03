import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import HomeScreen from '../Container/Hompage';
import RegisterScreen from '../Container/Register';
import LoginScreen from '../Container/Login';
import CatalogueScreen from '../Container/Catalogue';
import ProductDetailsScreen from '../Container/ProductDetails';
import CartScreen from '../Container/Cart';
import ShippingAddressScreen from '../Container/ShippingAddress';
import PaymentScreen from '../Container/Payment';
import PlaceOrderScreen from '../Container/PlaceOrder';
import OrderDetailsScreen from '../Container/OrderDetails';
import OrderHistoryScreen from '../Container/OrderHistory';
import UserProfileScreen from '../Container/UserProfile';
import ProductListScreen from '../Container/ProductList';
import ProductEditScreen from '../Container/ProductEdit';
import OrderListScreen from '../Container/OrderList';
import UserListScreen from '../Container/UserList';
import UserEditScreen from '../Container/UserEdit';
import ProductCreateScreen from '../Container/ProductCreate';
import UserCreateScreen from '../Container/UserCreate';
import PrivateRoute from '../Components/PrivateRoute';
import SuperAdminRoute from '../Components/SuperAdminRoute';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import { Container } from '@material-ui/core';
import AdminRoute from '../Components/AdminRoute';

function App() {

  return (
   <BrowserRouter>
   <Container>
            <Navbar />
        <main>
            <Switch>
            <Route path='/' component={HomeScreen} exact />
            <Route path='/register' component={RegisterScreen} />
            <Route path='/login' component={LoginScreen} />
            <Route path='/catalogue' exact component={CatalogueScreen} />
            <Route path='/catalogue/:id'exact component={ProductDetailsScreen} />
            <Route path='/catalogue/:id/edit'  component={ProductEditScreen} />
            <Route path='/cart/:id?' component={CartScreen} />
            <Route path='/shipping' component={ShippingAddressScreen} />
            <Route path='/payment' component={PaymentScreen} />
            <Route path='/placeorder' component={PlaceOrderScreen} />
            <Route path='/order/:id' component={OrderDetailsScreen} />
            <Route path='/orderhistory' component={OrderHistoryScreen} />
            <PrivateRoute path='/profile' component={UserProfileScreen} />
            <SuperAdminRoute path='/productList' component={ProductListScreen} />
            <SuperAdminRoute path='/product/create' component={ProductCreateScreen} />
            <SuperAdminRoute path='/orderlist' exact component={OrderListScreen} />
            <AdminRoute path='/orderlist/admin' component={OrderListScreen} />
            <SuperAdminRoute path='/userlist' component={UserListScreen} />
            <SuperAdminRoute path='/user/create' exact component={UserCreateScreen} />
            <SuperAdminRoute path='/user/:id/edit' exact component={UserEditScreen} />
            </Switch>
        </main>

        <footer className="row center">
           <Footer /> 
        </footer>
    </Container>
   </BrowserRouter>
  );
}

export default App;
