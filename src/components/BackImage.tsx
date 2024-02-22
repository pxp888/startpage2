import {useState} from "react";

function BackImage() {
	const [backgroundImage, setBackgroundImage] = useState(
		localStorage.getItem("backgroundImage") || ""
	);

	document.body.style.backgroundImage = `url(${backgroundImage})`;

	function backChanged(bimg: string) {
		localStorage.setItem("backgroundImage", bimg);
		setBackgroundImage(bimg);
		document.body.style.backgroundImage = `url(${bimg})`;
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
		backChanged(imageAddress);
	}

	return (
		<div className="back-image">
			<label htmlFor="backline">Background </label>
			<input
				type="text"
				id="backline"
				placeholder="Background Image URL"
				value={backgroundImage}
				onChange={(e) => {
					backChanged(e.target.value);
				}}
				onDrop={handleDrop}
			/>
		</div>
	);
}

export default BackImage;
