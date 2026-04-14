import React, { useState, useEffect } from 'react';
import { Loader2, MoreVertical, Edit2, Trash2, Search, Briefcase, Clock, CheckCircle2, XCircle, LogOut, AlertTriangle } from 'lucide-react';
import toast from 'react-hot-toast';
import API from '../services/api';

const Dashboard = () => {
  const [jobs, setJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const[search,setSearch] = useState("")
  const[filterStatus,setFilterStatus] = useState("All")
  const [showLogoutModal,setShowLogoutModal] = useState(false)

  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
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
      setActiveDropdown(false);
      fetchJobs();

    } catch (err) {
      console.log(err);
      toast.error("Something went wrong");
    }
  };

 const confirmDelete = async () => {
  try {
    await API.delete(`/jobs/${deleteId}`);
    toast.success("Job deleted");
    setDeleteId(null);
    fetchJobs();
  } catch {
    toast.error("Delete failed");
  }
};

  const toggleOptions = (id) => {
    setActiveDropdown(activeDropdown === id ? null : id);
  };

  const handleLogout = ()=>{
    localStorage.removeItem("token")
    window.location.href="/login"
  }

  return (
    <div className="min-h-screen bg-gray-100">

      {/* HEADER */}
      <div className="bg-white shadow px-6 py-4 flex justify-between items-center">

  <div className="flex items-center gap-2">
    <div className="bg-indigo-600 text-white px-2 py-1 rounded">X</div>
    <h1 className="font-bold text-lg">JobTrack</h1>
  </div>

  <div className="flex items-center gap-3">
    <p className="text-gray-600">Welcome back</p>

    <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center font-bold">
      U
    </div>
   <button onClick={()=>setShowLogoutModal(true)} className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors ml-2" title="Logout">
              <LogOut size={20} />
            </button>
  </div>

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

                {/* STATS SECTION */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl p-5 card-shadow border border-slate-100 flex items-center gap-4 transition-all hover:shadow-lg">
            <div className="w-12 h-12 bg-indigo-50 rounded-lg flex items-center justify-center text-indigo-600">
              <Briefcase size={24} />
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-800">{jobs.length}</p>
              <p className="text-sm font-medium text-slate-500">Total Jobs</p>
            </div>
          </div>
          <div className="bg-white rounded-xl p-5 card-shadow border border-slate-100 flex items-center gap-4 transition-all hover:shadow-lg">
            <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center text-blue-600">
              <Clock size={24} />
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-800">{jobs.filter(j=>j.status==="APPLIED").length}</p>
              <p className="text-sm font-medium text-slate-500">Applied</p>
            </div>
          </div>
          <div className="bg-white rounded-xl p-5 card-shadow border border-slate-100 flex items-center gap-4 transition-all hover:shadow-lg">
            <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center text-green-600">
              <CheckCircle2 size={24} />
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-800">{jobs.filter(j=> j.status === "INTERVIEW").length}</p>
              <p className="text-sm font-medium text-slate-500">Interviews</p>
            </div>
          </div>
          <div className="bg-white rounded-xl p-5 card-shadow border border-slate-100 flex items-center gap-4 transition-all hover:shadow-lg">
            <div className="w-12 h-12 bg-red-50 rounded-lg flex items-center justify-center text-red-600">
              <XCircle size={24} />
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-800">{jobs.filter(j=> j.status==="REJECTED").length}</p>
              <p className="text-sm font-medium text-slate-500">Rejected</p>
            </div>
          </div>
        </div>
        
       {/* JOB FILTER AND SEARCH */}
               <div className="bg-white p-4 rounded-xl card-shadow border border-slate-100 mb-8 flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
            <input 
              type="text" 
              placeholder="Search by company or position..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
            />
          </div>
          <div className="sm:w-48">
            <select 
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 bg-white"
            >
              <option value="All">All Statuses</option>
              <option value="APPLIED">APPLIED</option>
              <option value="INTERVIEW">INTERVIEW</option>
              <option value="REJECTED">REJECTED</option>
            </select>
          </div>
        </div>

        {/* JOB LIST */}
        {isLoading ? (
          <div className="flex justify-center py-10">
            <Loader2 className="animate-spin" />
          </div>
        ) : 
          jobs.length === 0 ? (
  <p className="text-center text-gray-400">No jobs found</p>
) : (
          <div className="grid md:grid-cols-3 gap-6">
            {jobs.filter((job)=> {
              const matchesSearch =
            job.company.toLowerCase().includes(search.toLowerCase())||
          job.position.toLowerCase().includes(search.toLowerCase())
        
        const matchesStatus = 
          filterStatus === "All" || job.status === filterStatus

          return matchesSearch && matchesStatus
      })
            .map((job) => (
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
                          onClick={() => {setDeleteId(job._id);
                                    setShowModal(false);}
                          }
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

      {showLogoutModal && (
  <div className="fixed inset-0 bg-black/30 flex justify-center items-center">
    <div className="bg-white p-6 rounded shadow w-80 text-center">

      <h2 className="text-lg font-semibold mb-4">Confirm Logout</h2>
      <p className="text-gray-500 mb-6">Are you sure you want to logout?</p>

      <div className="flex justify-center gap-4">
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Logout
        </button>

        <button
          onClick={() => setShowLogoutModal(false)}
          className="px-4 py-2 border rounded"
        >
          Cancel
        </button>
      </div>

    </div>
  </div>
)}
{deleteId && (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm overflow-hidden transform scale-100 transition-transform">
        <div className="p-6 text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertTriangle className="text-red-600" size={32} />
          </div>
          <h2 className="text-xl font-bold text-slate-800 mb-2">Delete Job?</h2>
          <p className="text-slate-500 mb-6 text-sm">
            Are you sure you want to delete this job application? This action cannot be undone.
          </p>
          
          <div className="flex gap-3 w-full">
            <button
              onClick={()=>{setDeleteId(null)
                            setActiveDropdown(null)
              }}
              disabled={isLoading}
              className="flex-1 btn-secondary"
            >
              Cancel
            </button>
            <button
              onClick={confirmDelete}
              disabled={isLoading}
              className="flex-1 bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-lg transition-all duration-200 active:scale-95 shadow-md shadow-red-200 flex justify-center items-center"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                'Delete'
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
)}
    </div>
  );
};

export default Dashboard;