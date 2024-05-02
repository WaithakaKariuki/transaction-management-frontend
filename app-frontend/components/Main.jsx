import React, { Suspense, useCallback, useEffect, useMemo, useState } from 'react'
import TransactionForm from './TransactionForm'
import TransactionHistory from './TransactionHistory'
import LeftGrid from './LeftGrid'
import RightGrid from './RightGrid'

function Main() {
    const [transactions, setTransactions] = useState([])
    const [accountBalance, setAccountBalance] = useState(0)
  
    useEffect(()=>{ //fetch all transactions
        fetch("https://infra.devskills.app/api/accounting/transactions",{
            method:'GET',
            headers:{
                'Content-Type': 'application/json'
            }
        })
        .then(r=>r.json())
        .then(data=>{setTransactions(Object.values(data))})
       
    },[])

    // fetch balance after form submit
    const handleBalance = useCallback((account_id)=>{
        fetch(`https://infra.devskills.app/api/accounting/accounts/${account_id}`,{
                method:'GET',
                headers:{
                    'Content-Type': 'application/json'
                }
            })
        .then(r=>r.json())
        .then(newBalance=>setAccountBalance(newBalance.balance))
    },[])

    // add new transaction to existing ones
    const addTransaction = useMemo(()=>
    (formData)=>{
        setTransactions((transactions)=>[...transactions, formData])
    },[])

  return (
    <>
        <main className="mx-auto  max-w-7xl py-4 px-6 lg:py-4 lg:px-8 ">
            <div className="mx-auto max-w-3xl pb-12 px-4 sm:px-6 lg:max-w-fit lg:px-8">
                <h1 className="sr-only">Transaction Management</h1>
                {/* Main 3 column grid */}
                <div className="grid grid-cols-1 items-start gap-1 lg:grid-cols-3 lg:gap-1">  
                {/* Left column */}
                <LeftGrid>
                    <TransactionForm onAddTransaction = {addTransaction} onHandleBalance={handleBalance} />
                </LeftGrid>              
                {/* right column */}
                <RightGrid>
                    <Suspense fallback={<Loading/>}>
                        <TransactionHistory accountBalance= {accountBalance} transactions={transactions}/>
                    </Suspense>
                </RightGrid>
                </div>
            </div>
        </main>
    </>
  )
}

export default Main
