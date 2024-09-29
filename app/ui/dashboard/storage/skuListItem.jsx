import { binIcon, editIcon } from '@/app/icons';

import classes from './skuListItem.module.css'

export default function SkuListItem({sku}) {
	return (
		<li className={classes.skuListItem}>
			<p className = {classes.paragraph}>{sku}</p>
			<div className={classes.actionButtonContainer}>
				<button className={`${classes.actionButton} ${classes.editBtn}`}><i>{editIcon}</i></button>
				<button className={`${classes.actionButton} ${classes.deleteBtn}`}><i>{binIcon}</i></button>
			</div>
		</li>
	);
}
