import React, {useState, useEffect} from 'react';
import {useLazyQuery} from '@apollo/react-hooks';

import Dialog from './components/Dialog/Dialog';
import Header from './components/Header/Header';
import Period from './components/Period/Period';
import Container from './components/Container/Container';
import Purchases from './components/Purchases/Purchases';
import MonthPicker from './components/MonthPicker/MonthPicker';

import GET_USERS from './queries/getUsers';
import {calculateResultForMonth, calculatePeriodForMonth} from './utils/calculations';
import {useAuth0} from './utils/react-auth0-spa.js';

import './style/main.scss';

function App() {
  const auth = useAuth0();

  const [userData, setUser] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [period, setPeriod] = useState('');
  const [month, setMonth] = useState('January');
  const [information, setInformation] = useState()

  // getUsers query
  const [getUsers, {data, loading, called}] = useLazyQuery(GET_USERS)

  const openUserDialog = (user) => {
    setIsOpen(!isOpen);
    setUser(user);
  }

  // Gets users on entry 
  useEffect(() => {
    !loading && !called && getUsers()
  }, [called, getUsers, loading]);

  // Opens login popup for user when not authenticated
  useEffect(() => {
    if (auth.loading || auth.isAuthenticated) return;
    const fn = async () => await auth.loginWithRedirect({appState: {targetUrl: '/'}});
    fn();
  }, [loading, auth]);

  // Sorting users when data is recieved
  useEffect(() => {
    if (!loading && called && data) {
      let sortedUserByMonth = calculateResultForMonth(data, month);
      setInformation(sortedUserByMonth);
    }

    if (!loading && called) {
      const timePeriodByMonth = calculatePeriodForMonth(month)
      setPeriod(timePeriodByMonth);
    }
  }, [called, data, loading, month]);


  // TODO add in loading animation
  if (auth.loading) return <div>Loading...</div>

  // Returns interface if users exists
  return (
    <div className="App">
      <Header/>
      {information.users && information.users.length > 0 && 
        <Container>
          <Period amountOfPayments={information.payments} amountOfUsers={information.users.length} period={period} data={information.users} />
          <MonthPicker monthPicked={m => setMonth(m)} />
          <Purchases openUserDialog={openUserDialog} info={information}/> 
        </Container>
      }

      {isOpen && <Dialog setIsOpen={setIsOpen} user={userData}/>}
    </div>
  );
}

export default App;
