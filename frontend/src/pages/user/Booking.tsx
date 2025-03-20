import React, { useEffect, useState } from 'react';
import { Calendar, Clock, DollarSign, FileText, Star, X } from 'lucide-react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SideBar from '../../components/user/SideBar';
import { addRating, myBookings } from '../../services/user/userApi';
import { useNavigate } from 'react-router';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { useLocation } from 'react-router';

const BookingPage = () => {
  const location = useLocation();
  const docId = location.state?.doctorId;

  const navigate = useNavigate();
  const userName = useSelector((state: RootState) => state.user.userName);
  const [bookings, setBookings] = useState([]);
  const [showRatingModal, setShowRatingModal] = useState(false);
  const [selectedDoc, setSelectedDoc] = useState(null);
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [review, setReview] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const bookingsPerPage = 5;

  const getBookingStatus = (bookingDate, bookingTime) => {
    const now = new Date();
    const appointmentDate = new Date(bookingDate);
    

    const [hours, minutes] = bookingTime.split(':');
    

    const startDateTime = new Date(appointmentDate);
    startDateTime.setHours(parseInt(hours), parseInt(minutes), 0, 0);


    const endDateTime = new Date(startDateTime);
    endDateTime.setHours(startDateTime.getHours() + 1);

 
    const timeDiffFromStart = now.getTime() - startDateTime.getTime();
    const timeDiffFromEnd = now.getTime() - endDateTime.getTime();

    if (timeDiffFromStart < 0) {
      return 'Upcoming';
    } else if (timeDiffFromStart >= 0 && timeDiffFromEnd < 0) {
      return 'Ongoing';
    } else {
      return 'Completed';
    }
  };

  const handleDownloadInvoice = (booking) => {
    const invoiceData = {
      doctorName: booking.doctorName,
      specialization: booking.specialization,
      appointmentDate: booking.date,
      appointmentTime: booking.time,
      amount: booking.amount,
      status: booking.status,
      patientName: userName,
      bookingId: booking.id,
    };
    navigate('/invoice', { state: { invoiceData } });
  };

  const sortBookings = (bookings) => {
    const statusPriority = {
      Upcoming: 0,
      Ongoing: 1,
      Completed: 2,
    };

    return bookings.sort((a, b) => {
      if (statusPriority[a.status] !== statusPriority[b.status]) {
        return statusPriority[a.status] - statusPriority[b.status];
      }
    });
  };

  useEffect(() => {
    const fetchBookingData = async () => {
      try {
        const response = await myBookings();
        const processedBookings = response.data.map((booking, index) => ({
          ...booking,
          id: index + 1,
          status: getBookingStatus(booking.date, booking.time),
        }));

        const sortedBookings = sortBookings(processedBookings);
        setBookings(sortedBookings);
      } catch (error) {
        console.error('Error fetching bookings:', error);
      }
    };

    fetchBookingData();
    const intervalId = setInterval(fetchBookingData, 60000);
    return () => clearInterval(intervalId);
  }, []);

  const handleSubmitRating = async (e) => {
    e.preventDefault();
    const docName = selectedDoc?.doctorName || '';
    if (!docName) {
      toast.error('Unable to submit review: Doctor name not found');
      return;
    }
    try {
      const data = {
        userName,
        docName,
        rating,
        review,
      };

      const response = await addRating(data);
      if (response) {
        toast.success('Thank you for sharing your experience!');
        setRating(0);
        setReview('');
        setShowRatingModal(false);
        setSelectedDoc(null);
      }
    } catch (error) {
      toast.error('Failed to submit review. Please try again.');
      console.error('Error submitting review:', error);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Upcoming':
        return 'bg-blue-100 text-blue-800';
      case 'Ongoing':
        return 'bg-green-100 text-green-800';
      case 'Completed':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const openRatingModal = (booking) => {
    setSelectedDoc(booking);
    setShowRatingModal(true);
  };

  const indexOfLastBooking = currentPage * bookingsPerPage;
  const indexOfFirstBooking = indexOfLastBooking - bookingsPerPage;
  const currentBookings = bookings.slice(indexOfFirstBooking, indexOfLastBooking);
  const totalPages = Math.ceil(bookings.length / bookingsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <ToastContainer />
      <SideBar />
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">My Appointments</h1>
        <p className="text-gray-600">View and manage your upcoming and past appointments</p>
      </div>

      <div className="space-y-4">
        {currentBookings.map((booking) => (
          <div
            key={booking.id}
            className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-200"
          >
            <div className="p-6">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <img
                    src={booking.image || '/api/placeholder/64/64'}
                    alt={booking.doctorName}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                </div>

                <div className="flex-grow">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{booking.doctorName}</h3>
                      <p className="text-sm text-gray-600">{booking.specialization}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`px-3 py-1 rounded-full text-sm ${getStatusColor(booking.status)}`}>
                        {booking.status}
                      </span>
                      {booking.status === 'Ongoing' && (
                        <button
                          onClick={() => navigate('/chat',{ state: { userName,docId } })}
                          className="px-3 py-1 text-sm bg-blue-500 hover:bg-blue-600 text-white rounded-full transition-colors"
                        >
                          Chat
                        </button>
                      )}
                      {booking.status === 'Completed' && (
                        <>
                          <button
                            onClick={() => openRatingModal(booking)}
                            className="px-3 py-1 text-sm bg-green-500 hover:bg-green-600 text-white rounded-full transition-colors"
                          >
                            Add Review
                          </button>
                          <button
                            onClick={() => handleDownloadInvoice(booking)}
                            className="p-2 text-blue-600 hover:text-blue-800 transition-colors"
                            title="Download Invoice"
                          >
                            <FileText className="w-5 h-5" />
                          </button>
                        </>
                      )}
                    </div>
                  </div>

                  <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="flex items-center text-gray-600">
                      <Calendar className="w-4 h-4 mr-2" />
                      <span className="text-sm">{new Date(booking.date).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Clock className="w-4 h-4 mr-2" />
                      <span className="text-sm">{booking.time}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <DollarSign className="w-4 h-4 mr-2" />
                      <span className="text-sm">${booking.amount}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {bookings.length > 0 && (
        <div className="mt-6 flex justify-between items-center">
          <button
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
            className={`px-4 py-2 text-sm font-medium rounded-md ${
              currentPage === 1
                ? 'bg-gray-300 cursor-not-allowed'
                : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
          >
            Previous
          </button>
          <span className="text-sm text-gray-700">Page {currentPage} of {totalPages}</span>
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className={`px-4 py-2 text-sm font-medium rounded-md ${
              currentPage === totalPages
                ? 'bg-gray-300 cursor-not-allowed'
                : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
          >
            Next
          </button>
        </div>
      )}

      {showRatingModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-900">Rate Your Experience</h2>
              <button
                onClick={() => {
                  setShowRatingModal(false);
                  setRating(0);
                  setReview('');
                }}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmitRating} className="space-y-4">
              <div className="flex justify-center space-x-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHoveredRating(star)}
                    onMouseLeave={() => setHoveredRating(0)}
                    className="focus:outline-none"
                  >
                    <Star
                      className={`w-8 h-8 ${
                        (hoveredRating || rating) >= star
                          ? 'fill-yellow-400 text-yellow-400'
                          : 'text-gray-300'
                      } transition-colors`}
                    />
                  </button>
                ))}
              </div>

              <div>
                <label htmlFor="review" className="block text-sm font-medium text-gray-700 mb-2">
                  Your Review
                </label>
                <textarea
                  id="review"
                  value={review}
                  onChange={(e) => setReview(e.target.value)}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Share your experience with the doctor..."
                />
              </div>

              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowRatingModal(false);
                    setRating(0);
                    setReview('');
                  }}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={!rating}
                  className={`px-4 py-2 text-sm font-medium text-white rounded-md transition-colors ${
                    rating
                      ? 'bg-blue-600 hover:bg-blue-700'
                      : 'bg-blue-300 cursor-not-allowed'
                  }`}
                >
                  Submit Review
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingPage;
