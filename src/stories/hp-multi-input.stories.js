import HpMultiInput from "../components/form/hp-multi-input.vue";

export default {
  title: "Components/Form/multi-Input",
  component: HpMultiInput,
  argTypes: {},
};

const Template = (args) => ({
  components: { HpMultiInput },
  setup() {
    return { args };
  },
  template: `<div>
    <hp-multi-input name="multi-input" />
  </div>`,
});

export const Primary = Template.bind({});
Primary.args = {};
