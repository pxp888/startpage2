import {useState} from "react";

function BackImage() {
	const [backgroundImage, setBackgroundImage] = useState(
		localStorage.getItem("backgroundImage") || "none"
	);

	document.body.style.backgroundImage = `url(${backgroundImage})`;

	function backChanged(bimg: string) {
		localStorage.setItem("backgroundImage", bimg);
		setBackgroundImage(bimg);
		document.body.style.backgroundImage = `url(${bimg})`;
	}

	return (
		<div className="back-image">
			<label htmlFor="backline">Background : </label>
			<input
				type="text"
				id="backline"
				placeholder="Background Image URL"
				value={backgroundImage}
				onChange={(e) => {
					backChanged(e.target.value);
				}}
			/>
		</div>
	);
}

export default BackImage;
