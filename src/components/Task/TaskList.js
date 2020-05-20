import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { fetchTasks,clearTask } from '../../actions/taskAction';
import _ from 'lodash';
import TaskItem from './TaskItem'
import PropTypes from 'prop-types';

const TaskList = (props) => {
  const [tasks, setTasks] = useState({});

  useEffect(() => {
    props.fetchTasks();
    setTasks(task.tasks);
    return () => {
      props.clearTask();
    }
  }, [props.clearTask,props.fetchTasks,props.task.loading]);


  const { task } = props;

  return (
    (props.loading || null==task || null == task.tasks)?
    <h4>Loading ...</h4>  :
    (!task.tasks)? <h4>No Tasks Yet</h4> :
    <div className="table-responsive portlet">
      <table className="table">
        <thead className="thead-light">
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Assignee</th>
            <th scope="col">Project</th>
            <th scope="col">Deadline</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {_.map(tasks, (value, key) => {
            return <TaskItem key={key} item={value} />;
          })}
        </tbody>
      </table>
    </div>
  );
};

TaskList.propTypes = {
  task: PropTypes.object.isRequired,
  fetchTasks: PropTypes.func.isRequired,
  clearTask: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  task: state.task
});

export default connect(mapStateToProps, { fetchTasks,clearTask })(TaskList);