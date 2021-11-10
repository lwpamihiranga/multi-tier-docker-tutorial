import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Post = () => {
  // use below with docker compose
  const api = 'http://localhost:5000';

  // use below with k8s
  // const api = 'backend';
  const [todoTitle, setTodoTitle] = useState('');
  const [todos, setTodos] = useState([]);
  const [isChanges, setIsChanges] = useState(false);

  useEffect(() => {
    axios
      .get(`${api}/api/todo/`)
      .then((response) => {
        setTodos(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [isChanges]);

  const handleSave = async (event) => {
    event.preventDefault();

    let body = {
      todo: todoTitle,
    };

    try {
      const todo = await axios.post(`${api}/api/todo`, body);
      setTodoTitle('');
      alert('Todo saved!');
      console.log(todo);
      setIsChanges(!isChanges);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async (id) => {
    try {
      const todo = await axios.delete(`${api}/api/todo/${id}`);
      alert('Todo deleted!');
      console.log(todo);
      setIsChanges(!isChanges);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <div className="container">
        <h3 className="text-center">Todo List</h3>
        <div className="container mt-5 row">
          <div className="col-sm-6">
            <form>
              <div className="mb-3 row">
                <label htmlFor="postTitle" className="col-sm-2 col-form-label">
                  Todo
                </label>
                <div className="col-sm-10">
                  <input
                    type="text"
                    className="form-control"
                    id="todoTitle"
                    value={todoTitle}
                    onChange={(e) => {
                      setTodoTitle(e.target.value);
                    }}></input>
                </div>
              </div>
              <div className="text-center">
                <button
                  type="submit"
                  className="btn btn-primary"
                  onClick={(event) => handleSave(event)}>
                  Save
                </button>
              </div>
            </form>
          </div>
          <div className="col-sm-6">
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Todo Title</th>
                  <th scope="col" className="text-center">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {todos.map((todo, index) => {
                  return (
                    <tr key={index}>
                      <th scope="row">{index + 1}</th>
                      <td>{todo.todo}</td>
                      <td className="text-center">
                        <button
                          className="btn btn-danger mb-3"
                          onClick={(e) => handleDelete(todo._id)}>
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
