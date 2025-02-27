import React from 'react'

const SummaryCard = ({icon,text,number,}) => {
  return (
    <div className= "flex bg-white rounded-lg   shadow-lg hover:shadow-2xl transition-all duration-300 p-0.8 max-w-sm mx-10 ">
        <div className="text-3xl flex justify-center items-center bg-teal-600 text-white px-4 py-5">
           {icon}
        </div>
        <div className="pl-4 py-1">
             <p className='text-lg font-semibold'>{text} </p>
             <p className='text-xl font-bold'>{number}</p>
        </div>
    </div>
  )
}

export default SummaryCard