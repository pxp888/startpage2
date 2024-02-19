import "./shortcut.css";

interface ShortcutProps {
	idx: number;
	name: string;
	link: string;
	image: string;
	editMode: boolean;
	selected: number;
	clicked: (index: number) => void;
	remover: (index: number) => void;
}

function Shortcut({
	idx,
	name,
	link,
	image,
	editMode,
	selected,
	clicked,
	remover,
}: ShortcutProps) {
	const index = idx;
	return (
		<div
			className={
				"shortcut" +
				(selected === index ? " selected" : "") +
				(editMode ? " editmode" : "")
			}
			onClick={() => clicked(index)}
		>
			<p className="name">{name}</p>
			<p>{idx}</p>
			<p>{link}</p>
			<img src={image} alt="" />
			{editMode ? (
				<div className="xbutton">
					<img
						src="./x.webp"
						alt="delete button"
						onClick={(event) => {
							event?.stopPropagation();
							remover(index);
						}}
					/>
				</div>
			) : null}
		</div>
	);
}

export default Shortcut;
