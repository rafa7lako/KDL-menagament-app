import classes from './searchForm.module.css'

export default function SearchForm(){
    return <form className={classes.searchForm}>
    <input
        className={classes.searchInput}
        type="text"
        name="sku-search"
        id="sku-search"
        placeholder="Szukaj"
        required
    ></input>
    <button className={classes.searchButton}>Icon</button>
</form>
}