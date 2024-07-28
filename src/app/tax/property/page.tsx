import { PayButton } from '@/components/pay-button'
import { PropertyTax } from '@/components/property-tax'
import React from 'react'

const page = () => {
  return (
    <div className='flex h-screen w-full items-center justify-center '>
      {/* <h1>Property Tax</h1> */}

      <PropertyTax  />
    </div>
  )
}

export default page