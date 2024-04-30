import React, { children } from 'react'

function RightGrid() {
  return (
    <div className="grid grid-cols-1 gap-4 lg:col-span-2 shadow-lg border-dotted rounded-md border border-lime-800">
        <section aria-labelledby="section-1-title">
        <h2 className="sr-only" id="section-1-title">
        Transaction History
        </h2>
        <h2 className="flex justify-start font-bold text-xl text-gray-900 bg-gray-200 px-6 py-2">
        Transaction History
        </h2>
        <div className="overflow-hidden rounded-lg bg-white shadow h-96 overflow-y-auto">
            <div className="p-4">
                {/* display transactions history*/}
                {children}
            </div>
        </div>
        </section>
    </div>
  )
}

export default RightGrid
