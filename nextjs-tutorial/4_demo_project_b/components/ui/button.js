import Link from "next/link";
import classes from "./button.module.css";

function Button(props) {
  if (props.link) {
    return (
      // the Link creates an <a> element under the hood, if we want to apply custom styling we can explicitly define it WITHOUT the href attribute
      <Link href={props.link}>
        <a className={classes.btn}>{props.children}</a>
      </Link>
    );
  }

  return (
    <button className={classes.btn} onClick={props.click}>
      {props.children}
    </button>
  );
}

export default Button;
