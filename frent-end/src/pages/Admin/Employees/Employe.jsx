import { Add, DeleteOutline } from "@mui/icons-material";
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Avatar, IconButton, Box } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

import alertify from "alertifyjs";
import "alertifyjs/build/css/alertify.css";
import "alertifyjs/build/css/themes/default.css";


const Employe = () => {
  const [employees, setEmployees] = useState([]);
  const navigate = useNavigate()

  const deleteEmploye = (id , role , name)=>{
    
    alertify.confirm(`You whant to delete ${name}?`,
      async function(){
        try{
          const token = localStorage.getItem("jwt"); 
              await axios.delete(`http://localhost:3010/user/deleteProfile/${id}` , {
                headers: {
                  Authorization: token, 
                },
              })
              // Update the state to remove the deleted employee
              setEmployees((prevEmployees) => 
                prevEmployees.filter((employee) => employee._id !== id)
              );

              alertify.success(`Delete the ${role} : ${name}`);

            }
            catch (err){
              console.error('Error deleting Employee:', err);
              alertify.error('Failed to delete Employee.');
            }
          },
          function(){
            alertify.error('Delete action canceled.');
          });

        
      
    
  }

  const fetchEmployees = async () => {
    try {
      const token = localStorage.getItem("jwt"); 
      const res = await axios.get("http://localhost:3010/user/profiles", {
        headers: {
          Authorization: token, 
        },
      });
      console.log("Employees data: ", res.data);
      setEmployees(res.data); 
    } catch (err) {
      console.error("Error fetching employees: ", err);
    }
  };
  

  useEffect(() => {
    fetchEmployees();
  }, []);

  return (
    <>
      <Box sx={{ textAlign: 'right', py: 2 }}>
        <Button
          variant="contained"
          style={{ backgroundColor: '#4C585B' }}
          onClick={() => navigate('/admin/addEmployee')}
        >
          <Add />
          Create Employee
        </Button>
      </Box>
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="employee table">
        <TableHead>
          <TableRow>
            <TableCell>Image</TableCell>
            <TableCell >Employee Name</TableCell>
            <TableCell align="center">Email</TableCell>
            <TableCell align="center">Phone</TableCell>
            <TableCell align="center">Role</TableCell>
            <TableCell align="center">Last Update</TableCell>
            <TableCell align="center">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {employees.map((employee) => (
            <TableRow key={employee._id}>
            <TableCell>
              <Avatar alt={employee.name} src={`http://localhost:3010/${employee.image}`} />
            </TableCell>
            <TableCell>{employee.name}</TableCell>
            <TableCell align="center">{employee.email}</TableCell>
            <TableCell align="center">{employee.phone}</TableCell>
            <TableCell align="center">{employee.role}</TableCell>
            <TableCell align="center">{new Date(employee.updatedAt).toLocaleString()}</TableCell>
            <TableCell align="center">
              {/* <IconButton aria-label="fingerprint" color="success">
                <Fingerprint />
              </IconButton> */}
              <IconButton
                aria-label="edit"
                onClick={() => navigate(`/admin/updateEmplyee/${employee._id}`)}
              >
                <EditOutlinedIcon sx={{ color: "orange" }} />
              </IconButton>
              {employee.role !== "ADMIN" && (
                <IconButton
                  aria-label="delete"
                  color="error"
                  onClick={() => deleteEmploye(employee._id, employee.role, employee.name)}
                >
                  <DeleteOutline />
                </IconButton>
              )}
            </TableCell>
          </TableRow>
          
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </>
  );
};

export default Employe;
