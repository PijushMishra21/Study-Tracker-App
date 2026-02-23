import { useState,  } from "react";
import Timer from '../componenets/Timer' ;
import { useNavigate } from "react-router-dom";


export default function StudyTracker() {
  const [subjects, setSubjects] = useState([]);
  const [subInput, setSubInput] = useState("");
  const [selectedSubjectId, setSelectedSubjectId] = useState(null);
  const [error, setError] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const navigate = useNavigate();

  const [sessions, setSessions] = useState(() => {
    const saved = localStorage.getItem("sessions");
    return saved ? JSON.parse(saved) : [];

  });
  // Handle add subject
  const handleAddSubjects = () => {
     if (subInput.trim() === "") {
      setError('Please enter your subjects')
   }else{
      const  newSubject = {
      id : Date.now(),
      name: subInput.toUpperCase().trim(),
      time : 0,
    }
      setSubjects(prev => [...prev, newSubject]);
      setSubInput("");
      setError('')
  }
  };
  // Handle remove subject
  const handleRemoveSubjects = (id) => {
    setSubjects((prev) => prev.filter((subject) => subject.id !== id));
    if (selectedSubjectId === id) {
      setSelectedSubjectId(null);
    }
  };

  // Save session
  const handleSessionSave = () => {
    const newSession = {
      id: Date.now(),
      duration: currentTime,
      date: new Date().toLocaleDateString(),
      time: new Date().toLocaleTimeString(),
      subjectId: selectedSubjectId,
    };
    const updated = [newSession, ...sessions];
    setSessions(updated);
    localStorage.setItem("sessions", JSON.stringify(updated));
    setCurrentTime(0);
    setIsRunning(false);
    setSubjects((prev) =>
      prev.map((subject) =>
        subject.id === selectedSubjectId
          ? { ...subject, time: subject.time + currentTime }
          : subject
      )
    );
  };

  const handleSessionRemove = (id) => {
    const updated = sessions.filter((s) => s.id !== id);
    setSessions(updated);
    localStorage.setItem("sessions", JSON.stringify(updated));
  };

  const formatTime = (totalSeconds) => {
    const mins = Math.floor(totalSeconds / 60)
      .toString()
      .padStart(2, "0");
    const secs = (totalSeconds % 60).toString().padStart(2, "0");
    return `${mins}:${secs}`;
  };


  return (
    <section className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-xl mx-auto bg-white shadow-md rounded-lg p-6">
        <header className="flex justify-between items-center mb-4">
          <h1 className="text-xl font-bold text-black-600">📚 StudyTime Tracker App</h1>
          <button className="px-4 py-2 text-sm font-semibold 
          border border-red-500 text-red-600 
          rounded-lg 
          hover:bg-red-500 hover:text-white 
          transition duration-300"
          onClick={() => navigate("/")}>Logout</button>
        </header>

        {/* Subject Input */}
        <div className="text-center mb-6 space-y-2">
          <input
            type="text"
            value={subInput}
            placeholder="Add your subjects..."
            onChange={(e) => setSubInput(e.target.value)}
            className="border p-2 w-full rounded"
          />
            {error && <p className="text-red-500 text-sm">{error}</p>}
          <button
            onClick={handleAddSubjects}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full"
          >
            ➕ Add Subject
          </button>
        </div>

        {/* Subject List */}
     <main>   
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-2">🎯 Subjects</h2>
          { subjects.length === 0 ? (
            <p className="text-gray-500">No subjects yet.</p>
          ) : (
            <ul className="space-y-2">
              {subjects.map((sub) => (
                <li
                  key={sub.id}
                  className={`p-2 rounded flex justify-between items-center cursor-pointer ${
                    selectedSubjectId === sub.id
                      ? "bg-blue-100 border border-gray-400"
                      : "bg-green-100"
                  }`}
                  onClick={() => setSelectedSubjectId(sub.id)}
                >
                  <span>
                    {sub.name} — {formatTime(sub.time)}
                  </span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemoveSubjects(sub.id);
                    }}
                    className="text-sm text-red-500"
                  >
                    ❌
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Timer */}
        <Timer 
        isRunning={isRunning} 
        onTick={setCurrentTime} />

        {/* Controls */}
        <div className="space-x-4 text-center mt-4">
          <button
            onClick={() => setIsRunning(!isRunning)}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            disabled={!selectedSubjectId}
          >
            {isRunning ? "⏸️ Pause" : "▶️ Start"}
          </button>
          <button
            onClick={handleSessionSave}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            disabled={currentTime === 0 || isRunning || !selectedSubjectId}
          >
            💾 Save Session
          </button>
        </div>
</main>
        {/* Session List */}

        <hr className="my-6" />

        <footer>
         <h2 className="text-lg font-semibold mb-2">📅 Today Sessions</h2>
        {sessions.length === 0 ? (
          <p className="text-gray-500">No sessions yet.</p>
        ) : (
          <ol className="space-y-2">
            {sessions.map((session) => {
              const subject = subjects.find((s) => s.id === session.subjectId);
              return (
                <li key={session.id} className="text-sm flex justify-between">
                  <span className="font-mono">
                    {subject?.name || "Unknown Subject"} —{" "}
                    {formatTime(session.duration)} at {session.time} on{" "}
                    {session.date}
                  </span>
                  <button
                    onClick={() => handleSessionRemove(session.id)}
                    className="text-red-400 hover:underline"
                  >
                    Remove
                  </button>
                </li>
              );
            })}
          </ol>
        )}
        </footer> 
      </div>
    </section>
  );
}








