import React, { useCallback, useState } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { categoryArray, categoryState, IToDo, toDoState } from "../atoms";

function ToDo({ text, category, id }: IToDo) {
  const setToDos = useSetRecoilState(toDoState);
  const setCategories = useSetRecoilState(categoryState);
  const [CustomCategory, setCustomCategory] = useRecoilState(categoryArray);

  const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const {
      currentTarget: { name },
    } = event;
    setToDos(oldToDos => {
      const targetIndex = oldToDos.findIndex(toDo => toDo.id === id);
      const newToDo = { text, id, category: name as any };
      return [
        ...oldToDos.slice(0, targetIndex),
        newToDo,
        ...oldToDos.slice(targetIndex + 1),
      ];
    });
  };

  return (
    <Li>
      <span>🚀 &nbsp; &nbsp; {text}</span>
      {CustomCategory.map((el, index) => (
        <button key={index} name={el} onClick={onClick}>
          {el}
        </button>
      ))}
      {/* {category !== "DOING" && (
        <button name={"DOING"} onClick={onClick}>
          Doing
        </button>
      )}
      {category !== "TO_DO" && (
        <button name={"TO_DO"} onClick={onClick}>
          To Do
        </button>
      )}
      {category !== "DONE" && (
        <button name={"DONE"} onClick={onClick}>
          Done
        </button>
      )} */}
    </Li>
  );
}
export default ToDo;

const Li = styled.li`
  background-color: white;
  width: 500px;
  height: 3rem;
  display: flex;
  align-items: center;
  padding: 0 1rem;
  justify-content: space-between;
  margin: 1rem;
  border-radius: 10px;
  span {
    color: black;
    font-weight: 600;
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
    height: 2rem;
  }
`;
