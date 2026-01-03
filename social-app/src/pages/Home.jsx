import { Box, Typography } from "@mui/material";
import Post from "../components/Post";
import Form from "../components/Form";

import { useQuery } from "@tanstack/react-query";

import { api } from "../libs/config";

export default function Home() {
    const { data: posts, isLoading, error } = useQuery({
        queryKey: ["posts"],
        queryFn: async () => {
            const res = await fetch(`${api}/posts`);
            return res.json();
        }
    });

    if(isLoading) {
        return <Typography>Loading...</Typography>;
    }

    if (error) {
		return <Typography>{error.message}</Typography>;
	}

    return <Box>
        <Form />
        {posts.map(post => {
            return <Post key={post.id} post={post} />
        })}
    </Box>
}