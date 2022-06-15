import React, { useCallback, useState } from "react";
import {
  Categories,
  categoryState,
  IToDo,
  toDoSelector,
  categoryArray,
} from "../atoms";
import CreateToDo from "./CreateToDo";
import { useRecoilState, useRecoilValue } from "recoil";

import ToDo from "./ToDo";
function ToDoList() {
  // const toDos = useRecoilValue(toDoState);
  const toDos = useRecoilValue(toDoSelector);
  const [category, setCategory] = useRecoilState(categoryState);
  const onInput = (event: React.FormEvent<HTMLSelectElement>) => {
    setCategory(event.currentTarget.value as any);
  };
  console.log(toDos);

  // 로컬스토리지
  let test: IToDo[] = JSON.parse(localStorage.getItem("jj") as string);
  // 로컬스토리지

  // custom
  const [CustomCategory, setCustomCategory] = useRecoilState(categoryArray);
  const [SingleCategory, setSingleCategory] = useState("");
  const AddCategory = useCallback(
    (event: React.FormEvent<HTMLInputElement>) => {
      setSingleCategory(event.currentTarget.value);
    },
    [SingleCategory]
  );

  const handleSubmit = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      let newCategory = [...CustomCategory];
      newCategory.push(SingleCategory);
      setSingleCategory("");
      setCustomCategory(newCategory);
    },
    [SingleCategory]
  );

  return (
    <div>
      <h1>To Dos</h1>
      <hr />

      <form onSubmit={handleSubmit}>
        <input
          value={SingleCategory}
          onChange={AddCategory}
          placeholder="원하는 카테고리를 입력하세요"
        />
        <button>카테고리 추가하기</button>
      </form>

      <select value={category} onInput={onInput}>
        {CustomCategory.map(el => (
          <option value={el}>{el}</option>
        ))}
      </select>

      {/* <select value={category} onInput={onInput}>
        <option value="TO_DO">To Do</option>
        <option value="DOING">Doing</option>
        <option value="DONE">Done</option>
      </select> */}

      <CreateToDo />
      <ul>
        {toDos?.map(toDo => (
          <ToDo key={toDo.id} {...toDo} />
        ))}
      </ul>
    </div>
  );
}

export default ToDoList;
