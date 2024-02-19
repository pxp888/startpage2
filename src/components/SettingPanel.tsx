interface SettingPanelProps {
	name: string;
	link: string;
	image: string;
	nameChanged: (name: string) => void;
	linkChanged: (link: string) => void;
	imageChanged: (image: string) => void;
}

function SettingPanel({
	name,
	link,
	image,
	nameChanged,
	linkChanged,
	imageChanged,
}: SettingPanelProps) {
	return (
		<div>
			<h1>Setting Panel</h1>
			<input
				type="text"
				id="nameline"
				placeholder="Name"
				value={name}
				onChange={(e) => {
					nameChanged(e.target.value);
				}}
			/>
			<input
				type="text"
				id="linkline"
				placeholder="URL"
				value={link}
				onChange={(e) => {
					linkChanged(e.target.value);
				}}
			/>
			<input
				type="text"
				id="imageline"
				placeholder="Image URL"
				value={image}
				onChange={(e) => {
					imageChanged(e.target.value);
				}}
			/>
		</div>
	);
}

export default SettingPanel;
