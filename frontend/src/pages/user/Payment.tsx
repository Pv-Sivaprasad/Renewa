import { useEffect, useState } from "react";
import SideBar from '../../components/user/SideBar'
import { allPayments } from "../../services/user/userApi";
const BookingPayments = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const response = await allPayments()
        console.log(response,'asdfhasf')
        setPayments(response.data);
      } catch (err) {
        setError("Failed to fetch payments");
      } finally {
        setLoading(false);
      }
    };
    fetchPayments(); 
  }, []);

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-gray-900 text-white rounded-lg shadow-lg">
        <SideBar/>
      <h2 className="text-2xl font-semibold mb-4">My Bookings</h2>
      {loading && <p className="text-center">Loading...</p>}
      {error && <p className="text-red-500 text-center">{error}</p>}
      {!loading && !error && payments.length === 0 && (
        <p className="text-center">No bookings found.</p>
      )}
      {!loading && !error && payments.length > 0 && (
        <div className="overflow-x-auto">
          <table className="w-full table-auto border-collapse">
            <thead>
              <tr className="bg-gray-800 text-left">
                <th className="p-3">Date</th>
                <th className="p-3">Status</th>
                <th className="p-3">Amount</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((payment, index) => (
                <tr
                  key={index}
                  className="border-b border-gray-700 hover:bg-gray-800 transition"
                >
                  <td className="p-3">{new Date(payment.date).toLocaleDateString()}</td>
                  <td
                    className={`p-3 font-semibold ${
                      payment.status === "success"
                        ? "text-green-400"
                        : "text-red-400"
                    }`}
                  >
                    {payment.status}
                  </td>
                  <td className="p-3">₹{payment.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default BookingPayments;
