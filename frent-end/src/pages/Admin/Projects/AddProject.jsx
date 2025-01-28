import { useState, useEffect } from "react";
import axios from "axios";

import alertify from "alertifyjs";
import "alertifyjs/build/css/alertify.css";
import "alertifyjs/build/css/themes/default.css";
import { useNavigate } from "react-router";






const AddProject = () => {
  const navigate = useNavigate();
  const [clients, setClients] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [formData, setFormData] = useState({
    name_project: "",
    description: "",
    budget: "",
    start_day: "",
    end_day: "",
    client: "",
    assigned_users: [],
    logo: null,
    document: null,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("jwt");
        if (!token) throw new Error("No JWT token found");

        const [clientsRes, employeesRes] = await Promise.all([
          axios.get("http://localhost:3010/client/getAllClients",{
          headers: { Authorization: `${token}` },
          }),
          axios.get("http://localhost:3010/user/profiles",{
            headers: { Authorization: `${token}` },
          }),
        ]);
        setClients(clientsRes.data);
        setEmployees(employeesRes.data);
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };
    fetchData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData({ ...formData, [name]: files[0] });
  };

  const handleMultiSelectChange = (e) => {
    const options = e.target.options;
    const selectedValues = Array.from(options)
      .filter((option) => option.selected)
      .map((option) => option.value);
    setFormData({ ...formData, assigned_users: selectedValues });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const projectData = new FormData();
    Object.keys(formData).forEach((key) => {
      if (key === "assigned_users") {
        projectData.append(key, JSON.stringify(formData[key]));
      } else {
        projectData.append(key, formData[key]);
      }
    });

    try {
      const response = await axios.post("http://localhost:3010/project/projects", projectData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alertify.success("Project added successfully!");
      console.log(response.data);
      navigate('/admin/project')
    } catch (error) {
      console.error("Error adding project:", error.message);
      alertify.error("Failed to add project.");
    }
  };

  return (
    <div className="p-4 max-w-lg mx-auto">
      <h2 className="text-xl font-bold mb-4">Add New Project</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name_project"
          value={formData.name_project}
          onChange={handleInputChange}
          placeholder="Project Name"
          className="w-full p-2 border rounded"
          required
        />
        <textarea
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          placeholder="Description"
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="number"
          name="budget"
          value={formData.budget}
          onChange={handleInputChange}
          placeholder="Budget"
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="date"
          name="start_day"
          value={formData.start_day}
          onChange={handleInputChange}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="date"
          name="end_day"
          value={formData.end_day}
          onChange={handleInputChange}
          className="w-full p-2 border rounded"
          required
        />

        <select
          name="client"
          value={formData.client}
          onChange={handleInputChange}
          className="w-full p-2 border rounded bg-gray-200"
          required
        >
          <option value="">Select Client</option>
          {clients.map((client) => (
            <option key={client._id} value={client._id}>
              {client.client_name}
            </option>
          ))}
        </select>

        <select
          name="assigned_users"
          multiple
          value={formData.assigned_users}
          onChange={handleMultiSelectChange}
          className="w-full p-2 border rounded"
        >
          {employees.map((employee) => (
            <option key={employee._id} value={employee._id}>
              {employee.name}
            </option>
          ))}
        </select>

        <input
          type="file"
          name="logo"
          onChange={handleFileChange}
          accept="image/*"
          className="w-full p-2 border rounded"
        />
        <input
          type="file"
          name="document"
          onChange={handleFileChange}
          accept=".pdf,.doc,.docx"
          className="w-full p-2 border rounded"
        />

        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">
          Add Project
        </button>
      </form>
    </div>
  );
};

export default AddProject;
