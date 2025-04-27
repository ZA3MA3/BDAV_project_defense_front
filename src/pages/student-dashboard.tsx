import StudentNav from "../components/ui/UDCs/studentNavbar";
import LogoutButton from "../components/ui/UDCs/logout-button"; 
import Footer from "../components/ui/UDCs/footer"; 


const StudentDashboard = () => {
    return (
      // <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="min-h-screen p-8 bg-gray-100">

  {/* <h1 className="text-2xl font-bold mb-4">Student Dashboard</h1> */}
  <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Student Dashboard</h1>
        <LogoutButton /> {/* 👈 Add the logout button here */}
      </div>
      
  <StudentNav />
        <Footer />
  
</div>

    );
  };
  
  export default StudentDashboard;
  