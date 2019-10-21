import React from 'react';
import ReactExport from 'react-data-export';
import { EXPORT } from '../../constants/constants';

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

// Reformats user array to fit excel format
export default ({data}) => {
  const arr = []
  for (let {nickname, id, email, registered} of data) {
    for (let timestamps of registered) {
      let temp = {
        nickname,
        id,
        email, 
        timestamp: timestamps.timestamp
      };

      arr.push(temp);
    }
  }

  return arr.length > 0 && (
    <ExcelFile element={<div className="period-headline-button">{EXPORT}</div>}>
        <ExcelSheet data={arr} name="Timestamps">
          <ExcelColumn label="Nickname" value="nickname"/>
          <ExcelColumn label="Auth0 Id" value="id"/>
          <ExcelColumn label="Email" value="email"/>
          <ExcelColumn label="Lunch Date" value="timestamp"/>
      </ExcelSheet>
    </ExcelFile>
  )
}
