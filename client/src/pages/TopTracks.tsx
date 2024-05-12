import { useEffect, useState } from "react";
import { Artists, Playlist, ProfileData } from "../model";
import { getTopTracks } from "../spotify";
import { asyncHandler } from "../utils";
import { SectionWrapper, TimeRangeButtons, TrackList } from "../components";
import axios from "axios";

const TopTracks = () => {
  const [topTracks, setTopTracks] = useState(); // implement typeScript interface
  const [activeRange, setActiveRange] = useState("short"); // implement interface here
  useEffect(() => {
    const fetchData = async () => {
      const userTopTracks = await getTopTracks(`${activeRange}_term`);
      setTopTracks(userTopTracks.data);
    };

    asyncHandler(fetchData)();
  }, [activeRange]);

  return (
    <>
      {topTracks && (
        <main>
          <SectionWrapper title="Top tracks" breadcrumb="true">
            <TimeRangeButtons
              activeRange={activeRange}
              setActiveRange={setActiveRange}
            />
            <TrackList tracks={topTracks.items} />
          </SectionWrapper>
        </main>
      )}
    </>
  );
};

export default TopTracks;
