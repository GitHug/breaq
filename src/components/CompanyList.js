import React from 'react';
import PropTypes from 'prop-types';
import Company from '../containers/CompanyContainer';

import '../styles/CompanyList.css';

const CompanyList = ({ companies }) => (
  <div className={'CompanyList'}>
    {Object.entries(companies)
      .reduce((a, [id, company]) => {
        if (id !== 'undefined') {
          a.push({
            id,
            ...company
          });
        }
        return a;
      }, [])
      .reverse()
      .map(company => <Company key={company.id} company={company} />)}
  </div>
);

CompanyList.propTypes = {
  companies: PropTypes.shape()
};

CompanyList.defaultProps = {
  companies: {}
};

export default CompanyList;
