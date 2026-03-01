import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import StudyTracker from "./pages/StudyTracker";
import { GoogleOAuthProvider } from '@react-oauth/google';

function App() {
  return (
   <GoogleOAuthProvider clientId="196713875352-1j3s4inp86d0kb25skuirnsd1ii3bhsq.apps.googleusercontent.com">
     <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
         <Route path="/StudyTracker" element=      {<StudyTracker />} /> 

      </Routes>
    </BrowserRouter>
   </GoogleOAuthProvider>
  );
}

export default App;
