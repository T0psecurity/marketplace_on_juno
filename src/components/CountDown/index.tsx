import React from "react";
import Countdown from "react-countdown";
import { BasicProps } from "../../constants/BasicTypes";
import Text from "../Text";
import { DigitContainer, DigitItem, TimerContainer, Wrapper } from "./styled";

interface CountDownProps extends BasicProps {
  time: any;
  completedString?: string;
  title?: string;
}

const CountDown: React.FC<CountDownProps> = ({
  time,
  completedString,
  title,
}) => {
  return (
    <Wrapper>
      <Text bold>{title ?? "Countdown"}</Text>
      <Countdown
        date={new Date(time)}
        renderer={({ days, hours, minutes, seconds, completed }) => {
          if (completed) {
            return <Text bold>{completedString ?? "Completed"}</Text>;
          } else {
            const weeks = Math.floor(days / 7);
            const remainDays = days % 7;
            return (
              <TimerContainer>
                <DigitItem>
                  <DigitContainer>{weeks}</DigitContainer>
                  <Text bold>Weeks</Text>
                </DigitItem>
                <DigitItem>
                  <DigitContainer>{remainDays}</DigitContainer>
                  <Text bold>Days</Text>
                </DigitItem>
                <DigitItem>
                  <DigitContainer>{hours}</DigitContainer>
                  <Text bold>Hour</Text>
                </DigitItem>
                <DigitItem>
                  <DigitContainer>{minutes}</DigitContainer>
                  <Text bold>Min</Text>
                </DigitItem>
                <DigitItem>
                  <DigitContainer>{seconds}</DigitContainer>
                  <Text bold>Sec</Text>
                </DigitItem>
              </TimerContainer>
            );
          }
        }}
      />
    </Wrapper>
  );
};

export default CountDown;
