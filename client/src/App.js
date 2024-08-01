import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import CreateForm from './pages/CreateForm';
import EditForm from './pages/EditForm';
import ViewForm from './pages/ViewForm';

const App = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route exact path="/" element={<Home/>} />
          <Route path="/form/create" element={<CreateForm/>} />
          <Route path="/form/:id/edit" element={<EditForm/>} />
          <Route path="/form/:id" element={<ViewForm/>} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
