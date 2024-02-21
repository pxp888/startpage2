import {useState, useRef} from "react";

import BackImage from "./BackImage";
import "./settingpanel.css";

interface SettingPanelProps {
	name: string;
	link: string;
	image: string;
	nameChanged: (name: string) => void;
	linkChanged: (link: string) => void;
	imageChanged: (image: string) => void;
	swapIcons: (idx: number, up: boolean) => void;
	selected: number;
	editMode: boolean;
}

function SettingPanel({
	name,
	link,
	image,
	nameChanged,
	linkChanged,
	imageChanged,
	swapIcons,
	selected,
	editMode,
}: SettingPanelProps) {
	let defaults: string[];
	const local = localStorage.getItem("pageSettings");
	if (local) {
		defaults = JSON.parse(local);
	} else {
		defaults = ["800", "150", "#242424", "#000000", "30", "0"];
	}

	const [frameSize, setFrameSize] = useState(parseInt(defaults[0]));
	const [cutSize, setCutSize] = useState(parseInt(defaults[1]));
	const [backColor, setBackColor] = useState(defaults[2]);
	const [frameColor, setFrameColor] = useState(defaults[3]);
	const [framepadding, setFramePadding] = useState(parseInt(defaults[4]));
	const [iconmargin, setIconMargin] = useState(parseInt(defaults[5]));

	function applySettings() {
		let root = document.documentElement;
		if (root) {
			root.style.setProperty("--backgroundcolor", backColor);
			root.style.setProperty("--framecolor", frameColor);
			root.style.setProperty("--iconsize", cutSize + "px");
			root.style.setProperty("--framesize", frameSize + "px");
			root.style.setProperty("--framepadding", framepadding + "px");
			root.style.setProperty("--iconmargin", iconmargin + "px");
		}
		let local = [
			frameSize.toString(),
			cutSize.toString(),
			backColor,
			frameColor,
			framepadding.toString(),
			iconmargin.toString(),
		];
		localStorage.setItem("pageSettings", JSON.stringify(local));
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

	function framePaddingChanged(padding: number) {
		setFramePadding(padding);
		applySettings();
	}

	function iconMarginChanged(margin: number) {
		setIconMargin(margin);
		applySettings();
	}

	function moveUp() {
		swapIcons(selected - 1, true);
	}

	function moveDown() {
		swapIcons(selected, false);
	}

	function saveLocalStorage() {
		const localStorageData = JSON.stringify(localStorage);

		const blob = new Blob([localStorageData], {type: "application/json"});

		const downloadLink = document.createElement("a");
		downloadLink.href = URL.createObjectURL(blob);
		downloadLink.download = "startpage.json";
		downloadLink.textContent = "Download Backup";

		document.body.appendChild(downloadLink);
		downloadLink.click();

		URL.revokeObjectURL(downloadLink.href);
	}

	const fileInputRef = useRef<HTMLInputElement>(null);

	function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
		if (!event.target.files) {
			console.error("No files selected");
			return;
		}
		const file = event.target.files[0];
		const reader = new FileReader();
		reader.onload = (event) => {
			try {
				const data = JSON.parse(event.target!.result as string);
				for (const key in data) {
					if (data.hasOwnProperty(key)) {
						localStorage.setItem(key, data[key]);
					}
				}
				console.log("Data loaded into localStorage");
			} catch (error) {
				console.error("Error parsing JSON", error);
			}
		};
		reader.onerror = (error) => {
			console.error("Error reading file", error);
		};
		reader.readAsText(file);
		location.reload();
	}

	function uploadLocalStorage() {
		const fileInput = fileInputRef.current;
		if (fileInput) {
			fileInput.click();
		} else {
			console.error("File input element not found!");
		}
	}

	applySettings();

	return (
		<>
			{editMode ? (
				<div id="settingpanel">
					<div id="iconsettings">
						<div>
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
						</div>
						<div>
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
						</div>
						<div>
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
						<div>
							<label>Icon Order</label>
							<div className="halves">
								<button onClick={moveUp}>Up</button>
								<button onClick={moveDown}>Down</button>
							</div>
						</div>
					</div>
					<div id="pagesettings">
						<div>
							<label htmlFor="framesizecontrol">
								Max Frame Size{" "}
							</label>
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
						</div>
						<div>
							<label htmlFor="framepadcontrol">
								Frame Padding{" "}
							</label>
							<input
								id="framepadcontrol"
								type="range"
								min="0"
								max="200"
								value={framepadding}
								onChange={(e) => {
									framePaddingChanged(
										parseInt(e.target.value)
									);
								}}
							/>
						</div>
						<div>
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
						</div>
						<div>
							<label htmlFor="iconmargincontrol">
								Icon Margin{" "}
							</label>
							<input
								id="iconmargincontrol"
								type="range"
								min="0"
								max="100"
								value={iconmargin}
								onChange={(e) => {
									iconMarginChanged(parseInt(e.target.value));
								}}
							/>
						</div>
					</div>
					<div id="filesettings">
						<BackImage />
						<div>
							<label htmlFor="backcolorcontrol">
								Background Color{" "}
							</label>
							<input
								id="backcolorcontrol"
								type="color"
								value={backColor}
								onChange={(e) => {
									backColorChanged(e.target.value);
								}}
							/>
						</div>
						<div>
							<label htmlFor="framecolorcontrol">
								Frame Color{" "}
							</label>
							<input
								id="framecolorcontrol"
								type="color"
								value={frameColor}
								onChange={(e) => {
									frameColorChanged(e.target.value);
								}}
							/>
						</div>
						<div>
							<label>File Operations: </label>
							<div className="halves">
								<button onClick={uploadLocalStorage}>
									Import File
								</button>
								<button onClick={saveLocalStorage}>
									Export File
								</button>
								<input
									type="file"
									id="fileinput"
									ref={fileInputRef}
									style={{display: "none"}}
									onChange={handleFileChange}
								/>
							</div>
						</div>
					</div>
				</div>
			) : null}
		</>
	);
}

export default SettingPanel;
