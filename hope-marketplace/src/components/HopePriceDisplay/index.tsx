import React, { useMemo } from "react";
import { useAppSelector } from "../../app/hooks";
import { TokenType } from "../../types/tokens";
import { HopeName, HopePrice, PercentageChange, Wrapper } from "./styled";

const HopeIcon = () => (
  <svg
    width="26"
    height="31"
    viewBox="0 0 26 31"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M26 23.2516V7.74845L12.9969 0L0 7.74845V23.2516L12.9969 31L26 23.2516Z"
      fill="#02E296"
    />
    <path
      d="M13.0031 0.000623078L0 7.74907V23.246L13.0031 30.982V0.702768C13.0031 0.702768 13.0031 -0.0242316 13.0031 0.000623078Z"
      fill="#0FCE89"
    />
    <path
      d="M8.41235 5.67969L2.78516 11.3217L6.27014 14.907L12.1721 15.6464L7.02585 9.89877L12.8904 14.9256L12.066 9.08478L8.41235 5.67969Z"
      fill="white"
    />
    <path
      d="M17.5561 25.8359L23.1771 20.1876L19.6984 16.6024L13.7964 15.8691L18.9426 21.6106L13.0781 16.5899L13.8963 22.4308L17.5561 25.8359Z"
      fill="white"
    />
    <path
      d="M2.85352 20.3068L8.52443 25.8991L12.1281 22.4381L12.8713 16.5661L7.09421 21.6862L12.1468 15.8516L6.27605 16.6656L2.85352 20.3068Z"
      fill="white"
    />
    <path
      d="M23.1135 11.2036L17.4426 5.61133L13.8327 9.07856L13.0957 14.9505L18.8728 9.83041L13.8202 15.665L19.6909 14.8448L23.1135 11.2036Z"
      fill="white"
    />
  </svg>
);

const ArrowIcon = () => (
  <svg
    width="20"
    height="17"
    viewBox="0 0 20 17"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M11.885 0.627668C11.9817 0.723724 12.395 1.08641 12.735 1.42426C14.8733 3.40497 18.3733 8.57204 19.4417 11.2765C19.6133 11.6872 19.9767 12.7256 20 13.2804C20 13.812 19.88 14.3188 19.6367 14.8023C19.2967 15.4052 18.7617 15.8887 18.13 16.1537C17.6917 16.3243 16.38 16.5893 16.3567 16.5893C14.9217 16.8543 12.59 17 10.0133 17C7.55833 17 5.32167 16.8543 3.865 16.6373C3.84167 16.6125 2.21166 16.3475 1.65333 16.0577C0.633331 15.5261 -1.68771e-06 14.4877 -1.59057e-06 13.3764L-1.58217e-06 13.2804C0.0249981 12.5566 0.658331 11.0347 0.681666 11.0347C1.75167 8.47599 5.08 3.42815 7.29167 1.39942C7.29167 1.39942 7.86 0.828057 8.215 0.57964C8.725 0.192109 9.35667 9.76879e-07 9.98833 1.0321e-06C10.6933 1.09373e-06 11.35 0.216953 11.885 0.627668Z"
      fill="#02E296"
    />
  </svg>
);

const HopePriceDisplay: React.FC = () => {
  const hopePrice = useAppSelector(
    (state) => state.tokenPrices[TokenType.HOPE]
  );
  const priceInfo = useMemo(() => {
    const marketData = hopePrice?.market_data;
    return {
      price: marketData?.current_price?.usd || 0,
      percentage: (marketData?.price_change_percentage_24h || 0).toLocaleString(
        "en-US",
        {
          maximumFractionDigits: 2,
        }
      ),
    };
  }, [hopePrice]);

  return (
    <Wrapper>
      <HopeIcon />
      <HopeName>$HOPERS</HopeName>
      <HopePrice>{`${priceInfo.price}$`}</HopePrice>
      <PercentageChange isNegative={priceInfo.percentage < 0}>
        {`(${priceInfo.percentage}%)`}
        <ArrowIcon />
      </PercentageChange>
    </Wrapper>
  );
};

export default HopePriceDisplay;
