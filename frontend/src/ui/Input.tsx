import { DetailedHTMLProps, InputHTMLAttributes } from "react";

interface InputProps extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> { }

function Input(props: InputProps) {
  return (
    <input {...props} className="rounded">
    </input>
  )
}

export default Input
