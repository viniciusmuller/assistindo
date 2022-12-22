interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text: string,
  classes: string
}

function Button(props: ButtonProps) {
  return (
    <button
      {...props}
      className={`
        ${props.classes}
        px-2
        py-1
        rounded-md
    `}>
      {props.text}
    </button>
  )
}

export default Button
