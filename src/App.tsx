import {useState} from "react";

import Shortcut from "./components/Shortcut";
import SettingPanel from "./components/SettingPanel";

import "./App.css";

function App() {
	let local = localStorage.getItem("shortcuts");
	const defaults = ["New Shortcut", "", ""];
	let startcuts: string[][];
	if (local) {
		startcuts = JSON.parse(local);
	} else {
		startcuts = [defaults];
	}
	const [shortcuts, setShortcuts] = useState(startcuts);
	const [editMode, setEditMode] = useState(false);
	const [selected, setSelected] = useState(-1);

	const [name, setName] = useState("");
	const [link, setLink] = useState("");
	const [image, setImage] = useState("");

	function clicked(index: number) {
		if (!editMode) {
			return;
		}
		setSelected(index);
		setName(shortcuts[index][0]);
		setLink(shortcuts[index][1]);
		setImage(shortcuts[index][2]);
	}

	function remover(index: number) {
		setSelected(-1);
		let cuts = shortcuts.filter((_, i) => i !== index);
		setShortcuts(cuts);
		localStorage.setItem("shortcuts", JSON.stringify(cuts));
	}

	function plusClicked() {
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

	function swapIcons(idx: number, up: boolean) {
		if (idx === -1) return;
		if (idx === shortcuts.length - 1) return;
		let cuts = [...shortcuts];
		let temp = shortcuts[idx + 1];
		cuts[idx + 1] = cuts[idx];
		cuts[idx] = temp;
		setShortcuts(cuts);
		up ? setSelected(idx) : setSelected(idx + 1);
		localStorage.setItem("shortcuts", JSON.stringify(cuts));
	}

	function moveIcons(src: number, dest: number) {
		if (src === -1 || dest === -1) return;
		let cuts = [...shortcuts];
		let temp = cuts[src];
		cuts.splice(src, 1);
		cuts.splice(dest, 0, temp);
		setShortcuts(cuts);
		// setSelected(dest);
		localStorage.setItem("shortcuts", JSON.stringify(cuts));
	}

	function imageDropped(index: number, image: string) {
		let cuts = [...shortcuts];
		cuts[index][2] = image;
		setShortcuts(cuts);
		localStorage.setItem("shortcuts", JSON.stringify(cuts));
	}

	const back = localStorage.getItem("backgroundImage") || null;
	if (back) {
		document.body.style.backgroundImage = `url(${back})`;
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
								imageDropped={imageDropped}
								moveIcons={moveIcons}
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

						{shortcuts.length % 2 === 1 ? (
							<div className="shortcut"></div>
						) : null}
						<div className="colorframe"></div>
					</div>
				</div>
				<div className={"spacer " + (editMode ? "edit" : "")} />
				<div className={"setting_area " + (editMode ? "edit" : "")}>
					<div className="setbutton" onClick={toggleEditMode}>
						<img src="./settings.png" alt="toggle settings" />
					</div>
					<SettingPanel
						name={name}
						link={link}
						image={image}
						nameChanged={nameChanged}
						linkChanged={linkChanged}
						imageChanged={imageChanged}
						selected={selected}
						editMode={editMode}
						swapIcons={swapIcons}
					/>
				</div>
			</div>
		</>
	);
}

export default App;
