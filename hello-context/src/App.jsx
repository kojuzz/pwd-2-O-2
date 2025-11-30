import { useState, useEffect, useMemo } from "react";

function someFun() {
    console.log("Calling someFun()...");
    return "Some value";
}

export default function App() {
	const [count, setCount] = useState(0);

	const value = useMemo(() => {
        return someFun();
    }, []);

	return (
		<div>
			<h1>Header ({count})</h1>
			<p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
			<button onClick={() => setCount(count + 1)}>Button</button>
		</div>
	);
}
