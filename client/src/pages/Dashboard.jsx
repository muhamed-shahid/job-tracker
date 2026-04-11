import { useEffect, useState } from "react";
import API from "../services/api";
import toast from "react-hot-toast";

export default function Dashboard() {
    const [jobs, setJobs] = useState([]);

    const [form, setForm] = useState({
        company: "",
        position: "",
        status: "Applied"
    });

    const[editId, setEditId] = useState(null)

    // 🔹 Fetch jobs
    const fetchJobs = async () => {
        try {
            const res = await API.get("/jobs");
            console.log(res.data); // debug
            setJobs(res.data.data); // ✅ IMPORTANT FIX
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        fetchJobs();
    }, []);

    // 🔹 Add job
    const handleAddJob = async (e) => {
        e.preventDefault();
        try {
            if(editId){
                await API.put(`/jobs/${editId}`,form)
                toast.success("Job updated")
            }else{
            await API.post("/jobs", form);
            toast.success("Job added succesfully")
            }
            // clear form
            setForm({
                company: "",
                position: "",
                status: "Applied"
            });
                
             setEditId(null)   
            fetchJobs(); // refresh
        } catch (err) {
            console.log(err);
            toast.error("Something went wrong")
        }
    };

    // 🔹 Delete job
    const deleteJob = async (id) => {
        const confirmDelete = window.confirm("Are you sure?");
        if(!confirmDelete) return
        try {
            await API.delete(`/jobs/${id}`);
            toast.success("Job deleted")
            fetchJobs();
        } catch (err) {
            console.log(err);
            toast.error("Delete failed")
        }
    };

    return (
        <div className="p-6 max-w-2xl mx-auto">
            <h1 className="text-2xl font-bold mb-4">My Jobs</h1>

            {/* 🔹 Add Job Form */}
            <form
                onSubmit={handleAddJob}
                className="mb-6 flex flex-col gap-2"
            >
                <input
                    placeholder="Company"
                    value={form.company}
                    className="border p-2 rounded"
                    onChange={(e) =>
                        setForm({ ...form, company: e.target.value })
                    }
                />

                <input
                    placeholder="Position"
                    value={form.position}
                    className="border p-2 rounded"
                    onChange={(e) =>
                        setForm({ ...form, position: e.target.value })
                    }
                />

                <button className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
                    Add Job
                </button>
                <select value={form.status} className="border p-2 rounded" onChange={(e)=>setForm({...form, status: e.target.value})}>
                    <option value="Applied">Applied</option>
                    <option value="Interview">Interview</option>
                    <option value="Rejected">Rejected</option>
                </select>
            </form>

            {/* 🔹 Job List */}
            <div className="p-4 border rounded-lg shadow flex justify-between items-center bg-white hover:shadow-md transition">
                {Array.isArray(jobs) && jobs.length > 0 ? (
                    jobs.map((job) => (
                        <div
                            key={job._id}
                            className="p-4 border rounded shadow flex justify-between items-center"
                        >
                            <div>
                                <h2 className="font-bold">
                                    {job.company}
                                </h2>
                                <p>{job.position}</p>
                                <p className={`text-sm font-semibold ${
                                    job.status === "Applied"?"text-blue-500":
                                    job.status === "Interview"?"text-yellow-500":
                                    "text-red-500"
                                    }`}>
                                    {job.status}
                                </p>
                            </div>
                            <button onClick={()=>{
                                setForm({
                                    company:job.company,
                                    position:job.position,
                                    status: job.status
                                })
                                setEditId(job._id)
                            }} className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600">
                                Edit

                            </button>

                            <button
                                onClick={() => deleteJob(job._id)}
                                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                            >
                                Delete
                            </button>
                        </div>
                    ))
                ) : (
                    <p className="text-gray-500">No jobs found</p>
                )}
            </div>
        </div>
    );
}