import styled from "@emotion/styled";
import { TextareaHTMLAttributes } from "react";

type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement>;

const Textarea = (props: TextareaProps) => {
  return (
    <div style={{ width: "100%", lineHeight: 0 }}>
      <StyledTextarea {...props} />
    </div>
  );
};

const StyledTextarea = styled.textarea`
  width: 100%;
  height: 300px;
  outline: none;
  resize: none;
  border: 2px solid #789cd5;
  border-radius: 14px;
  padding: 10px 12px;

  transition: 0.3s;

  font-size: 15px;
  line-height: 1.5;

  :focus {
    border-color: #3b6ebf;
  }
`;

export default Textarea;
