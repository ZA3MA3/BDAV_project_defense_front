
import './App.css'
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Button } from "./components/ui/button"
import { Input } from './components/ui/input';
import { Label } from './components/ui/label';
import { UserNumberInput, BirthdateInput } from './components/ui/UDCs/login';
import Footer from './components/ui/UDCs/footer';


import { BrowserRouter as Router, Routes, Route, useNavigate ,useLocation} from 'react-router-dom';
import AdminDashboard from './pages/admin-dashboard';
import ProfessorDashboard from './pages/professor-dashboard';
import StudentDashboard from './pages/student-dashboard';
import Bg from './pages/bg-anim';


   //import './back-anim.css';


/*function App() {
  return (
    <div className="flex flex-col items-center justify-center min-h-svh">
      <Button>Click me</Button>
    </div>
  )
}
 
export default App*/  

function ProtectedRoute({ children, allowedRole }: { children: React.ReactNode; allowedRole: string }) {
  const role = localStorage.getItem('role');
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (role !== allowedRole) {
      // If not authorized, redirect to home page
      navigate('/', { state: { from: location }, replace: true });
    }
  }, [role, allowedRole, navigate, location]);

  return <>{children}</>;
}

function SignIn() {
  const [userNumber, setUserNumber] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  // useEffect(() => {
  //   localStorage.clear();     
  //   sessionStorage.clear();   
  
    
  // }, []);
  
  // useEffect(() => {
  //   if (location.pathname === '/') {
  //     localStorage.clear();
  //     sessionStorage.clear();
  //     console.log("cleared");
  //   }
  // }, [location]);
  

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const credentials = {
        userNumber: parseInt(userNumber),
        password: parseInt(password),
      };
  
      // Step 1: Sign in
      const response = await axios.post('http://localhost:5000/auth/signin', credentials);

      console.log(response,"response");
  
      if (response.data.success) {
        const role = response.data.role;
  
        // Step 2: Identify user/student ID
        const idRes = await axios.post('http://localhost:5000/auth/identify', {
          userNumber: credentials.userNumber,
          password: credentials.password,
        });

        console.log(idRes,"idRes");
  
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


 <div className="relative min-h-screen"> 

<Bg />

<div className="flex justify-center items-center min-h-screen absolute inset-0 z-999">
  <form onSubmit={handleSignIn}className="p-6 bg-white rounded shadow-[0px_4px_12px_2px_rgba(0,0,0,0.5)] h-60 w-90 z-20">
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

<Footer/>
</div> 





  );
}

function App() {
  return (
    <Router>
      <Routes>
        {/* <Route path="/" element={<SignIn />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/professor-dashboard" element={<ProfessorDashboard />} />
        <Route path="/student-dashboard" element={<StudentDashboard />} /> */}


        <Route path="/" element={<SignIn />} />

<Route
  path="/admin-dashboard"
  element={
    <ProtectedRoute allowedRole="admin">
      <AdminDashboard />
    </ProtectedRoute>
  }
/>

<Route
  path="/professor-dashboard"
  element={
    <ProtectedRoute allowedRole="professor">
      <ProfessorDashboard />
    </ProtectedRoute>
  }
/>

<Route
  path="/student-dashboard"
  element={
    <ProtectedRoute allowedRole="student">
      <StudentDashboard />
    </ProtectedRoute>
  }
/>
      </Routes>
    </Router>
  );
}

export default App;