import React, { useState } from 'react'

function TransactionForm({onAddTransaction, onHandleBalance}) {
    const [formData, setFormData] = useState({})

    function handleChange(e){
        let name = e.target.name
        let value = e.target.value

        setFormData({
            ...formData,
            [name]:value
        })
    }

    function handleSubmit(e){
        e.preventDefault()
        fetch("https://infra.devskills.app/api/accounting/transaction",{
            method:'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(formData)
        })
        .then(r=>r.json())
        .then(newTransaction=>{onAddTransaction(newTransaction);
            onHandleBalance(newTransaction.account_id); //use the new accountId to fetch balance
        }) 

        // clear the formData
        setFormData({
            account_id :"",
            amount: ""
        })
    }
    

  return (
    <>
            <form
             onSubmit={handleSubmit}
            >
                    {/* Account ID input */}
                <div className="mt-5">
                    <label htmlFor="account-id" className="block text-lg font-medium text-gray-700">
                    Account ID:
                    </label>
                    <div className="mt-1">
                    <input
                        required
                        onChange={handleChange}
                        name = "account_id"
                        value = {formData.account_id}
                        data-type="account-id" 
                        id="account-id"
                        className="block w-full h-10 px-2 rounded-md border-2 border-gray-500 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        placeholder="xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
                    />
                </div>
                </div>
                {/* Amount input */}
                <div className="mt-5 ">
                    <label htmlFor="amount" className="block text-lg font-medium text-gray-700">
                    Amount:
                    </label>
                    <div className="mt-1">
                    <input
                        required
                        type="number"
                        onChange={handleChange}
                        name = "amount"
                        value = {formData.amount}
                        data-type="amount"
                        id="amount"
                        className="block w-full h-10 p-2 border-2 rounded-md border-gray-500 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        placeholder=""
                    />
                    </div>
                    {/* submit button */}
                    <div className=" flex justify-center mt-8">
                        <button
                            data-type="transaction-submit"
                            type="submit"
                            className="inline-flex items-center rounded-md border border-gray-400 bg-gray-100 shadow-sm px-6 py-3 text-lg font-medium text-gray-900 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        >
                            Submit
                        </button>
                    </div>

                </div>
            </form>
      </>
  )
}

export default TransactionForm
