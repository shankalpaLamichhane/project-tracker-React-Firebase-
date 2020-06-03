import React from 'react'
import {Link} from 'react-router-dom'
const ProjectItem = ({item}) => {
    
  return (
    <tr>
      <td>{item.name}</td>
      <td>{item.code}</td>
      <td>{item.description}</td>
      <td>
        <Link to={`projects/${item.id}/detail`} title="View">View </Link>
      </td>
    </tr>
    )
    }

export default (ProjectItem);
