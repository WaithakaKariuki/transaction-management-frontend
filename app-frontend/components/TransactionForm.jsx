import { useState } from "react"

export default function TransactionForm({onAddTransaction, onHandleBalance}) {
    const [formData, setFormData] = useState({})
    const [errors, setErrors] = useState([])

    function handleChange(e){
        let name = e.target.name
        let value = e.target.value

        setFormData({
            ...formData,
            [name]:value
        })
    }

    async function handleSubmit(e){
        e.preventDefault()
        const response = await fetch("https://infra.devskills.app/api/accounting/transaction",{
            method:'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(formData)
        })
        const data = await response.json()
        if(response.ok){
            onAddTransaction(data);
            onHandleBalance(data.account_id) //use the new accountId to fetch balance
        }else{
            setErrors(data.errors) 
        }
        
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
                        type="text"
                        minlength="36" 
                        maxlength="36"
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
                    <ol className="pt-6 text-center">
                    {errors&&errors.map((error, idx)=>(
                        <li key={idx} className="text-sm font-medium text-red-600">{error}</li>
                    ))}
                    </ol>
                </div>
            </form>
      </>
    )
  }