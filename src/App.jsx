import TaskList from './components/TaskList.jsx';
import './App.css';
import { useState, useEffect } from 'react';
import axios from 'axios';

// const TASKS = [
//   {
//     id: 1,
//     title: 'Mow the lawn',
//     isComplete: false,
//   },
//   {
//     id: 2,
//     title: 'Cook Pasta',
//     isComplete: true,
//   },
// ];

const taskAPIUrl = 'http://127.0.0.1:5000';

const convertFromApi = (apiTask) => {
  const newTask = {
    ...apiTask,
    isComplete: apiTask.is_complete
  };
  delete newTask.is_complete;
  return newTask;
};

const getAllTasksApi = () => {
  return axios.get(`${taskAPIUrl}/tasks`)
    .then( response => {
      const apiTasks = response.data;
      const newTasks = apiTasks.map(convertFromApi);
      return newTasks;
    })
    .catch(error => {
      console.log(error);
    });
};


const toggleCompletionApi = (id, isComplete) => {
  const apiCall = isComplete ? 'mark_incomplete' : 'mark_complete';
  return axios.patch(`${taskAPIUrl}/tasks/${id}/${apiCall}`)
    .then( response => {
      const newTask = convertFromApi(response.data.task);
      return newTask;
    })
    .catch( error => {
      console.log(error);
    });
};

const unregisterTaskApi = (id) => {
  return axios.delete(`${taskAPIUrl}/tasks/${id}`)
    .catch(error => {
      console.log(error);
    });
};

function App () {
  const [taskData, setTaskData] = useState([]);

  const getAllTasks = () => {
    getAllTasksApi()
      .then(tasks => {
        setTaskData(tasks);
      });
  };

  useEffect(() => {
    getAllTasks();
  }, []);

  const handleTaskToggled = (id, isComplete) => {
    toggleCompletionApi(id, isComplete)
      .then(newTask => {
        setTaskData(taskData => taskData.map(task => {
          if (task.id === id) {
            return newTask;
          } else {
            return task;
          }
        }));
      });
  };
  // };

  const handleUnregisterTask = (id) => {
    unregisterTaskApi(id)
      .then(() => {
        setTaskData(taskData => taskData.filter(task => {
          return task.id !== id;
        }));
      });
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Ada&apos;s Task List</h1>
      </header>
      <main>
        <div>
          <TaskList
            tasks = {taskData}
            onTaskToggled = {handleTaskToggled}
            onUnregisterTask={handleUnregisterTask}
          />
        </div>
      </main>
    </div>
  );
};

export default App;
