import RegalRowBtn from "./regalRowBtn/regalRowBtn";
import classes from "./regalRowBtns.module.css";

export default function RegalRowBtns({ handleRegalRowClick }) {
	return (
		<div className={classes.btnsContainer}>
			<RegalRowBtn handleRegalRowClick={handleRegalRowClick} text="Razem" />
			<RegalRowBtn handleRegalRowClick={handleRegalRowClick} text="A" />
			<RegalRowBtn handleRegalRowClick={handleRegalRowClick} text="B" />
			<RegalRowBtn handleRegalRowClick={handleRegalRowClick} text="C" />
			<RegalRowBtn handleRegalRowClick={handleRegalRowClick} text="D" />
			<RegalRowBtn handleRegalRowClick={handleRegalRowClick} text="E" />
		</div>
	);
}
