import { useState, useEffect } from "react";
import { Button } from "../../../components/ui/button";
import { Plus, Trash } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../../components/ui/table";
import AddUserDialog from "./add-user"; // Import the new dialog component
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../../../components/ui/dialog";
import { Input } from "../../../components/ui/input"; 
import { Label } from "../../../components/ui/label";





interface AddDefenseDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Project {
  project_id: number;
  title: string;
}

interface Professor {
  user_id: number;
  name: string;
  email: string;
}

export default function AddDefenseDialog({ isOpen, onClose }: AddDefenseDialogProps) {
  const getTomorrowDateTimeLocal = () => {
    const now = new Date();
    now.setDate(now.getDate() + 1); // Add 1 day
    now.setSeconds(0, 0); // Clear seconds & ms
  
    const iso = now.toISOString();
    return iso.slice(0, 16); // Format: 'YYYY-MM-DDTHH:MM'
  };
  

  const [projects, setProjects] = useState<Project[]>([]);
  const [professors, setProfessors] = useState<Professor[]>([]);
  const [selectedProfessors, setSelectedProfessors] = useState<Professor[]>([]);
  const [projectQuery, setProjectQuery] = useState("");
  const [profQuery, setProfQuery] = useState("");
  const [form, setForm] = useState({
    project_id: "",
    defense_date: "",
    location: "",
  });

  useEffect(() => {
    fetch("http://localhost:5000/admin/projects/available")
      .then((res) => res.json())
      .then(setProjects)
      .catch((err) => console.error("Error fetching projects:", err));

    fetch("http://localhost:5000/student/professors")
      .then((res) => res.json())
      .then(setProfessors)
      .catch((err) => console.error("Error fetching professors:", err));
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSelectProject = (id: number) => {
    setForm({ ...form, project_id: String(id) });
  };

  const handleToggleProfessor = (prof: Professor) => {
    const alreadySelected = selectedProfessors.find((p) => p.user_id === prof.user_id);
    if (alreadySelected) {
      setSelectedProfessors(selectedProfessors.filter((p) => p.user_id !== prof.user_id));
    } else {
      setSelectedProfessors([...selectedProfessors, prof]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedProfessors.length < 3) {
     
      return;
    }
    const payload = {
      project_id: Number(form.project_id),
      defense_date: form.defense_date,
      location: form.location,
      professor_ids: selectedProfessors.map((p) => p.user_id),
    };

    try {
      const res = await fetch("http://localhost:5000/admin/add-defense", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        console.log("Defense added successfully!");
        onClose();
        window.location.reload();
      } else {
        const errorData = await res.json(); // assuming JSON error format
        console.error("Failed to add defense:", errorData.message || errorData);

      }
    } catch (err) {
      console.error("Error adding defense:", err);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Defense</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Project Search */}
          <div>
            <Label>Search Project</Label>
            <Input
              placeholder="Search by title"
              value={projectQuery}
              onChange={(e) => setProjectQuery(e.target.value)}
            />
            <div className="max-h-23 overflow-auto mt-2 space-y-1">
              {projects
                .filter((p) =>
                  p.title.toLowerCase().includes(projectQuery.toLowerCase())
                )
                .map((p) => (
                  <div
                    key={p.project_id}
                    className={`cursor-pointer p-2 border rounded ${
                      form.project_id === String(p.project_id)
                        ? "bg-blue-100"
                        : ""
                    }`}
                    onClick={() => handleSelectProject(p.project_id)}
                  >
                    {p.title}
                  </div>
                ))}
            </div>
          </div>

          {/* Date & Time */}
          <div>
            <Label htmlFor="defense_date">Date & Time</Label>
            <Input
              type="datetime-local"
              name="defense_date"
              value={form.defense_date}
              onChange={handleChange}
              min={getTomorrowDateTimeLocal()}
              required
            />

          </div>

          {/* Location */}
          <div>
            <Label htmlFor="location">Location</Label>
            <Input
              type="text"
              name="location"
              value={form.location}
              onChange={handleChange}
              required
            />
          </div>

          {/* Professor Search */}
          <div>
            <Label>Search Professors (max 3)</Label>
            <Input
              placeholder="Search by name or email"
              value={profQuery}
              onChange={(e) => setProfQuery(e.target.value)}
            />
            <div className="max-h-30 overflow-auto mt-2 space-y-1">
              {professors
                .filter(
                  (prof) =>
                    prof.name.toLowerCase().includes(profQuery.toLowerCase()) ||
                    prof.email.toLowerCase().includes(profQuery.toLowerCase())
                )
                .map((prof) => (
                  <div
                    key={prof.user_id}
                    className={`cursor-pointer p-2 border rounded flex justify-between items-center ${
                      selectedProfessors.find((p) => p.user_id === prof.user_id)
                        ? "bg-green-100"
                        : ""
                    }`}
                    onClick={() => handleToggleProfessor(prof)}
                  >
                    <div>
                      <p className="font-medium">{prof.name}</p>
                      <p className="text-sm text-muted-foreground">{prof.email}</p>
                    </div>
                    {selectedProfessors.find((p) => p.user_id === prof.user_id) && (
                      <span className="text-green-600 font-bold">✓</span>
                    )}
                  </div>
                ))}
            </div>
          </div>

          <Button type="submit" className="w-full">
            Add Defense
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
