import React from 'react'

function TransactionHistory({transactions}) {
    const reverseTransactions = transactions.slice().reverse() //use reversed array to show transactions from latest
    const firstTransaction = reverseTransactions.slice(0, 1);
    const otherTransactions = reverseTransactions.slice(1, reverseTransactions.length);
  return (
    <>
        <ul role="list relative" className="divide-y divide-gray-500">
            {/* display firstTransaction */}
            {firstTransaction.map((transaction) =>(
                <div className='py-2'
                    data-type="transaction" 
                    data-amount={transaction.amount}  
                    data-account-id={transaction.account_id}
                >
                    <li key ={transaction.account_id} className="py-4 hover:bg-green-100 border-gray-200 active:bg-green-200  hover:z-10 focus:bg-green hover:shadow-xl">  
                        <div className="ml-3" >
                        <p className="text-base text-gray-900 font-medium text-green" >Transfered {transaction.amount}$ from account {transaction.account_id}</p>
                        </div>
                    </li>
                </div>
            ))}
               {/* display laterTransactions  */}
            {otherTransactions.map((transaction) => 
                (
                <div className='p-2'>
                    <li key ={transaction.account_id} className="py-4 hover:bg-green-100 border-gray-200 active:bg-green-200  hover:z-10 focus:bg-green hover:shadow-xl">  
                        <div className="ml-3"
                        >
                        <p className="text-base font-sm text-gray-900 font-medium">Transfered {transaction.amount}$ from account {transaction.account_id}</p>
                        </div>
                    </li>
                </div>
            ))}
        </ul>
    </>
  )
}

export default TransactionHistory
