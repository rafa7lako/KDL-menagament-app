import classes from './regalRowBtns.module.css'

export default function RegalRowBtns({handleRegalRowClick}) {
    
	return (
		<div className={classes.btnsContainer}>
			<button className={classes.btn} onClick={() => handleRegalRowClick("Razem")}>Razem</button>
			<button className={classes.btn} onClick={() => handleRegalRowClick("A")}>A</button>
			<button className={classes.btn} onClick={() => handleRegalRowClick("B")}>B</button>
			<button className={classes.btn} onClick={() => handleRegalRowClick("C")}>C</button>
			<button className={classes.btn} onClick={() => handleRegalRowClick("D")}>D</button>
			<button className={classes.btn} onClick={() => handleRegalRowClick("E")}>E</button>
		</div>
	);
}
