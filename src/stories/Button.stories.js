import HpButton from "../components/hp-button.vue";

export default {
  title: "Example/Button",
  component: HpButton,
  argTypes: {
    backgroundColor: { control: "color" },
    onClick: {},
    size: {
      control: { type: "select" },
      options: ["small", "medium", "large"],
    },
  },
};

const Template = (args) => ({
  components: { HpButton },
  setup() {
    return { args };
  },
  template: '<hp-button v-bind="args" />',
});

export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/vue/writing-stories/args
Primary.args = {
  primary: true,
  label: "Primary",
};

export const Secondary = Template.bind({});
Secondary.args = {
  label: "Secondary",
};

export const Large = Template.bind({});
Large.args = {
  size: "large",
  label: "Thicc",
};

export const Small = Template.bind({});
Small.args = {
  size: "small",
  label: "Mutton",
};
