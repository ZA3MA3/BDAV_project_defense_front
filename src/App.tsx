
import './App.css'
import { useState } from 'react';
import axios from 'axios';
import { Button } from "./components/ui/button"
import { Input } from './components/ui/input';
import { Label } from './components/ui/label';
import { UserNumberInput, BirthdateInput } from './components/ui/UDCs/login';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import AdminDashboard from './pages/admin-dashboard';
import ProfessorDashboard from './pages/professor-dashboard';
import StudentDashboard from './pages/student-dashboard';

/*function App() {
  return (
    <div className="flex flex-col items-center justify-center min-h-svh">
      <Button>Click me</Button>
    </div>
  )
}
 
export default App*/  
function SignIn() {
  const [userNumber, setUserNumber] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  // const handleSignIn = async (e: React.FormEvent) => {  
  //   e.preventDefault();
  //   try {
  //     const response = await axios.post('http://localhost:5000/auth/signin', {
  //       userNumber: parseInt(userNumber),
  //       password: parseInt(password),
  //     });
  //     if (response.data.success) {
  //       if (response.data.role == 3) {
  //         navigate('/admin-dashboard'); 
  //       } else if (response.data.role == 2) {
  //         navigate('/professor-dashboard');
  //       } else if (response.data.role == 1) {
  //         navigate('/student-dashboard');
  //       }
  //     } else {
  //       setMessage(response.data.message);
  //     }
  //   } catch (error) {
  //     setMessage('user doesnt exist');

      
  //   }
  // };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const credentials = {
        userNumber: parseInt(userNumber),
        password: parseInt(password),
      };
  
      // Step 1: Sign in
      const response = await axios.post('http://localhost:5000/auth/signin', credentials);
  
      if (response.data.success) {
        const role = response.data.role;
  
        // Step 2: Identify user/student ID
        const idRes = await axios.post('http://localhost:5000/auth/identify', {
          userNumber: credentials.userNumber,
          password: credentials.password,
        });
  
        // Step 3: Store ID and role in localStorage
        if (idRes.data.role === 'student') {
          localStorage.setItem('role', 'student');
          localStorage.setItem('student_id', idRes.data.student_id);
          localStorage.setItem('project_id', idRes.data.project_id);

        } else {
          localStorage.setItem('role', idRes.data.role); // 'professor' or 'admin'
          localStorage.setItem('user_id', idRes.data.user_id);
        }
  
        // Step 4: Navigate based on role
        if (role == 3) {
          navigate('/admin-dashboard');
        } else if (role == 2) {
          navigate('/professor-dashboard');
        } else if (role == 1) {
          navigate('/student-dashboard');
        }
      } else {
        setMessage(response.data.message);
      }
    } catch (error) {
      setMessage('User does not exist or an error occurred');
      console.error(error);
    }
  };
  

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleSignIn} className="p-6 bg-white rounded shadow-md h-60 w-90">
       
        <div className="mb-4">
  <Label className="p-1" htmlFor="userNumber">User Number</Label>
  <UserNumberInput
  
    id="userNumber"
    value={userNumber}
    onChange={(e) => setUserNumber(e.target.value)}
    placeholder="Enter your user number"
  />
</div>
<div className="mb-4">
  <Label className="p-1" htmlFor="birthdate">Birthdate</Label>
  <BirthdateInput
    id="birthdate"
    value={password}
    onChange={(e) => setPassword(e.target.value)}
    placeholder="e.g., 19950315"
  />
</div>
<Button type="submit" className="w-full">
          Sign In
        </Button>
{message && <p className="mt-4 text-center">{message}</p>}
      </form>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/professor-dashboard" element={<ProfessorDashboard />} />
        <Route path="/student-dashboard" element={<StudentDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;