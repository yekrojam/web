// @flow

import React from 'react';
import { Label, Media, Panel } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import MemberImage from './MemberImage';

import { getUserName, isAdmin } from '../../utils/userUtils';
import { Member } from '../../constants/types';

type Props = {
  user: Member,
};

const MemberCard = (props: Props) => {
  const { user } = props;

  const details = [
    { data: user.email, label: 'Email' },
    { data: user.phone, label: 'Phone' },
  ];

  return (
    <Panel className="user-card">
      <Panel.Body>
        <Media>
          <Media.Left>
            <MemberImage user={user} />
          </Media.Left>
          <Media.Body>
            <Media.Heading>
              <Link to={{ pathname: `/users/${user.id}` }}>
                {getUserName(user)}
              </Link>
              {' '}
              {isAdmin(user) && <Label>Admin</Label>}
            </Media.Heading>
            <ul style={{ listStyle: 'none', paddingLeft: '0' }}>
              {details.map(({ data, label }) => (
                data ?
                  <li key={data}>
                    <strong> {label}:</strong> {data}
                  </li> :
                  null
              ))}
            </ul>
          </Media.Body>
        </Media>
      </Panel.Body>
    </Panel>
  );
};

export default MemberCard;
