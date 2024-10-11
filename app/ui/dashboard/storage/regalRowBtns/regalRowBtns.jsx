import RegalRowBtn from "./regalRowBtn/regalRowBtn";
import classes from "./regalRowBtns.module.css";

export default function RegalRowBtns({ }) {



	return (
		<div className={classes.btnsContainer}>
			<RegalRowBtn text="Razem" />
			<RegalRowBtn text="A" />
			<RegalRowBtn text="B" />
			<RegalRowBtn text="C" />
			<RegalRowBtn text="D" />
			<RegalRowBtn text="E" />
		</div>
	);
}
