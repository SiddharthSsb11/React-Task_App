//import { useState } from 'react';

import Section from '../UI/Section';
import TaskForm from './TaskForm';
import useHttp from '../../hooks/use-http';


const NewTask = (props) => {
  //const [isLoading, setIsLoading] = useState(false);

  const { isLoading, error, sendRequest: sendTaskRequest } = useHttp(); //destructuring retruned obj

  const createTask = (taskText, taskData) => {
    const generatedId = taskData.name; // firebase-specific => "name" contains crypted id string
    const createdTask = { id: generatedId, text: taskText };

    props.onAddTask(createdTask);
  };

  const enterTaskHandler = async (taskText) => {

    //avoinding bind 
    /* const createTask = (taskData) => {//taskdata is the data parameter in applydata(data)
        const generatedId = taskData.name; // firebase-specific => "name" contains crypted id string
        const createdTask = { id: generatedId, text: taskText };
    
        props.onAddTask(createdTask);
     */;


    sendTaskRequest(
      {
        url: 'https://react-custom-hooks-task-default-rtdb.asia-southeast1.firebasedatabase.app/tasks.json',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: { text: taskText }, // sendRequest is doing the JSON.stringify inside the custom-hook js
      },
      createTask.bind(null, taskText)//preconfiguring function with a aresource
    );
  };

  //const [error, setError] = useState(null);



 /*   const enterTaskHandler = async (taskText) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(
        'https://react-custom-hooks-task-default-rtdb.asia-southeast1.firebasedatabase.app/tasks.json',
        {
          method: 'POST',
          body: JSON.stringify({ text: taskText }),
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (!response.ok) {
        throw new Error('Request failed!');
      }

      const data = await response.json();

      const generatedId = data.name; // firebase-specific => "name" contains crypted id string
      const createdTask = { id: generatedId, text: taskText };
      console.log(createdTask);
      console.log(generatedId);

      props.onAddTask(createdTask);
    } catch (err) {
      setError(err.message || 'Something went wrong!');
    }
    setIsLoading(false);
  }; */

  return (
    <Section>
      <TaskForm onEnterTask={enterTaskHandler} loading={isLoading} />
      {error && <p>{error}</p>}
    </Section>
  );
};

export default NewTask;