import React, { useEffect, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { format } from 'date-fns'; // You may need to install this if not already: npm install date-fns
import GradeDialog from './gradeDialog';

  
  // Define the types
//   interface Supervisor {
//     name: string;
//     email: string;
//   }
  
//   interface Defense {
//     defense_id: number;
//     project_id: number;
//     defense_date: string;
//     location: string;
//     supervisor: Supervisor;
//   }
  
//   const DefenseCalendar: React.FC = () => {
//     const [events, setEvents] = useState<any[]>([]);
//     const [userId, setUserId] = useState<number | null>(null); // Store the user_id from localStorage

  


//     useEffect(() => {
//         const storedUserId = localStorage.getItem('user_id');
//         console.log(storedUserId, "userid");
//         if (storedUserId) {
//           setUserId(Number(storedUserId));
//         }
//       }, []);
      
//       // Separate useEffect that runs when userId changes
//       useEffect(() => {
//         if (userId) { // Only fetch when userId is available
//           fetchDefenses();
//         }
//       }, [userId]);
      
//       const fetchDefenses = async () => {
//         try {
//           console.log(userId, "userID");
//           const response = await fetch(`http://localhost:5000/professor/defenses/${userId}`);
//           const data: Defense[] = await response.json(); // Type the response as an array of Defense
          
//           const formattedEvents = data.map((defense) => ({
//             id: defense.defense_id,
//             title: `Project ID: ${defense.project_id} - ${defense.supervisor.name}`,
//             date: format(new Date(defense.defense_date), 'yyyy-MM-dd'), // Use the date format FullCalendar expects
//             description: `Location: ${defense.location}, Supervisor: ${defense.supervisor.name} (${defense.supervisor.email})`,
//           }));
  
//           setEvents(formattedEvents);
//         } catch (err) {
//           console.error('Error fetching defenses:', err);
//         }
//       };
  
//     return (
//       <div className="calendar-container" style={{width:'85%',margin: '0 auto'}}>
//         <FullCalendar
//           plugins={[dayGridPlugin, interactionPlugin]}
//           initialView="dayGridMonth"
//           events={events}
//           eventContent={(eventInfo) => (
//             <div className="max-w-xs p-2 break-words whitespace-normal">
//   <b className="block">{eventInfo.event.title}</b>
//   <div className="text-sm text-gray-700">{eventInfo.event.extendedProps.description}</div>
// </div>


//           )}
//           eventClick={(info) => {
//             alert(info.event.title); // You can add a custom function to show more details
//           }}
//         />
//       </div>
//     );
//   };
  
//   export default DefenseCalendar;
  

//works
// interface Supervisor {
//     user_id: number;
//     name: string;
//     email: string;
//   }
  
//   interface Student {
//     student_id: number;
//     user_id: number;
//     name: string;
//     email: string;
//   }
  
//   interface Project {
//     project_id: number;
//     title: string;
//     description: string;
//     supervisor: Supervisor;
//     students: Student[];
//   }
  
//   interface Defense {
//     defense_id: number;
//     defense_date: string;
//     location: string;
//     project: Project;
//   }
  
//   const DefenseCalendar: React.FC = () => {
//     const [events, setEvents] = useState<any[]>([]);
//     const [userId, setUserId] = useState<number | null>(null);
  
//     useEffect(() => {
//       const storedUserId = localStorage.getItem('user_id');
//       if (storedUserId) {
//         setUserId(Number(storedUserId));
//       }
//     }, []);
  
//     useEffect(() => {
//       if (userId) {
//         fetchDefenses();
//       }
//     }, [userId]);
  
//     const fetchDefenses = async () => {
//       try {
//         const response = await fetch(`http://localhost:5000/professor/defenses/${userId}`);
//         const data: Defense[] = await response.json();
  
//         const formattedEvents = data.map((defense) => ({
//           id: defense.defense_id,
//           title: defense.project?.title ?? 'Untitled Project',
//           date: format(new Date(defense.defense_date), 'yyyy-MM-dd'),
//           description: `
//             Location: ${defense.location}
//             Supervisor: ${defense.project?.supervisor?.name ?? 'N/A'} (${defense.project?.supervisor?.email ?? 'N/A'})
//             Students: ${defense.project?.students?.map((s) => s.name).join(', ') || 'None'}
//           `,
//         }));
  
//         setEvents(formattedEvents);
//       } catch (err) {
//         console.error('Error fetching defenses:', err);
//       }
//     };
  
//     return (
//       <div className="calendar-container" style={{ width: '85%', margin: '0 auto' }}>
//         <FullCalendar
//           plugins={[dayGridPlugin, interactionPlugin]}
//           initialView="dayGridMonth"
//           events={events}
//           eventContent={(eventInfo) => (
//             <div className="max-w-xs p-2 break-words whitespace-normal">
//               <b className="block">{eventInfo.event.title}</b>
//               <div className="text-sm text-gray-700">{eventInfo.event.extendedProps.description}</div>
//             </div>
//           )}
//           eventClick={(info) => {
//             alert(info.event.extendedProps.description);
//           }}
//         />
//       </div>
//     );
//   };
  
//   export default DefenseCalendar;



interface Supervisor {
    user_id: number;
    name: string;
    email: string;
  }
  
  interface Student {
    student_id: number;
    user_id: number;
    name: string;
    email: string;
  }
  
  interface Project {
    project_id: number;
    title: string;
    description: string;
    supervisor: Supervisor;
    students: Student[];
  }
  
  interface Defense {
    defense_id: number;
    defense_date: string;
    location: string;
    project: Project;
  }
  
  const DefenseCalendar: React.FC = () => {
    const [events, setEvents] = useState<any[]>([]);
    const [userId, setUserId] = useState<number | null>(null);
    const [allDefenses, setAllDefenses] = useState<Defense[]>([]);
    
    // Dialog state
    const [dialogOpen, setDialogOpen] = useState(false);
    const [selectedDefenseId, setSelectedDefenseId] = useState<number | null>(null);
    const [selectedStudents, setSelectedStudents] = useState<Student[]>([]);
  
    useEffect(() => {
      const storedUserId = localStorage.getItem('user_id');
      if (storedUserId) {
        setUserId(Number(storedUserId));
      }
    }, []);
  
    useEffect(() => {
      if (userId) {
        fetchDefenses();
      }
    }, [userId]);
  
    const fetchDefenses = async () => {
      try {
        const response = await fetch(`http://localhost:5000/professor/defenses/${userId}`);
        const data: Defense[] = await response.json();
        
        // Store all defense data for reference when opening dialog
        setAllDefenses(data);
        
        // const formattedEvents = data.map((defense) => ({
          
        //   id: defense.defense_id,
        //   title: defense.project?.title ?? 'Untitled Project',
        //   // date: format(new Date(defense.defense_date), 'yyyy-MM-dd'),
        //   date: format(new Date(defense.defense_date), 'yyyy-MM-dd'),
        //   description: ` ${defense.location}
        //     Supervisor: ${defense.project?.supervisor?.name ?? 'N/A'} (${defense.project?.supervisor?.email ?? 'N/A'})
        //     Students: ${defense.project?.students?.map((s) => s.name).join(', ') || 'None'}`,
        //   extendedProps: {
        //     defenseId: defense.defense_id
        //   }
        // }));
        const formattedEvents = data.map((defense) => {
          const defenseDate = new Date(defense.defense_date);
          const time = format(defenseDate, 'p'); // e.g., 10:00 AM
        
          return {
            id: defense.defense_id,
            title: defense.project?.title ?? 'Untitled Project',
            date: format(defenseDate, 'yyyy-MM-dd'),
            description: `Time: ${time}
              Location: ${defense.location}
              Supervisor: ${defense.project?.supervisor?.name ?? 'N/A'} (${defense.project?.supervisor?.email ?? 'N/A'})
              Students: ${defense.project?.students?.map((s) => s.name).join(', ') || 'None'}`,
            extendedProps: {
              defenseId: defense.defense_id
            }
          };
        });
        setEvents(formattedEvents);
      } catch (err) {
        console.error('Error fetching defenses:', err);
      }
    };
  
    // const handleEventClick = (info: any) => {
    //   const defenseId = info.event.extendedProps.defenseId;
    //   const defense = allDefenses.find(d => d.defense_id === defenseId);
      
    //   if (defense && defense.project && defense.project.students) {
    //     setSelectedDefenseId(defenseId);
    //     setSelectedStudents(defense.project.students);
    //     setDialogOpen(true);
    //   } else {
    //     console.error('No students found for this defense');
    //   }
    // };
  
    const handleEventClick = (info: any) => {
      const defenseId = info.event.extendedProps.defenseId;
      const defense = allDefenses.find(d => d.defense_id === defenseId);
    
      if (!defense) {
        console.error('Defense not found');
        return;
      }
    
      const now = new Date();
      const defenseDate = new Date(defense.defense_date);
    
      if (now < defenseDate) {
       
        return;
      }
    
      if (defense.project && defense.project.students) {
        setSelectedDefenseId(defenseId);
        setSelectedStudents(defense.project.students);
        setDialogOpen(true);
      } else {
        console.error('No students found for this defense');
      }
    };
    

    return (
      <div className="calendar-container" style={{ width: '85%', margin: '0 auto' }}>
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          events={events}
          eventContent={(eventInfo) => (
            <div className="max-w-xs p-2 break-words whitespace-normal">
              <b className="block">{eventInfo.event.title}</b>
              <div className="text-sm text-gray-700">
                {eventInfo.event.extendedProps.description}
              </div>
            </div>
          )}
          eventClick={handleEventClick}
        />
        
        <GradeDialog
          open={dialogOpen}
          onOpenChange={setDialogOpen}
          defenseId={selectedDefenseId}
          students={selectedStudents}
          professorId={userId}
          onGradeSubmitted={fetchDefenses}
        />
      </div>
    );
  };
  
  export default DefenseCalendar;