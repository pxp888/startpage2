interface OrderDropProps {
	idx: number;
	moveIcons: (src: number, dest: number) => void;
}

function OrderDrop({idx, moveIcons}: OrderDropProps) {
	function handleDrop(e: React.DragEvent<HTMLDivElement>) {
		e.preventDefault();
		let source = e.dataTransfer.getData("text");
		moveIcons(parseInt(source), idx);
	}

	return (
		<div
			className="drop-zone"
			draggable="true"
			onDragOver={(e) => e.preventDefault()}
			onDrop={handleDrop}
			onDragStart={(e) =>
				e.dataTransfer.setData("text/plain", idx.toString())
			}
		></div>
	);
}

export default OrderDrop;
