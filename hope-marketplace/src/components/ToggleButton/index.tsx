import React, { useState } from "react";
import { Checkbox, Slider, Switch, Wrapper } from "./styled";
import { BasicProps } from "../../constants/BasicTypes";

interface IToggleButton extends BasicProps {
	label?: {
		title: string;
		position?: "left" | "right";
	};
	onChange?: (checked: boolean) => void;
	defaultChecked?: boolean;
}

const ToggleButton: React.FC<IToggleButton> = ({
	label,
	onChange,
	defaultChecked,
	...rest
}) => {
	const [checked, setChecked] = useState<boolean>(defaultChecked || false);
	const handleClickToggleButton = (e: React.MouseEvent<HTMLInputElement>) => {
		if (onChange) onChange(!checked);
		setChecked((prev) => !prev);
	};

	return (
		<Wrapper {...rest}>
			{label?.position !== "right" ? label?.title || "" : null}
			<Switch>
				<Checkbox
					type="checkbox"
					checked={checked}
					onClick={handleClickToggleButton}
				/>
				<Slider />
			</Switch>{" "}
			{label?.position === "right" ? label?.title || "" : null}
		</Wrapper>
	);
};

export default ToggleButton;
