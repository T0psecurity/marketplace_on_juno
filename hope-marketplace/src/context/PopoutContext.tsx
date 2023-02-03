import ReactDOM from "react-dom";
import React, {
	useState,
	useEffect,
	useRef,
	useCallback,
	ReactElement,
	useContext,
	useMemo,
} from "react";
import styled from "styled-components";
import { ThemeContext } from "./ThemeContext";
import { isMobileDevice } from "../util/basic";

type WindowOption = {
	title?: string;
	onClose?: any;
};

interface RenderInWindowProps {
	option?: WindowOption;
	onClose: any;
	children: any;
}

const copyStyles = (src: any, dest: any) => {
	Array.from(src.styleSheets).forEach((styleSheet: any) => {
		const styleElement = styleSheet.ownerNode.cloneNode(true);
		styleElement.href = styleSheet.href;
		dest.head.appendChild(styleElement);
	});
	Array.from(src.fonts).forEach((font) => dest.fonts.add(font));
};

const NewWindowOnMobile = styled.div`
	background-color: ${({ theme }) => theme.colors.backgroundColor};
	position: fixed;
	left: 0;
	top: 0;
	width: 100vw;
	height: 100vh;
	overflow: auto;
	z-index: 1000;
`;

const CloseButton = styled.span`
	font-size: 20px;
	font-weight: bold;
	position: absolute;
	right: 30px;
	top: 30px;
	color: ${({ theme }) => theme.colors.fontColor};
	cursor: pointer;
`;

const RenderInWindow = ({ option, onClose, children }: RenderInWindowProps) => {
	const [container] = useState<any>(document.createElement("div"));
	const { isDark } = useContext(ThemeContext);
	const newWindow: any = useRef(window);

	// useEffect(() => {
	//   // Create container element on client-side
	//   const divElement = document.createElement("div");
	//   divElement.innerHTML = "Hello world";
	//   setContainer(divElement);
	// }, []);

	useEffect(() => {
		// When container is ready
		if (container) {
			// Create window
			newWindow.current = window.open(
				"",
				option?.title || "",
				"popup=1,width=400,height=700,left=20,top=20,resizable=0,channelmode=no,directories=no,fullscreen=no,location=no,dependent=yes,menubar=no,scrollbars=yes,status=no,toolbar=no,titlebar=no"
			);
			// Append container

			// the problem is that newWindow.current is NULL.
			newWindow.current?.document?.body?.appendChild(container);
			if (isDark && newWindow.current?.document?.body) {
				newWindow.current.document.body.style.backgroundColor = "#313131";
			}
			newWindow.current.addEventListener("beforeunload", () => {
				if (!newWindow.current.alreadyPrompted) onClose();
				newWindow.current.alreadyPrompted = true;
			});
			copyStyles(window.document, newWindow.current.document);

			// Save reference to window for cleanup
			const curWindow: any = newWindow.current;

			// Return cleanup function
			return () => {
				curWindow.close();
			};
		}
	}, [container, option, onClose, isDark]);

	return container && ReactDOM.createPortal(children, container);
};

interface WindowChildren extends ReactElement {}

declare global {
	interface Window {
		promptedClosing: any;
		onClosePopoutFunc: any;
	}
}

const PopoutContext = React.createContext({
	showNewWindow: (component: WindowChildren, options?: WindowOption) => {},
	closeNewWindow: (params?: any) => {},
});

const PopoutContextProvider = ({ children }: { children: any }) => {
	const [showWindow, setShowWindow] = useState<boolean>(false);
	const [windowOption, setWindowOption] = useState<WindowOption>();
	const [windowChildren, setWindowChildren] = useState<WindowChildren>();

	const isMobile = useMemo(() => isMobileDevice(), []);

	const closeNewWindow = useCallback((params?: any) => {
		setShowWindow(false);
		// if (windowOption?.onClose && !window.promptedClosing) {
		//   windowOption.onClose(params);
		// }
		if (window.onClosePopoutFunc && !window.promptedClosing) {
			window.onClosePopoutFunc(params);
		}
		window.promptedClosing = true;
	}, []);

	const showNewWindow = useCallback(
		(component: WindowChildren, options?: WindowOption) => {
			setWindowOption(options);
			setWindowChildren(component);
			setShowWindow(true);
			window.promptedClosing = false;
			// setWindowOption doesn't work properly. So when the popout window closes, the previous onClose func ia called.
			window.onClosePopoutFunc = options?.onClose;
		},
		[]
	);

	return (
		<PopoutContext.Provider value={{ showNewWindow, closeNewWindow }}>
			{children}
			{!isMobile && showWindow && (
				<RenderInWindow onClose={closeNewWindow} option={windowOption}>
					{windowChildren}
				</RenderInWindow>
			)}
			{isMobile && showWindow && (
				<NewWindowOnMobile>
					<CloseButton onClick={() => closeNewWindow()}>X</CloseButton>
					{windowChildren}
				</NewWindowOnMobile>
			)}
		</PopoutContext.Provider>
	);
};

export { PopoutContext, PopoutContextProvider };
