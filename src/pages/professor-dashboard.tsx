import React from 'react';
import DefenseCalendar from "../components/ui/UDCs/profCalender";
import LogoutButton from "../components/ui/UDCs/logout-button"; 
import Footer from "../components/ui/UDCs/footer"; 



const ProfessorDashboard = () => {
  return (
    <div className="min-h-screen p-8 bg-gray-100">
      {/* <h1 className="text-2xl font-bold mb-6">Professor Dashboard</h1> */}
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Professor Dashboard</h1>
        <LogoutButton /> {/* 👈 Add the logout button here */}
      </div>
      <DefenseCalendar />
            <Footer />
      
    </div>
  );
};

export default ProfessorDashboard;
