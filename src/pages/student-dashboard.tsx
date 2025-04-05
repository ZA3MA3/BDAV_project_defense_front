import StudentNav from "../components/ui/UDCs/studentNavbar";

const StudentDashboard = () => {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
  <h1 className="text-2xl font-bold mb-4">Student Dashboard</h1>
  <StudentNav />
</div>

    );
  };
  
  export default StudentDashboard;
  