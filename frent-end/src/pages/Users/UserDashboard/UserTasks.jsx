import {
    Box,
    Paper,
    Typography,
    Stack,
    Checkbox,
    IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import DoneAllIcon from '@mui/icons-material/DoneAll';
import { useEffect, useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const UserTasks = () => {
    const [tasks, setTasks] = useState([]);
    const [deletedTasks, setDeletedTasks] = useState([]);

    // Fetch tasks and track deleted tasks from localStorage
    const getTaskData = async () => {
        try {
            const token = localStorage.getItem("jwt");
            if (token) {
                const decoded = jwtDecode(token);
                const userId = decoded._id;

                const res = await axios.get("http://localhost:3010/task/getAllTasks");
                if (res && res.data) {
                    // Filter tasks assigned to the logged-in user
                    const assignedTasks = res.data.filter(
                        (task) => task.assigned_to && task.assigned_to._id === userId
                    );

                    // Load deleted task IDs from localStorage
                    const storedDeletedTasks = JSON.parse(
                        localStorage.getItem("deletedTasks") || "[]"
                    );

                    setDeletedTasks(storedDeletedTasks);
                    setTasks(assignedTasks);

                    console.log("All tasks:", res.data);
                    console.log("Assigned tasks:", assignedTasks);
                }
            } else {
                console.log("No JWT token found.");
            }
        } catch (err) {
            console.error("Error fetching tasks:", err);
        }
    };

    // Mark task as "deleted" and save to localStorage
    const handleDelete = (id) => {
        const updatedDeletedTasks = [...deletedTasks, id];
        setDeletedTasks(updatedDeletedTasks);

        // Save to localStorage
        localStorage.setItem("deletedTasks", JSON.stringify(updatedDeletedTasks));
    };

    const handleToggleComplete = (id) => {
        setTasks((prevTasks) =>
            prevTasks.map((task) =>
                task._id === id
                    ? { ...task, status: task.status === "completed" ? "pending" : "completed" }
                    : task
            )
        );
    };

    // Exclude "deleted" tasks when rendering active tasks
    const visibleTasks = tasks.filter((task) => !deletedTasks.includes(task._id));

    // Filter tasks that are marked as deleted
    const deletedTasksList = tasks.filter((task) => deletedTasks.includes(task._id));

    useEffect(() => {
        getTaskData();
    }, []);

    return (
        <Box className="pt-6">
            <Stack direction="row" justifyContent="space-between" mb={2}>
                <Typography variant="h5" fontWeight="bold">
                    My Tasks
                </Typography>
            </Stack>

            {/* Active Tasks */}
            <Paper elevation={3} sx={{ padding: 2, marginBottom: 4 }}>
                {visibleTasks.length > 0 ? (
                    visibleTasks.map((task) => (
                        <Stack
                            key={task._id}
                            direction="row"
                            alignItems="center"
                            justifyContent="space-between"
                            sx={{ padding: 1, borderBottom: "1px solid #ddd" }}
                        >
                            <Stack direction="row" alignItems="center" spacing={2}>
                                <Checkbox
                                    checked={task.status === "completed"}
                                    onChange={() => handleToggleComplete(task._id)}
                                />
                                <Typography
                                    variant="body1"
                                    sx={{
                                        textDecoration:
                                            task.status === "completed" ? "line-through" : "none",
                                    }}
                                >
                                    {task.title}
                                </Typography>
                            </Stack>
                            <IconButton onClick={() => handleDelete(task._id)}>
                                <DeleteIcon />
                            </IconButton>
                        </Stack>
                    ))
                ) : (
                    <Typography variant="body1" textAlign="center" color="textSecondary">
                        No tasks available. Add a new task to get started!
                    </Typography>
                )}
            </Paper>

            {/* Deleted Tasks */}
            <Stack direction="row" justifyContent="space-between" mb={2}>
                <Typography variant="h5" fontWeight="bold">
                    The Tasks Completed
                </Typography>
            </Stack>
            <Paper elevation={3} sx={{ padding: 2 }}>
                {deletedTasksList.length > 0 ? (
                    deletedTasksList.map((task) => (
                        <Box key={task._id} sx={{ padding: 1, borderBottom: "1px solid #ddd" }}>
                            <Typography
                                variant="body1"
                                sx={{
                                    textDecoration: "line-through",
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 1,
                                }}
                            >
                                <DoneAllIcon /> {task.title}
                            </Typography>
                        </Box>
                    ))
                ) : (
                    <Typography variant="body1" textAlign="center" color="textSecondary">
                        No completed tasks yet.
                    </Typography>
                )}
            </Paper>
        </Box>
    );
};

export default UserTasks;