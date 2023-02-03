import React, { useEffect, useState } from "react";
// import ExploreHeader from "../../components/ExploreHeader";
import Text from "../../components/Text";
import { IDOIds, IDOs } from "../../constants/IDOs";
import IDOItem from "./IDOItem";

import {
	Wrapper,
	BackgroundWrapper,
	HorizontalDivider,
	StyledExploreHeader as ExploreHeader,
} from "./styled";
import { PresaleState } from "./type";
import getQuery, { BACKEND_URL } from "../../util/useAxios";
enum FILTER_TYPE {
	ALL,
	LIVE,
	FINISHED,
	SCHEDULED,
}

type IDOStatuses = {
	[key in IDOIds]: PresaleState;
};

const IDOStatusByFilterType = {
	[FILTER_TYPE.ALL]: "all",
	[FILTER_TYPE.LIVE]: PresaleState.PRESALE,
	[FILTER_TYPE.FINISHED]: PresaleState.ENDED,
	[FILTER_TYPE.SCHEDULED]: PresaleState.BEFORE,
};

const IDO: React.FC = () => {
	const [selectedFilterType, setSelectedFilterType] = useState(
		FILTER_TYPE.LIVE
	);

	const [idoStatuses, setIdoStatuses] = useState<IDOStatuses>(
		{} as IDOStatuses
	);

	useEffect(() => {
		(async () => {
			try {
				const data = await getQuery({
					url: `${BACKEND_URL}/cache?fields=idoStateInfo`,
				});
				let idoStatusesResult: IDOStatuses = {} as IDOStatuses;
				(data?.idoStateInfo || []).forEach(
					(queryResult: any, index: number) => {
						const idoId = IDOs[index]?.id;
						if (idoId) {
							const startTime = queryResult?.presale_start
								? new Date(queryResult.presale_start * 1000)
								: new Date();
							const endTime = new Date(
								Number(startTime) + (queryResult.presale_period || 0) * 1000
							);
							const now = new Date();
							const crrState =
								Number(now) < Number(startTime)
									? PresaleState.BEFORE
									: Number(now) < Number(endTime)
									? PresaleState.PRESALE
									: PresaleState.ENDED;
							idoStatusesResult[idoId] = crrState;
						}
					}
				);
				setIdoStatuses(idoStatusesResult);
			} catch (err) {
				console.log("debug", err);
			}
		})();
	}, []);

	return (
		<Wrapper>
			<ExploreHeader
				title="IDO"
				tabs={[
					{
						title: "All",
						onClick: () => setSelectedFilterType(FILTER_TYPE.ALL),
						selected: () => selectedFilterType === FILTER_TYPE.ALL,
					},
					{
						title: "Live",
						onClick: () => setSelectedFilterType(FILTER_TYPE.LIVE),
						selected: () => selectedFilterType === FILTER_TYPE.LIVE,
					},
					{
						title: "Scheduled",
						onClick: () => setSelectedFilterType(FILTER_TYPE.SCHEDULED),
						selected: () => selectedFilterType === FILTER_TYPE.SCHEDULED,
					},
					{
						title: "Finished",
						onClick: () => setSelectedFilterType(FILTER_TYPE.FINISHED),
						selected: () => selectedFilterType === FILTER_TYPE.FINISHED,
					},
				]}
			/>
			<BackgroundWrapper>
				<Text fontSize="24px" bold justifyContent="flex-start">
					Buy New CW20 Token in presale
				</Text>
				<HorizontalDivider />

				{IDOs.map((ido, index) =>
					selectedFilterType === FILTER_TYPE.ALL ||
					idoStatuses[ido.id] === IDOStatusByFilterType[selectedFilterType] ? (
						<IDOItem key={index} idoInfo={ido} />
					) : null
				)}
			</BackgroundWrapper>
		</Wrapper>
	);
};

export default IDO;
