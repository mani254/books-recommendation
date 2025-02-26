import React from "react";

function ImageComponent({ className, path, ...other }) {
	const actualUrl = `http://localhost:8080/${path.slice(6)}`;
	return <img src={actualUrl} className={className} {...other} />;
}

export default ImageComponent;
