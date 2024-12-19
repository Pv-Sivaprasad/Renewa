import React,{Children} from 'react'
import Header from '../../components/doctor/Header' 
import DoctorSlotSelector from '../../components/doctor/SloctComponent';

const DoctorSlots = () => {
  
    
  return (
    <div>
      <Header Children={DoctorSlotSelector}/>
    </div>
  )
}

export default DoctorSlots
