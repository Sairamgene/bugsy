import React, { useState } from 'react'
import { Switch, useRouteMatch, Route, NavLink, useHistory} from 'react-router-dom';
import EmployeeProfile from './employeeProfile/EmployeeProfile';

function Employees() {

    const [employeeData, setEmployeeData] = useState([{id: 1, name: 'Rakesh'},{id: 2, name: 'JR'},{id: 3, name: 'Ravi'}]);
    const match = useRouteMatch()
    const history = useHistory();

    return (<>

        <div>EMPLOYEES COMPONENT!</div>

        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>NAME</th>
                </tr>
            </thead>
            <tbody>
               {employeeData.map(employee => {
                   return (
                    
                        <tr key={employee.id} onClick={() => history.push(`${match.url}/${employee.id}`)}>
                            <th>{employee.id}</th>
                            <th>{employee.name}</th>
                        </tr>
                   )
               })}
            </tbody>
        </table>
    
    
    </>)
}

export default Employees
