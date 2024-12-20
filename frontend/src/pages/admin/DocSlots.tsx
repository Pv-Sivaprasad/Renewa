import React from 'react'
import { useLocation } from 'react-router';
import DoctorSlotChecker from '../../components/admin/DocSlot';

const DocSlots = () => {
    console.log('reached here');
     const location=useLocation()
      const doctorId=location.state?.doctorId
      console.log('doctorId',doctorId);
      
  return (
    <div>
    <DoctorSlotChecker doctorId={doctorId}/>
    </div>
  )
}

export default DocSlots
