// import { auth } from 'firebase';
import React, { useContext, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import FirebaseContext from '../../firebase/Context';
import { setAuthUserAsync, setTenantIdAsync, setRolesAsync} from './loginSlice';


const Login = (props) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [tenantId, setTenantId] = useState('');
    const [error, setError] = useState(null);
    const history = useHistory();
    const dispatch = useDispatch();
    const authUser = useSelector((store) => store.auth.authUser);

    // componentDidMount
    // useEffect(() => {
    //     if (authUser) {
    //         history.push('/myprofile')
    //     }
    // }, []);

    const firebase = useContext(FirebaseContext);

    const onSubmit = (e) => {
        e.preventDefault();

        firebase.doSignInWithEmailAndPassword(email, password, tenantId)
        .then((response)=>{
            console.log("Response ", response)
            firebase.user(response.user.uid)
            .once("value")
            .then(user=>{
                console.log("Users in User ", user.val());
                if(user.val() && user.val().tenants[tenantId]){
                    localStorage.setItem('tenantId', JSON.stringify({tenantId: tenantId}));
                    localStorage.setItem('authUser', JSON.stringify(response));

                    const userRoles = Object.keys(user.val().tenants[tenantId].roles)
              
                      console.log('USER ROLES', userRoles);
                    //To print COVET IT Users
                    firebase.clients(tenantId)
                        .once('value')
                        .then(client=>{
                            console.log(`Clients for ${tenantId} `, client.val())
                        })
                        .catch(err=>{
                            console.log(`Error in reading ${tenantId} clients `, err)
                        })


                    dispatch(setAuthUserAsync(JSON.parse(JSON.stringify(response))))
                    dispatch(setTenantIdAsync(tenantId));
                    dispatch(setRolesAsync(userRoles));
                    history.push('/myprofile')
                } else {
                    throw Error("The Login id, password or tenantid is not valid")
                }
                
            })
            .catch(error=>{
               setError(error)
            })
            
        })
        .catch(error=>{
            console.error('Login ', error)
            setError(error)
        })
    }


    return (
        <div className="login-container">
            <div className="bg-img"/>
            <div className="img-gradient"/>
            <div className="img-text">
            Services that you can bank upon.<br/>
            Performance Optimized       
            </div>
            <div className="login-content">
                <div className="content">

                    <div className="title">bugsy</div>
                    <form className="frm-login" onSubmit={onSubmit}>
                        <input 
                            placeholder="email"
                            name='email'
                            type='text'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            />
                        <input 
                            placeholder="password"
                            name='password'
                            type='password'
                            onChange={(e) => setPassword(e.target.value)}
                            />

                        <input 
                            placeholder="tenand id"
                            name='tenantId'
                            type='text'
                            onChange={(e) => setTenantId(e.target.value)}
                            />      
                        <button type="submit" className="btn-login" >Log In</button>
                        {error && <p>{error.message}</p>}
                    </form>
                </div>
                <footer className="footer">

                </footer>
            </div>
        </div>
    )
}

export default Login
