import Link from "next/link";
import classes from "./sidenav.module.css";
import NavLinks from "./nav-links";
import KdlLogo from "@/public/klawisze.png";
import Image from "next/image";

export default function SideNav() {
	return (
		<div className={classes.firstContainer}>
			<Link href={"/"} className={classes.logoContainer}>
				<Image
					src={KdlLogo}
					width={73.5}
					height={72}
					className={classes.logo}
					alt="Logo klawiszedolaptopa"
				/>
			</Link>
			<div className={classes.linksContainer}>
				<div className={classes.linksBackground}>
					<NavLinks />
				</div>
			</div>
		</div>
	);
}
