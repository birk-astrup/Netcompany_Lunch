import React, {memo, lazy, Suspense} from 'react';

import {PERIOD, CURRENCY, INCOME_THIS_MONTH, USERS_THIS_MONTH} from '../../constants/constants';
import './Period.scss'

const ExcelExport = lazy(() => import('../ExcelExport/ExcelExport'));

export default memo(({amountOfUsers = 0, amountOfPayments = 0, period, data}) => {
  return (
    <>
      <div className="period-headline">
        <div>
          <h2 className="primary-title">{PERIOD}</h2>
          <h3 className="primary-subtitle">{period}</h3>
        </div>
        <Suspense fallback={<p>Loading Excel button</p>}>
          <ExcelExport data={data}/>
        </Suspense>
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