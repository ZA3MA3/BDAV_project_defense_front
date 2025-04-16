
import { useState, useEffect } from "react";
import { Button } from "../../../components/ui/button";
import { Plus, Trash } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../../components/ui/table";
import AddUserDialog from "./add-user"; // Import the new dialog component
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../../../components/ui/dialog";
import { Input } from "../../../components/ui/input";
import AddDefenseDialog from "./add-defense";



// type User = {
//   user_id: number;
//   user_number: number;
//   name: string;
//   email: string;
//   role: number; // 1 = Student, 2 = Professor, 3 = Admin
// };

// export default function UsersTable() {
//   const [users, setUsers] = useState<User[]>([]);
//   const [isDialogOpen, setIsDialogOpen] = useState(false);

//   useEffect(() => {
//     fetch("http://localhost:5000/admin/users")
//       .then((res) => res.json())
//       .then((data) => setUsers(data))
//       .catch((err) => console.error("Error fetching users:", err));
//   }, []);

//   const handleDelete = (userId: number) => {
//     console.log(`Deleting user with ID: ${userId}`);
//     // Implement delete logic here
//   };

//   return (
//     <div className="p-4">
//       <div className="flex justify-between mb-4">
//         <h2 className="text-xl font-bold">Users</h2>
//         <Button onClick={() => setIsDialogOpen(true)}>
//           <Plus className="w-4 h-4 mr-2" /> Add User
//         </Button>
//       </div>

//       <Table>
//         <TableHeader>
//           <TableRow>
//             <TableHead className="text-center">ID</TableHead>
//             <TableHead className="text-center">Number</TableHead>
//             <TableHead className="text-center">Name</TableHead>
//             <TableHead className="text-center">Email</TableHead>
//             <TableHead className="text-center">Role</TableHead>
//             <TableHead className="text-center">Action</TableHead>
//           </TableRow>
//         </TableHeader>
//         <TableBody>
//           {users.map((user) => (
//             <TableRow key={user.user_id}>
//               <TableCell>{user.user_id}</TableCell>
//               <TableCell>{user.user_number}</TableCell>
//               <TableCell>{user.name}</TableCell>
//               <TableCell>{user.email}</TableCell>
//               <TableCell>{user.role === 1 ? "Student" : user.role === 2 ? "Professor" : "Admin"}</TableCell>
//               <TableCell>
//                 <Button variant="ghost" onClick={() => handleDelete(user.user_id)}>
//                   <Trash className="w-4 h-4 text-red-500" />
//                 </Button>
//               </TableCell>
//             </TableRow>
//           ))}
//         </TableBody>
//       </Table>

//       {/* Add User Dialog */}
//       <AddUserDialog isOpen={isDialogOpen} onClose={() => setIsDialogOpen(false)} />
//     </div>
//   );
// }






// type User = {
//     user_id: number;
//     user_number: number;
//     name: string;
//     email: string;
//     role: number; // 1 = Student, 2 = Professor, 3 = Admin
//   };
  
//   type Project = {
//     project_id: number;
//     title: string;
//     description: string;
//     supervisor: {
//       user_id: number | null;
//       name: string | null;
//       email: string | null;
//     } | null;
//   };
  
//   export default function UsersTable() {
//     const [users, setUsers] = useState<User[]>([]);
//     const [projects, setProjects] = useState<Project[]>([]);
//     const [isDialogOpen, setIsDialogOpen] = useState(false);
  
//     useEffect(() => {
//       fetch("http://localhost:5000/admin/users")
//         .then((res) => res.json())
//         .then((data) => setUsers(data))
//         .catch((err) => console.error("Error fetching users:", err));
  
//       fetch("http://localhost:5000/admin/projects")
//         .then((res) => res.json())
//         .then((data) => setProjects(data))
//         .catch((err) => console.error("Error fetching projects:", err));
//     }, []);
  
//     const handleDelete = (userId: number) => {
//       console.log(`Deleting user with ID: ${userId}`);
//       // Implement delete logic here
//     };
  
//     const handleAddSupervisor = (projectId: number) => {
//       console.log(`Assign supervisor to project ID: ${projectId}`);
//       // Implement logic to open a dialog or redirect to assignment page
//     };
  
//     return (
//       <div className="p-4 space-y-10">
//         {/* Users Table */}
//         <div>
//           <div className="flex justify-between mb-4">
//             <h2 className="text-xl font-bold">Users</h2>
//             <Button onClick={() => setIsDialogOpen(true)}>
//               <Plus className="w-4 h-4 mr-2" /> Add User
//             </Button>
//           </div>
  
