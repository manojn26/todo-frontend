import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom";
import { createTodo, getTodoById, updateAllTodo } from "../api-call/TodoApiCall";


// This Component is fot
// 1. Creating Todo
// 2. Updating Todo

const TodoCreate = () => {

    const navigate = useNavigate()

    // Getting Id from Request Parameter
    const { id } = useParams()

    // UseEffect hook used to load the data even before the page loading
    useEffect(() => {
        if (id) {
            getTodoById(id).then((response) => {

                // Setting data into "State Variables"
                setTodoTitle(response.data.todoTitle)
                setTodoIsCompleted(response.data.todoIsCompleted)
            }).catch((e) => {
                console.log(e);
            })
        }
    }, [id])

    // Defining "State Variables" for state variables
    const [todoTitle, setTodoTitle] = useState("");
    const [todoIsCompleted, setTodoIsCompleted] = useState("")

    // Title Handler
    const handleTitle = (e) => {
        setTodoTitle(e.target.value)
    }


    // Sunmit Handler Function for Both Creating and Updating
    const submitHandler = (e) => {
        e.preventDefault()
        let todoObj = { todoTitle, todoIsCompleted }

        if (!todoTitle || !todoIsCompleted) {
            return
        }

        if (id) {
            updateAllTodo(id, todoObj).then((response) => {
                console.log(response.data);
                navigate("/todo")
            }).catch((e) => {
                console.log(e);
            })
        } else {

            createTodo(todoObj).then((response) => {
                console.log(response.data);
                navigate("/todo")
            }).catch((e) => {
                console.log(e);
            })
        }
    }

    function pageTitle() {
        if (id) {
            return <h2 className="text-center">Update Todo</h2>
        } else {
            return <h2 className="text-center">Add Create Todo</h2>
        }
    }

    function handleSelect(e) {
        if (e.target.value) {

            setTodoIsCompleted(e.target.value)
        } else {
            setTodoIsCompleted(todoIsCompleted)
        }
    }

    return (
        <>
            <div className="container">
                <br />
                <br />
                <div className="row">
                    <div className="card col-md-6 offset-md-3">
                        {pageTitle()}
                        <div className="card-body">
                            <form>
                                <div className="form-group mb-2">
                                    <label className="form-label">Todo Title</label>
                                    <input type="text" placeholder="enter todo title" name="todoTitle" value={todoTitle} className="form-control" onChange={handleTitle} />

                                </div>
                                <div className="form-group mb-2">
                                    <label className="form-label">Is Completed</label>
                                    <select className="form-select form-select-sm" onChange={handleSelect}>
                                        <option>--SELECT--</option>
                                        <option value="true">Yes</option>
                                        <option value="false">No</option>
                                    </select>

                                </div>

                                <button className="btn btn-success" onClick={submitHandler}>Submit</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default TodoCreate