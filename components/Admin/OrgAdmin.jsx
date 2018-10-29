// @flow

import { isEmpty, isEqual } from 'lodash';
import React, { Fragment } from 'react';
import { Button } from 'react-bootstrap';
import { connect } from 'react-redux';

import OrgForm from '../Org/OrgForm';
import PageHeader from '../Page/PageHeader';

import { updateOrg } from '../../actions';
import ActionTypes from '../../constants/ActionTypes';
import { Org } from '../../constants/types';

type Props = {
  requests: Object,
  org: Org,
  updateOrg: Function,
};

type State = {
  errors: Object,
  org: Org | {},
};

class OrgAdmin extends React.Component<Props, State> {
  state = {
    errors: {},
    org: this.props.org,
  };

  render() {
    const { org, requests } = this.props;
    const isLoading = isEmpty(org) || requests[ActionTypes.ORG_UPDATE];

    return (
      <Fragment>
        <PageHeader title="Org Settings">
          <Button
            bsStyle="primary"
            disabled={isLoading || isEqual(org, this.state.org)}
            onClick={this._handleSave}>
            Save Changes
          </Button>
        </PageHeader>
        <OrgForm
          {...this.state}
          onChange={this._handleChange}
        />
      </Fragment>
    );
  }

  _handleChange = (e) => {
    const { name, value } = e.target;

    this.setState((state: State, props: Props) => ({
      org: {
        ...state.org,
        [name]: value,
      },
    }));
  }

  _handleSave = (e) => {
    const { org } = this.state;

    // Basic client-side validation.
    const errors = OrgForm.validate(org);

    if (!isEmpty(errors)) {
      this.setState({ errors });
      return;
    }

    this.props.updateOrg(org);
  }
}

const mapStateToProps = ({ org, requests }) => ({
  org,
  requests,
});

const mapDispatchToProps = dispatch => ({
  updateOrg: org => dispatch(updateOrg(org)),
});

export default connect(mapStateToProps, mapDispatchToProps)(OrgAdmin);
