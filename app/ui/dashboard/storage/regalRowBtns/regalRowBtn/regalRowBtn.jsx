import classes from "./regalRowBtn.module.css";

export default function RegalRowBtn({ handleRegalRowClick, text }) {
	return (
		<button
			className={classes.btn}
			onClick={() => handleRegalRowClick({ text })}
		>
			{text}
		</button>
	);
}
