import ImgDrop from "./ImgDrop";
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
	imageDropped: (index: number, image: string) => void;
	moveIcons: (src: number, dest: number) => void;
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
	imageDropped,
	moveIcons,
}: ShortcutProps) {
	const index = idx;

	function handleDrop(e: React.DragEvent<HTMLDivElement>) {
		e.preventDefault();
		let source = e.dataTransfer.getData("text");
		// console.log("drop", source, index);
		moveIcons(parseInt(source), index);
	}

	const draggers = editMode
		? {}
		: {
				draggable: "true",
				onDragStart: (e: React.DragEvent<HTMLDivElement>) =>
					e.dataTransfer.setData("text/plain", index.toString()),
				onDragOver: (e: React.DragEvent<HTMLDivElement>) =>
					e.preventDefault(),
				onDrop: (e: React.DragEvent<HTMLDivElement>) => handleDrop(e),
		  };

	return (
		<>
			<div
				className={
					"shortcut" +
					(selected === index ? " selected" : "") +
					(editMode ? " editmode" : "")
				}
				onClick={() => clicked(index)}
				{...draggers}
			>
				{editMode ? (
					<p className="name">{name}</p>
				) : (
					<a href={link} className="name" target="_blank">
						{name}
					</a>
				)}

				{image ? (
					<img src={image} alt="" />
				) : (
					<img src="./blankimage.png" alt="" />
				)}
				{editMode ? (
					<>
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
						<ImgDrop
							setImage={(image: string) => {
								imageDropped(index, image);
							}}
						/>
					</>
				) : null}
			</div>
		</>
	);
}

export default Shortcut;
