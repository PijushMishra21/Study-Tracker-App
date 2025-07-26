// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { saveToken } from "../auth/auth";
// import api from './../auth/api';

// export default function Login() {
//   const [email, setEmail] = useState(''); 
//   const [password, setPassword] = useState("");  
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError("");
//     navigate("./StudyTracker");
//     console.log('clicked')
//     try {
//       const res = await api.post("/login", { email, password });
//       saveToken(res.data.token);
//       navigate("/StudyTracker");
//     } catch (err) {
//       setError("Invalid credentials. Try again.");
//     } finally {
//       setLoading(false);
//     }
//   };


//   return (
//     <section className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
//       <div className="bg-white shadow-md rounded-xl p-8 w-full max-w-md">
//         <header>
//          <h2 className="text-2xl font-bold mb-6 text-center text-blue-600">
//           Study Tracker Login
//         </h2>
//         </header>
//         <main>
//          <form onSubmit={handleLogin} className="space-y-4">
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Email:  
//             </label>
//             <input
//               type="email"
//               className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required 
              
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Password: 
//             </label>
//             <input
//               type="password"
//               className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//             />
//           </div>

//           {error && <p className="text-red-500 text-sm">{error}</p>}

          
//         <footer>
//           <button
//             type="submit"
//             className="w-full bg-blue-600 text-white font-semibold py-2 rounded hover:bg-blue-700 transition"
//             disabled={loading}
//           >
//             {loading ? "Logging in..." : "Login"}
//           </button>
//         </footer>
//         </form>
//         </main>

//       </div>
//     </section>
//   );
// }
