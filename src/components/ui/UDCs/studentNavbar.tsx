import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../../components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../../../components/ui/dialog";
import { Tabs, TabsList, TabsTrigger } from "../../../components/ui/tabs";
import {Card,CardContent,CardDescription,CardHeader,CardTitle,} from "../../../components/ui/card";
import { Badge } from '../../../components/ui/badge';



interface Professor {
    user_id: number;
    user_number: number;
    name: string;
  }
  
  interface Student {
    student_id: number;
    user_id: number;
    user_number: number;
    name: string;
    email: string;
  }
  
  interface ProjectFormData {
    title: string;
    description: string;
    supervisor_id: number | null;
    student_id: number | null;
    teammate_id: number | null;
  }
  






interface GradeData {
  grade_id: number;
  professor: {
    professor_id: number;
    name: string;
    email: string;
  };
  score: string;
  comment: string;
}

interface DefenseGradeData {
  defense_id: number;
  defense_date: string;
  defense_location: string;
  project: {
    project_id: number;
    title: string;
    description: string;
  };
  student: {
    student_id: number;
    name: string;
    email: string;
  };
  grades: GradeData[];
  average_score: number;
}

// Function to remove duplicate grades (taking only unique professor IDs)
const removeDuplicateGrades = (grades: GradeData[]): GradeData[] => {
  const uniqueGrades = new Map<number, GradeData>();
  
  grades.forEach(grade => {
    uniqueGrades.set(grade.professor.professor_id, grade);
  });
  
  return Array.from(uniqueGrades.values());
};

// Function to calculate the real average score from unique grades
const calculateFinalScore = (grades: GradeData[]): number => {
  const uniqueGrades = removeDuplicateGrades(grades);
  if (uniqueGrades.length === 0) return 0;
  
  const sum = uniqueGrades.reduce((total, grade) => total + parseFloat(grade.score), 0);
  return parseFloat((sum / uniqueGrades.length).toFixed(2));
};

