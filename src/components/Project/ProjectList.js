import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { fetchProjects,clearProject } from '../../actions/projectAction';
import _ from 'lodash';
import ProjectItem from './ProjectItem'
import PropTypes from 'prop-types';

const ProjectList = (props) => {
  const [projects, setProjects] = useState({});

  useEffect(() => {
    props.fetchProjects();
    setProjects(project.projects);
    return () => {
      props.clearProject();
    }
  }, [props.clearProject,props.fetchProjects,props.project.loading]);

  const { project } = props;

  return (
    (props.loading || null == project.projects)?
    <h4>Loading ...</h4>  :
    (!project.projects)? <h4>No Projects Yet</h4> :
    <div className="table-responsive portlet">
      <table className="table">
        <thead className="thead-light">
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Code</th>
            <th scope="col">Description</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {_.map(projects, (value, key) => {
            return <ProjectItem key={key} item={value} />;
          })}
        </tbody>
      </table>
    </div>
  );
};

ProjectList.propTypes = {
  project: PropTypes.object.isRequired,
  fetchProjects: PropTypes.func.isRequired,
  clearProject: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  project: state.project
});

export default connect(mapStateToProps, { fetchProjects,clearProject })(ProjectList);