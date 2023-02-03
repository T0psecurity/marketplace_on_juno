import styled from "styled-components";

export const Wrapper = styled.div`
	display: flex;
	align-items: center;
	gap: 5px;
	width: max-content;
`;

export const Switch = styled.label`
	display: inline-block;
	width: 60px; /*=w*/
	height: 30px; /*=h*/
	margin: 4px;
	position: relative;
	margin: 5px;
`;

export const Slider = styled.span`
	position: absolute;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
	border-radius: 30px;
	box-shadow: 0 0 0 2px #777, 0 0 4px #777;
	cursor: pointer;
	border: 4px solid transparent;
	overflow: hidden;
	transition: 0.2s;
	&:before {
		position: absolute;
		content: "";
		width: 50%;
		height: 100%;
		right: 0;
		background-color: #777;
		border-radius: 30px;
		transform: translateX(-30px); /*translateX(-(w-h))*/
		transition: 0.2s;
	}
`;

export const Checkbox = styled.input`
	display: none;
	&:checked + ${Slider} {
		box-shadow: 0 0 0 2px #02e296, 0 0 8px #02e296;
		&:before {
			transform: translateX(0px); /*translateX(w-h)*/
			background-color: #02e296;
		}
	}
`;
