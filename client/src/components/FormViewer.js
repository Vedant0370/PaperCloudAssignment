import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getForm } from '../api';

const FormViewer = () => {
  const { id } = useParams();
  const [form, setForm] = useState(null);

  useEffect(() => {
    getForm(id).then(response => setForm(response.data));
  }, [id]);

  if (!form) return <div>Loading...</div>;
  const submitHandler =() =>{
    const data = {
      ...form
    }
    if(!data){
      alert("All fields are required.")
      return;
    }
    alert("Submitted Successfully")
  }
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">{form.title}</h1>
      <div className="grid grid-cols-2 gap-4 mb-4">
        {form.inputs.map((input, index) => (
          <div key={index} className="p-2 border rounded">
            <label className="block text-sm font-bold mb-1">{input.title}</label>
            <input
              type={input.type}
              placeholder={input.placeholder}
              className="w-full p-2 border rounded"
            />
          </div>
        ))}
      </div>
      <button onClick={()=>submitHandler()} className="bg-blue-500 text-white px-4 py-2 rounded">Submit</button>
    </div>
  );
};

export default FormViewer;
