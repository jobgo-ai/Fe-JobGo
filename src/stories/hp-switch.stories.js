import HpSwitch from "../components/hp-switch.vue";

export default {
  title: "Components/Toggle",
  component: HpSwitch,
  argTypes: {},
};

import { ref } from "vue";
const Template = (args) => ({
  components: { HpSwitch },
  setup() {
    const isChecked = ref(false);
    return { args, isChecked };
  },
  template: `<div>
    <hp-switch v-model:checked="isChecked" name="toggle" />
  </div>`,
});

export const Primary = Template.bind({});
Primary.args = {};
