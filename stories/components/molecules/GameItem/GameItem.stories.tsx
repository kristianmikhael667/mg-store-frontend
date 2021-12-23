import { Meta } from "@storybook/react";
import GameItem, {
  GameItemsProps,
} from "../../../../components/molecules/GameItem";

export default {
  title: "Component/Molecules/GameItem",
  component: GameItem,
} as Meta;

const Template = (args: GameItemsProps) => <GameItem {...args} />;

export const Default = Template.bind({});
Default.args = {
  title: "Super Mechs",
  category: "Mobile",
  thumbnail: "/img/Thumbnail-1.png",
};
