// React - JSX
function List() {
	return <ul>
        <li>Item One</li>
        <li>Item Two</li>
        <li>Item Three</li>
        <li>Item Four</li>
        <li>Item Five</li>
        <li>Item Six</li>
        <li>Item Seven</li>
    </ul>
}

ReactDOM.render(
	<List />,
	document.getElementById("app")
);
