import HpButton from "../components/hp-button.vue";

export default {
  title: "Components/Button",
  component: HpButton,
  argTypes: {},
};

const Template = (args) => ({
  components: { HpButton },
  setup() {
    return { args };
  },
  template: `<div>
    <hp-button v-bind="args"> </hp-button>
  </div>`,
});

export const Primary = Template.bind({});
Primary.args = {
  label: "Im a button",
};

export const Secondary = Template.bind({});
Secondary.args = {
  label: "whats up",
};
