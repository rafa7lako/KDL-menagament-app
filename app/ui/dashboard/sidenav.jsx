
import Link from 'next/link'
import classes from './sidenav.module.css'
import NavLinks from './nav-links'

export default function SideNav(){
    return (
        <div className={classes.firstContainer}>
            <Link href={'/'} className={classes.logoContainer}><p>KDL</p></Link>
            <div className={classes.linksContainer}>
                <div className={classes.linksBackground}><NavLinks /></div>
            </div>
        </div>
    )
}