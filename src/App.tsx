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
		startcuts = [
			[
				"Google",
				"http://www.google.com/",
				"https://cdn.iconscout.com/icon/free/png-256/free-google-1772223-1507807.png",
			],
			[
				"Gmail",
				"http://www.gmail.com/",
				"https://cdn-icons-png.flaticon.com/512/732/732200.png",
			],
			[
				"Photos",
				"http://www.photos.google.com/",
				"https://cdn-icons-png.flaticon.com/512/2991/2991131.png",
			],
			[
				"Calendar",
				"https://calendar.google.com/calendar/r?pli=1",
				"https://cdn-icons-png.flaticon.com/512/5968/5968499.png",
			],
			[
				"Maps",
				"https://www.google.com/maps",
				"https://cdn-icons-png.flaticon.com/512/1865/1865269.png",
			],
			[
				"Keep",
				"https://drive.google.com/keep/",
				"https://cdn-icons-png.flaticon.com/512/2965/2965358.png",
			],
			[
				"youTube",
				"http://www.youtube.com/",
				"https://cdn-icons-png.flaticon.com/512/1384/1384060.png",
			],
			[
				"Instagram",
				"http://www.instagram.com/",
				"https://cdn-icons-png.flaticon.com/512/174/174855.png",
			],
			[
				"Github",
				"http://www.github.com/",
				"https://cdn-icons-png.flaticon.com/512/733/733553.png",
			],
			[
				"Gemini",
				"https://bard.google.com/chat",
				"https://seeklogo.com/images/G/google-gemini-logo-A5787B2669-seeklogo.com.png",
			],
			[
				"ChatGPT",
				"https://chat.openai.com/chat",
				"https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/chatgpt-icon.png",
			],
			[
				"Bing",
				"https://www.bing.com/search?q=Bing+AI&qs=BC&sc=11-0&cvid=3C7623DF1FB14E998597DEC426ECF743&FORM=ASCHAT&asbe=BC&showconv=1&sp=11&lq=0",
				"https://play-lh.googleusercontent.com/17zMqR9Gx7pQxZh9Q1Zr_VGl7Ja5CnO4C70Ry0gJRXzXVcE6H4FwCZShVPRnF76w-g",
			],
			[
				"Facebook",
				"www.facebook.com",
				"https://cdn.iconscout.com/icon/free/png-256/free-facebook-logo-2019-1597680-1350125.png?f=webp",
			],
			[
				"Twitter",
				"www.twitter.com",
				"https://cdn.icon-icons.com/icons2/729/PNG/512/twitter_icon-icons.com_62751.png",
			],
			[
				"9gag",
				"https://9gag.com/",
				"https://cdn-icons-png.flaticon.com/512/3938/3938118.png",
			],
		];
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
				<div
					className="main_content"
					onClick={(e) => {
						setSelected(-1);
					}}
				>
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
