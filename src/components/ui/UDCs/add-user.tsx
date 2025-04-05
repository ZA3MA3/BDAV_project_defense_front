

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../../../components/ui/dialog";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { Label } from "../../../components/ui/label";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "../../../components/ui/select";

interface AddUserDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AddUser({ isOpen, onClose }: AddUserDialogProps) {
  const [userData, setUserData] = useState({
    userNumber: "",
    name: "",
    email: "",
    password: "",
    role: "1", // Default role: Student
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleRoleChange = (value: string) => {
    setUserData({ ...userData, role: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const userDataToSubmit = {
      ...userData,
      userNumber: Number(userData.userNumber),
      password: Number(userData.password),
      role: Number(userData.role),
    };

    const endpoint = userDataToSubmit.role === 1 ? "/admin/add-student" : "/admin/add-professor";

    try {
      const res = await fetch(`http://localhost:5000${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userDataToSubmit),
      });

      if (res.ok) {
        console.log("User added successfully!");
        onClose();  
        window.location.reload();
        
      } else {
        console.log("Failed to add user");
      }
    } catch (err) {
      console.error("Error adding user:", err);
      console.log("Something went wrong");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add User</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* User Number */}
          <div>
            <Label htmlFor="userNumber">User Number</Label>
            <Input id="userNumber" name="userNumber" type="number" value={userData.userNumber} onChange={handleChange} required />
          </div>

          {/* Name */}
          <div>
            <Label htmlFor="name">Name</Label>
            <Input id="name" name="name" type="text" value={userData.name} onChange={handleChange} required />
          </div>

          {/* Email */}
          <div>
            <Label htmlFor="email">Email</Label>
            <Input id="email" name="email" type="email" value={userData.email} onChange={handleChange} required />
          </div>

          {/* Password */}
          <div>
            <Label htmlFor="password">Password</Label>
            <Input id="password" name="password" type="password" value={userData.password} onChange={handleChange} required />
          </div>

          {/* Role Selection */}
          <div>
            <Label htmlFor="role">Role</Label>
            <Select onValueChange={handleRoleChange} value={userData.role}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">Student</SelectItem>
                <SelectItem value="2">Professor</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Submit Button */}
          <Button type="submit" className="w-full">
            Add User
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
