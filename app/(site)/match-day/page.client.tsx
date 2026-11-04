import Image from "next/image";

interface Team {
  name: string;
  logo: string;
}

interface Fixture {
  id: string | number;
  date: string;
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
    <div className="flex shrink-0 items-center">
      {fixtures.reverse().map((fixture) => (
        <div
          key={fixture.id}
          className="flex shrink-0 items-center gap-5 border-r border-gray-300 px-8"
        >
          {/* Date and Time */}
          <div className="flex flex-col text-xs text-[#f25c05]">
            <span className="font-bold">{fixture.date}</span>
            <span>{fixture.time}</span>
          </div>

          {/* Team 1 */}
          <div className="flex items-center gap-2">
            <Image
              src={`${process.env.NEXT_PUBLIC_IMAGES_URL}${fixture.team1.logo}`}
              alt={fixture.team1.name}
              width={40}
              height={40}
              className="size-10 object-contain"
            />
            <span className="font-semibold">{fixture.team1.name}</span>
          </div>

          <span className="font-bold text-blue-300">VS</span>

          {/* Team 2 */}
          <div className="flex items-center gap-2">
            <Image
              src={`${process.env.NEXT_PUBLIC_IMAGES_URL}${fixture.team2.logo}`}
              alt={fixture.team2.name}
              width={40}
              height={40}
              className="size-10 object-contain"
            />
            <span className="font-semibold">{fixture.team2.name}</span>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="flex h-16 w-full overflow-hidden bg-[#fdf9f1] text-black">
      {/* Fixed title */}
      <div className="z-10 flex shrink-0 items-center bg-[#217b6b] text-white px-5 text-sm font-bold">
        UPCOMING MATCHES
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
