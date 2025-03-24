'use client';
import { useState, useEffect } from 'react';

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

const TodoList = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState<string>('');
  const [editText, setEditText] = useState<string>('');
  const [editingId, setEditingId] = useState<number | null>(null);

  // Função para salvar os dados no localStorage
  const saveTodosToLocalStorage = (todos: Todo[]) => {
    localStorage.setItem('todos', JSON.stringify(todos));
  };

  // Função para carregar os dados do localStorage
  const loadTodosFromLocalStorage = (): Todo[] => {
    const savedTodos = localStorage.getItem('todos');
    return savedTodos ? JSON.parse(savedTodos) : [];
  };

  // Efeito para carregar as tarefas ao iniciar o componente
  useEffect(() => {
    const loadedTodos = loadTodosFromLocalStorage();
    setTodos(loadedTodos);
  }, []);

  // Efeito para salvar as tarefas no localStorage sempre que houver uma alteração
  useEffect(() => {
    if (todos.length > 0) {
      saveTodosToLocalStorage(todos);
    }
  }, [todos]);

  const addTodo = () => {
    if (!newTodo.trim()) return; // Não adiciona se o texto estiver vazio

    const newTodoItem: Todo = {
      id: Date.now(), // Usando o timestamp para gerar um ID único
      text: newTodo,
      completed: false,
    };

    setTodos([...todos, newTodoItem]);
    setNewTodo(''); // Limpa o campo de input após adicionar
  };

  const toggleTodo = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const startEditing = (todo: Todo) => {
    setEditingId(todo.id);
    setEditText(todo.text); // Preenche o campo de edição com o texto atual
  };

  const saveEdit = () => {
    if (editingId !== null) {
      setTodos(
        todos.map((todo) =>
          todo.id === editingId ? { ...todo, text: editText } : todo
        )
      );
      setEditingId(null); // Finaliza o modo de edição
      setEditText(''); // Limpa o campo de edição
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-center mb-6">O que não pode faltar em um evento ?</h2>
      <div className="mb-4">
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md"
          placeholder="Adicione uma sugestão"
        />
        <button
          onClick={addTodo}
          className="mt-2 w-full bg-(--roxo) text-white py-2 rounded-md"
        >
          Adicionar
        </button>
      </div>

      <ul className="space-y-3">
        {todos.map((todo) => (
          <li
            key={todo.id}
            className={`flex items-center justify-between p-2 border border-gray-300 rounded-md ${
              todo.completed ? 'bg-gray-200 line-through' : ''
            }`}
          >
            {editingId === todo.id ? (
              <div className="flex w-full space-x-2">
                <input
                  type="text"
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-md"
                />
                <button
                  onClick={saveEdit}
                  className="bg-(--azul) text-white py-2 px-4 rounded-md"
                >
                  Salvar
                </button>
              </div>
            ) : (
              <span
                className={`flex-1 ${todo.completed ? 'text-gray-500' : ''}`}
                onClick={() => toggleTodo(todo.id)}
              >
                {todo.text}
              </span>
            )}
            <div className="flex items-center space-x-2">
              <button
                onClick={() => startEditing(todo)}
                className="text-yellow-500"
              >
                ✏️
              </button>
              <button
                onClick={() => deleteTodo(todo.id)}
                className="text-(--rosa)"
              >
                X
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
