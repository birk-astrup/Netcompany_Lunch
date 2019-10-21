import React from 'react';

import './Purchases.scss';
import {AMOUNT_OF_PURCHASES, NO_LUNCH} from '../../constants/constants';

export default ({info, openUserDialog}) => (
  <>
    <h2 className="primary-title">{AMOUNT_OF_PURCHASES} ({info.payments})</h2>
    <div>
      {info.users.length < 1 ? 
      
      <h1 className="no-lunch">{NO_LUNCH}</h1>
      : (info.users.map(user => (
        <div key={user.id} className="purchases-table-box" onClick={() => openUserDialog(user)}>
          <p className="primary-subtitle primary-subtitle--white">{user.nickname}</p>
          <p className="primary-subtitle primary-subtitle--white">{user.email}</p>
          <p className="primary-subtitle primary-subtitle--bold">{user.registered.length}</p>
        </div>)
      ))}
    </div>
  </>
)