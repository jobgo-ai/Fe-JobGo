import HpIcon from "../components/hp-icon.vue";

export default {
  title: "Components/Icon",
  component: HpIcon,
  argTypes: {},
};

const Template = (args) => ({
  components: { HpIcon },
  setup() {
    return { args };
  },
  template: `<div>
    <hp-icon v-bind="args"> </hp-icon>
  </div>`,
});

export const Primary = Template.bind({});
Primary.args = {
  name: "test",
  size: 16,
};
