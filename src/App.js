import React, { useEffect, useState } from 'react';
import useHttp from './hooks/use-http'

import Tasks from './components/Tasks/Tasks';
import NewTask from './components/NewTask/NewTask';

function App() {
  //const [isLoading, setIsLoading] = useState(false);
  //const [error, setError] = useState(null);
  const [tasks, setTasks] = useState([]);

  const { isLoading, error, sendRequest: fetchTasks } = useHttp(); //destructuring returned obj

/*   const transformTasks = useCallback (tasksObj) => { 
  //x/v inside useffect to avoid being mentioned it inside the dep. [] of sendReq useCallback
    const loadedTasks = [];

    for (const taskKey in tasksObj) {
      loadedTasks.push({ id: taskKey, text: tasksObj[taskKey].text });
    }

    setTasks(loadedTasks);
  }; */

  useEffect(() => {
    const transformTasks = (tasksObj) => {
      const loadedTasks = [];

      for (const taskKey in tasksObj) {
        loadedTasks.push({ id: taskKey, text: tasksObj[taskKey].text });
      }

      setTasks(loadedTasks);
    };

    fetchTasks(
      { url: 'https://react-custom-hooks-task-default-rtdb.asia-southeast1.firebasedatabase.app/tasks.json' },
      transformTasks
    );
  }, [fetchTasks]);

/*   const fetchTasks = async (taskText) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(
        'https://react-custom-hooks-task-default-rtdb.asia-southeast1.firebasedatabase.app/tasks.json'
      );

      if (!response.ok) {
        throw new Error('Request failed!');
      }

      const data = await response.json();

      const loadedTasks = [];

      //const loadedTasks = Object.entries(data).map(([key, value]) => return{id: key, text: value.text})
      for (const taskKey in data) {
        loadedTasks.push({ id: taskKey, text: data[taskKey].text });
      }

      /* console.log(data);
      console.log(loadedTasks); 
      setTasks(loadedTasks);
    } catch (err) {
      setError(err.message || 'Something went wrong!');
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchTasks();
  }, []);*/

  const taskAddHandler = (task) => {
    setTasks((prevTasks) => prevTasks.concat(task));//setTasks((prevTasks)=> [...prevTasks, task]
  };

  return (
    <React.Fragment>
      <NewTask onAddTask={taskAddHandler} />
      <Tasks
        items={tasks}
        loading={isLoading}
        error={error}
        onFetch={fetchTasks}
      />
    </React.Fragment>
  );
}

export default App;