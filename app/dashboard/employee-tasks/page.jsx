"use client";

import Image from "next/image";
import classes from "./page.module.css";

import gosling from "@/public/gos.jpg";
import beaver from '@/public/6464.jpg'

export default function Page() {
	return (
		<main>
			<h1>Zadania pracowników</h1>
			<div className={classes.itemContainer}>
				<table className={classes.table}>
					<thead>
						<tr>
							<th scope="column">Pracownik</th>
							<th scope="column">Trwające zadanie</th>
							<th scope="column">Następne zadanie</th>
							<th scope="column">Liczba oczekujących zadań</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<th
								className={`${classes.flex} ${classes.cell}`}
								scope="row"
							>
								<div className={classes.profilePicContainer}>
									<Image
									className={classes.profilePic}
									src={gosling}
									height={100}
									width={200}
									alt="employee profile picture"
								/>
								</div>
								
							</th>
							<td className={classes.cell}>
								<div className={classes.task}>TASK</div>
							</td>
							<td className={classes.cell}>
								<div className={classes.task}>TASK</div>
							</td>
							<td className={classes.cell}>4</td>
						</tr>
						<tr>
							<th
								className={`${classes.flex} ${classes.cell}`}
								scope="row"
							>
								<div className={classes.profilePicContainer}>
									<Image
									className={classes.profilePic}
									src={beaver}
									height={100}
									width={200}
									alt="employee profile picture"
								/>
								</div>
								
							</th>
							<td className={classes.cell}>
								<div className={classes.task}>TASK</div>
							</td>
							<td className={classes.cell}>
								<div className={classes.task}>TASK</div>
							</td>
							<td className={classes.cell}>4</td>
						</tr>
					</tbody>
				</table>
			</div>
		</main>
	);
}
