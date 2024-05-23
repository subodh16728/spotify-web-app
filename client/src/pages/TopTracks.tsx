import { useEffect, useState } from "react";
import { getTopTracks } from "../spotify";
import { asyncHandler } from "../utils";
import {
  Loader,
  SectionWrapper,
  TimeRangeButtons,
  TrackList,
} from "../components";
import { UserTopData } from "../model";

const TopTracks = () => {
  const [topTracks, setTopTracks] = useState<UserTopData>();
  const [activeRange, setActiveRange] = useState<string>("short");
  useEffect(() => {
    const fetchData = async () => {
      const userTopTracks = await getTopTracks(`${activeRange}_term`);
      setTopTracks(userTopTracks.data);
    };

    asyncHandler(fetchData)();
  }, [activeRange]);

  return (
    <>
      {topTracks ? (
        <main>
          <SectionWrapper title="Top tracks" breadcrumb={true}>
            <TimeRangeButtons
              activeRange={activeRange}
              setActiveRange={setActiveRange}
            />
            <TrackList tracks={topTracks.items} flag={undefined} />
          </SectionWrapper>
        </main>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default TopTracks;
