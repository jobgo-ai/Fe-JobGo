import HpInput from "../components/form/hp-input.vue";

export default {
  title: "Components/Form/Input",
  component: HpInput,
  argTypes: {},
};

const Template = (args) => ({
  components: { HpInput },
  setup() {
    return { args };
  },
  template: `<div>
    <hp-input name="input" />
  </div>`,
});

export const Primary = Template.bind({});
Primary.args = {};
