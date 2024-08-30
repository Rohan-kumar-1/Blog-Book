import React from 'react'


//container me sirf styling property add karte hai
function Container({children}) {
  return (
    <div className='w-full'>
      {children}
    </div>
  )
}

export default Container
