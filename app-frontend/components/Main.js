import React, { useState } from 'react'

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
    </>
  )
}

export default Main
