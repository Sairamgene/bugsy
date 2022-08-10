import React, { useContext, useEffect, useState } from 'react';
import { Switch, Route, NavLink, useHistory} from 'react-router-dom';
// Components
import Login from '../login/Login';
import Admin from '../admin/Admin';
import MyProfile from '../myprofile/MyProfile';
import Reports from '../reports/Reports';
import PageNotFound from '../pageNotFound/PageNotFound';

import './App.css';
import FirebaseContext from '../../firebase/Context';
import { useDispatch, useSelector } from 'react-redux';
import ProtectedRoute from '../protectedRoute/ProtectedRoute';
import { setAuthUserAsync, setCount, setTenantIdAsync, setRolesAsync } from '../login/loginSlice.js';

const Navigation = () => {


  const firebase = useContext(FirebaseContext);
  const history = useHistory();
  const count = useSelector((store) => store.auth.count);
  const userRoles = useSelector((store) => store.auth.roles);
  const dispatch = useDispatch();


  // console.log(userRoles);
  return <div style={
    { 
      margin: 0, 
      padding: '10px',
      display: 'flex', 
      listStyle: 'none', 
      height: '60px',
      background: 'lightgrey',
      textDecoration: 'none'
    }}>
        <div style={{alignSelf: 'center', padding: '10px'}}>
          <NavLink hidden={!['USER'].every(role => userRoles.includes(role))} activeStyle={{borderBottom: '3px solid #36BFEC', color: '#36BFEC'}} to="/myprofile">My Profile</NavLink></div>
        <div style={{alignSelf: 'center', padding: '10px'}}>
          <NavLink hidden={!['ADMIN'].every(role => userRoles.includes(role))} activeStyle={{borderBottom: '3px solid #36BFEC', color: '#36BFEC'}} to="/admin">Admin</NavLink></div>
        <div style={{alignSelf: 'center', padding: '10px'}}>
          <NavLink hidden={!['ADMIN'].every(role => userRoles.includes(role))} activeStyle={{borderBottom: '3px solid #36BFEC', color: '#36BFEC'}} to="/reports">Reports</NavLink></div>
        <div style={{alignSelf: 'center'}}><button onClick={() => 
        {
          firebase.doSignOut();
          dispatch(setAuthUserAsync(null))
          dispatch(setTenantIdAsync(""))
          history.push('/login')
        }
        }>LOGOUT</button></div>
        <div style={{alignSelf: 'center'}} onClick={() => dispatch(setCount(count + 1))}>Action to Store</div>
      </div>
}

function App() {

  const dispatch = useDispatch();
  const firebase = useContext(FirebaseContext);
  const history = useHistory();

  const [authUser, setAuthUser]= useState(localStorage.getItem('authUser'));
  const [tenantId, settenantid]= useState(localStorage.getItem('tenantId'));

  const [isUserSet, setIsUser] = useState(false);
  
  if (tenantId && authUser) {

    const parsedTenantId = JSON.parse(tenantId).tenantId;
    const parsedAuthUser = JSON.parse(authUser);

    firebase.user(JSON.parse(authUser).user.uid)
    .once("value")
    .then(user => {
      console.log('Users in User APP.js', user.val());
      if(user.val() && user.val().tenants[parsedTenantId]){

        // const userRoles = user.val().tenants.filter(tenant => {
        //   return tenant.tenantId === parsedTenantId
        // }).map(tenant => {
        //   return tenant.roles;
        // });
        const userRoles = Object.keys(user.val().tenants[parsedTenantId].roles)

        console.log('USER ROLES', userRoles);

        dispatch(setTenantIdAsync(parsedTenantId));
        dispatch(setAuthUserAsync(parsedAuthUser));
        dispatch(setRolesAsync(userRoles));
        setIsUser(true);

      } else {
        console.error("The Login id, password or tenantid is not valid");
        history.push('/login');
        setIsUser(true);
      }
    })
  } else {
    history.push('/login')
    return <>
    <Navigation/>
      <Switch>
        <ProtectedRoute path="/myprofile" roles={['USER']} component={MyProfile}/>
        <ProtectedRoute path="/admin"   roles={['ADMIN']}  component={Admin}/>
        <ProtectedRoute path="/reports"  roles={['ADMIN']}  component={Reports}/>
        <Route path={['/login', '/']} exact component={Login}/>   
        <Route path="*" component={PageNotFound}/>
      </Switch>
    </>
  }

  if (!isUserSet) {
    return <div>LOADING!...</div>
  } 

  return <>
  <Navigation/>
    <Switch>
      <ProtectedRoute path="/myprofile" roles={['USER']} component={MyProfile}/>
      <ProtectedRoute path="/admin" roles={['ADMIN']}  component={Admin}/>
      <ProtectedRoute path="/reports" roles={['ADMIN']}  component={Reports}/>
      
      <Route path={['/login', '/']} exact component={Login}/>   
      <Route path="*" component={PageNotFound}/>
    </Switch>
  </>
}

export default App;
