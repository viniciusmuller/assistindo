import { DetailedHTMLProps, forwardRef, InputHTMLAttributes, LegacyRef } from "react";

interface InputProps extends DetailedHTMLProps<InputHTMLAttributes<HTMLSelectElement>, HTMLSelectElement> { }

const Input = forwardRef((props: InputProps, ref: LegacyRef<HTMLSelectElement>) =>
(
  <select ref={ref} {...props} className="rounded">
  </select>
))

export default Input
