import React, { useState } from 'react';


const FormSection = ({ title, children }) => {
  return (
    <div className="mb-8 mt-8">
      <h2 className="text-lg font-bold text-navy-800 mb-2">{title}</h2>
      <div className="border-t border-gray-200 mb-4"></div>
      {children}
    </div>
  );
};


const InputField = ({ label, id, type = "text", placeholder, value, onChange }) => {
  return (
    <div className="mb-4">
      <label htmlFor={id} className="block text-gray-600 mb-2">
        {label}
      </label>
      <input
        type={type}
        id={id}
        name={id}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full px-4 py-2 border border-sky-300 rounded-md"
      />
    </div>
  );
};

const RegistrationForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    // Username and Password
    username: '',
    password: '',
    confirmPassword: '',
    
    // Personal Information
    firstName: '',
    lastName: '',
    
    // Contact Information
    email: '',
    country: '',
    mobilePhone: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-4xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left Column */}
        <div>
          {/* Username and Password Section */}
          <FormSection title="USERNAME AND PASSWORD">
            <InputField 
              label="Username"
              id="username"
              placeholder="Enter your username"
              value={formData.username}
              onChange={handleChange}
            />
            
            <InputField 
              label="Password"
              id="password"
              type="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
            />
            
            <div className="mb-4">
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Re-type your password"
                className="w-full px-4 py-2 border border-sky-300 rounded-md"
              />
            </div>
          </FormSection>

          {/* Contact Information Section */}
          <FormSection title="CONTACT INFORMATION">
            <InputField 
              label="Email Address"
              id="email"
              placeholder="enter your email address"
              value={formData.email}
              onChange={handleChange}
            />
            
            <div className="mb-4">
              <label htmlFor="country" className="block text-gray-600 mb-2">
                Country
              </label>
              <div className="relative">
                <select
                  id="country"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-sky-300 rounded-md appearance-none"
                >
                  <option value="">Select your country</option>
                  <option value="AU">UY PILIPINS!!!</option>
                  <option value="US">United States</option>
                  <option value="CA">Canada</option>
                  <option value="UK">United Kingdom</option>
                  <option value="AU">Australia</option>
                  {/* Add more countries as needed */}
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                  <svg className="w-4 h-4 fill-current text-gray-500" viewBox="0 0 20 20">
                    <path d="M7 10l5 5 5-5H7z"></path>
                  </svg>
                </div>
              </div>
            </div>
            
            <InputField 
              label="Mobile Phone"
              id="mobilePhone"
              placeholder="Enter your mobile number"
              value={formData.mobilePhone}
              onChange={handleChange}
            /> 
            
          </FormSection>
          
        </div>

        {/* Right Column */}
        <div>
          {/* Personal Information Section */}
          <FormSection title="PERSONAL INFORMATION">
            <InputField 
              label="First Name"
              id="firstName"
              placeholder="Enter Your First Name"
              value={formData.firstName}
              onChange={handleChange}
            />
            
            <InputField 
              label="Last Name"
              id="lastName"
              placeholder="Enter Your Last Name"
              value={formData.lastName}
              onChange={handleChange}
            />
          </FormSection>
          
        </div>
      </div>
      
      {/* Submit Button - Uncomment if needed */}
      
      <div className="ml-80 mb-4">
        <button 
          type="submit"
          className="px-6 py-2 bg-sky-400 text-white rounded-md hover:bg-sky-700"
        >
          Register
        </button>
      </div>
     
    </form>
  );
};

export default RegistrationForm;