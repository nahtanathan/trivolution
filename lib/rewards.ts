export type RewardStatus = "claim" | "locked";

export type RewardMilestone = {
  wager: string;
  reward: string;
  status: RewardStatus;
  highlighted?: boolean;
  imageSrc: string;
};

export type PodiumPrizes = [string, string, string];

export const leaderboardPrizesByRank: Partial<Record<number, string>> = {
  1: "$200",
  2: "$125",
  3: "$75",
  4: "$40",
  5: "$25",
  6: "$15",
  7: "$10",
  8: "$10",
};

export const podiumPrizes: PodiumPrizes = [
  leaderboardPrizesByRank[1]!,
  leaderboardPrizesByRank[2]!,
  leaderboardPrizesByRank[3]!,
];

export function getLeaderboardPrize(rank: number) {
  return leaderboardPrizesByRank[rank] ?? null;
}

export const rewardMilestones: RewardMilestone[] = [
  {
    wager: "$10,000",
    reward: "$10",
    status: "claim",
    imageSrc: "/assets/art/milestone_1.png",
  },
  {
    wager: "$25,000",
    reward: "$25",
    status: "locked",
    imageSrc: "/assets/art/milestone_2.png",
  },
  {
    wager: "$50,000",
    reward: "$50",
    status: "locked",
    imageSrc: "/assets/art/milestone_3.png",
  },
  {
    wager: "$100,000",
    reward: "$100",
    status: "locked",
    imageSrc: "/assets/art/milestone_4.png",
  },
  {
    wager: "$250,000",
    reward: "$200",
    status: "locked",
    highlighted: true,
    imageSrc: "/assets/art/milestone_5.png",
  },
  {
    wager: "$500,000",
    reward: "$300",
    status: "locked",
    imageSrc: "/assets/art/milestone_6.png",
  },
  {
    wager: "$1,000,000",
    reward: "$500",
    status: "locked",
    imageSrc: "/assets/art/milestone_7.png",
  },
  {
    wager: "$2,500,000",
    reward: "$1,000",
    status: "locked",
    imageSrc: "/assets/art/milestone_8.png",
  },
  {
    wager: "$3,500,000",
    reward: "$2,000",
    status: "locked",
    imageSrc: "/assets/art/milestone_9.png",
  },
  {
    wager: "$5,000,000",
    reward: "$3,000",
    status: "locked",
    imageSrc: "/assets/art/milestone_10.png",
  },
  {
    wager: "$10,000,000",
    reward: "$5,000",
    status: "locked",
    imageSrc: "/assets/art/milestone_11.png",
  },
];
