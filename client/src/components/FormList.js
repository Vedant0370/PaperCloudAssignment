import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getForms, deleteForm } from '../api';

const FormList = () => {
  const [forms, setForms] = useState([]);

  const getData = async () => {
    const response = await getForms();
    setForms(response.data);
  }

  useEffect(() => {
    getData();
  }, []);

  const deleteHandler = async (id) => {
    try {
      await deleteForm(id);
      getData();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold">Welcome to form.com</h1>
        <p className="text-lg">This is a simple form builder</p>
        <Link to="/form/create" className="bg-green-500 text-white px-4 py-2 rounded mt-4 inline-block">Create New Form</Link>
        <div className="border-b-2 border-gray-300 my-4"></div>
      </div>
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {forms.map(form => (
          <li key={form._id} className="p-4 border rounded shadow-md">
            <h2 className="text-xl font-bold text-center mb-2">{form.title}</h2>
            <div className="flex justify-center space-x-4">
              <Link to={`/form/${form._id}`} className="text-green-500 px-4 py-2 rounded">View</Link>
              <Link to={`/form/${form._id}/edit`} className="text-blue-500 px-4 py-2 rounded">Edit</Link>
              <button onClick={() => deleteHandler(form._id)} className="text-red-500 hover:text-red-600 px-4 py-2 rounded">Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FormList;
