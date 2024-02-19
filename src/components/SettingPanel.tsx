import {useState} from "react";

import "./settingpanel.css";

interface SettingPanelProps {
	name: string;
	link: string;
	image: string;
	nameChanged: (name: string) => void;
	linkChanged: (link: string) => void;
	imageChanged: (image: string) => void;
	selected: number;
}

function SettingPanel({
	name,
	link,
	image,
	nameChanged,
	linkChanged,
	imageChanged,
	selected,
}: SettingPanelProps) {
	const [frameSize, setFrameSize] = useState(800);
	const [cutSize, setCutSize] = useState(150);
	const [backColor, setBackColor] = useState("#242424");
	const [frameColor, setFrameColor] = useState("#000000");

	function applySettings() {
		let root = document.documentElement;
		if (root) {
			root.style.setProperty("--backgroundcolor", backColor);
			root.style.setProperty("--framecolor", frameColor);
			root.style.setProperty("--iconsize", cutSize + "px");
			root.style.setProperty("--framesize", frameSize + "px");
		}
	}

	function frameSizeChanged(size: number) {
		setFrameSize(size);
		applySettings();
	}

	function cutSizeChanged(size: number) {
		setCutSize(size);
		applySettings();
	}

	function backColorChanged(color: string) {
		setBackColor(color);
		applySettings();
	}

	function frameColorChanged(color: string) {
		setFrameColor(color);
		applySettings();
	}

	applySettings();

	return (
		<div id="settingpanel">
			<div id="iconsettings">
				<label htmlFor="nameline">Name:</label>
				<input
					type="text"
					id="nameline"
					placeholder="Name"
					value={name}
					onChange={(e) => {
						nameChanged(e.target.value);
					}}
					{...(selected === -1 ? {disabled: true} : {})}
				/>
				<label htmlFor="linkline">URL:</label>
				<input
					type="text"
					id="linkline"
					placeholder="URL"
					value={link}
					onChange={(e) => {
						linkChanged(e.target.value);
					}}
					{...(selected === -1 ? {disabled: true} : {})}
				/>
				<label htmlFor="imageline">Image URL:</label>
				<input
					type="text"
					id="imageline"
					placeholder="Image URL"
					value={image}
					onChange={(e) => {
						imageChanged(e.target.value);
					}}
					{...(selected === -1 ? {disabled: true} : {})}
				/>
			</div>
			<div id="pagesettings">
				<label htmlFor="framesizecontrol">Frame Size </label>
				<input
					id="framesizecontrol"
					type="range"
					min="400"
					max="4000"
					value={frameSize}
					onChange={(e) => {
						frameSizeChanged(parseInt(e.target.value));
					}}
				/>
				<label htmlFor="cutsizecontrol">Icon Size </label>
				<input
					id="cutsizecontrol"
					type="range"
					min="50"
					max="500"
					value={cutSize}
					onChange={(e) => {
						cutSizeChanged(parseInt(e.target.value));
					}}
				/>
				<label htmlFor="backcolorcontrol">Color </label>
				<input
					id="backcolorcontrol"
					type="color"
					value={backColor}
					onChange={(e) => {
						backColorChanged(e.target.value);
					}}
				/>
				<label htmlFor="framecolorcontrol">Color </label>
				<input
					id="framecolorcontrol"
					type="color"
					value={frameColor}
					onChange={(e) => {
						frameColorChanged(e.target.value);
					}}
				/>
			</div>
		</div>
	);
}

export default SettingPanel;
