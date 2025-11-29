import { useState } from "react";

import Item from "./Item.jsx";
import Header from "./Header.jsx";
import Form from "./Form.jsx";

import { Container, Divider, List } from "@mui/material";

export default function App() {
	const [data, setData] = useState([
		{ id: 3, name: "Apple", done: false },
		{ id: 2, name: "Orange", done: true },
		{ id: 1, name: "Egg", done: false },
	]);

	const add = name => {
		const id = data[0] ? data[0].id + 1 : 1;

		if (name == "") return false;
		setData([{ id, name, done: false }, ...data]);
	};

	const del = id => {
		setData(data.filter(item => item.id !== id));
	};

	const toggle = id => {
		setData(
			data.map(item => {
				if (item.id === id) item.done = !item.done;
				return item;
			})
		);
	};

	return (
		<div>
			<Header count={data.filter(item => !item.done).length} />

			<Container
				maxWidth="sm"
				sx={{ mt: 4 }}>
				<Form add={add} />

				<List>
					{data
						.filter(item => !item.done)
						.map(item => {
							return (
								<Item
									key={item.id}
									item={item}
									del={del}
									toggle={toggle}
								/>
							);
						})}
				</List>
				<Divider />
				<List>
					{data
						.filter(item => item.done)
						.map(item => {
							return (
								<Item
									key={item.id}
									item={item}
									del={del}
									toggle={toggle}
								/>
							);
						})}
				</List>
			</Container>
		</div>
	);
}
