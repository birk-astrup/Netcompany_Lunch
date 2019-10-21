import {MONTH_NAMES} from '../constants/constants';

export const calculateResultForMonth = (arr, month) => {
  const userArray = [];
  let payments = 0;
  
  for (let m in MONTH_NAMES) {
    if (MONTH_NAMES[m] === month) {
      // Loop through users
      for(let user of arr.getUsers.user) {
        const tempUser = {
          id: user._id,
          nickname: user.nickname,
          email: user.email,
          registered: []
        }

        for (let stamp of user.registered) {
          const date = new Date(stamp.timestamp);
          if (date.getMonth() === parseInt(m)) { 
            tempUser.registered.push(stamp);
            payments++;
          }
        }

        tempUser.registered.length > 0 && userArray.push(tempUser);
      }
    }
  }

  console.log(userArray);

  return {
    payments,
    users: userArray
  };
}

export const calculatePeriodForMonth = (month) => {
  for (let m in MONTH_NAMES) {
    if (MONTH_NAMES[m] === month) {
      const today = new Date()
      const thisYear = today.getFullYear()
      const monthLength = new Date(thisYear, m, 0).getDate()

      return `1.${parseInt(m) + 1}.${thisYear} - ${monthLength}.${parseInt(m) + 1}.${thisYear}`
    }
  }
}