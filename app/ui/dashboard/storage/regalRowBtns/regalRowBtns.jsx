

export default function RegalRowBtns({handleRegalRowClick}) {
    
	return (
		<div>
			<button onClick={() => handleRegalRowClick("Razem")}>Razem</button>
			<button onClick={() => handleRegalRowClick("A")}>A</button>
			<button onClick={() => handleRegalRowClick("B")}>B</button>
			<button onClick={() => handleRegalRowClick("C")}>C</button>
			<button onClick={() => handleRegalRowClick("D")}>D</button>
			<button onClick={() => handleRegalRowClick("E")}>E</button>
		</div>
	);
}
