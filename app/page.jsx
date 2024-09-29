import Link from "next/link";
import classes from "./page.module.css";

export default function Home() {
	return (
		<main className={`${classes.main} ${classes.flex}`}>
			<div className={`${classes.logoContainer} ${classes.flex}`}></div>
			<div className={`${classes.secondContainer} ${classes.flex}`}>
				<div className={`${classes.subContainer} ${classes.flex}`}>
					<div className={classes.subSubContainer}></div>
					<p className={classes.text}>Welcome to KDL MGMT</p>
					<Link href="/login" className={`${classes.login} ${classes.flex}`}>
						Log in
					</Link>
				</div>
			</div>
		</main>
	);
}
