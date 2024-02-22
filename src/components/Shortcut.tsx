import ImgDrop from "./ImgDrop";
// import OrderDrop from "./OrderDrop";

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
							idx={index}
							moveIcons={moveIcons}
						/>
					</>
				) : // <OrderDrop idx={index} moveIcons={moveIcons} />
				null}
			</div>
		</>
	);
}

export default Shortcut;
