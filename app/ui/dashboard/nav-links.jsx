"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import classes from "./nav-links.module.css";

const links = [
	{ name: "Home", href: "/dashboard" },
	{ name: "Storage", href: "/dashboard/storage" },
];

export default function NavLinks() {
	const path = usePathname();
	return (
		<>
			{links.map((link) => {
				return (
					<Link key={link.name} href={link.href} className={path === link.href ? `${classes.link} ${classes.active}` : classes.link}>
						<p className={classes.linkName}>{link.name}</p>
					</Link>
				);
			})}
		</>
	);
}
