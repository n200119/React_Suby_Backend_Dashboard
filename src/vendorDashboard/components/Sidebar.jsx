import React from 'react'

const Sidebar = ({showAddFirmHandler,showAddProductHandler,showAllProductsHandler,showFirmTitle}) => {
  return (
    <div className="bg-[#2E294E] h-screen text-white w-1/5">
        <ul className="px-6 py-6">
            {showFirmTitle && <li className="pb-5 font-medium text-xl cursor-pointer" onClick={showAddFirmHandler}>Add firm</li>}
            <li className="pb-5 font-medium text-xl cursor-pointer" onClick={showAddProductHandler}>Add product</li>
            <li className="pb-5 font-medium text-xl cursor-pointer" onClick={showAllProductsHandler}>All products</li>
            <li className="pb-5 font-medium text-xl cursor-pointer">User</li>
        </ul>
    </div>
  )
}

export default Sidebar