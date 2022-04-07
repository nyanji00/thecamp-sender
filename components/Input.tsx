import styled from "@emotion/styled";
import { InputHTMLAttributes } from "react";

type InputProps = InputHTMLAttributes<HTMLInputElement>;

const Input = (props: InputProps) => {
  return (
    <div style={{ width: "100%" }}>
      <StyledInput {...props} />
    </div>
  );
};

const StyledInput = styled.input`
  width: 100%;
  outline: none;
  border: 2px solid #789cd5;
  border-radius: 14px;
  padding: 10px 12px;

  transition: 0.3s;

  font-size: 15px;

  :focus {
    border-color: #3b6ebf;
  }
`;

export default Input;
