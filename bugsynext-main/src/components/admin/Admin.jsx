import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink, Redirect, Route, Switch } from 'react-router-dom';
import EmployeeProfile from '../employees/employeeProfile/EmployeeProfile';

import Employees from '../employees/Employees';

function Admin() {

    const authUser = useSelector((store) => { return store.auth.authUser});

    console.log('ADMINPAGE', authUser)

    return (
        <>
            <div>ADMIN COMPONENT</div>
            <div style={{display: 'flex'}}>
            <div style={{padding: '10px'}}><NavLink to="/admin/approvals" activeStyle={{borderBottom: '3px solid #36BFEC', color: '#36BFEC'}}>Approvals</NavLink></div>
                <div style={{padding: '10px'}}><NavLink to="/admin/employees" activeStyle={{borderBottom: '3px solid #36BFEC', color: '#36BFEC'}}>Employees</NavLink></div>
                <div style={{padding: '10px'}}><NavLink to="/admin/clients" activeStyle={{borderBottom: '3px solid #36BFEC', color: '#36BFEC'}}>Clients</NavLink></div>
                <div style={{padding: '10px'}}><NavLink to="/admin/immigration" activeStyle={{borderBottom: '3px solid #36BFEC', color: '#36BFEC'}}>Immigration</NavLink></div>
            </div>

            <Switch>
                <Redirect from="/admin" to="/admin/employees" exact />

                <Route path="/admin/employees/:employeeid" component={EmployeeProfile}/>
                <Route path="/admin/employees" component={Employees}/>
                
                <Route path="/admin/approvals" />
                <Route path="/admin/clients" />
                <Route path="/admin/immigration" />
            </Switch>

        </>
    )
}

export default Admin
