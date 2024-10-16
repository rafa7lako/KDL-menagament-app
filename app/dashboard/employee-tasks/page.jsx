
import TaskItem from "@/app/ui/dashboard/employee-tasks/taskItem";
import classes from "./page.module.css";

export default function Page() {
    return (
        <main>
            <h1>Zadania pracowników</h1>
            <div className={classes.itemContainer}>
                {/* Time lines grid row */}
                <div className={classes.timeLines}>
                    <div className={classes.timeLineContainer}>
                        <p className={classes.time}>7:00</p>
                        <div className={classes.timeLine}></div>
                    </div>
                    <div className={classes.timeLineContainer}>
                        <p className={classes.time}>8:00</p>
                        <div className={classes.timeLine}></div>
                    </div>
                    {/* Add more timeLineContainer elements for each time */}
                </div>

                {/* Draggable Task Items */}
                <TaskItem />
            </div>
        </main>
    );
}
