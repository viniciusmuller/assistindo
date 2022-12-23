import { DetailedHTMLProps, forwardRef, InputHTMLAttributes, LegacyRef } from "react";

interface InputProps extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> { }

const Input = forwardRef((props: InputProps, ref: LegacyRef<HTMLInputElement>) =>
(
  <input ref={ref} {...props} className="rounded">
  </input>
))

export default Input
