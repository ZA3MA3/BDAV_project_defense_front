import UsersTable from "../components/ui/UDCs/usersTable"; 
import LogoutButton from "../components/ui/UDCs/logout-button"; 
import Footer from "../components/ui/UDCs/footer"; 


const AdminDashboard = () => {
  return (
    <div className="min-h-screen p-6 bg-gray-100">
      {/* <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
       */}
<div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <LogoutButton /> 
      </div>

      <UsersTable />
      
      <Footer />
    </div>
  );
};

export default AdminDashboard;
