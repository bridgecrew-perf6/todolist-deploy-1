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
import styled from "styled-components";
function ToDoList() {
  // const toDos = useRecoilValue(toDoState);
  const toDos = useRecoilValue(toDoSelector);
  const [category, setCategory] = useRecoilState(categoryState);
  const onInput = (event: React.FormEvent<HTMLSelectElement>) => {
    setCategory(event.currentTarget.value as any);
  };
  // console.log(toDos);

  // 로컬스토리지
  let test: IToDo[] = JSON.parse(localStorage.getItem("jj") as string);
  // 로컬스토리지
  // console.log(test);

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
  const Imoji = ["🚀", "🌞", "🌛"];

  return (
    <div>
      <h1>킹God게시판</h1>
      <hr />

      <Header onSubmit={handleSubmit}>
        <input
          value={SingleCategory}
          onChange={AddCategory}
          placeholder="원하는 카테고리를 입력하세요"
        />
        <button>카테고리 추가하기</button>
      </Header>

      <Select>
        <h2>카테고리 선택하기 :</h2>
        <select value={category} onInput={onInput}>
          {CustomCategory.map((el, index) => (
            <option key={index} value={el}>
              {el}
            </option>
          ))}
        </select>
      </Select>
      <CreateToDo />

      {toDos.length !== 0 ? (
        <Content>
          <ul>
            {toDos?.map(toDo => (
              <ToDo key={toDo.id} {...toDo} />
            ))}
          </ul>
        </Content>
      ) : (
        <Content>
          <ul>
            {test?.map(toDo => (
              <ToDo key={toDo.id} {...toDo} />
            ))}
          </ul>
        </Content>
      )}
    </div>
  );
}

export default ToDoList;

const Header = styled.form`
  margin: 0 auto;
  display: flex;
  justify-content: center;
  input {
    width: 350px;
    height: 2rem;
    border-radius: 5px;
    padding: 0 1rem;
  }
  button {
    margin-left: 1rem;
    font-size: 0.8rem;
    font-weight: 600;
    background: rgb(67, 148, 240);
    color: rgb(255, 255, 255);
    border-radius: 5px;
    cursor: pointer;
    outline: none;
    border: none;
    padding: 0 1rem;
  }
`;

const Select = styled.div`
  margin: 2rem auto;
  display: flex;
  justify-content: center;
  align-items: center;
  h2 {
    margin-right: 1rem;
  }
  select {
    width: 150px;
    height: 2rem;
    border-radius: 5px;
    padding: 0 1rem;
  }
`;

const Content = styled.div`
  margin: 2rem auto;
  display: flex;
  justify-content: center;
  align-items: center;
  h2 {
    margin-right: 1rem;
  }
  select {
    width: 150px;
    height: 2rem;
    border-radius: 5px;
    padding: 0 1rem;
  }
`;
