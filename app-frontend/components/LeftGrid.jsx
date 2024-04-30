import React from 'react'

function LeftGrid({children}) {
  return (
    <div className="grid grid-cols-1 gap-4 shadow-lg border-dotted rounded-md border border-lime-800">
        <section aria-labelledby="section-2-title">
            <h2 className="sr-only" id="section-2-title">
                Submit new transaction
            </h2>
            <h2 className="flex justify-start text-xl font-bold text-gray-900 bg-gray-200 px-6 py-2">
                Submit new transaction
            </h2>
            <div className="overflow-hidden rounded-lg bg-white shadow h-96">
                <div className="p-4">  
                    {/* display transactions form*/}  
                    {children}        
                </div>
            </div>
        </section>
    </div>
  )
}

export default LeftGrid
