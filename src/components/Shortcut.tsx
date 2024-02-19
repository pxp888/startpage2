interface ShortcutProps {
	idx: number;
	name: string;
	link: string;
	image: string;
	editMode: boolean;
	selected: number;
	clicked: (index: number) => void;
}

function Shortcut({
	idx,
	name,
	link,
	image,
	editMode,
	selected,
	clicked,
}: ShortcutProps) {
	const index = idx;
	return (
		<div
			className={
				"shortcut " +
				(selected === index ? "selected" : "") +
				(editMode ? "editmode" : "")
			}
			onClick={() => clicked(index)}
		>
			<h2>{name}</h2>
			<p>{idx}</p>
			<p>{link}</p>
			<img src={image} alt="" />
		</div>
	);
}

export default Shortcut;
