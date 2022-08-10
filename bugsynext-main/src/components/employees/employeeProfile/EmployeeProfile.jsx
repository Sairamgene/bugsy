import React from 'react'
import { NavLink, Switch, Route, Redirect, useRouteMatch, useParams} from 'react-router-dom';
import EmployeeDetails from './EmployeeDetails';

function EmployeeProfile() {

    const match = useRouteMatch()
    const params = useParams();

    return (<>
            <div>Employee Profile for {params.employeeid} </div>
            <div style={{display: 'flex'}}>
            <div style={{padding: '10px'}}><NavLink to={`${match.url}/details`} activeStyle={{borderBottom: '3px solid #36BFEC', color: '#36BFEC'}}>Employee Details</NavLink></div>
                <div style={{padding: '10px'}}><NavLink to={`${match.url}/compensation`} activeStyle={{borderBottom: '3px solid #36BFEC', color: '#36BFEC'}}>Employee Compensation</NavLink></div>
                <div style={{padding: '10px'}}><NavLink to={`${match.url}/projects`} activeStyle={{borderBottom: '3px solid #36BFEC', color: '#36BFEC'}}>Employee Project</NavLink></div>
                <div style={{padding: '10px'}}><NavLink to={`${match.url}/immigration`} activeStyle={{borderBottom: '3px solid #36BFEC', color: '#36BFEC'}}>Employee Immigration</NavLink></div>
                <div style={{padding: '10px'}}><NavLink to={`${match.url}/documents`} activeStyle={{borderBottom: '3px solid #36BFEC', color: '#36BFEC'}}>Employee Documents</NavLink></div>
            </div>


            <Switch>
                <Redirect from={`${match.path}`} to={`${match.path}/details`} exact />
                <Route path={`${match.path}/details`} component={EmployeeDetails}/>
                <Route path={`${match.path}/compensation`} component={() => <div>Employee Compensation</div>}/>
                <Route path={`${match.path}/projects`} component={() => <div>Employee Projects</div>}/>
                <Route path={`${match.path}/immigration`} component={() => <div>Employee Immigration</div>}/>
                <Route path={`${match.path}/documents`} component={() => <div>Employee Documents</div>}/>

            </Switch>

    </>
    )
}

export default EmployeeProfile
