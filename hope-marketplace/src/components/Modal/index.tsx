import React, { useState } from "react";
import { ModalProps } from "styled-react-modal";
import { StyledModal } from "./styled";

export interface IModal extends ModalProps {
	onClose: () => void;
}

const Modal: React.FC<IModal> = ({ isOpen, onClose, children, ...rest }) => {
	const [opacity, setOpacity] = useState(0);

	const afterOpen = () => {
		if (!isOpen) return;
		setTimeout(() => {
			setOpacity(1);
		}, 100);
	};

	const beforeClose = () => {
		return new Promise((resolve) => {
			setOpacity(0);
			onClose();
			setTimeout(resolve, 300);
		});
	};

	return (
		<StyledModal
			isOpen={isOpen}
			afterOpen={afterOpen}
			beforeClose={beforeClose}
			onBackgroundClick={beforeClose}
			onEscapeKeydown={beforeClose}
			// opacity={opacity}
			backgroundProps={{ opacity }}
			allowScroll={false}
			{...rest}
		>
			{children}
			{/* <span>I am a modal!</span>
			<button onClick={beforeClose}>Close me</button> */}
		</StyledModal>
	);
};

export default Modal;
