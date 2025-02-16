import React, { useEffect, useState } from 'react';
import { Star, Clock, DollarSign, Award, MessageSquare } from 'lucide-react';
import { useLocation } from 'react-router';
import { singleDocData } from '../../services/user/userApi';

const DoctorProfile = () => {

const location=useLocation()
const docId=location.state.docId

  useEffect(()=>{
    const fetchDocData=async()=>{
      let response= await singleDocData(docId)
    }
    fetchDocData()
  },[])


  const [showReviews, setShowReviews] = useState(false);

  // Sample doctor data
  const doctor = {
    name: "Dr. Sarah Wilson",
    specialty: "Cardiologist",
    experience: "15 years",
    consultationFee: "150",
    rating: 4.8,
    totalReviews: 127,
    reviews: [
      { id: 1, user: "John D.", rating: 5, comment: "Excellent doctor! Very thorough and patient." },
      { id: 2, user: "Mary S.", rating: 4, comment: "Professional and knowledgeable. Highly recommend." },
      { id: 3, user: "Robert K.", rating: 5, comment: "Great experience. Takes time to explain everything." }
    ]
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Header Section */}
        <div className="p-6">
          <div className="flex items-start space-x-6">
            <div className="w-32 h-32 rounded-full overflow-hidden bg-gray-200 flex-shrink-0">
              <img
                src="/api/placeholder/128/128"
                alt={doctor.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold mb-2">{doctor.name}</h2>
              <div className="space-y-2">
                <div className="flex items-center text-gray-600">
                  <Award className="w-5 h-5 mr-2" />
                  <span>{doctor.specialty}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Clock className="w-5 h-5 mr-2" />
                  <span>{doctor.experience} Experience</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <DollarSign className="w-5 h-5 mr-2" />
                  <span>${doctor.consultationFee} Consultation Fee</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Star className="w-5 h-5 mr-2 text-yellow-400" />
                  <span>{doctor.rating} ({doctor.totalReviews} reviews)</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Reviews Button */}
        <div className="px-6 pb-6">
          <button
            onClick={() => setShowReviews(!showReviews)}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg flex items-center justify-center transition-colors duration-200"
          >
            <MessageSquare className="w-5 h-5 mr-2" />
            {showReviews ? 'Hide Reviews' : 'View Ratings & Reviews'}
          </button>

          {/* Reviews Section */}
          {showReviews && (
            <div className="mt-6 space-y-4">
              <div className="p-4 bg-gray-50 rounded-lg">
                <h3 className="text-lg font-semibold mb-4">Patient Reviews</h3>
                <div className="space-y-4">
                  {doctor.reviews.map(review => (
                    <div key={review.id} className="border-b border-gray-200 pb-4 last:border-b-0">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium">{review.user}</span>
                        <div className="flex items-center">
                          {[...Array(review.rating)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                          ))}
                        </div>
                      </div>
                      <p className="text-gray-600">{review.comment}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DoctorProfile;