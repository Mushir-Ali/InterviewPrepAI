import React from 'react'
import {BrowserRouter as Router , Routes ,Route } from 'react-router-dom';
import {Toaster} from 'react-hot-toast';

import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Home/Dashboard';
import InterviewPrep from './pages/InterviewPrep/InterviewPrep';


const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          {/* Default route */}
          <Route path='/' element={<LandingPage />} />
          {/* <Route path='/login' element={<Login />} />
          <Route path='/signUp' element={<SignUp />} /> */}
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/interview-pep/:sessionId' element={<InterviewPrep />} />
        </Routes>
      </Router>


      <Toaster toastOptions={{
        className: "",
        style: {
          fontSize: "13px",
        },
      }}
      />
    </div>
  )
}

export default App