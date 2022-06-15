import { useEffect } from "react";
import { useForm } from "react-hook-form";

import { useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { categoryState, toDoState } from "../atoms";

interface IForm {
  toDo: string;
}

function CreateToDo() {
  const category = useRecoilValue(categoryState);
  const toDos = useRecoilValue(toDoState);
  const setToDos = useSetRecoilState(toDoState);
  const { register, handleSubmit, setValue } = useForm<IForm>();
  const handleValid = ({ toDo }: IForm) => {
    setToDos(oldToDos => [
      { text: toDo, id: Date.now(), category },
      ...oldToDos,
    ]);
    setValue("toDo", "");
  };
  useEffect(() => {
    localStorage.setItem("jj", JSON.stringify(toDos));
  }, [toDos]);

  return (
    <Add onSubmit={handleSubmit(handleValid)}>
      <h2>할 일 추가하기 : </h2>

      <input
        {...register("toDo", {
          required: "할 일이 입력되어야 합니다",
        })}
        placeholder="할 일을 적어주세요"
      />
      <button>추가</button>
    </Add>
  );
}

export default CreateToDo;

const Add = styled.form`
  margin: 2rem auto;
  display: flex;
  justify-content: center;
  align-items: center;
  h2 {
    margin-right: 1rem;
  }
  input {
    width: 200px;
    height: 2rem;
    border-radius: 5px;
    padding: 0 1rem;
  }
  button {
    margin-left: 1rem;
    height: 1.5rem;
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
