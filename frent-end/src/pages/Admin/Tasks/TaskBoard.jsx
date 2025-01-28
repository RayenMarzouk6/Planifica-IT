import { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import axios from 'axios';

const TaskBoard = () => {
  const [tasks, setTasks] = useState({
    pending: [],
    'in-progress': [],
    completed: [],
  });
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    project_id: '',
    assigned_to: '',
    status: 'pending',
    duration: '',
  });
  const [editTask, setEditTask] = useState(null);
  const [employees, setEmployees] = useState([]);
  const [projects, setProjects] = useState([]);

  // Fetch tasks, employees, and projects
  useEffect(() => {
    fetchTasks();
    fetchEmployees();
    fetchProjects();
  }, []);

  const fetchTasks = async () => {
    const response = await axios.get('http://localhost:3010/task/getAllTasks');
    const groupedTasks = response.data.reduce(
      (acc, task) => {
        acc[task.status] = acc[task.status] || [];
        acc[task.status].push(task);
        return acc;
      },
      { pending: [], 'in-progress': [], completed: [] }
    );
    console.log('Grouped Tasks:', groupedTasks); // Debug the structure
    setTasks(groupedTasks);
  };

  const fetchEmployees = async () => {
    const token = localStorage.getItem('jwt');
    const response = await axios.get('http://localhost:3010/user/profiles', {
      headers: { Authorization: token },
    });
    setEmployees(response.data);
  };

  const fetchProjects = async () => {
    const response = await axios.get('http://localhost:3010/project/getAllProjects');
    setProjects(response.data);
  };

  // Handle drag end
  const onDragEnd = async (result) => {
    const { source, destination } = result;

    if (!destination) return;

    const sourceList = tasks[source.droppableId];
    const [movedTask] = sourceList.splice(source.index, 1);
    const destinationList = tasks[destination.droppableId];
    destinationList.splice(destination.index, 0, movedTask);

    setTasks((prev) => ({
      ...prev,
      [source.droppableId]: sourceList,
      [destination.droppableId]: destinationList,
    }));

    try {
      await axios.patch(`http://localhost:3010/task/updateTaskStatus/${movedTask._id}`, {
        status: destination.droppableId,
      });
    } catch (err) {
      console.error('Failed to update task status:', err.message);
    }
  };

  // Add a new task
  const handleAddTask = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3010/task/addTask', newTask);
      setNewTask({
        title: '',
        description: '',
        project_id: '',
        assigned_to: '',
        status: 'pending',
        duration: '',
      });
      fetchTasks();
    } catch (err) {
      console.error('Failed to add task:', err.message);
    }
  };

  // Update a task
  const handleUpdateTask = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:3010/task/updateTask/${editTask._id}`, editTask);
      setEditTask(null);
      fetchTasks();
    } catch (err) {
      console.error('Failed to update task:', err.message);
    }
  };

  // Delete a task
  const handleDeleteTask = async (taskId) => {
    try {
      await axios.delete(`http://localhost:3010/task/deleteTask/${taskId}`);
      fetchTasks();
    } catch (err) {
      console.error('Failed to delete task:', err.message);
    }
  };

  return (
    <div className="p-4">
      {/* Add Task Form */}
      <form onSubmit={handleAddTask} className="mb-6 p-4 bg-gray-100 rounded-md">
        <h2 className="text-xl font-bold mb-4">Add New Task</h2>
        <input
          type="text"
          placeholder="Title"
          value={newTask.title}
          onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
          className="block w-full p-2 mb-2 border rounded-md"
          required
        />
        <textarea
          placeholder="Description (Optional)"
          value={newTask.description}
          onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
          className="block w-full p-2 mb-2 border rounded-md"
        />
        <select
          value={newTask.project_id}
          onChange={(e) => setNewTask({ ...newTask, project_id: e.target.value })}
          className="block w-full p-2 mb-2 border rounded-md"
          required
        >
          <option value="">Select Project</option>
          {projects.map((project) => (
            <option key={project._id} value={project._id}>
              {project.name_project}
            </option>
          ))}
        </select>
        <select
          value={newTask.assigned_to}
          onChange={(e) => setNewTask({ ...newTask, assigned_to: e.target.value })}
          className="block w-full p-2 mb-2 border rounded-md"
          required
        >
          <option value="">Assign to Employee</option>
          {employees.map((employee) => (
            <option key={employee._id} value={employee._id}>
              {employee.name}
            </option>
          ))}
        </select>
        <input
          type="datetime-local"
          value={newTask.duration}
          onChange={(e) => setNewTask({ ...newTask, duration: e.target.value })}
          className="block w-full p-2 mb-2 border rounded-md"
          required
        />
        <select
          value={newTask.status}
          onChange={(e) => setNewTask({ ...newTask, status: e.target.value })}
          className="block w-full p-2 mb-2 border rounded-md"
        >
          <option value="pending">Pending</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md">
          Add Task
        </button>
      </form>

      {/* Task Board */}
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="task-board grid grid-cols-3 gap-4">
          {Object.entries(tasks).map(([status, tasks]) => (
            <Droppable droppableId={status} key={status}>
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className="task-column p-4 bg-gray-200 rounded-md"
                >
                  <h3 className="text-xl font-bold capitalize mb-4">{status}</h3>
                  {tasks.map((task, index) => (
                    <Draggable key={task._id} draggableId={task._id} index={index}>
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className="task-card p-3 mb-3 bg-white shadow rounded-md"
                        >
                          <h4 className="font-bold">{task.title}</h4>
                          <p>{task.description}</p>
                          <div className="flex gap-2 mt-2">
                            <button
                              onClick={() => setEditTask(task)}
                              className="text-sm bg-yellow-500 text-white px-2 py-1 rounded-md"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleDeleteTask(task._id)}
                              className="text-sm bg-red-500 text-white px-2 py-1 rounded-md"
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </DragDropContext>

      {/* Edit Task Modal */}
      {editTask && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-md w-96">
            <h2 className="text-xl font-bold mb-4">Edit Task</h2>
            <form onSubmit={handleUpdateTask}>
              <input
                type="text"
                placeholder="Title"
                value={editTask.title}
                onChange={(e) => setEditTask({ ...editTask, title: e.target.value })}
                className="block w-full p-2 mb-2 border rounded-md"
                required
              />
              <textarea
                placeholder="Description (Optional)"
                value={editTask.description}
                onChange={(e) => setEditTask({ ...editTask, description: e.target.value })}
                className="block w-full p-2 mb-2 border rounded-md"
              />
              <select
                value={editTask.project_id}
                onChange={(e) => setEditTask({ ...editTask, project_id: e.target.value })}
                className="block w-full p-2 mb-2 border rounded-md"
                required
              >
                <option value="">Select Project</option>
                {projects.map((project) => (
                  <option key={project._id} value={project._id}>
                    {project.name_project}
                  </option>
                ))}
              </select>
              <select
                value={editTask.assigned_to}
                onChange={(e) => setEditTask({ ...editTask, assigned_to: e.target.value })}
                className="block w-full p-2 mb-2 border rounded-md"
                required
              >
                <option value="">Assign to Employee</option>
                {employees.map((employee) => (
                  <option key={employee._id} value={employee._id}>
                    {employee.name}
                  </option>
                ))}
              </select>
              <input
                type="datetime-local"
                value={editTask.duration}
                onChange={(e) => setEditTask({ ...editTask, duration: e.target.value })}
                className="block w-full p-2 mb-2 border rounded-md"
                required
              />
              <select
                value={editTask.status}
                onChange={(e) => setEditTask({ ...editTask, status: e.target.value })}
                className="block w-full p-2 mb-2 border rounded-md"
              >
                <option value="pending">Pending</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
              </select>
              <div className="flex gap-2">
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md">
                  Save
                </button>
                <button
                  type="button"
                  onClick={() => setEditTask(null)}
                  className="bg-gray-500 text-white px-4 py-2 rounded-md"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskBoard;