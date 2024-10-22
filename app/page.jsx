import Link from "next/link";
import KdlLogo from "@/public/klawisze.png";
import Image from "next/image";
import classes from "./page.module.css";

export default function Home() {
	return (
		<main className={`${classes.main} ${classes.flex}`}>
			<div className={`${classes.logoContainer} ${classes.flex}`}><Image
					src={KdlLogo}
					width={103.5}
					height={102}
					className={classes.logo}
					alt="Logo klawiszedolaptopa"
				/></div>
			<div className={`${classes.secondContainer} ${classes.flex}`}>
				<div className={`${classes.subContainer} ${classes.flex}`}>
					<div className={classes.subSubContainer}></div>
					<p className={classes.text}>Welcome to KDL MGMT</p>
					<form className={classes.form}>
						<label for='username'>Username: </label><input type="text" name="username" />
						<label for='password'>Password: </label><input type="password" name="password" />
						<button>Log In</button>
					</form>
					{/* <Link href="/login" className={`${classes.login} ${classes.flex}`}>
						Log in
					</Link> */}
				</div>
			</div>
		</main>
	);
}
