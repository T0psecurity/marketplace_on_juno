import React, { useRef } from "react";
import { Fade, SlideshowRef } from "react-slideshow-image";
import { MegaPhoneIcon } from "../SvgIcons";
import {
  AdvertiseDescription,
  AdvertiseDescriptionContainer,
  AdvertiseFooter,
  AdvertiseImage,
  AdvertiseItem,
  AdvertiseWrapper,
} from "./styled";

interface AdvertiseProps {
  images: { url: string; description: string }[];
}

const DescriptionTailIcon = ({ ...props }) => (
  <svg
    style={{ cursor: "pointer" }}
    width="44"
    height="33"
    viewBox="0 0 44 33"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M0 15.3018C0.265758 14.341 0.575809 13.4234 1.2402 12.8033C1.71721 12.3581 2.23282 12.0707 2.81658 12.023C3.01533 12.0071 3.21522 12.0003 3.41511 12.0003C15.7558 11.9992 28.0965 12.0048 40.4384 11.9912C41.5627 11.9901 42.5213 12.3978 43.2095 13.6176C43.9057 14.8487 44.0443 16.2172 43.5957 17.6278C43.1562 19.0111 42.3532 19.8549 41.2118 20.0673C40.8881 20.1275 40.5588 20.1536 40.2328 20.1536C27.9489 20.1582 15.665 20.157 3.38103 20.1582C2.01476 20.1582 0.942646 19.4881 0.30778 17.8209C0.181715 17.4892 0.102215 17.1258 0.00113572 16.776C0 16.2842 0 15.7925 0 15.3018Z"
      fill="#02E296"
    />
    <path
      d="M40.8427 0C41.2868 0.176036 41.7592 0.272572 42.1681 0.540602C43.4003 1.35037 44.0522 3.16184 43.7876 4.88472C43.5037 6.73027 42.4145 8.01476 41.0051 8.16582C40.8064 8.18739 40.6065 8.20897 40.4077 8.20897C28.0863 8.21011 15.7638 8.2067 3.44123 8.21692C2.27371 8.21806 1.26633 7.80011 0.582623 6.48722C0.330494 6.00114 0.190801 5.41397 0 4.87337C0 4.38274 0 3.89097 0 3.40034C0.0477002 3.24815 0.106758 3.09938 0.143101 2.94265C0.416809 1.76377 0.983532 0.913118 1.82964 0.42703C2.19648 0.215786 2.60647 0.138558 2.99716 0C15.6116 0 28.2271 0 40.8427 0Z"
      fill="black"
    />
    <path
      d="M0 27.3152C0.212379 26.4498 0.463373 25.6185 0.999432 24.9927C1.60363 24.2874 2.30324 23.9285 3.10505 23.9217C4.07496 23.9137 5.04486 23.9194 6.01476 23.9194C17.5264 23.9194 29.0369 23.9217 40.5486 23.916C41.8035 23.916 42.8052 24.5259 43.431 25.9967C44.5588 28.6463 43.2334 31.8445 40.937 32.0568C40.795 32.0705 40.6519 32.0682 40.5088 32.0682C28.1136 32.0682 15.7172 32.0659 3.32198 32.0716C1.95684 32.0727 0.926746 31.3572 0.29983 29.7263C0.172629 29.3947 0.0988075 29.0256 0.00113572 28.6735C0 28.2227 0 27.7695 0 27.3152Z"
      fill="black"
    />
    <path
      d="M2.99716 0C2.60647 0.138558 2.19648 0.215786 1.82964 0.42703C0.983532 0.913118 0.416809 1.76377 0.143101 2.94265C0.106758 3.09938 0.0477002 3.24815 0 3.40034C0 2.26689 0 1.13345 0 0C0.999432 0 1.99773 0 2.99716 0Z"
      fill="white"
    />
  </svg>
);

const Advertise: React.FC<AdvertiseProps> = ({ images }) => {
  const sliderRef = useRef<SlideshowRef>(null);
  const handleNextImage = () => {
    if (sliderRef.current) {
      sliderRef.current.goNext();
    }
  };
  return (
    <AdvertiseWrapper>
      <Fade ref={sliderRef} arrows={false}>
        {images.map((image, index) => (
          <AdvertiseItem key={index} className="each-fade">
            <AdvertiseImage src={image.url} alt="" />
            <AdvertiseFooter>
              <AdvertiseDescriptionContainer>
                <MegaPhoneIcon height={20} />
                <AdvertiseDescription>{image.description}</AdvertiseDescription>
              </AdvertiseDescriptionContainer>
              <DescriptionTailIcon onClick={handleNextImage} height={20} />
            </AdvertiseFooter>
          </AdvertiseItem>
        ))}
      </Fade>
    </AdvertiseWrapper>
  );
};

export default Advertise;
