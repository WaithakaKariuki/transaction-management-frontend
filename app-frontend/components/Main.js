import React, { useEffect, useState } from 'react'
import TransactionForm from './TransactionForm'
import TransactionHistory from './TransactionHistory'

function Main() {
    const [transactions, setTransactions] = useState([])

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

  return (
    <>
        <main className="mx-auto  max-w-7xl py-4 px-6 lg:py-4 lg:px-8 ">
            <div className="mx-auto max-w-3xl pb-12 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
                <h1 className="sr-only">Page title</h1>
                {/* Main 3 column grid */}
                <div className="grid grid-cols-1 items-start gap-2 lg:grid-cols-3 lg:gap-2">
    
                {/* Left column */}
                <div className="grid grid-cols-1 gap-4    shadow-lg border-dotted rounded-md border border-lime-800">
                    <section aria-labelledby="section-2-title">
                    <h2 className="sr-only" id="section-2-title">
                        Submit new transaction
                    </h2>
                    <h2 className="flex justify-start text-xl font-bold text-gray-900 bg-gray-200 px-6 py-2">
                        Submit new transaction
                    </h2>
                    <div className="overflow-hidden rounded-lg bg-white shadow h-96">
                        <div className="p-4">
                        
                            <TransactionForm/>
                        </div>
                    </div>
                    </section>
                </div>

                
                {/* right column */}
                <div className="grid grid-cols-1 gap-4 lg:col-span-2    shadow-lg border-dotted rounded-md border border-lime-800">
                    <section aria-labelledby="section-1-title">
                    <h2 className="sr-only" id="section-1-title">
                    Transaction History
                    </h2>
                    <h2 className="flex justify-start font-bold text-xl text-gray-900 bg-gray-200 px-6 py-2">
                    Transaction History
                    </h2>
                    <div className="overflow-hidden rounded-lg bg-white shadow h-96 overflow-y-auto">
                    <div className="p-4">
                        <TransactionHistory transactions={transactions}/>
                        </div>
                    </div>
                    </section>
                </div>
                </div>
            </div>
        </main>
    </>
  )
}

export default Main
