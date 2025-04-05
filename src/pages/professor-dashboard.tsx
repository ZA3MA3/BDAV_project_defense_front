import React from 'react';
import DefenseCalendar from "../components/ui/UDCs/profCalender";

const ProfessorDashboard = () => {
  return (
    <div className="min-h-screen p-8 bg-gray-100">
      <h1 className="text-2xl font-bold mb-6">Professor Dashboard</h1>
      <DefenseCalendar />
    </div>
  );
};

export default ProfessorDashboard;
