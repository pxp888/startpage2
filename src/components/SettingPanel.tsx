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
	return (
		<div>
			<h1>Setting Panel</h1>
			<div>
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
		</div>
	);
}

export default SettingPanel;
