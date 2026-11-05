import Image from "next/image";

interface Team {
  name: string;
  logo: string;
}

interface Fixture {
  id: string | number;
  date: string;
  division: string;
  time: string;
  team1: Team;
  team2: Team;
}

interface FixtureMarqueeProps {
  fixtures: Fixture[];
}

export default function FixtureMarquee({ fixtures }: FixtureMarqueeProps) {
  if (!fixtures.length) return null;

  const FixtureList = () => (
    <div className="flex shrink-0 items-center ">
      {fixtures.toReversed().map((fixture) => (
        <div className="border-r border-gray-300" key={fixture.id}>
          {/* Date and Time */}
          <div className=" px-2 flex justify-center gap-2 mb-2  text-xs text-[#f25c05]">
            <div className="mx-auto">
              <span
                className={`${fixture.division === "Men's" ? "text-green-700" : "text-purple-600"} font-bold`}
              >
                {fixture.division}
              </span>
              <span className="mx-2">|</span>
              <span className="font-bold">{fixture.date}</span>
              <span className="mx-2">|</span>
              <span className="font-bold">{fixture.time}</span>
            </div>
          </div>
          <div className="flex shrink-0 items-center gap-5  px-8">
            {/* Team 1 */}
            <div className="flex items-center gap-2">
              <img
                src={`${process.env.NEXT_PUBLIC_IMAGES_URL}${fixture.team1.logo}`}
                alt={fixture.team1.name}
                width={40}
                height={40}
                className="size-10 object-contain"
              />
              <span className="font-semibold">{fixture.team1.name}</span>
            </div>

            <span className="font-bold text-blue-600">VS</span>

            {/* Team 2 */}
            <div className="flex items-center gap-2">
              <img
                src={`${process.env.NEXT_PUBLIC_IMAGES_URL}${fixture.team2.logo}`}
                alt={fixture.team2.name}
                width={40}
                height={40}
                className="size-10 object-contain"
              />
              <span className="font-semibold">{fixture.team2.name}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="flex h-21 max-w-[1920px] overflow-hidden bg-[#fdf9f1] text-black">
      {/* Fixed title */}
      <div className="z-10 flex shrink-0 items-center bg-[#217b6b] text-white px-5 text-sm font-bold">
        MATCH SCHEDULE
      </div>

      {/* Scrolling content */}
      <div className="flex min-w-0 flex-1 items-center overflow-hidden">
        <div className="flex w-max animate-fixtures">
          <FixtureList />
        </div>
      </div>
    </div>
  );
}
