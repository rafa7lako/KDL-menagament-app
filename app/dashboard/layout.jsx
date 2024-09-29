import SideNav from "../ui/dashboard/sidenav";


import classes from './layout.module.css'

export default function Layout({children}){
    return (
        <div className={classes.firstContainer}>
            <div className={classes.sideNavContainer}>
                <SideNav />
            </div>
            <div className={classes.secondContainer}>{children}</div>
        </div>

    )
}