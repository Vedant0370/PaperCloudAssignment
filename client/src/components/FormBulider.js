import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createForm } from '../api';

const FormBuilder = () => {
  const [title, setTitle] = useState('');
  const [inputs, setInputs] = useState([]);
  const [newInput, setNewInput] = useState({ type: '', title: '', placeholder: '' });
  const [isAdding, setIsAdding] = useState(false);
  const [showTitleInput, setShowTitleInput] = useState(false);
  const [showInputButtons, setShowInputButtons] = useState(false);
  const [draggingIndex, setDraggingIndex] = useState(null);
  const history = useNavigate();

  const openAddInputForm = (type) => {
    setNewInput({ type, title: '', placeholder: '' });
    setIsAdding(true);
  };

  const handleAddInput = () => {
    if (newInput.title) {
      setInputs([...inputs, newInput]);
      setNewInput({ type: '', title: '', placeholder: '' });
      setIsAdding(false);
    } else {
      alert('Input title is required');
    }
  };

  const removeInput = (index) => {
    setInputs(inputs.filter((_, i) => i !== index));
  };

  const saveForm = async () => {
    try {
      if (!title) {
        alert("Title is required");
        return;
      }
      if (inputs.length === 0) {
        alert("At least one input is required");
        return;
      }
      await createForm({ title, inputs });
      history('/');
    } catch (error) {
      console.error('Error saving form:', error);
    }
  };

  const handleDragStart = (e, index) => {
    e.dataTransfer.setData('text/plain', index);
    setDraggingIndex(index);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, targetIndex) => {
    e.preventDefault();
    const draggedIndex = Number(e.dataTransfer.getData('text/plain'));
    const newInputs = [...inputs];
    const [movedInput] = newInputs.splice(draggedIndex, 1);
    newInputs.splice(targetIndex, 0, movedInput);
    setInputs(newInputs);
    setDraggingIndex(null);
  };

  return (
    <div className="container mx-auto p-4 flex">
      <div className="w-1/2 p-4 border rounded shadow-md">
        <h1 className="text-2xl font-bold mb-4">Create New Form</h1>
        <div className="mb-4">
          <div className="flex items-center">
            <h2 className="text-xl mr-2">{title || 'Untitled Form'}</h2>
            <button onClick={() => setShowTitleInput(true)} className="text-blue-500">✏️</button>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 mb-4">
          {inputs.map((input, index) => (
            <div
              key={index}
              draggable
              onDragStart={(e) => handleDragStart(e, index)}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, index)}
              className={`p-2 border rounded shadow-md ${draggingIndex === index ? 'bg-gray-200' : ''}`}
            >
              <label className="block text-sm font-bold mb-1">{input.title}</label>
              <input
                type={input.type}
                placeholder={input.placeholder}
                readOnly
                className="w-full p-2 border rounded"
              />
              <button onClick={() => removeInput(index)} className="bg-red-500 text-white px-2 py-1 rounded mt-2">Remove</button>
            </div>
          ))}
        </div>
        <div className="flex justify-center mb-4">
          <button
            onClick={() => setShowInputButtons(!showInputButtons)}
            className="bg-white text-blue-500 border border-blue-500 px-4 py-2 rounded shadow"
          >
            {showInputButtons ? 'CLOSE ADD INPUTS' : 'ADD INPUTS'}
          </button>
        </div>
        {showInputButtons && (
          <div className="mb-4">
            <button
              onClick={() => openAddInputForm('text')}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              TEXT
            </button>
            <button
              onClick={() => openAddInputForm('email')}
              className="bg-blue-500 text-white px-4 py-2 rounded ml-2"
            >
              EMAIL
            </button>
            <button
              onClick={() => openAddInputForm('password')}
              className="bg-blue-500 text-white px-4 py-2 rounded ml-2"
            >
              PASSWORD
            </button>
            <button
              onClick={() => openAddInputForm('number')}
              className="bg-blue-500 text-white px-4 py-2 rounded ml-2"
            >
              NUMBER
            </button>
            <button
              onClick={() => openAddInputForm('date')}
              className="bg-blue-500 text-white px-4 py-2 rounded ml-2"
            >
              DATE
            </button>
          </div>
        )}
        <div className="flex justify-center">
          <button onClick={saveForm} className="bg-green-500 text-white px-4 py-2 rounded">SUBMIT</button>
        </div>
      </div>
      <div className="w-1/2 ml-4">
        {showTitleInput && (
          <div className="p-4 border rounded shadow-md mb-4">
            <h2 className="text-xl font-bold mb-2">Form Editor</h2>
            <input
              type="text"
              className="w-full p-2 mb-4 border rounded"
              placeholder="Form Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              onBlur={() => setShowTitleInput(false)}
            />
          </div>
        )}
        {isAdding && (
          <div className="p-4 border rounded shadow-md">
            <h2 className="text-xl font-bold mb-2">Add New Input</h2>
            <label className="block mb-2">Input Title:</label>
            <input
              type="text"
              className="w-full p-2 mb-4 border rounded"
              value={newInput.title}
              onChange={(e) => setNewInput({ ...newInput, title: e.target.value })}
            />
            <label className="block mb-2">Input Placeholder:</label>
            <input
              type="text"
              className="w-full p-2 mb-4 border rounded"
              value={newInput.placeholder}
              onChange={(e) => setNewInput({ ...newInput, placeholder: e.target.value })}
            />
            <button onClick={handleAddInput} className="bg-blue-500 text-white px-4 py-2 rounded">Add Input</button>
            <button onClick={() => setIsAdding(false)} className="bg-red-500 text-white px-4 py-2 rounded ml-2">Cancel</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default FormBuilder;
