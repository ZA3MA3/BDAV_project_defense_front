import { useState, useEffect } from "react";
import { Button } from "../../../components/ui/button";
import { Plus, Trash } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../../components/ui/table";
import AddUserDialog from "./add-user"; // Import the new dialog component
import { Dialog,DialogFooter, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../../../components/ui/dialog";
import { Input } from "../../../components/ui/input";
import AddDefenseDialog from "./add-defense";
import { Label } from "../../../components/ui/label";
import { Alert, AlertDescription } from '../../../components/ui/alert';
import { Textarea } from '../../../components/ui/textarea';


// interface Student {
//   student_id: number;
//   user_id: number;
//   name: string;
//   email: string;
// }

// interface GradeDialogProps {
//   open: boolean;
//   onOpenChange: (open: boolean) => void;
//   defenseId: number | null;
//   students: Student[];
//   professorId: number | null;
//   onGradeSubmitted: () => void;
// }

// const GradeDialog: React.FC<GradeDialogProps> = ({
//   open,
//   onOpenChange,
//   defenseId,
//   students,
//   professorId,
//   onGradeSubmitted
// }) => {
//   const [grades, setGrades] = useState<Record<number, { score: string; comment: string }>>({});
//   const [loading, setLoading] = useState(false);

//   const handleScoreChange = (studentId: number, value: string) => {
//     // Validate input to be between 0-20
//     if (value === '' || (parseFloat(value) >= 0 && parseFloat(value) <= 20)) {
//       setGrades(prev => ({
//         ...prev,
//         [studentId]: { score: value, comment: prev[studentId]?.comment || '' }
//       }));
//     }
//   };

//   const handleCommentChange = (studentId: number, value: string) => {
//     setGrades(prev => ({
//       ...prev,
//       [studentId]: { score: prev[studentId]?.score || '', comment: value }
//     }));
//   };

//   const handleSubmit = async () => {
//     if (!defenseId || !professorId) return;

//     // Validate that all students have scores
//     const allStudentsGraded = students.every(student => 
//       grades[student.student_id]?.score && 
//       !isNaN(parseFloat(grades[student.student_id].score))
//     );

//     if (!allStudentsGraded) {
//       toast({
//         title: "Error",
//         description: "Please provide valid scores for all students",
//         variant: "destructive"
//       });
//       return;
//     }

//     setLoading(true);
//     try {
//       // Submit grades for each student
//       for (const student of students) {
//         const studentGrade = grades[student.student_id];
        
//         await fetch('http://localhost:5000/professor/grades', {
//           method: 'POST',
//           headers: { 'Content-Type': 'application/json' },
//           body: JSON.stringify({
//             student_id: student.student_id,
//             professor_id: professorId,
//             defense_id: defenseId,
//             score: parseFloat(studentGrade.score),
//             comment: studentGrade.comment
//           })
//         });
//       }

//       toast({
//         title: "Success",
//         description: "Grades submitted successfully",
//       });
      
//       // Reset form and close dialog
//       setGrades({});
//       onGradeSubmitted();
//       onOpenChange(false);
//     } catch (error) {
//       console.error('Error submitting grades:', error);
//       toast({
//         title: "Error",
//         description: "Failed to submit grades. Please try again.",
//         variant: "destructive"
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <Dialog open={open} onOpenChange={onOpenChange}>
//       <DialogContent className="sm:max-w-md">
//         <DialogHeader>
//           <DialogTitle>Grade Defense Students</DialogTitle>
//         </DialogHeader>
        
//         <div className="space-y-6 py-4">
//           {students.length === 0 ? (
//             <p className="text-center text-gray-500">No students to grade for this defense</p>
//           ) : (
//             students.map(student => (
//               <div key={student.student_id} className="space-y-2">
//                 <div className="font-medium">{student.name}</div>
//                 <p className="text-sm text-gray-500">{student.email}</p>
                
//                 <div className="grid gap-2">
//                   <Label htmlFor={`score-${student.student_id}`}>Score (0-20)</Label>
//                   <Input
//                     id={`score-${student.student_id}`}
//                     type="number"
//                     min="0"
//                     max="20"
//                     step="0.25"
//                     value={grades[student.student_id]?.score || ''}
//                     onChange={(e) => handleScoreChange(student.student_id, e.target.value)}
//                     placeholder="Enter score (0-20)"
//                   />
//                 </div>
                
//                 <div className="grid gap-2">
//                   <Label htmlFor={`comment-${student.student_id}`}>Comment</Label>
//                   <Textarea
//                     id={`comment-${student.student_id}`}
//                     value={grades[student.student_id]?.comment || ''}
//                     onChange={(e) => handleCommentChange(student.student_id, e.target.value)}
//                     placeholder="Add comments about the student's performance"
//                     className="min-h-24"
//                   />
//                 </div>
//               </div>
//             ))
//           )}
//         </div>
        
//         <DialogFooter>
//           <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
//           <Button 
//             onClick={handleSubmit} 
//             disabled={loading || students.length === 0}
//           >
//             {loading ? 'Submitting...' : 'Submit Grades'}
//           </Button>
//         </DialogFooter>
//       </DialogContent>
//     </Dialog>
//   );
// };

// export default GradeDialog;


interface Student {
    student_id: number;
    user_id: number;
    name: string;
    email: string;
  }
  
  interface GradeDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    defenseId: number | null;
    students: Student[];
    professorId: number | null;
    onGradeSubmitted: () => void;
  }
  
  const GradeDialog: React.FC<GradeDialogProps> = ({
    open,
    onOpenChange,
    defenseId,
    students,
    professorId,
    onGradeSubmitted
  }) => {
    const [grades, setGrades] = useState<Record<number, { score: string; comment: string }>>({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
  
    const handleScoreChange = (studentId: number, value: string) => {
      // Clear any error/success messages when user makes changes
      setError(null);
      setSuccess(null);
      
      // Validate input to be between 0-20
      if (value === '' || (parseFloat(value) >= 0 && parseFloat(value) <= 20)) {
        setGrades(prev => ({
          ...prev,
          [studentId]: { score: value, comment: prev[studentId]?.comment || '' }
        }));
      }
    };
  
    const handleCommentChange = (studentId: number, value: string) => {
      setError(null);
      setSuccess(null);
      
      setGrades(prev => ({
        ...prev,
        [studentId]: { score: prev[studentId]?.score || '', comment: value }
      }));
    };
  
    const handleSubmit = async () => {
      if (!defenseId || !professorId) return;
  
      // Reset messages
      setError(null);
      setSuccess(null);
  
      // Validate that all students have scores
      const allStudentsGraded = students.every(student => 
        grades[student.student_id]?.score && 
        !isNaN(parseFloat(grades[student.student_id].score))
      );
  
      if (!allStudentsGraded) {
        setError("Please provide valid scores for all students");
        return;
      }
  
      setLoading(true);
      try {
        // Submit grades for each student
        for (const student of students) {
          const studentGrade = grades[student.student_id];
          
          await fetch('http://localhost:5000/professor/grades', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              student_id: student.student_id,
              professor_id: professorId,
              defense_id: defenseId,
              score: parseFloat(studentGrade.score),
              comment: studentGrade.comment
            })
          });
        }
  
        setSuccess("Grades submitted successfully");
        
        // Reset form and close dialog after a brief delay to show success message
        setTimeout(() => {
          setGrades({});
          onGradeSubmitted();
          onOpenChange(false);
        }, 1500);
        
      } catch (error) {
        console.error('Error submitting grades:', error);
        setError("Failed to submit grades. Please try again.");
      } finally {
        setLoading(false);
      }
    };
  
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Grade Defense Students</DialogTitle>
          </DialogHeader>
          
          {error && (
            <Alert variant="destructive" className="mt-2">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          
          {success && (
            <Alert className="mt-2 bg-green-50 text-green-800 border-green-200">
              <AlertDescription>{success}</AlertDescription>
            </Alert>
          )}
          
          <div className="space-y-6 py-4">
            {students.length === 0 ? (
              <p className="text-center text-gray-500">No students to grade for this defense</p>
            ) : (
              students.map(student => (
                <div key={student.student_id} className="space-y-2">
                  <div className="font-medium">{student.name}</div>
                  <p className="text-sm text-gray-500">{student.email}</p>
                  
                  <div className="grid gap-2">
                    <Label htmlFor={`score-${student.student_id}`}>Score (0-20)</Label>
                    <Input
                      id={`score-${student.student_id}`}
                      type="number"
                      min="0"
                      max="20"
                      step="0.25"
                      value={grades[student.student_id]?.score || ''}
                      onChange={(e) => handleScoreChange(student.student_id, e.target.value)}
                      placeholder="Enter score (0-20)"
                    />
                  </div>
                  
                  <div className="grid gap-2">
                    <Label htmlFor={`comment-${student.student_id}`}>Comment</Label>
                    <Textarea
                      id={`comment-${student.student_id}`}
                      value={grades[student.student_id]?.comment || ''}
                      onChange={(e) => handleCommentChange(student.student_id, e.target.value)}
                      placeholder="Add comments about the student's performance"
                      className="min-h-15"
                    />
                  </div>
                </div>
              ))
            )}
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
            <Button 
              onClick={handleSubmit} 
              disabled={loading || students.length === 0}
            >
              {loading ? 'Submitting...' : 'Submit Grades'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  };
  
  export default GradeDialog;