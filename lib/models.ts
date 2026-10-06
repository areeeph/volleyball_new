export type Set = {
  set_number: number;
  team1_score: number;
  team2_score: number;
};
export type Score = {
  id: string;
  sequenceId: number;
  sets: Set[];
  current_set: number;
  team1: Team;
  team2: Team;
};

export type Team = {
  id: string;
  sequenceId: number;
  name: string;
  short_name: string;
  logo: string;
};
