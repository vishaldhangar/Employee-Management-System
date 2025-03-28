import { useNavigate } from "react-router-dom";

export const columns = [
  { 
    name: "S No", 
    selector: (row) => row.sno,
    width: "70px",
  },
  { 
    name: "Emp ID", 
    selector: (row) => row.employeeId,
    sortable: true,
    width: "130px",
  },
  { 
    name: "Name", 
    selector: (row) => row.name,
    width: "100px",
  },
  { 
    name: "Leave Type", 
    selector: (row) => row.leaveType,
    width: "120px",
  },
  { 
    name: "Department", 
    selector: (row) => row.department,
    sortable: true,
    width: "130px",
  },
  { 
    name: "Days",
    selector: (row) => row.days,
    width: "80px",
  },
  { 
    name: "Status",
    selector: (row) => row.status,
    width: "120px",
  },
  { 
    name: "Action",
    selector:(row)=>row.action,
    width:"120px",
  },
];

export const LeaveButtons = ({ id }) => {  // ✅ Fixed prop name
  const navigate = useNavigate();

  const handleView = (id) => {
    navigate(`/admin-dashboard/leaves/${id}`);
  };

  return (
    <button
      className="px-4 py-1 bg-teal-500 rounded text-white hover:bg-teal-600"
      onClick={() => handleView(id)} // ✅ Fixed prop reference
    >
      View
    </button>
  );
};
