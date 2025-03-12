"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import CommonInput from "@/components/common/CommonInput"; 
import Header from "./common/Header";
import Footer from "./common/Footer";

const Hero = () => {
  const [formData, setFormData] = useState({ firstName: "", lastName: "", email: "" });
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem("userData", JSON.stringify(formData));
    router.push("/read-process");
  };

  return (
    <div className="min-h-screen">
      <Header />
      <div className="flex justify-center items-center py-20 bg-gray-100">
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg max-w-[500px]">
          <h2 className="text-2xl text-black font-bold text-center mb-4">Welcome Form</h2>
          <label>First Name</label>
          <CommonInput type="text" name="firstName" value={formData.firstName} placeholder="First Name" onChange={handleChange} />
          <label>Last  Name</label>
          <CommonInput type="text" name="lastName" value={formData.lastName} placeholder="Last Name" onChange={handleChange} />
          <label>Email</label>
          <CommonInput type="email" name="email" value={formData.email} placeholder="Email" onChange={handleChange} />

          <button type="submit" className="w-32 flex mx-auto justify-center bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
            Submit
          </button>
        </form>
      </div>
      <Footer/>
   </div>
  );
};

export default Hero;
