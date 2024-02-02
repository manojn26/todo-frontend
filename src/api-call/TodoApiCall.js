import axios from "axios";

const REST_API_BASE_URL = "http://localhost:8080/api";

export const getAllTodosApi = () => {
  return axios.get(REST_API_BASE_URL + "/all");
};

export const updateIsCompleted = (id) => {
  return axios.put(`${REST_API_BASE_URL}/completed/${id}`, {
    todoIsCompleted: "true",
  });
};

export const deleteTodoTask = (id) => {
  return axios.delete(`${REST_API_BASE_URL}/${id}`);
};

export const createTodo = (todoObj) => {
  return axios.post(`${REST_API_BASE_URL}/create`, todoObj);
};

export const getTodoById = (id) => {
  return axios.get(`${REST_API_BASE_URL}/${id}`);
};

export const updateAllTodo = (id, todoObj) => {
  return axios.put(`${REST_API_BASE_URL}/${id}`, todoObj);
};
