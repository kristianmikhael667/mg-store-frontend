import { Meta } from "@storybook/react";
import StepItem, {
  StepItemProps,
} from "../../../../components/molecules/StepItems";

export default {
  title: "Component/Molecules/StepItem",
  component: StepItem,
} as Meta;

const Template = (args: StepItemProps) => <StepItem {...args} />;

export const Default = Template.bind({});
Default.args = {
  title: "1. Start",
  icon: "step1",
  desc1: "Pilih salah satu game yang ingin kamu top up",
  desc2: "yang ingin kamu top up",
};
