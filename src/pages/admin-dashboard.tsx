import UsersTable from "../components/ui/UDCs/usersTable"; // Adjust path if needed

const AdminDashboard = () => {
  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      <UsersTable /> {/* 👈 Add the UsersTable component here */}
    </div>
  );
};

export default AdminDashboard;
