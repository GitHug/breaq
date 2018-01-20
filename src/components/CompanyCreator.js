import React, { Component } from 'react';
import PropTypes from 'prop-types';

import SearchBox from './SearchBox';
import InfoBox, { icons } from './InfoBox';

import '../styles/CompanyCreator.css';

/* eslint-disable camelcase */
class CompanyCreator extends Component {
  constructor(props) {
    super(props);

    const { company, companyId } = props;

    if (company && companyId) {
      this.state = {
        company
      };
    } else {
      this.state = {
        company: {
          name: ''
        }
      };
    }
  }

  render() {
    const { placeholders, firebase, auth, endAddCompany } = this.props;

    const { company } = this.state;

    const createCompany = () => {
      firebase
        .push(`/users/${auth.uid}/companies/`, {
          ...company
        })
        .then(() => {
          this.setState({
            company: {
              name: ''
            }
          });
        })
        .then(endAddCompany);
    };

    const updateCompany = () => {
      firebase
        .ref(`/users/${auth.uid}/companies/${company.companyId}`)
        .update(`/users/${auth.uid}/companies/`, {
          ...company
        })
        .then(() => {
          this.setState({
            company: {
              name: ''
            }
          });
        });
    };

    return (
      <div className={'CompanyCreator'}>
        <input
          type={'text'}
          className={'form-input'}
          placeholder={placeholders.name}
          value={this.state.company.name}
          onChange={e =>
            this.setState({
              company: {
                ...company,
                name: e.target.value
              }
            })
          }
        />

        <SearchBox
          placeholder={placeholders.address}
          onChangePlace={(
            {
              street_number = { longName: '' },
              route = { longName: '' },
              postal_code = { longName: '' },
              postal_town = { longName: '' },
              administrative_area_level_1 = { longName: '' },
              country = { longName: '' }
            },
            geometry = { location: {} }
          ) => {
            this.setState({
              company: {
                ...company,
                address: {
                  streetAddress: `${street_number.longName} ${route.longName}`,
                  postalAddress: `${postal_code.longName} ${
                    postal_town.longName
                  }`,
                  prefecture: administrative_area_level_1.longName,
                  country: country.longName
                },
                location: {
                  lat: geometry.location ? geometry.location.lat() : {},
                  lng: geometry.location ? geometry.location.lng() : {}
                }
              }
            });
          }}
        />

        {(company.name || company.address) && (
          <InfoBox
            title={company.name}
            id={'temp'}
            icon={icons.company}
            address={company.address}
          />
        )}

        <div className={'buttons'}>
          <button onClick={endAddCompany}>Cancel</button>
          {company.companyId ? (
            <button className={'update'} onClick={updateCompany}>
              Update
            </button>
          ) : (
            <button className={'add'} onClick={createCompany}>
              Save
            </button>
          )}
        </div>
      </div>
    );
  }
}

CompanyCreator.propTypes = {
  company: PropTypes.shape({
    name: PropTypes.string,
    project: PropTypes.string,
    address: PropTypes.shape({
      streetAddress: PropTypes.string,
      postalAddress: PropTypes.string,
      prefecture: PropTypes.string,
      country: PropTypes.string
    })
  }),
  companyId: PropTypes.string,
  placeholders: PropTypes.shape({
    name: PropTypes.string,
    address: PropTypes.string
  }),
  firebase: PropTypes.shape().isRequired,
  auth: PropTypes.shape().isRequired,
  endAddCompany: PropTypes.func.isRequired
};

CompanyCreator.defaultProps = {
  company: undefined,
  companyId: undefined,
  placeholders: {
    name: 'Name',
    address: 'Address'
  }
};

export default CompanyCreator;
