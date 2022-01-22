import HpHeader from "../components/hp-header.vue";

export default {
  title: "Components/Header",
  component: HpHeader,
  argTypes: {},
};

const Template = (args) => ({
  components: { HpHeader },
  setup() {
    return { args };
  },
  template: `<div>
    <hp-header />
  </div>`,
});

export const Primary = Template.bind({});
Primary.args = {};
