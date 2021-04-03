import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createUser } from '../../Store/Actions/UserActions';
import LoadingBox from '../../Components/LoadingBox';
import MessageBox from '../../Components/MessageBox';
import { USER_CREATE_RESET } from '../../Constants/UserConstants';

export default function UserCreate(props) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('user');

const userCreate = useSelector((state) => state.userCreate);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
  } = userCreate;

  const dispatch = useDispatch();
  useEffect(() => {
    //console.log(successUpdate);
    if (successCreate) {
      dispatch({ type: USER_CREATE_RESET });
      props.history.push('/userlist');
    }
  }, [createUser, dispatch, props.history, successCreate]);

  const submitHandler = (e) => {
    e.preventDefault();
    if(password !== confirmPassword){
            alert('Password and confirm password are not match')
        } else{
            dispatch(createUser(name, email, password, role));
        }
  };

  return (
    <div>
      <form className="form" onSubmit={submitHandler}>
        <div>
          <h1>Create User</h1>
          {loadingCreate && <LoadingBox></LoadingBox>}
          {errorCreate && <MessageBox variant="danger">{errorCreate}</MessageBox>}
        </div>
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
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                placeholder="Enter email"
                required
                onChange={(e) => setEmail(e.target.value)}
              ></input>
            </div>
            <div>
                <label htmlFor='password'>Password</label>
                <input 
                type='password'
                id='password'
                placeholder='Enter Password'
                required
                onChange={ (e) => setPassword(e.target.value)}
                />
                </div>
                <div>
                <label htmlFor='confirmPassword'>Confirm Password</label>
                <input 
                type='password'
                id='confirmPassword'
                placeholder='Re-type Password'
                required
                onChange={ (e) => setConfirmPassword(e.target.value)}
                />
                </div>
            <div>
              <label htmlFor="role">Role</label>
              <select
                name='role'
                id="role"
                onChange={(e) => setRole(e.target.value)}
              > 
                <option value='user'>User</option>  
                <option value='admin'>Admin</option>  
                <option value='super admin'>Super Admin</option>
              </select>
            </div>
            <div>
              <button type="submit">
                Create User
              </button>
            </div>
      </form>
    </div>
  );
}