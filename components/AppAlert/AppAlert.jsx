// @flow

import cx from 'classnames';
import React from 'react';
import { Alert, Modal } from 'react-bootstrap';

import './AppAlert.scss';

type Props = {
  bsStyle: ?string,
  children: ?any,
  className: ?string,
  onHide: Function,
  show: bool,
};

const AppAlert = (props: Props) => {
  const { bsStyle, children, className, onHide, show } = props;
  return (
    <Modal
      backdrop={false}
      bsSize="small"
      className={cx('app-alert', className)}
      onHide={onHide}
      show={show}>
      <Alert bsStyle={bsStyle} onDismiss={onHide}>
        {children}
      </Alert>
    </Modal>
  );
};

export default AppAlert;
