import React, { useRef } from 'react';
import { Clock, Mail, Download } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';

const InvoicePage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const invoiceRef = useRef(null);

  // Check if we have invoice data, if not redirect to bookings
  if (!location.state?.invoiceData) {
    navigate('/bookings');
    return null;
  }

  const { 
    doctorName, 
    specialization, 
    appointmentDate, 
    appointmentTime, 
    amount, 
    status, 
    patientName, 
    bookingId 
  } = location.state.invoiceData;

  // Format the data for the invoice
  const invoiceData = [{
    slNo: bookingId,
    dateTime: `${new Date(appointmentDate).toLocaleDateString()} ${appointmentTime}`,
    amount: amount,
    status: status
  }];

  const totalAmount = amount; // Since we're only showing one booking

  const downloadPDF = async () => {
    // Dynamically import html2pdf
    const html2pdf = (await import('html2pdf.js')).default;
    
    const element = invoiceRef.current;
    const opt = {
      margin: 1,
      filename: `renewa-hospital-invoice-${bookingId}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };

    html2pdf().set(opt).from(element).save();
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      {/* Download and Back Buttons */}
      <div className="max-w-5xl mx-auto mb-4 flex justify-between">
        <button 
          onClick={() => navigate('/bookings')}
          className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
        >
          Back to Bookings
        </button>
        <button 
          onClick={downloadPDF}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Download className="w-4 h-4" />
          Download Invoice
        </button>
      </div>

      {/* Invoice Content */}
      <div ref={invoiceRef} className="max-w-5xl mx-auto bg-white rounded-lg shadow-lg p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Renewa Hospital</h1>
          <div className="text-gray-600">
            <p>123 Healthcare Avenue, Medical District</p>
            <p>Shornur, Palakkad 679121</p>
          </div>
        </div>

        {/* Patient and Doctor Info */}
        <div className="mb-8 grid grid-cols-2 gap-8">
          <div>
            <h2 className="text-lg font-semibold text-gray-800 mb-2">Patient Information</h2>
            <p className="text-gray-600">{patientName}</p>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-800 mb-2">Doctor Information</h2>
            <p className="text-gray-600">{doctorName}</p>
            <p className="text-gray-600">{specialization}</p>
          </div>
        </div>

        {/* Invoice Table */}
        <div className="mb-8">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Booking ID</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Date & Time</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Amount (₹)</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {invoiceData.map((item) => (
                  <tr key={item.slNo} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm text-gray-700">{item.slNo}</td>
                    <td className="px-6 py-4 text-sm text-gray-700">
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-2 text-gray-400" />
                        {item.dateTime}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">{item.amount.toLocaleString()}</td>
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 text-sm text-green-700 bg-green-100 rounded-full">
                        {item.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Total Amount */}
        <div className="border-t pt-4 mb-8">
          <div className="flex justify-end">
            <div className="text-right">
              <p className="text-sm text-gray-600">Total Amount:</p>
              <p className="text-2xl font-bold text-gray-800">₹{totalAmount.toLocaleString()}</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center text-gray-600 border-t pt-6">
          <p className="mb-2">© 2025 All Rights Reserved - Renewa Hospital</p>
          <div className="flex items-center justify-center text-sm">
            <Mail className="w-4 h-4 mr-2" />
            <p>For queries: customersupport@renewa.in</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoicePage;

// import React, { useRef } from 'react';
// import { Clock, Mail, Download } from 'lucide-react';

// const InvoicePage = () => {
//   const invoiceRef = useRef(null);
//   const invoiceData = [
//     { slNo: 1, dateTime: "2025-02-15 09:30 AM", amount: 1500, status: "Success" },
//     { slNo: 2, dateTime: "2025-02-15 11:45 AM", amount: 2300, status: "Success" },
//     { slNo: 3, dateTime: "2025-02-15 02:15 PM", amount: 1800, status: "Success" },
//     { slNo: 4, dateTime: "2025-02-15 04:30 PM", amount: 3200, status: "Success" }
//   ];

//   const totalAmount = invoiceData.reduce((sum, item) => sum + item.amount, 0);

//   const downloadPDF = async () => {
//     // Dynamically import html2pdf
//     const html2pdf = (await import('html2pdf.js')).default;
    
//     const element = invoiceRef.current;
//     const opt = {
//       margin: 1,
//       filename: 'renewa-hospital-invoice.pdf',
//       image: { type: 'jpeg', quality: 0.98 },
//       html2canvas: { scale: 2 },
//       jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
//     };

//     html2pdf().set(opt).from(element).save();
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 p-8">
//       {/* Download Button */}
//       <div className="max-w-5xl mx-auto mb-4">
//         <button 
//           onClick={downloadPDF}
//           className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
//         >
//           <Download className="w-4 h-4" />
//           Download Invoice
//         </button>
//       </div>

//       {/* Invoice Content */}
//       <div ref={invoiceRef} className="max-w-5xl mx-auto bg-white rounded-lg shadow-lg p-8">
//         <div className="text-center mb-8">
//           <h1 className="text-3xl font-bold text-gray-800 mb-2">Renewa Hospital</h1>
//           <div className="text-gray-600">
//             <p>123 Healthcare Avenue, Medical District</p>
//             <p>Shornur, Palakkad 679121</p>
//           </div>
//         </div>

//         {/* Invoice Table */}
//         <div className="mb-8">
//           <div className="overflow-x-auto">
//             <table className="w-full">
//               <thead className="bg-gray-100">
//                 <tr>
//                   <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Sl No</th>
//                   <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Date & Time</th>
//                   <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Amount (₹)</th>
//                   <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Status</th>
//                 </tr>
//               </thead>
//               <tbody className="divide-y divide-gray-200">
//                 {invoiceData.map((item) => (
//                   <tr key={item.slNo} className="hover:bg-gray-50">
//                     <td className="px-6 py-4 text-sm text-gray-700">{item.slNo}</td>
//                     <td className="px-6 py-4 text-sm text-gray-700">
//                       <div className="flex items-center">
//                         <Clock className="w-4 h-4 mr-2 text-gray-400" />
//                         {item.dateTime}
//                       </div>
//                     </td>
//                     <td className="px-6 py-4 text-sm text-gray-700">{item.amount.toLocaleString()}</td>
//                     <td className="px-6 py-4">
//                       <span className="px-3 py-1 text-sm text-green-700 bg-green-100 rounded-full">
//                         {item.status}
//                       </span>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>

//         {/* Total Amount */}
//         <div className="border-t pt-4 mb-8">
//           <div className="flex justify-end">
//             <div className="text-right">
//               <p className="text-sm text-gray-600">Total Amount:</p>
//               <p className="text-2xl font-bold text-gray-800">₹{totalAmount.toLocaleString()}</p>
//             </div>
//           </div>
//         </div>

//         {/* Footer */}
//         <div className="text-center text-gray-600 border-t pt-6">
//           <p className="mb-2">© 2025 All Rights Reserved - Renewa Hospital</p>
//           <div className="flex items-center justify-center text-sm">
//             <Mail className="w-4 h-4 mr-2" />
//             <p>For queries: customersupport@renewa.in</p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default InvoicePage; 