//           <Table>
//             <TableHeader>
//               <TableRow>
//                 <TableHead className="text-center">ID</TableHead>
//                 <TableHead className="text-center">Number</TableHead>
//                 <TableHead className="text-center">Name</TableHead>
//                 <TableHead className="text-center">Email</TableHead>
//                 <TableHead className="text-center">Role</TableHead>
//                 <TableHead className="text-center">Action</TableHead>
//               </TableRow>
//             </TableHeader>
//             <TableBody>
//               {users.map((user) => (
//                 <TableRow key={user.user_id}>
//                   <TableCell>{user.user_id}</TableCell>
//                   <TableCell>{user.user_number}</TableCell>
//                   <TableCell>{user.name}</TableCell>
//                   <TableCell>{user.email}</TableCell>
//                   <TableCell>
//                     {user.role === 1
//                       ? "Student"
//                       : user.role === 2
//                       ? "Professor"
//                       : "Admin"}
//                   </TableCell>
//                   <TableCell>
//                     <Button
//                       variant="ghost"
//                       onClick={() => handleDelete(user.user_id)}
//                     >
//                       <Trash className="w-4 h-4 text-red-500" />
//                     </Button>
//                   </TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
  
//           <AddUserDialog
//             isOpen={isDialogOpen}
//             onClose={() => setIsDialogOpen(false)}
//           />
//         </div>
  
//         {/* Projects Table */}
//         <div>
//           <h2 className="text-xl font-bold mb-4">Projects</h2>
//           <Table>
//             <TableHeader>
//               <TableRow>
//                 <TableHead className="text-center">ID</TableHead>
//                 <TableHead className="text-center">Title</TableHead>
//                 <TableHead className="text-center">Description</TableHead>
//                 <TableHead className="text-center">Supervisor</TableHead>
//                 <TableHead className="text-center">Action</TableHead>
//               </TableRow>
//             </TableHeader>
//             <TableBody>
//               {projects.map((project) => (
//                 <TableRow key={project.project_id}>
//                   <TableCell>{project.project_id}</TableCell>
//                   <TableCell>{project.title}</TableCell>
//                   <TableCell>{project.description}</TableCell>
//                   <TableCell>
//                     {project.supervisor?.name
//                       ? `${project.supervisor.name} (${project.supervisor.email})`
//                       : "—"}
//                   </TableCell>
//                   <TableCell>
//                     <Button
//                       size="sm"
//                       onClick={() => handleAddSupervisor(project.project_id)}
//                     >
//                       {project.supervisor ? "Change Supervisor" : "Add Supervisor"}
//                     </Button>
//                   </TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//         </div>
//       </div>
//     );
//   }
  



type User = {
  user_id: number;
  user_number: number;
  name: string;
  email: string;
  role: number;
};

type Project = {
  project_id: number;
  title: string;
  description: string;
  supervisor: {
    user_id: number | null;
    name: string | null;
    email: string | null;
  } | null;
};

