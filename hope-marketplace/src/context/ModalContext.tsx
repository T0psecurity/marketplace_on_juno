import { ModalProvider, BaseModalBackground } from "styled-react-modal";
import styled from "styled-components";

const FadingBackground = styled(BaseModalBackground)`
	opacity: ${(props: any) => props.opacity};
	transition: all 0.3s ease-in-out;
`;

export const ModalContextProvider = ({ children }: { children: any }) => {
	return (
		<ModalProvider backgroundComponent={FadingBackground}>
			{children}
		</ModalProvider>
	);
};
