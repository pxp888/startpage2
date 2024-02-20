import React, {useState} from "react";
import "./imgdrop.css";

interface ImgDropProps {
	setImage: (image: string) => void;
}

function ImgDrop({setImage}: ImgDropProps) {
	const [isDragOver, setIsDragOver] = useState(false);

	function handleDragEnter(event: React.DragEvent) {
		event.preventDefault();
		setIsDragOver(true);
	}

	function handleDragLeave(event: React.DragEvent) {
		event.preventDefault();
		setIsDragOver(false);
	}

	function handleDragOver(event: React.DragEvent) {
		event.preventDefault();
	}

	function handleDrop(event: React.DragEvent) {
		event.preventDefault();

		const imageUrl = event.dataTransfer.getData("text/html");
		const parser = new DOMParser();
		const doc = parser.parseFromString(imageUrl, "text/html");
		const img = doc.querySelector("img");
		if (img == null) {
			return;
		}
		const imageAddress = img.src;
		setImage(imageAddress);
		setIsDragOver(false);
	}

	return (
		<div
			className={"drop-zone" + (isDragOver ? " drag-over" : "")}
			onDragEnter={handleDragEnter}
			onDragLeave={handleDragLeave}
			onDragOver={handleDragOver}
			onDrop={handleDrop}
		>
			<p>Drop Image to set Icon</p>
		</div>
	);
}

export default ImgDrop;
