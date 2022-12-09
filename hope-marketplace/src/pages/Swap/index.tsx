import React, { useState } from "react";
import TokenListModal from "../../components/TokenListModal";
import { Wrapper } from "./styled";

const Swap: React.FC = () => {
	const [visible, setVisible] = useState(false);

	return (
		<Wrapper>
			<div onClick={() => setVisible(true)}>Open Modal</div>
			<TokenListModal isOpen={visible} onClose={() => setVisible(false)} />
		</Wrapper>
	);
};

export default Swap;
