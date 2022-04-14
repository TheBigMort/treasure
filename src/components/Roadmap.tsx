import RoadmapItem from "@components/RoadmapItem";
import Title from "@components/Title";
import { Stack } from "@mui/material";
import { FC } from "react";

const roadmapData = [
  {
      title: 'Start Minting',
      content:
          'Whitelist mint begins 1 day before public mint. 0.03ETH for whitelist and 0.0420ETH for public. Minting Date TBD.',
  },
  {
      title: 'Airdrop Warriors',
      content:
          'Warriors will be airdropped to all Treasure holders. Warriors are characters with their own unique abilities, stats, and skills. They can be customized by equipping items found in treasure chests.',
  },
  {
      title: 'Game Development',
      content:
          'The Treasure game will begin production with funds acquired from mint and from partnerships. We will begin to reveal partners and information regarding the formation of this industry disrupting RPG style game.',
  },
  {
      title: 'Staking',
      content:
          'Warriors and chests can be staked and locked for any amount of time before the game is developed. Staked warriors will get a stat boost while chests can recieve items. The longer assets are staked, the more rewards you will recieve.',
  },
  {
      title: 'Native Currency',
      content:
          'An ERC-20 token, $BOOTY, that will initially be airdropped to chest and warrior holders. $BOOTY will be earnable through playing the game by completing quests and winning PVP match-ups.',
  },
];

const Roadmap: FC = () => {
  return (
    <Stack
      id="roadmap"
      spacing={3.5}
      sx={{
        textAlign: "center",
        alignItems: "center",
      }}
    >
      <Title>Roadmap</Title>
      {roadmapData.map((item) => (
        <RoadmapItem
          key={item.title}
          title={item.title}
          content={item.content}
        />
      ))}
    </Stack>
  );
};

export default Roadmap;
