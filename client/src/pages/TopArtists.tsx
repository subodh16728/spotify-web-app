import { useEffect, useState } from "react";
import { getTopArtists } from "../spotify";
import { asyncHandler } from "../utils";
import { UserTopData } from "../model";
import {
  ArtistsGrid,
  Loader,
  SectionWrapper,
  TimeRangeButtons,
} from "../components";

const TopArtists = () => {
  const [topArtists, setTopArtists] = useState<UserTopData>();
  const [activeRange, setActiveRange] = useState<string>("short");

  useEffect(() => {
    const fetchData = async () => {
      const userTopArtists = await getTopArtists(`${activeRange}_term`);
      setTopArtists(userTopArtists.data);
    };

    asyncHandler(fetchData)();
  }, [activeRange]);

  return (
    <>
      {topArtists ? (
        <main>
          <SectionWrapper title="Top artists" breadcrumb={true}>
            <TimeRangeButtons
              activeRange={activeRange}
              setActiveRange={setActiveRange}
            />
            <ArtistsGrid artists={topArtists.items} />
          </SectionWrapper>
        </main>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default TopArtists;
