import React, { useEffect, useState } from 'react'
import { deleteTodoTask, getAllTodosApi, updateIsCompleted } from '../api-call/TodoApiCall';
import { useNavigate } from 'react-router-dom'
import HeaderComponent from "./HeaderComponent";



const ListAllTodos = () => {

    const [todos, setTodos] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        getAllTodos()
    }, [])

    const getAllTodos = () => {
        getAllTodosApi().then((response) => {
            return setTodos(response.data)
        }).then((e) => {
            console.log(e);
        })
    }

    function markAsCompletedAction(id) {
        updateIsCompleted(id).then((response) => {
            console.log(response);
            getAllTodos()
        }).catch((e) => {
            console.log(e);
        })


    }

    function deleteTodoAction(id) {
        deleteTodoTask(id).then((response) => {
            getAllTodos()
        }).catch((e) => {
            console.log(e);
        })
    }

    function redirectTodoCreate() {
        navigate('/create-todo')
    }

    function redirectUpdateTodo(id) {
        navigate(`/edit-todo/${id}`)
    }

    function handleSelectChange(e) {


        if (e.target.value === "") {
            return;
        } else if (e.target.value === "true") {
            getAllTodosApi().then((response) => {
                let completedArray = response.data.filter((e) => {
                    return e.todoIsCompleted === true;
                })
                console.log(completedArray);
                setTodos(completedArray)
            }).catch((e) => {
                console.log(e);
            })
        } else {
            getAllTodosApi().then((response) => {
                let notCompletedArray = response.data.filter((e) => {
                    return e.todoIsCompleted !== true;
                })
                console.log(notCompletedArray);
                setTodos(notCompletedArray)
            }).catch((e) => {
                console.log(e);
            })
        }

    }

    return (
        <>
            <HeaderComponent />
            <div className="container">
                <h1 className="text-center">List Of Todos</h1>
                <button onClick={redirectTodoCreate} className="btn btn-primary text-light">Add Todo</button>
                <br />
                <br />

                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Task Title</th>
                            <th>Actions</th>
                            <select onChange={handleSelectChange}>
                                <option value="">--Sort By--</option>
                                <option value="true">Completd</option>
                                <option value="false">Not Completed</option>
                            </select>
                        </tr>
                    </thead>
                    <tbody>

                        {
                            todos.map(data => {
                                return (
                                    <tr key={data.id}>
                                        <td>{data.todoTitle}</td>
                                        <td>
                                            {
                                                data.todoIsCompleted ? <button className='btn btn-outline-success'>Completed ✅</button> : <button onClick={() => markAsCompletedAction(data.id)} className='btn btn-success'>Mark as Completed</button>

                                            }
                                            <button onClick={() => redirectUpdateTodo(data.id)} className="btn btn-info m-2">Update</button>
                                            <button onClick={() => deleteTodoAction(data.id)} className="btn btn-danger">Delete</button>
                                        </td>

                                    </tr>
                                )
                            })
                        }

                    </tbody>
                </table>

            </div>
        </>
    )
}

export default ListAllTodos