export default function AddProject() {
  const [isOpen, setIsOpen] = useState(false);
  const [project, setProject] = useState<any>(null);
  const [gradesData, setGradesData] = useState<DefenseGradeData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  
  // Rest of your existing state variables...
  const [professors, setProfessors] = useState<Professor[]>([]);
  const [filteredProfessors, setFilteredProfessors] = useState<Professor[]>([]);
  const [selectedProfessor, setSelectedProfessor] = useState<Professor | null>(null);

  const [students, setStudents] = useState<Student[]>([]);
  const [filteredStudents, setFilteredStudents] = useState<Student[]>([]);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);

  const [formData, setFormData] = useState<ProjectFormData>({
    title: "",
    description: "",
    supervisor_id: null,
    student_id: null,
    teammate_id: null,
  });

  useEffect(() => {
    const storedStudentId = localStorage.getItem("student_id");
    const storedProjectId = localStorage.getItem("project_id");

    console.log("pro_id", storedProjectId);
    console.log("stu_id", storedStudentId);

    if (storedStudentId) {
      setFormData((prev) => ({
        ...prev,
        student_id: parseInt(storedStudentId),
      }));
      
      // Fetch grades for this student
      setIsLoading(true);
      fetch(`http://localhost:5000/student/grades/${storedStudentId}`)
        .then(res => res.json())
        .then(data => {
          setGradesData(data);
          setIsLoading(false);
        })
        .catch(err => {
          console.error("Error fetching grades:", err);
          setIsLoading(false);
        });
    }

    if (
      storedProjectId &&
      storedProjectId !== "null" &&
      storedProjectId !== "undefined"
    ) {
      fetch(`http://localhost:5000/student/project/${storedProjectId}`)
        .then((res) => res.json())
        .then((data) => setProject(data))
        .catch((err) => console.error("Error fetching project:", err));
    } else {
      console.warn("No valid storedProjectId found:", storedProjectId);
    }

    // fetch("http://localhost:5000/student/no-project")
    //   .then((res) => res.json())
    //   .then((data: Student[]) => setStudents(data))
    //   .catch((err) => console.error("Error fetching students:", err));
    fetch("http://localhost:5000/student/no-project")
  .then((res) => res.json())
  .then((data: Student[]) => {
    const currentStudentId = parseInt(localStorage.getItem("student_id") || "-1");
    const filteredData = data.filter(student => student.student_id !== currentStudentId);
    setStudents(filteredData);
  })
  .catch((err) => console.error("Error fetching students:", err));

  }, []);

  // Rest of your existing functions...
  const handleSearchProfessors = (query: string): void => {
    if (!query.trim()) return setFilteredProfessors([]);
    const filtered = professors.filter(
      (prof) =>
        prof.name.toLowerCase().includes(query.toLowerCase()) ||
        prof.user_number.toString().includes(query)
    );
    setFilteredProfessors(filtered);
  };

  const handleSearchStudents = (query: string): void => {
    if (!query.trim()) return setFilteredStudents([]);
    const filtered = students.filter(
      (stud) =>
        stud.name.toLowerCase().includes(query.toLowerCase()) ||
        stud.user_number.toString().includes(query)
    );
    setFilteredStudents(filtered);
  };

  const handleSelectProfessor = (prof: Professor) => {
    setSelectedProfessor(prof);
    setFormData({ ...formData, supervisor_id: prof.user_id });
    setFilteredProfessors([]);
  };

  const handleSelectStudent = (stud: Student) => {
    setSelectedStudent(stud);
    setFormData({ ...formData, teammate_id: stud.student_id });
    setFilteredStudents([]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if ( !formData.student_id) {
      alert("Please select a professor and ensure you are logged in.");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/student/add-project", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        console.log("Project added successfully!");
        const data = await res.json();
        if (data.project_id) {
          localStorage.setItem("project_id", String(data.project_id));
          setProject(data); // set project to display it right away
        }
        setIsOpen(false);
        window.location.reload();
      } else {
        console.log("Failed to add project");
      }
    } catch (err) {
      console.error("Error adding project:", err);
    }
  };

  // Find the relevant defense for this project
  const relevantDefense = project && gradesData.length > 0 
    ? gradesData.find(defense => defense.project.project_id === project.project_id)
    : null;

  // Get unique grades if there's a relevant defense
  const uniqueGrades = relevantDefense ? removeDuplicateGrades(relevantDefense.grades) : [];
  
  // Calculate final score
  const finalScore = relevantDefense ? calculateFinalScore(relevantDefense.grades) : null;

  return (
    <>
      {!project && (
        <Button variant="outline" onClick={() => setIsOpen(true)}>
          Add Project
        </Button>
      )}

      {project && (
        <Card className="mt-4 w-full max-w-xl">
          <CardHeader>
            <CardTitle>{project.title}</CardTitle>

            {/* Supervisor Information */}
            <CardDescription>
              Supervised by: 
              {project.supervisor?.name ? (
                <span>
                  {project.supervisor.name} (
                  <a href={`mailto:${project.supervisor.email}`} className="text-blue-600 underline">
                    {project.supervisor.email}
                  </a>)
                </span>
              ) : (
                <span className="text-muted-foreground">Supervisor not assigned</span>
              )}
            </CardDescription>
          </CardHeader>

          <CardContent>
            <p className="text-sm text-muted-foreground">{project.description}</p>

            {/* Defense Information */}
            <div className="mt-4">
              <h3 className="font-semibold text-lg">Defense</h3>
              {project.defense ? (
                <div>
                  <p>
                    <strong>Location:</strong> {project.defense.location}
                  </p>
                  <p>
                    <strong>Defense Date:</strong> {new Date(project.defense.defense_date).toLocaleString()}
                  </p>
                </div>
              ) : (
                <p className="text-muted-foreground">Defense not assigned</p>
              )}
            </div>

            {/* Grades Section */}
            {isLoading ? (
              <div className="mt-4">
                <p className="text-sm text-muted-foreground">Loading grades...</p>
              </div>
            ) : relevantDefense ? (
              <div className="mt-6">
                <h3 className="font-semibold text-lg mb-2">Grades</h3>
                
                <div className="space-y-2">
                  {uniqueGrades.length > 0 ? (
                    uniqueGrades.map((grade, index) => (
                      <div key={index} className="flex justify-between items-center p-2 border rounded">
                        <div>
                          <p className="font-medium">{grade.professor.name}</p>
                          <p className="text-xs text-gray-500">{grade.professor.email}</p>
                          {grade.comment && (
                            <p className="text-sm mt-1 italic">"{grade.comment}"</p>
                          )}
                        </div>
                        <Badge className={parseFloat(grade.score) >= 10 ? 'bg-green-500' : 'bg-red-500'}>
                          {parseFloat(grade.score).toFixed(2)}/20
                        </Badge>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-muted-foreground">No grades available yet</p>
                  )}
                </div>
                
                {finalScore !== null && (
                  <div className="mt-4 p-3 border-t pt-3">
                    <div className="flex justify-between items-center">
                      <p className="font-semibold text-lg">Final Score:</p>
                      <Badge className={finalScore >= 10 ? 'bg-green-600 text-lg p-2' : 'bg-red-600 text-lg p-2'}>
                        {finalScore.toFixed(2)}/20
                      </Badge>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="mt-4">
                <p className="text-sm text-muted-foreground">No grades available yet</p>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        {/* Dialog content remains the same as your original code */}
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Project</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block">Project Title</label>
              <Input
                type="text"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                required
              />
            </div>
            <div>
              <label className="block">Description</label>
              <Input
                type="text"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                required
              />
            </div>

            {filteredProfessors.length > 0 && (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>User Number</TableHead>
                    <TableHead>Select</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {/* Professor rows would go here */}
                </TableBody>
              </Table>
            )}

            {selectedProfessor && (
              <div className="p-2 bg-gray-100 rounded-md">
                <strong>Selected Supervisor:</strong> {selectedProfessor.name} (#
                {selectedProfessor.user_number})
              </div>
            )}

            <div>
              <label className="block">Search Teammate (Optional)</label>
              <Input
                type="text"
                placeholder="Enter student name or user number"
                onChange={(e) => handleSearchStudents(e.target.value)}
              />
            </div>
            {filteredStudents.length > 0 && (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>User Number</TableHead>
                    <TableHead>Select</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredStudents.map((stud) => (
                    <TableRow key={stud.student_id}>
                      <TableCell>{stud.name}</TableCell>
                      <TableCell>{stud.user_number}</TableCell>
                      <TableCell>
                        <Button onClick={() => handleSelectStudent(stud)}>
                          Select
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
            {selectedStudent && (
              <div className="p-2 bg-green-100 rounded-md">
                <strong>Selected Teammate:</strong> {selectedStudent.name} (#
                {selectedStudent.user_number})
              </div>
            )}

            <Button type="submit">Submit Project</Button>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}