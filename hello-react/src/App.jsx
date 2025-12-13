import { useState, useEffect } from "react";

import Item from "./Item.jsx";
import Header from "./Header.jsx";
import Form from "./Form.jsx";

import { Container, Divider, List, Typography, Box } from "@mui/material";

const api = "http://localhost:8800/tasks";

export default function App() {
	const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();

	useEffect(() => {
        setIsLoading(true);
		fetch(api).then(async res => {
            const tasks = await res.json();
			setData(tasks);
            setIsLoading(false);
		})
        .catch(() => {
            setError("Unable to fetch");
            setIsLoading(false);
        });
	}, []);

	const add = async name => {
		const res = await fetch(api, {
            method: "POST",
            body: JSON.stringify({ name }),
            headers: {
                "Content-Type": "application/json"
            },
        });

        const task = await res.json();
        setData([task, ...data]);
	};

	const del = id => {
        fetch(`${api}/${id}`, { method: "DELETE" });
		setData(data.filter(item => item.id !== id));
	};

	const toggle = id => {
        fetch(`${api}/${id}/toggle`, { method: "PUT" });
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

				{isLoading && (
					<Box sx={{ mt: 4, textAlign: "center" }}>
						<Typography>Loading...</Typography>
					</Box>
				)}

				{error && (
					<Box sx={{ mt: 4, textAlign: "center" }}>
						<Typography color="error">{error}</Typography>
					</Box>
				)}

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
