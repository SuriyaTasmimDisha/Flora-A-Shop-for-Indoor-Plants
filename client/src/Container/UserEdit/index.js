import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { detailsUser, updateUser } from '../../Store/Actions/UserActions';
import LoadingBox from '../../Components/LoadingBox';
import MessageBox from '../../Components/MessageBox';
import { USER_UPDATE_RESET } from '../../Constants/UserConstants';

export default function UserEditScreen(props) {
  const userId = props.match.params.id;
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const userUpdate = useSelector((state) => state.userUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = userUpdate;

  const dispatch = useDispatch();
  useEffect(() => {
    //console.log(successUpdate);
    if (successUpdate) {
      dispatch({ type: USER_UPDATE_RESET });
      props.history.push('/userlist');
    }
    if (!user) {
      dispatch(detailsUser(userId));
    } else {
      setName(user.name);
      setEmail(user.email);
      setRole(user.role);
    }
  }, [dispatch, successUpdate, props.history, user, userId]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(updateUser({ _id: userId, name, email, role }));
  };

  return (
    <div>
      <form className="form" onSubmit={submitHandler}>
        <div>
          <h1>Edit User: {name}</h1>
          {loadingUpdate && <LoadingBox></LoadingBox>}
          {errorUpdate && (
            <MessageBox variant="danger">{errorUpdate}</MessageBox>
          )}
        </div>
        {loading ? (
          <LoadingBox />
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
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></input>
            </div>
            <div>
              <label htmlFor="role">Role</label>
              {(userInfo._id === userId) ? (
                <select disabled>
                  <option value={userInfo.role}>{userInfo.role}</option>
                </select>
              ) : (
                <select
                name='role'
                id="role"
                onChange={(e) => setRole(e.target.value)}
              > 
                <option value='user'>User</option>  
                <option value='admin'>Admin</option>  
                <option value='super admin'>Super Admin</option>
              </select>
              )}
              
            </div>
            <div>
              <button type="submit" className="primary">
                Update
              </button>
            </div>
          </>
        )}
      </form>
    </div>
  );
}