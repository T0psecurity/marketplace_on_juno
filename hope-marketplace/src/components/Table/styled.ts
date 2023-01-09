import styled, { css, keyframes } from "styled-components";
import Text from "../Text";

export const Wrapper = styled.div`
	width: 100%;
`;

export const TableControlPanel = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin: 20px 0;
`;

export const TableTabContainer = styled.div<{ left: number; width: number }>`
	display: flex;
	align-items: center;
	position: relative;
	&:before {
		content: "";
		position: absolute;
		background: #02e296;
		height: 100%;
		border-radius: 15px;
		transition: all 0.5s;
		${({ left, width }) => css`
			left: ${left}px;
			width: ${width}px;
		`}
	}
`;

export const TableTab = styled(Text)<{ checked: boolean }>`
	cursor: pointer;
	border-radius: 15px;
	position: relative;
	font-size: 18px;
	font-weight: bold;
	padding: 10px 30px;
	text-align: center;
	color: ${({ checked }) => (checked ? "white" : "#7e7e7e")};
	background: rgba(15, 206, 137, 0.4);
	align-self: stretch;
	align-items: center;
	/* width: 165px; */
	&:last-child {
		left: -20px;
		/* width: 140px; */
	}
`;

export const TableSearchInputer = styled.input`
	height: 40px;
	width: 80px;
	background: rgba(15, 206, 137, 0.4);
	opacity: 0.3;
	transition: all 0.5s;
	text-align: right;
	border-radius: 15px;
	border: none;
	font-size: 16px;
	padding: 0 20px;
	/* color: white; */
	color: ${({ theme }) => theme.colors.fontColor};
	&:focus {
		width: 200px;
		opacity: 1;
	}
	&::placeholder {
		color: #cbcaca;
	}
`;

export const TableWrapper = styled.div<{
	columnsCount: number;
	layout?: string;
}>`
	width: 100%;
	display: grid;
	grid-template-columns: ${({ layout, columnsCount }) =>
		layout || `repeat(${columnsCount}, auto)`};
	overflow: auto;
`;

export const TableHeaderRow = styled.div`
	display: contents;
`;

const tableBodyBorderColor = "#02e296";
const tableBorderRadius = "15px";

export const EmptyRow = styled.div<{ columnsCount: number }>`
	background: white;
	width: 100%;
	height: 70px;
	grid-area: ${({ columnsCount }) => css`2/1/3/${columnsCount + 1}`};
	border-radius: ${tableBorderRadius};
	text-align: center;
	display: flex;
	align-items: center;
	justify-content: center;
`;

export const SortHeaderIcon = styled.i<{ visible?: string }>`
	position: absolute;
	right: 0;
	top: 50%;
	transform: translateY(-50%);
	opacity: ${({ visible }) => (visible ? 1 : 0)};
	transition: opacity 0.5s;
`;

export const TableHeader = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	width: 100%;
	height: 50px;
	margin-bottom: 10px;
	font-weight: bold;
	background: rgba(15, 206, 137, 0.4);
	color: ${({ theme }) => theme.colors.fontColor};
	position: relative;
	cursor: pointer;
	&:first-child {
		border-bottom-left-radius: ${tableBorderRadius};
		border-top-left-radius: ${tableBorderRadius};
	}
	&:last-child {
		border-bottom-right-radius: ${tableBorderRadius};
		border-top-right-radius: ${tableBorderRadius};
	}
	&:hover {
		${SortHeaderIcon} {
			opacity: 1;
		}
	}
`;

export const TableHeaderContent = styled.div`
	position: relative;
	padding: 0 15px;
`;

export const TableContent = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	width: 100%;
	height: 95px;
	padding: 10px;
	background: white;
	color: black;
	cursor: pointer;
	box-sizing: border-box;
`;

export const TableBody = styled.div`
	display: contents;
`;

export const TableRowMainContent = styled.div`
	display: contents;
	${TableContent} {
		border-bottom: 1px solid #d9d9d9;
		&:first-child {
			border-left: 1px solid ${tableBodyBorderColor};
		}
		&:last-child {
			border-right: 1px solid ${tableBodyBorderColor};
		}
	}
`;

export const TableDetailRow = styled.div<{
	columnsCount: number;
	index: number;
}>`
	height: 0;
	grid-area: ${({ columnsCount, index }) =>
		`${(index + 1) * 2 + 1} / 1 / ${(index + 1) * 2 + 2} / ${
			columnsCount + 1
		}`};
	border-left: 1px solid ${tableBodyBorderColor};
	border-right: 1px solid ${tableBodyBorderColor};
	border-bottom: 1px solid #d9d9d9;
	box-sizing: border-box;
	overflow: hidden;
`;

export const TableRow = styled.div<{
	expanded?: boolean;
	finishedExpanded: boolean;
	detailRowHeight: number;
	animationTime?: number;
}>`
	display: contents;

	&:first-child {
		${TableContent} {
			border-top: 1px solid ${tableBodyBorderColor};
			&:first-child {
				border-top-left-radius: ${tableBorderRadius};
			}
			&:last-child {
				border-top-right-radius: ${tableBorderRadius};
			}
		}
	}
	&:last-child {
		${TableRowMainContent} {
			&:last-child {
				${TableContent} {
					border-bottom: 1px solid ${tableBodyBorderColor};
					&:first-child {
						border-bottom-left-radius: ${tableBorderRadius};
					}
					&:last-child {
						border-bottom-right-radius: ${tableBorderRadius};
					}
				}
			}
		}

		${({ finishedExpanded }) =>
			finishedExpanded
				? css`
						${TableDetailRow} {
							border-bottom: 1px solid ${tableBodyBorderColor};
							border-bottom-left-radius: ${tableBorderRadius};
							border-bottom-right-radius: ${tableBorderRadius};
							&:last-child {
							}
						}
				  `
				: css`
						${TableRowMainContent} {
							${TableContent} {
								border-bottom: 1px solid ${tableBodyBorderColor};
								&:first-child {
									border-bottom-left-radius: ${tableBorderRadius};
								}
								&:last-child {
									border-bottom-right-radius: ${tableBorderRadius};
								}
							}
						}
						${TableDetailRow} {
							border-bottom: none;
						}
				  `}
	}
	${TableDetailRow} {
		animation: ${({ expanded, detailRowHeight }) =>
				expanded
					? keyframes`
                        from {
                            height: 0px;
                        }
                        to {
                            height: ${detailRowHeight}px;
                        }
                    `
					: expanded === false
					? keyframes`
                        from {
                            height: ${detailRowHeight}px;
                        }
                        to {
                            height: 0px;
                        }
                    `
					: null}
			${({ animationTime }) => animationTime ?? 500}ms ease-in-out forwards;
	}
`;
