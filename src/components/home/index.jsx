import React, { useState, useEffect } from "react";
import { useAuth } from "../../contexts/authContext";
import {
  query,
  collection,
  updateDoc,
  doc,
  deleteDoc,
  addDoc,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../../firebase/firebase.js";
import Todo from "../todo/Todo.jsx";
import Footer from "../footer/index.jsx";
import Swal from "sweetalert2";

const style = {
    bg: `h-screen w-screen p-4 bg-gradient-to-r from-[#FF7E5F] to-[#FEB47B]`,
    container: `bg-white max-w-[500px] w-full m-auto rounded-md shadow-xl p-4`,
    heading: `text-3xl font-bold text-center text-gray-900 p-2`,
    form: `flex justify-between`,
    input: `border p-2 w-full text-xl`,
    button: `border p-4 ml-2 bg-green-500 text-white`,
    count: `text-center p-2 text-gray-700`,
  };

const Home = () => {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");
  const { userLoggedIn } = useAuth();
  const createTodo = async (e) => {
    e.preventDefault();
    if (input === "") {
      Swal.fire("Error", "Please enter a valid todo", "error");
      return;
    }
    await addDoc(collection(db, "todos"), {
      text: input,
      completed: false,
    });
    setInput("");
  };

  useEffect(() => {
    const q = query(collection(db, "todos"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let todosArr = [];
      querySnapshot.forEach((doc) => {
        todosArr.push({ ...doc.data(), id: doc.id });
      });
      setTodos(todosArr);
    });
    return () => unsubscribe();
  }, []);

  const toggleComplete = async (todo) => {
    await updateDoc(doc(db, "todos", todo.id), {
      completed: !todo.completed,
    });
  };

  const editTodo = async (todo, newText) => {
    await updateDoc(doc(db, "todos", todo.id), {
      text: newText,
    });
  };

  const deleteTodo = async (id) => {
    await deleteDoc(doc(db, "todos", id));
  };

  return (
    <div className={style.bg}>
      <div className={style.container}>
        <Footer />
        <h3 className={style.heading}>Todo App</h3>
        <form onSubmit={createTodo} className={style.form}>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className={style.input}
            type="text"
            placeholder="Add Todo"
          />
          <button className={style.button}>Add Todo</button>
        </form>
        <ul>
          {todos.map((todo, index) => (
            <Todo
              key={index}
              todo={todo}
              toggleComplete={toggleComplete}
              deleteTodo={deleteTodo}
              editTodo={editTodo}
            />
          ))}
        </ul>
        {todos.length < 1 ? null : (
          <p className={style.count}>{`You have ${todos.length} todos`}</p>
        )}
      </div>
    </div>
  );
};

export default Home;