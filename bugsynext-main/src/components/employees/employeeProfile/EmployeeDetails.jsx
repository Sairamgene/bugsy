import React from 'react'
import { useHistory } from 'react-router-dom'

function EmployeeDetails() {

    const history = useHistory();

    return (<>
        <div>Details!</div>
        <div><button onClick={() => history.push('/admin/employees')}>GO BACK</button></div>
    </>
    )
}

export default EmployeeDetails
