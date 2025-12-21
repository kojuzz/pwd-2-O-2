import { Box, Typography } from "@mui/material";
import Post from "../components/Post";

import { useQuery } from "@tanstack/react-query";

const api = "http://localhost:8800";

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
        {posts.map(post => {
            return <Post key={post.id} post={post} />
        })}
    </Box>
}