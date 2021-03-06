import { firebaseConnect } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { compose } from 'redux';

import deepGet from '../helpers';
import CompanyList from '../components/CompanyList';

export default compose(
  firebaseConnect((props, store) => {
    const { auth } = store.getState().firebase;

    return auth ? [`users/${auth.uid}/companies/`] : [];
  }),
  connect(({ firebase: { data, auth } }) => ({
    companies: deepGet(data, ['users', auth.uid, 'companies'], {})
  }))
)(CompanyList);
