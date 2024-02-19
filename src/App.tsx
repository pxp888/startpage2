import {useState} from "react";

import Shortcut from "./components/Shortcut";
import SettingPanel from "./components/SettingPanel";

import "./App.css";

function App() {
	const defaults = ["New Shortcut", "www.google.com", "./blankimage.png"];
	const [shortcuts, setShortcuts] = useState([defaults, defaults]);
	const [editMode, setEditMode] = useState(true);
	const [selected, setSelected] = useState(-1);

	const [name, setName] = useState("");
	const [link, setLink] = useState("");
	const [image, setImage] = useState("");

	function clicked(index: number) {
		console.log("clicked", index);
	}

	function nameChanged(name: string) {
		setName(name);
	}

	function linkChanged(link: string) {
		setLink(link);
	}

	function imageChanged(image: string) {
		setImage(image);
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
							/>
						))}
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
					/>
				</div>
			</div>
		</>
	);
}

export default App;
