import HpToggle from "../components/form/hp-toggle.vue";

export default {
  title: "Components/Form/Toggle",
  component: HpToggle,
  argTypes: {},
};

const Template = (args) => ({
  components: { HpToggle },
  setup() {
    return { args };
  },
  template: `<div>
    <hp-toggle name="toggle" />
  </div>`,
});

export const Primary = Template.bind({});
Primary.args = {};
