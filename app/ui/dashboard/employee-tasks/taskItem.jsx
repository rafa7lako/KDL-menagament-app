'use client'

import Draggable from 'react-draggable';
import classes from './taskItem.module.css'

export default function TaskItem() {
	return (
		<Draggable
			grid={[0, 50]} /* Snap tasks to 30-minute intervals */
			bounds="parent"
		>
			<div className={classes.taskItem}>Task 1</div>
		</Draggable>
	);
}
