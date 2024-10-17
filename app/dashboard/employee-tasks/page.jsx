"use client";

import { useState } from "react";
import { Reorder } from "framer-motion";
import classes from "./page.module.css";

export default function Page() {
	const [tasks, setTasks] = useState([1, 2, 3]);

	return (
		<main>
			<h1>Zadania pracowników</h1>
			<div className={classes.itemContainer}>
				<div className={classes.timeLines}>
					<div className={classes.timeLineContainer}>
						<p className={classes.time}>7:00</p>
						<div className={classes.timeLine}></div>
					</div>
					<div className={classes.timeLineContainer}>
						<p className={classes.time}>8:00</p>
						<div className={classes.timeLine}></div>
					</div>
					<div className={classes.timeLineContainer}>
						<p className={classes.time}>9:00</p>
						<div className={classes.timeLine}></div>
					</div>
					<div className={classes.timeLineContainer}>
						<p className={classes.time}>10:00</p>
						<div className={classes.timeLine}></div>
					</div>
					<div className={classes.timeLineContainer}>
						<p className={classes.time}>11:00</p>
						<div className={classes.timeLine}></div>
					</div>
					<div className={classes.timeLineContainer}>
						<p className={classes.time}>12:00</p>
						<div className={classes.timeLine}></div>
					</div>
					<div className={classes.timeLineContainer}>
						<p className={classes.time}>13:00</p>
						<div className={classes.timeLine}></div>
					</div>
					<div className={classes.timeLineContainer}>
						<p className={classes.time}>14:00</p>
						<div className={classes.timeLine}></div>
					</div>
					<div className={classes.timeLineContainer}>
						<p className={classes.time}>15:00</p>
						<div className={classes.timeLine}></div>
					</div>
				</div>
				<Reorder.Group values={tasks} onReorder={setTasks}>
					<div className={classes.employeeOneTasksRow}>
						{tasks.map((task) => (
							<Reorder.Item value={task} key={task}>
								<div className={classes.taskItem}>{task}</div>
							</Reorder.Item>
						))}
					</div>
				</Reorder.Group>
			</div>
		</main>
	);
}
