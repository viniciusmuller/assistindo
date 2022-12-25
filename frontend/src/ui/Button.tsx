interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
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
      {props.children}
    </button>
  )
}

export default Button
