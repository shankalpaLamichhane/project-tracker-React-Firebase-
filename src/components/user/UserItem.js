import React from 'react'
import {Link} from 'react-router-dom'
const UserItem = ({item}) => {
    
  return (
    <tr>
      <td>{item.displayName}</td>
      <td>{item.email}</td>
      <td>{item.lastSignInTime}</td>
      <td>
        <Link to={`users/${item.uid}/detail`} title="View">View </Link>
      </td>
    </tr>
    )
    }

export default (UserItem);
