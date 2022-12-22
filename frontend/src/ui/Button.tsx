interface ButtonProps {
  text: string,
  classes: string
}

function Button(props: ButtonProps) {
  return (
    <button className={`
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
