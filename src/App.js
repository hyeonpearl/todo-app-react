import React, { useCallback, useReducer, useRef } from 'react';
import TodoInsert from './components/TodoInsert';
import TodoList from './components/TodoList';
import TodoTemplate from './components/TodoTemplate';

function createBulkTodos() {
  const array = [];
  // for (let i = 1; i <= 2500; i++) {
  //   array.push({
  //     id: i,
  //     text: `할 일 ${i}`,
  //     checked: false,
  //   });
  // }
  return array;
}

function todoReducer(todos, action) {
  switch (action.type) {
    case 'INSERT':
      return todos.concat(action.todo);
    case 'REMOVE':
      return todos.filter(todo => todo.id !== action.id);
    case 'TOGGLE':
      return todos.map(todo =>
        todo.id === action.id ? { ...todo, checked: !todo.checked } : todo
      );
    default:
      return todos;
  }
}

const App = () => {
  /**
   * 원래는 두  번째 파라미터를 넣지만
   * 세 번째 파라미터에 초기 상태를 넣을 경우,
   * 컴포넌트가 맨 처음 렌더링될 때만 createBulkTodos가 호출된다.
   */
  const [todos, dispatch] = useReducer(todoReducer, undefined, createBulkTodos);

  const nextId = useRef(4);

  const onInsert = useCallback(text => {
    const todo = {
      id: nextId.current,
      text,
      checked: false,
    };
    dispatch({ type: 'INSERT', todo });
    nextId.current += 1;
  }, []);
  const onRemove = useCallback(id => {
    dispatch({ type: 'REMOVE', id });
  }, []);
  const onToggle = useCallback(id => {
    dispatch({ type: 'TOGGLE', id });
  }, []);
  return (
    <>
      <TodoTemplate>
        <TodoInsert onInsert={onInsert} />
        <TodoList todos={todos} onRemove={onRemove} onToggle={onToggle} />
      </TodoTemplate>
    </>
  );
};

export default App;
