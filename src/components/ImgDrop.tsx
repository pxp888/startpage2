import React, {useState} from "react";
import "./imgdrop.css";

interface ImgDropProps {
	setImage: (image: string) => void;
	idx: number;
	moveIcons: (src: number, dest: number) => void;
}

function ImgDrop({setImage, idx, moveIcons}: ImgDropProps) {
	const [dragover, setDragover] = useState(false);

	function handleDrop(event: React.DragEvent) {
		setDragover(false);
		event.preventDefault();
		const imageUrl = event.dataTransfer.getData("text/html");
		if (imageUrl !== "") {
			const parser = new DOMParser();
			const doc = parser.parseFromString(imageUrl, "text/html");
			const img = doc.querySelector("img");
			if (img == null) {
				return;
			}
			const imageAddress = img.src;
			setImage(imageAddress);
			return;
		}

		const text = event.dataTransfer.getData("text");
		if (text === "" || text == null) {
			return;
		}
		const source = parseInt(text);
		moveIcons(source, idx);
		return;
	}

	return (
		<div
			className={"drop-zone" + (dragover ? " dragover" : "")}
			draggable="true"
			onDragOver={(e) => {
				e.preventDefault();
				setDragover(true);
			}}
			onDragLeave={() => setDragover(false)}
			onDrop={handleDrop}
			onDragStart={(e) =>
				e.dataTransfer.setData("text/plain", idx.toString())
			}
		></div>
	);
}

export default ImgDrop;