export default function UsersTable() {
  const [defenses, setDefenses] = useState<any[]>([]); // You can type this properly later
  const [isAddDefenseDialogOpen, setIsAddDefenseDialogOpen] = useState(false);
  const [users, setUsers] = useState<User[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [filteredProfs, setFilteredProfs] = useState<User[]>([]);
  const [selectedProjectId, setSelectedProjectId] = useState<number | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isAssignDialogOpen, setIsAssignDialogOpen] = useState(false);

  useEffect(() => {
    fetch("http://localhost:5000/admin/users")
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((err) => console.error("Error fetching users:", err));

   

    fetch("http://localhost:5000/admin/projects")
      .then((res) => res.json())
      .then((data) => setProjects(data))
      .catch((err) => console.error("Error fetching projects:", err));

    fetch("http://localhost:5000/admin/defenses")
      .then((res) => res.json())
      .then((data) => setDefenses(data))
      .catch((err) => console.error("Error fetching defenses:", err));
  
  }, []);

  const handleDelete = (userId: number) => {
    console.log(`Deleting user with ID: ${userId}`);
    // TODO: implement deletion logic
  };

  const handleAddSupervisor = (projectId: number) => {
    setSelectedProjectId(projectId);
    setFilteredProfs([]); // Reset previous search results
    setIsAssignDialogOpen(true);
  };

  const handleSearchProfessor = (query: string) => {
    const filtered = users.filter(
      (u) =>
        u.role === 2 &&
        (u.name.toLowerCase().includes(query.toLowerCase()) ||
         u.user_number.toString().includes(query))
    );
    setFilteredProfs(filtered);
  };

  const assignProfessor = async (professorId: number) => {
    if (!selectedProjectId) return;

    try {
      const res = await fetch(`http://localhost:5000/admin/assign-supervisor`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          project_id: selectedProjectId,
          supervisor_id: professorId,
        }),
      });

      if (res.ok) {
        console.log("Supervisor assigned successfully");
        setIsAssignDialogOpen(false);
        // Refresh projects
        const updatedProjects = await fetch("http://localhost:5000/admin/projects").then((r) => r.json());
        setProjects(updatedProjects);
        window.location.reload();
      } else {
        console.error("Failed to assign supervisor");
      }
    } catch (err) {
      console.error("Error assigning supervisor:", err);
    }
  };

  return (
    <div className="p-4 space-y-10">
      {/* Users Table */}
      <div>
        <div className="flex justify-between mb-4">
          <h2 className="text-xl font-bold">Users</h2>
          <Button onClick={() => setIsDialogOpen(true)}>
            <Plus className="w-4 h-4 mr-2" /> Add User
          </Button>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-center">ID</TableHead>
              <TableHead className="text-center">Number</TableHead>
              <TableHead className="text-center">Name</TableHead>
              <TableHead className="text-center">Email</TableHead>
              <TableHead className="text-center">Role</TableHead>
              <TableHead className="text-center">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.user_id}>
                <TableCell>{user.user_id}</TableCell>
                <TableCell>{user.user_number}</TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  {user.role === 1 ? "Student" : user.role === 2 ? "Professor" : "Admin"}
                </TableCell>
                <TableCell>
                  <Button
                    variant="ghost"
                    onClick={() => handleDelete(user.user_id)}
                  >
                    <Trash className="w-4 h-4 text-red-500" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <AddUserDialog isOpen={isDialogOpen} onClose={() => setIsDialogOpen(false)} />
      </div>

      {/* Projects Table */}
      <div>
        <h2 className="text-xl font-bold mb-4">Projects</h2>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-center">ID</TableHead>
              <TableHead className="text-center">Title</TableHead>
              <TableHead className="text-center">Description</TableHead>
              <TableHead className="text-center">Supervisor</TableHead>
              <TableHead className="text-center">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {projects.map((project) => (
              <TableRow key={project.project_id}>
                <TableCell>{project.project_id}</TableCell>
                <TableCell>{project.title}</TableCell>
                <TableCell>{project.description}</TableCell>
                <TableCell>
                  {project.supervisor?.name
                    ? `${project.supervisor.name} (${project.supervisor.email})`
                    : "—"}
                </TableCell>
                <TableCell>
                  <Button size="sm" onClick={() => handleAddSupervisor(project.project_id)}>
                    {project.supervisor ? "Change Supervisor" : "Add Supervisor"}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Assign Supervisor Dialog */}
      <Dialog open={isAssignDialogOpen} onOpenChange={setIsAssignDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Assign Supervisor</DialogTitle>
          </DialogHeader>
          <Input
            placeholder="Search professors by name or number"
            onChange={(e) => handleSearchProfessor(e.target.value)}
          />
          {filteredProfs.map((prof) => (
            <div
              key={prof.user_id}
              className="flex justify-between items-center p-2 border-b"
            >
              <div>
                <p className="font-medium">{prof.name}</p>
                <p className="text-sm text-muted-foreground">{prof.email}</p>
              </div>
              <Button size="sm" onClick={() => assignProfessor(prof.user_id)}>
                Assign
              </Button>
            </div>
          ))}
        </DialogContent>
      </Dialog>

            {/* Defenses Table */}
    <div>
        <div className="flex justify-between mb-4 mt-10">
            <h2 className="text-xl font-bold">Defenses</h2>
            <Button onClick={() => setIsAddDefenseDialogOpen(true)}>
            <Plus className="w-4 h-4 mr-2" /> Add Defense
            </Button>
        </div>

        <Table>
            <TableHeader>
            <TableRow>
                <TableHead className="text-center">ID</TableHead>
                <TableHead className="text-center">Project</TableHead>
                <TableHead className="text-center">Location</TableHead>
                <TableHead className="text-center">Date</TableHead>
                <TableHead className="text-center">Jury Professors</TableHead>
            </TableRow>
            </TableHeader>
            <TableBody>
            {defenses.map((defense) => (
                <TableRow key={defense.defense_id}>
                <TableCell>{defense.defense_id}</TableCell>
                <TableCell>{defense.project?.title}</TableCell>
                <TableCell>{defense.location}</TableCell>
                <TableCell>
                    {new Date(defense.defense_date).toLocaleString()}
                </TableCell>
                {/* <ul className="list-disc ml-4"></ul> */}
                <TableCell>
                    {defense.professors.length > 0 ? (
                    <div>
                        {defense.professors.map((prof: any) => (
                        <div key={prof.professor_id}>
                            {prof.name} ({prof.email})
                        </div>
                        ))}
                    </div>
                    ) : (
                    "—"
                    )}
                </TableCell>
                </TableRow>
            ))}
            </TableBody>
        </Table>

        <AddDefenseDialog
            isOpen={isAddDefenseDialogOpen}
            onClose={() => setIsAddDefenseDialogOpen(false)}
        />

    </div>

    </div>
  );
}
