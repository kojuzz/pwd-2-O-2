import { useContext } from "react";
import { AppContext } from "./AppProvider";

export default function Title() {
    const value = useContext(AppContext);

	return <h1>Title ({value})</h1>;
}
