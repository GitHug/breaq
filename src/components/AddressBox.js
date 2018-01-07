import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import './AddressBox.css';

const AddressBox = ({ id, location, icon, onEdit, onDelete }) => {
  // Do not render if address does not exist
  if (_.isEmpty(location)) return null;

  let iconClass;

  switch (icon) {
    case 'BASE':
      iconClass = 'fa-home';
      break;
    case 'USER':
      iconClass = 'fa-user';
      break;
    default:
      iconClass = 'fa-home';
  }

  const name = location.name;
  const address = Object.entries(location.address).reduce((a, [k, v]) => {
    a[k] = v['longName'];
    return a;
  }, {});

  return (
    <div className={'Address'}>
      <div className={'wrapper'}>
        <div className={'side-wrapper'}>
          <div className={'side'}>
            <div className={'icon'}>
              <i className={`fas ${iconClass}`} aria-hidden={'true'} />
            </div>
            <div className={'controls'}>
              {onEdit && (
                <button onClick={() => onEdit(id)}>
                  <i className={'fas fa-edit'} />
                </button>
              )}

              {onDelete && (
                <button onClick={() => onDelete(id)}>
                  <i className={'fas fa-trash-alt'} />
                </button>
              )}
            </div>
          </div>
        </div>
        <div className={'content'}>
          <div className={'container'}>
            <h1>{name}</h1>
            <p>
              {address['street_number']} {address['route']}
            </p>
            <p>
              {address['postal_code']} {address['postal_town']}
            </p>
            <p>{address['administrative_area_level_1']}</p>
            <p>{address['country']}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

AddressBox.propTypes = {
  id: PropTypes.string.isRequired,
  location: PropTypes.object,
  icon: PropTypes.string,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func
};

export default AddressBox;