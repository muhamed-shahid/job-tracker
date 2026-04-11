import React, { useState, useEffect } from 'react';
import { Loader2, MoreVertical, Edit2, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';
import API from '../services/api';

const Dashboard = () => {
  const [jobs, setJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState(null);
  const [activeDropdown, setActiveDropdown] = useState(null);

  const [form, setForm] = useState({
    company: "",
    position: "",
    status: ""
  });

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      setIsLoading(true);
      const res = await API.get("/jobs");
      setJobs(res.data.data);
    } catch {
      toast.error("Failed to fetch jobs");
    } finally {
      setIsLoading(false);
    }
  };

  // ✅ ADD / UPDATE
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editId) {
        await API.put(`/jobs/${editId}`, form);
        toast.success("Job updated");
      } else {
        await API.post("/jobs", form);
        toast.success("Job added");
      }

      setForm({ company: "", position: "", status: "APPLIED" });
      setEditId(null);
      setShowModal(false);
      fetchJobs();

    } catch (err) {
      console.log(err);
      toast.error("Something went wrong");
    }
  };

  const deleteJob = async (id) => {
    if (!window.confirm("Delete this job?")) return;

    try {
      await API.delete(`/jobs/${id}`);
      toast.success("Job deleted");
      fetchJobs();
    } catch {
      toast.error("Delete failed");
    }
  };

  const toggleOptions = (id) => {
    setActiveDropdown(activeDropdown === id ? null : id);
  };

  return (
    <div className="min-h-screen bg-gray-100">

      {/* HEADER */}
      <div className="bg-white shadow p-4 flex justify-between">
        <h1 className="text-xl font-bold text-indigo-600">JobTrack</h1>
        <p>Welcome back</p>
      </div>

      <div className="max-w-6xl mx-auto p-6">

        {/* TITLE */}
        <div className="flex justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold">My Applications</h2>
            <p className="text-gray-500">Track your job journey</p>
          </div>

          <button
            onClick={() => {
              setShowModal(true);
              setEditId(null);
              setForm({ company: "", position: "", status: "APPLIED" });
            }}
            className="bg-indigo-600 text-white px-4 py-2 rounded"
          >
            + Add Application
          </button>
        </div>

        {/* JOB LIST */}
        {isLoading ? (
          <div className="flex justify-center py-10">
            <Loader2 className="animate-spin" />
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-6">
            {jobs.map((job) => (
              <div key={job._id} className="bg-white p-5 rounded-xl shadow">

                <h3 className="font-semibold text-lg">{job.position}</h3>
                <p className="text-gray-500">{job.company}</p>

                <div className="mt-4 flex justify-between items-center">

                  <span className={`px-3 py-1 rounded-full text-sm ${
                    job.status === "APPLIED"
                      ? "bg-blue-100 text-blue-600"
                      : job.status === "INTERVIEW"
                      ? "bg-yellow-100 text-yellow-600"
                      : "bg-red-100 text-red-600"
                  }`}>
                    {job.status}
                  </span>

                  <div className="relative bottom-16">
                    <button onClick={() => toggleOptions(job._id)}>
                      <MoreVertical />
                    </button>

                    {activeDropdown === job._id && (
                      <div className="absolute right-0 bg-white shadow p-2 rounded">

                        <button
                          onClick={() => {
                            setShowModal(true);
                            setEditId(job._id);
                            setForm({
  company: job.company,
  position: job.position,
  status: job.status
});
                          }}
                          className="flex gap-2"
                        >
                          <Edit2 size={16}/> Edit
                        </button>

                        <button
                          onClick={() => deleteJob(job._id)}
                          className="flex gap-2 text-red-500"
                        >
                          <Trash2 size={16}/> Delete
                        </button>

                      </div>
                    )}
                  </div>

                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* MODAL FORM */}
      {showModal && (
        <div className="fixed inset-0 bg-black/30 flex justify-center items-center">
          <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow w-80 flex flex-col gap-3">

            <input
              placeholder="Company"
              value={form.company}
              onChange={(e)=>setForm({...form, company:e.target.value})}
              className="border p-2"
            />

            <input
              placeholder="Position"
              value={form.position}
              onChange={(e)=>setForm({...form, position:e.target.value})}
              className="border p-2"
            />

            <select
              value={form.status}
              onChange={(e)=>setForm({...form, status:e.target.value})}
              className="border p-2"
            >
              <option>APPLIED</option>
              <option>INTERVIEW</option>
              <option>REJECTED</option>
            </select>

            <button className="bg-indigo-600 text-white p-2 rounded">
              {editId ? "Update Job" : "Add Job"}
            </button>

            <button
              type="button"
              onClick={()=>setShowModal(false)}
              className="text-gray-500"
            >
              Cancel
            </button>

          </form>
        </div>
      )}
    </div>
  );
};

export default Dashboard;