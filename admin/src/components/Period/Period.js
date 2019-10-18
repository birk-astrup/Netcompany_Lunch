import React, {memo} from 'react';

import {PERIOD, CURRENCY, INCOME_THIS_MONTH, USERS_THIS_MONTH} from '../../constants/constants';
import ExcelExport from '../ExcelExport/ExcelExport';
import './Period.scss'

export default memo(({amountOfUsers = 0, amountOfPayments = 0, period, data}) => {
  return (
    <>
      <div className="period-headline">
        <div>
          <h2 className="primary-title">{PERIOD}</h2>
          <h3 className="primary-subtitle">{period}</h3>
        </div>
        <ExcelExport data={data}/>
      </div>
      
      {/* Statistics */}
      <div className="period-box">
        {/* Inntekt */}
        <div>
          <h1 className="big-title">{amountOfPayments * 40} {CURRENCY}</h1>
          <p className="primary-subtitle">{INCOME_THIS_MONTH}</p>
        </div>

        <span className="period-divider"></span>

        {/* Brukere */}
        <div>
          <h1 className="big-title">{amountOfUsers}</h1>
          <p className="primary-subtitle">{USERS_THIS_MONTH}</p>
        </div>
      </div>
    </>
  )
});