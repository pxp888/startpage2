import {useState} from "react";

import Shortcut from "./components/Shortcut";
import SettingPanel from "./components/SettingPanel";

import "./App.css";

function App() {
	let local = localStorage.getItem("shortcuts");
	const defaults = ["New Shortcut", "www.google.com", "./blankimage.png"];
	let startcuts: string[][];
	if (local) {
		startcuts = JSON.parse(local);
	} else {
		startcuts = [defaults];
	}
	const [shortcuts, setShortcuts] = useState(startcuts);
	const [editMode, setEditMode] = useState(true);
	const [selected, setSelected] = useState(-1);

	const [name, setName] = useState("");
	const [link, setLink] = useState("");
	const [image, setImage] = useState("");

	function clicked(index: number) {
		if (!editMode) {
			window.open("//" + shortcuts[index][1], "_blank");
			return;
		}
		console.log("clicked", index);
		setSelected(index);
		setName(shortcuts[index][0]);
		setLink(shortcuts[index][1]);
		setImage(shortcuts[index][2]);
	}

	function remover(index: number) {
		console.log("remove", index);
		setSelected(-1);
		let cuts = shortcuts.filter((_, i) => i !== index);
		setShortcuts(cuts);
	}

	function plusClicked() {
		console.log("plus clicked");
		let cuts = [...shortcuts, defaults];
		setShortcuts(cuts);
		setSelected(cuts.length - 1);
		setName(defaults[0]);
		setLink(defaults[1]);
		setImage(defaults[2]);
	}

	function nameChanged(name: string) {
		setName(name);
		let cuts = [...shortcuts];
		cuts[selected][0] = name;
		setShortcuts(cuts);
		localStorage.setItem("shortcuts", JSON.stringify(cuts));
	}

	function linkChanged(link: string) {
		setLink(link);
		let cuts = [...shortcuts];
		cuts[selected][1] = link;
		setShortcuts(cuts);
		localStorage.setItem("shortcuts", JSON.stringify(cuts));
	}

	function imageChanged(image: string) {
		setImage(image);
		let cuts = [...shortcuts];
		cuts[selected][2] = image;
		setShortcuts(cuts);
		localStorage.setItem("shortcuts", JSON.stringify(cuts));
	}

	function toggleEditMode() {
		setEditMode(!editMode);
		setSelected(-1);
	}

	return (
		<>
			<div className="main_area">
				<div className="main_content">
					<div className="frame">
						{shortcuts.map((shortcut, index) => (
							<Shortcut
								key={index}
								idx={index}
								name={shortcut[0]}
								link={shortcut[1]}
								image={shortcut[2]}
								editMode={editMode}
								selected={selected}
								clicked={clicked}
								remover={remover}
							/>
						))}

						{editMode ? (
							<div
								className="plusbutton shortcut"
								onClick={plusClicked}
							>
								<img src="./plus.png" alt="new icon button" />
							</div>
						) : null}
					</div>
				</div>

				<div className="setting_area">
					<SettingPanel
						name={name}
						link={link}
						image={image}
						nameChanged={nameChanged}
						linkChanged={linkChanged}
						imageChanged={imageChanged}
						selected={selected}
						editMode={editMode}
					/>
				</div>
			</div>

			<div className="setbutton" onClick={toggleEditMode}>
				<img src="./settings.png" alt="toggle settings" />
			</div>
		</>
	);
}

export default App;
