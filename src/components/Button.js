import React from 'react';
import PropTypes from 'prop-types';

import '../styles/Button.css';

const Button = ({ onClick, children }) => (
  <button className={'Button'} onClick={onClick}>
    {children}
  </button>
);

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired
};

export default Button;
