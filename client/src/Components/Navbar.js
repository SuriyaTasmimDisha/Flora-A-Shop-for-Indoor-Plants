import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../Store/Actions/UserActions';
import { 
  AppBar, 
  Toolbar, 
  IconButton, 
  Typography,
  Menu,
  MenuItem,
  useMediaQuery,
  Select,
  InputLabel,
  FormControl,
  MenuList,
  ClickAwayListener,
  List,
  ListItem,
  ListItemText
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { makeStyles, useTheme } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 2
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
  title: {
    flexGrow: 1,
    fontWeight: '800'
  },
  navOption: {
    display: 'flex',
    flex: 1,
  },
  appbar:{
    fontWeight: '800'
  }, 
  appbarWrapper: {
     width: '80%',
     margin: '0 auto',
     paddingTop: '4rem',
     paddingBottom: '2rem'
   },
    formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    
  }
}));

export default function Navbar() {
    const cart = useSelector(state => state.cart);
    const { cartItems } = cart;  
    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin; 
    const dispatch = useDispatch();
    const logoutHandler = () => {
        dispatch(logout());
    }

  const classes = useStyles();
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState(null);
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  // const open = Boolean(anchorEl);

  // const handleMenu = (event) => {
  //   setAnchorEl(event.currentTarget);
  // };

  const handleClickListItem = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuItemClick = () => {
    setAnchorEl(null);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
  <div className={classes.root}>
    <AppBar className={classes.appbar} position="static" color='white' elevation={0}>
      <Toolbar  className={classes.appbarWrapper}>
        <img src='/images/logo.png' alt='logo' />
        <Typography
          component={Link}
          to='/'
          variant="h4" 
          className={classes.title} 
          onClick={handleClose}
          >
          FLORA
        </Typography>
      <>
        { isMobile ? (
        <>
        <IconButton 
          edge="start" 
          className={classes.menuButton} 
          color="inherit"
          //onClick={handleMenu}
          aria-label="menu">
          <MenuIcon />
        </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              //open={open}
              onClose={handleClose}
            >
              <MenuItem 
              component={Link}
              to='/catalogue'
              onClick={handleClose}
              >
                Catalogue
              </MenuItem>
              <MenuItem 
                component={Link}
                to='/cart'
                onClick={handleClose}
              >Cart {
                  cartItems.length > 0 && (
                      <span className='badge'>{cartItems.length}</span>
                  )
              }
              </MenuItem>
              {!userInfo && 
              <MenuItem
                component={Link}
                to='/register'
                onClick={handleClose}
              >
                Register
              </MenuItem>
              }
              <MenuItem onClick={handleClose}>
                {userInfo ? (
                <FormControl variant='outlined' color='primary' className={classes.formControl}>
                  <InputLabel>{userInfo.name}</InputLabel>
                  <Select>
                  <Link to='#'>
                      {userInfo.name} 
                  </Link>
                  <ul className='dropdown-content'>
                  <Link to='/profile'>
                      Profile
                  </Link>    
                  <Link to='/orderhistory'>
                      Order History
                  </Link>
                    <Link to='#logout' onClick={logoutHandler}>
                        Logout
                    </Link>
                  </ul>
                  </Select>
                </FormControl>  
              ) : (
                  <Link to="/login">Login</Link>
              )}
              </MenuItem>
              {userInfo && (userInfo.role === 'super admin') && (
              <MenuItem>  
              {/* onClick={handleMenu}  */}
              <div className="dropdown">
              <Link to="#admin">
                Super Admin <i className="fa fa-caret-down"></i>
              </Link>
              <ul className="dropdown-content">
                {/* <li>
                  <Link to="/dashboard">Dashboard</Link>
                </li> */}
                <li>
                  <Link to="/productlist">Products</Link>
                </li>
                <li>
                  <Link to="/orderlist">Orders</Link>
                </li>
                <li>
                  <Link to="/userlist">Users</Link>
                </li>
              </ul>
            </div>
            </MenuItem>
          )}
            </Menu>
          </>
        ) : (
          <>
            <Typography
              component={Link}
              to='/catalogue'
              variant='h6'
            >
              Catalogue
            </Typography>
              <Typography 
              component={Link}
              to="/cart"
              variant='h6'>
                Cart
              {
                  cartItems.length > 0 && (
                      <span className='badge'>{cartItems.length}</span>
                  )
              }
              </Typography>
              {!userInfo && 
                  <Typography
                    component={Link}
                    to="/register"
                    variant='h6'
                  >
                    Register
                  </Typography>
              }
                {userInfo ? (
                  <>
                      <List component="nav">
                      <ListItem
                        button
                        aria-haspopup="true"
                        aria-controls="lock-menu"
                        aria-label={userInfo.name}
                        onClick={handleClickListItem}
                      >
                        <ListItemText primary={userInfo.name} variant='h6'/>
                        <i className='fa fa-caret-down'></i>
                    <Menu
                      id="lock-menu"
                      anchorEl={anchorEl}
                      keepMounted
                      open={Boolean(anchorEl)}
                      onClose={handleClose}  
                    > 
                      <MenuItem 
                        component={ Link }
                        to='/profile'
                        variant='h6'
                        onClick={handleMenuItemClick}
                      >
                        Profile
                      </MenuItem>   
                      <MenuItem 
                        component={ Link }
                        to='/orderhistory'
                        variant='h6'
                      >
                        Order History
                      </MenuItem>   
                      <MenuItem 
                        component={ Link }
                        to='#logout'
                        variant='h6'
                        onClick={logoutHandler}
                      >
                        Logout
                      </MenuItem>   
                    </Menu> 
                    </ListItem>
                    </List>           
                  </>
              ) : (
                    <Typography 
                      component={Link}
                      to="/login"
                      variant='h6'
                    >
                      Login
                    </Typography>
              )}
              {userInfo && (userInfo.role === 'super admin') && (
              <>
              <List component="nav">
                  <ListItem
                    button
                    aria-haspopup="true"
                    aria-controls="lock-menu"
                    aria-label='Super Admin' 
                    onClick={handleClickListItem}
                  >
                    <ListItemText primary='Super Admin' variant='h6'/>
                    <i className='fa fa-caret-down'></i>
                    <Menu
                      id="lock-menu"
                      anchorEl={anchorEl}
                      keepMounted
                      open={Boolean(anchorEl)}
                      onClose={handleClose}  
                    > 
                      <MenuItem 
                        component={ Link }
                        to='/productlist'
                        variant='h6'
                        onClick={handleMenuItemClick}
                      >
                        Products
                      </MenuItem>   
                      <MenuItem 
                        component={ Link }
                        to='/orderlist'
                        variant='h6'
                      >
                        Orders
                      </MenuItem>   
                      <MenuItem 
                        component={ Link }
                        to='/userlist'
                        variant='h6'
                        onClick={logoutHandler}
                      >
                        Users
                      </MenuItem>
                    </Menu> 
                    </ListItem>
                    </List>   
            {/* //   <Link to="#admin">
            //     <Typography variant='h6'>Super Admin 
            //     <i className="fa fa-caret-down"></i>
            //     </Typography>
            //   </Link>
            //   <ul className="dropdown-content">
            //     <li>
            //       <Link to="/productlist">
            //         <Typography variant='h6'>Products</Typography>
            //       </Link>
            //     </li>
            //     <li>
            //       <Link to="/orderlist">
            //         <Typography variant='h6'>Orders</Typography>
            //       </Link>
            //     </li>
            //     <li>
            //       <Link to="/userlist">
            //         <Typography variant='h6'>Users</Typography>
            //       </Link>
            //     </li>
            //   </ul>
            // </div>
            // )} */}
        </>
        )}
              {/* {userInfo && (userInfo.role === 'admin') && (
              <>
              <List component="nav">
                  <ListItem
                    button
                    aria-haspopup="true"
                    aria-controls="lock-menu"
                    aria-label='Admin' 
                    onClick={handleClickListItem}
                  >
                    <ListItemText primary='Admin' variant='h6'/>
                    <i className='fa fa-caret-down'></i>
                    <Menu
                      id="lock-menu"
                      anchorEl={anchorEl}
                      keepMounted
                      open={Boolean(anchorEl)}
                      onClose={handleClose}  
                    > 
                      <MenuItem 
                        component={ Link }
                        to='/orderlist'
                        variant='h6'
                      >
                        Orders
                      </MenuItem>   
                    </Menu> 
                    </ListItem>
                    </List>  
        </>
        )} */}
      </>  
      )
      }    
      </>
      </Toolbar>
    </AppBar>
  </div>
  )
}
