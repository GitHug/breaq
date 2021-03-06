import React from 'react';
import PropTypes from 'prop-types';
import { isEmpty } from 'lodash';

import EmployeeGrid from './EmployeeGrid';
import CompanyInfoBox from '../containers/CompanyInfoBoxContainer';
import EmployeeEditor from '../containers/EmployeeEditorContainer';
import CompanyEditor from '../containers/CompanyEditorContainer';

import '../styles/Company.css';

const employeesAsArray = employees =>
  isEmpty(employees)
    ? []
    : Object.entries(employees).reduce((a, [, employee]) => {
        a.push({
          ...employee
        });
        return a;
      }, []);

const Company = ({
  company,
  company: { id, name, address, employees, color },
  editCompany,
  addEmployee,
  editEmployee,
  editEmployeeId
}) => (
  <div className={'Company'}>
    <div className={'company'}>
      {editCompany ? (
        <CompanyEditor company={company} />
      ) : (
        <CompanyInfoBox
          companyId={id}
          title={name}
          address={address}
          color={color}
        />
      )}
    </div>
    <div className={'employees'}>
      <div>
        {addEmployee || editEmployee ? (
          <EmployeeEditor
            companyId={id}
            employeeId={editEmployeeId}
            color={color}
          />
        ) : (
          <div>
            <EmployeeGrid
              companyId={id}
              color={color}
              employees={employeesAsArray(employees)}
            />
          </div>
        )}
      </div>
    </div>
  </div>
);

Company.propTypes = {
  company: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    address: PropTypes.shape({
      streetAddress: PropTypes.string,
      postalAddress: PropTypes.string,
      prefecture: PropTypes.string,
      country: PropTypes.string
    }).isRequired,
    location: PropTypes.shape({
      lat: PropTypes.number,
      lng: PropTypes.number
    }).isRequired
  }).isRequired,
  editCompany: PropTypes.bool,
  addEmployee: PropTypes.bool,
  editEmployee: PropTypes.bool,
  editEmployeeId: PropTypes.string
};

Company.defaultProps = {
  editCompany: false,
  addEmployee: false,
  editEmployee: false,
  editEmployeeId: ''
};

export default Company;
