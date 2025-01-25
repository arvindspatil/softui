import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import './dashboard.css';
import MyNavBar from './components/MyNavBar';
import LeftTopNav from './components/LeftTopNav';
import Home from './components/Home';
// import Transactions from './components/transactions/Transactions';
import CheckingTransactions from './components/transactions/CheckingTransactions';
import HomeChecking from './components/HomeChecking';
import Accounts from './components/accounts/Accounts';
import HomeSavings from './components/HomeSavings';
import HomeCredit from './components/HomeCredit';
import HomeInvestments from './components/HomeInvestments';
import HomeLoans from './components/HomeLoans';
import Securities from './components/securities/Securities';
import SavingsTransactions from './components/transactions/SavingsTransactions';
import CreditTransactions from './components/transactions/credit/CreditTransactions';
import InvestmentTransactions from './components/transactions/investment/InvestmentTransactions';
import LoanTransactions from './components/transactions/loan/LoanTransactions';
import CreditUploadTransactions from './components/transactions/credit/CreditUploadTransactions';
import SavingsUploadTransactions from './components/transactions/savings/SavingsUploadTransactions';
import CheckingUploadTransactions from './components/transactions/checking/CheckingUploadTransactions';
import AccountRecons from './components/reconcile/AccountRecons';
import CheckingBalance from './components/accounts/checking/CheckingBalance';
import SavingBalance from './components/accounts/saving/SavingBalance';
import CreditBalance from './components/accounts/credit/CreditBalance';
import LoanBalance from './components/accounts/loan/LoanBalance';
import InvestmentBalance from './components/accounts/investment/InvestmentBalance';
import InvestmentPositions from './components/transactions/investment/InvestmentPositions';
import BillSchedules from './components/bills/BillSchedules';
import Bills from './components/bills/Bills';
import BillSync from './components/bills/BillSync';
import OtherTransactions from './components/transactions/other/OtherTransactions';
import UpdateQuotes from './components/UpdateQuotes';
import CashFlow from './components/reports/monthly/CashFlow';
import CostTransactions from './components/transactions/investment/CostTransactions';
import QuotesUpload from './components/transactions/investment/QuotesUpload';
import ImageHome from './components/ImageHome';
import ImageBase from './components/ImageBase';
// import UploadTransactions from './components/reconcile/UploadTransactions';
// import CreditUploadTransactions from './components/reconcile/checking/CreditUploadTransactions';

function App() {
  const [checking] = useState('CHECKING')

  return (
    <>
      <Router>
      <MyNavBar />
      <LeftTopNav />
      <main role="main" class="col-md-9 ml-sm-auto col-lg-10 pt-3 px-4">
      <Switch>
        <Route exact path = "/" component = {Home}></Route>
        <Route exact path = "/home" component = {Home}></Route>
        <Route exact path = "/chart-checking-data" component = {HomeChecking}></Route>
        <Route exact path = "/chart-savings-data" component = {HomeSavings}></Route>
        <Route exact path = "/chart-credit-data" component = {HomeCredit}></Route>
        <Route exact path = "/chart-investment-data" component = {HomeInvestments}></Route>
        <Route exact path = "/chart-loans-data" component = {HomeLoans}></Route>
        <Route exact path = "/accounts" component = {Accounts}></Route>
        <Route exact path = "/fetch-securities" component = {Securities}></Route>
        <Route exact path = "/checking-transactions" component = {CheckingTransactions}></Route>
        <Route exact path = "/savings-transactions" component = {SavingsTransactions}></Route>
        <Route exact path = "/credit-transactions" component = {CreditTransactions}></Route>
        <Route exact path = "/other-transactions" component = {OtherTransactions}></Route>
        <Route exact path = "/investment-transactions" component = {InvestmentTransactions}></Route>
        <Route exact path = "/loan-transactions" component = {LoanTransactions}></Route>
        <Route exact path = "/credit-upload-transactions" component = {CreditUploadTransactions}></Route>
        <Route exact path = "/savings-upload-transactions" component = {SavingsUploadTransactions}></Route>
        <Route exact path = "/checking-upload-transactions" component = {CheckingUploadTransactions}></Route>
        <Route exact path = "/quotes-upload" component = {QuotesUpload}></Route>
        <Route exact path = "/account-recon" component = {AccountRecons}></Route>
        <Route exact path = "/checking-bal" component = {CheckingBalance}></Route>
        <Route exact path = "/saving-bal" component = {SavingBalance}></Route>
        <Route exact path = "/credit-bal" component = {CreditBalance}></Route>
        <Route exact path = "/investment-bal" component = {InvestmentBalance}></Route>
        <Route exact path = "/loan-bal" component = {LoanBalance}></Route>
        <Route exact path = "/investment-acct-details" component = {InvestmentPositions}></Route>
        <Route exact path = "/fetch-billschedules" component = {BillSchedules}></Route>
        <Route exact path = "/fetch-allbills" component = {Bills}></Route>
        <Route exact path = "/sync-billschedule" component = {BillSync}></Route>
        <Route exact path = "/update-quotes" component = {UpdateQuotes}></Route>
        <Route exact path = "/cash-flow" component = {CashFlow}></Route>
        <Route exact path = "/gains" component = {CostTransactions}></Route>
        <Route exact path = "/portfolio" component = {InvestmentPositions}></Route>
      </Switch>
      </main>
      </Router>
    </>
  )
}

export default App
