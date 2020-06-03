import React from 'react'
import {Link} from 'react-router-dom'
const TaskItem = ({item}) => {
    
  return (
    <tr>
      <td>{item.name}</td>
      <td>{item.assignee}</td>
      <td>{item.project}</td>
      <td>{item.deadline}</td>
      <td>
        <Link to={`tasks/${item.id}/detail`} title="View">View </Link>
      </td>
    </tr>
    )
    }

export default (TaskItem);
