import React from 'react';
import logo from '../../assets/logo.png';
import back from '../../assets/back.png'
const UserFooter: React.FC = () => {
  return (
    <footer className="footer bg-footer-color">
      <div className="footer_top py-10">
        <div className="container mx-auto">
          <div className="flex justify-between flex-wrap">
            {/* First Section: Logo and Name */}
            <div className="w-full md:w-1/3 mb-4 flex flex-col items-start">
              <div className="footer_logo">
                <a href="#">
                  <img src={back} alt="Logo" />
                </a>
              </div>
              <h1 className="text-white mt-4">Renewa</h1>
              <p className="address_text mt-2 text-white">
                Rejuvenate yourself<br />
                we care more than you imagine
              </p>
              <div className="social_links mt-4">
                <ul className="flex space-x-4">
                  <li>
                    <a href="#">
                      <i className="ti-facebook text-white"></i>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i className="ti-twitter-alt text-white"></i>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i className="fa fa-dribbble text-white"></i>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i className="fa fa-instagram text-white"></i>
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            {/* Second Section: Departments and Availability */}
            <div className="w-full md:w-2/3 mb-4">
              <div className="flex flex-wrap justify-between">
                <div className="footer_widget w-full md:w-1/2 mb-4">
                  <h3 className="footer_title text-white">Our Departments</h3>
                  <ul className="links mt-4 text-white space-y-2">
                    <li><a href="#">Births</a></li>
                    <li><a href="#">Pulmonary</a></li>
                    <li><a href="#">Cardiology</a></li>
                    <li><a href="#">Neurology</a></li>
                    <li><a href="#">Traumatology</a></li>
                    <li><a href="#">Dental</a></li>
                    <li><a href="#">Nuclear</a></li>
                    <li><a href="#">Magnetic</a></li>
                    <li><a href="#">Pregnancy</a></li>
                    <li><a href="#">For disabled</a></li>
                    <li><a href="#">X-ray</a></li>
                    <li><a href="#">Prostheses</a></li>
                  </ul>
                </div>

                <div className="footer_widget w-full md:w-1/2 mb-4">
                  <h3 className="footer_title text-white">We’re Available</h3>
                  <ul className="meeting_time mt-4 text-white space-y-2">
                    <li className="flex justify-between">
                      <span>Monday - Friday</span> <span>8.00 - 18.00</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Saturday</span> <span>8.00 - 18.00</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Sunday</span> <span>8.00 - 13.00</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="copy-right_text bg-purple-900 py-6">
        <div className="container mx-auto">
          <div className="border-t border-gray-500 py-4">
            <p className="text-center text-white">
              &copy; {new Date().getFullYear()} All rights reserved | This template is made for Renewa
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default UserFooter;
