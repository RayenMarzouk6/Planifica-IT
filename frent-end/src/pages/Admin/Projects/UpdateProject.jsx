import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import alertify from "alertifyjs";
import "alertifyjs/build/css/alertify.css";
import "alertifyjs/build/css/themes/default.css";
import { Typography } from '@mui/material';

const UpdateProject = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [projectData, setProjectData] = useState({
    name_project: "",
    description: "",
    budget: "",
    start_day: "",
    end_day: "",
    logo: null,
    document: null,
  });

  useEffect(() => {
    const fetchOneProject = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`http://localhost:3010/project/projects/${projectId}`);
        if (res.status === 200) {
          const data = res.data;
          setProjectData({
            name_project: data.name_project || "",
            description: data.description || "",
            budget: data.budget || "",
            start_day: data.start_day ? data.start_day.split("T")[0] : "", // Format date
            end_day: data.end_day ? data.end_day.split("T")[0] : "", // Format date
            logo: null,
            document: null,
          });
        } else {
          alertify.error("Unexpected response status.");
        }
      } catch (err) {
        console.error(err);
        alertify.error("Failed to fetch project details.");
      } finally {
        setLoading(false);
      }
    };

    fetchOneProject();
  }, [projectId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProjectData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setProjectData((prev) => ({ ...prev, [name]: files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData();
      Object.keys(projectData).forEach((key) => {
        if (projectData[key]) {
          formData.append(key, projectData[key]);
        }
      });

      const token = localStorage.getItem("jwt");
      const updated = await axios.put(`http://localhost:3010/project/projects/${projectId}`, formData, {
        headers: {
          Authorization: token,
          "Content-Type": "multipart/form-data",
        },
      });

      if (updated.status === 200) {
        alertify.success("Project updated successfully!");
        navigate('/admin/project');
      } else {
        alertify.error("Failed to update project.");
      }
    } catch (err) {
      console.error(err);
      alertify.error("Failed to update project.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Update Project</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium">Project Name</label>
          <input
            type="text"
            name="name_project"
            value={projectData.name_project}
            onChange={handleChange}
            className="border rounded w-full p-2"
            required
          />
        </div>
        <div>
          <label className="block font-medium">Description</label>
          <textarea
            name="description"
            value={projectData.description}
            onChange={handleChange}
            className="border rounded w-full p-2"
            required
          />
        </div>
        <div>
          <label className="block font-medium">Budget</label>
          <input
            type="number"
            name="budget"
            value={projectData.budget}
            onChange={handleChange}
            className="border rounded w-full p-2"
            required
          />
        </div>
        <div>
          <label className="block font-medium">Start Day</label>
          <input
            type="date"
            name="start_day"
            value={projectData.start_day}
            onChange={handleChange}
            className="border rounded w-full p-2"
            required
          />
        </div>
        <div>
          <label className="block font-medium">End Day</label>
          <input
            type="date"
            name="end_day"
            value={projectData.end_day}
            onChange={handleChange}
            className="border rounded w-full p-2"
            required
          />
        </div>
        <div>
          <label className="block font-medium">Logo</label>
          <input
            type="file"
            name="logo"
            accept="image/*"
            onChange={handleFileChange}
            className="border rounded w-full p-2"
          />
        </div>
        <div>
          <label className="block font-medium">Document</label>
          <input
            type="file"
            name="document"
            accept=".pdf,.doc,.docx"
            onChange={handleFileChange}
            className="border rounded w-full p-2"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
          disabled={loading}
        >
          {loading ? 'Updating...' : 'Update Project'}
        </button>
      </form>
    </div>
  );
};

export default UpdateProject;
