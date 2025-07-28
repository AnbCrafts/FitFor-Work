import React from 'react'

const Filters = ({ options, head }) => {
  return (
    <div className='max-h-[350px] py-2 px-4 rounded-2xl flex items-start justify-between flex-col w-[300px] mx-auto mb-8 border-t border-b border-pink-500 shadow-lg shadow-[#a1051f7e] '>
      <h1 className='text-2xl font-bold text-purple-400 capitalize py-2 mb-1 border-b border-pink-500 w-full'>{head}</h1>
     <div className='max-h-[240px] w-full  overflow-y-auto noScroll'>
       {
        options?.map((item, index) => {
          const label = typeof item === 'object' ? item.companyName || JSON.stringify(item) : item;
          const id = typeof item === 'object' ? item._id || index : `${head}-${item}`;
          

          return (
            <div key={index} className='flex items-center justify-start gap-2 mb-2 cursor-pointer'>
              <input type="checkbox" id={id} name={id} />
              <label htmlFor={id} className='text-lg px-2'>
                {label}
              </label>
            </div>
          )
        })
      }
     </div>


    </div>
  );
};

export default Filters;
