import HpCounter from "../components/hp-counter.vue";

export default {
  title: "Components/Counter",
  component: HpCounter,
  argTypes: {},
};

const Template = (args) => ({
  components: { HpCounter },
  setup() {
    return { args };
  },
  template: `<div>
    <hp-counter  />
  </div>`,
});

export const Primary = Template.bind({});
Primary.args = {};
