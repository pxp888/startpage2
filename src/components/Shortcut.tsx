import ImgDrop from "./ImgDrop";
import "./shortcut.css";

interface ShortcutProps {
	idx: number;
	name: string;
	// link: string;
	image: string;
	editMode: boolean;
	selected: number;
	clicked: (index: number) => void;
	remover: (index: number) => void;
	imageDropped: (index: number, image: string) => void;
}

function Shortcut({
	idx,
	name,
	// link,
	image,
	editMode,
	selected,
	clicked,
	remover,
	imageDropped,
}: ShortcutProps) {
	const index = idx;

	return (
		<>
			<div
				className={
					"shortcut" +
					(selected === index ? " selected" : "") +
					(editMode ? " editmode" : "")
				}
				onClick={() => clicked(index)}
			>
				{editMode ? (
					<p className="name">{name}</p>
				) : (
					<a href="#" className="name">
						{name}
					</a>
				)}

				{/* <p>{idx}</p> */}
				{/* <p>{link}</p> */}
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
