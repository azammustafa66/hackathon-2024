import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import NavBar from './components/layout/NavBar'
import Home from './components/Home'
import Login from './components/forms/Login'
import SignUp from './components/forms/SignUp'
import RegisterInstitute from './components/forms/RegisterInstitute'
import Exam from './components/exams/Exam'
import Exams from './Exams'
import FourOhFour from './components/error/404'
import ConductExam from './components/exams/ConductExam'

export default function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/register-institute' element={<RegisterInstitute />} />
        <Route path='/exams' element={<Exams />} />
        <Route path='/exam' element={<Exam />} />
        <Route path='/conduct-exam' element={<ConductExam />} />
        <Route path='*' element={<FourOhFour />} />
      </Routes>
    </Router>
  )
}
