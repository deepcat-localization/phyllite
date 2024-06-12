import React from "react";
type ButtonProps = {
  setToggle: React.Dispatch<React.SetStateAction<boolean>>;
  btnTxt: string;
};

export const Button = ({ setToggle, btnTxt }: ButtonProps) => {
  // data-testid is a testing id
  // which is used only during tests
  return (
    <button data-testid="button" onClick={() => setToggle((prev) => !prev)}>
      {btnTxt}
    </button>
  );
};
