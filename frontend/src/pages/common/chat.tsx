import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useLocation, useParams } from "react-router-dom";
import ChatInterface from "../../components/sockets/chatComponent";

// Doctor Chat Component
export const DoctorChat: React.FC = () => {

  const location=useLocation()
  const userName=location.state.userName
  const userId=location.state.userId

  // const { patientId } = useParams<{ patientId: string }>();
   
  const doctorId = useSelector((state: RootState) => state.doctor.doctorId);
  const doctorName = useSelector((state: RootState) => state.doctor.userName);
  console.log('doctorName doctorId userId userName ',doctorName, doctorId ,userId, userName);
  // In a real app, you'd fetch patient details from an API
  // For now, we'll use a dummy approach
  // const patientName = useSelector((state: RootState) => 
  //   state.patients?.find(p => p.id === patientId)?.name || "Patient"
  // );

  return (
    <ChatInterface 
      role="doctor" 
      userId={doctorId}
      userName={doctorName}
      partnerId={userId}
      // partnerId={patientId}
      partnerName={userName}
      // partnerName={patientName}
    />
  );
};

// Patient Chat Component
export const PatientChat: React.FC = () => {
  const location=useLocation()
  const doctorName=location.state.doctorName
  // const { doctorId } = useParams<{ doctorId: string }>();
  const doctorId=location.state.doctorId
  const patientId = useSelector((state: RootState) => state.user.userId);
  const patientName = useSelector((state: RootState) => state.user.userName);
  const partnerName=useSelector((state:RootState)=>state.user.userName)
  // In a real app, you'd fetch doctor details from an API
  // For now, we'll use a dummy approach
  // const doctorName = useSelector((state: RootState) => 
  //   state.doctors?.find(d => d.id === doctorId)?.name || "Dr. Unknown"
  // );
  console.log('doctorName doctorId patientId patientName ',doctorName, doctorId ,patientId, patientName);
  

  return (
    <ChatInterface
      role="user"
      userId={patientId}
      userName={patientName}
      partnerId={doctorId}
      // partnerName={doctorName}
      partnerName={doctorName}
    />
  );
};

