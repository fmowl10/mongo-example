import React, { useState, useCallback } from 'react';
import axios from 'axios';

function App() {
  let [output, setOutput] = useState("");
  let [method, setMethod] = useState("GET");
  let [id, setId] = useState("");
  let [isDone, setIsDone] = useState(false);
  let [task, setTask] = useState("");

  const onSelecteChange = useCallback((e) => {
    setMethod(e.target.value);
  }, [method]);

  const onIdChange = useCallback((e) => {
    setId(e.target.value);
  }, [id]);

  const onTaskChange = useCallback((e) => {
    setTask(e.target.value);
  }, [task]);

  const onIsDoneChange = useCallback((e) => {
    setIsDone(e.target.checked);
  }, [task]);



  const onSubmit = useCallback(e => {
    let promise;
    setOutput("LOADING");
    if (method === "GET") {
      if (id.length === 24) {
        promise = axios.get(`/todo/${id}`);
      } else {
        promise = axios.get("/todo");
      }
    } else if (method === "PUT") {
      if (task.length > 0)
        promise = axios.put(`/todo/${id}`, { isDone: isDone, task: task });
      else
        promise = axios.put(`/todo/${id}`, { isDone: isDone });
    } else if (method === "DELETE") {
      promise = axios.delete(`/todo/${id}`);
    } else if (method === "POST") {
      promise = axios.post(`/todo`, { isDone: isDone, task: task });
    }
    promise.then(res => {
      let data = JSON.stringify(res.data).replaceAll("},", "}\n").replace('[', '').replace(']', '');
      if (data === '""')
        setOutput("NOTFOUND");
      else
        setOutput(data);
    });
    e.preventDefault();
  });

  return (
    <div>
      <form onSubmit={onSubmit}>
        <label>METHOD  </label>
        <select onChange={onSelecteChange} >
          <option value="GET" selected >GET_TODO</option>
          <option value="PUT">PUT_TODO</option>
          <option value="DELETE">DELETE_TODO</option>
          <option value="POST">POST_TODO</option>
        </select>
        <label> ID </label>
        <input placeholder="input id" onChange={onIdChange} size="29" maxLength="24"></input>
        <label> TASK </label>
        <input placeholder="input Task" onChange={onTaskChange}></input>
        <label> </label>
        <input type="checkbox" checked={isDone} onChange={onIsDoneChange}></input>
        <label> ISDONE </label>
        <input type="submit" value="call" />
      </form>
      <textarea value={output} rows="30" cols="100" />
    </div>
  );
}

export default App;
