import HpButton from "../components/hp-button.vue";

export default {
  title: "Components/Button",
  component: HpButton,
  argTypes: {},
};

import { ref } from "vue";
const Template = (args) => ({
  components: { HpButton },
  setup() {
    const buttonIsLoading = ref(false);
    return { args, buttonIsLoading };
  },
  template: `<div style="display:flex">
    <hp-button style="margin-right: 12px" v-bind="args"> </hp-button>
    <hp-button style="margin-right: 12px" @click="buttonIsLoading = !buttonIsLoading" label="Click" :isLoading="buttonIsLoading" />
    <hp-button style="margin-right: 12px" :isDisabled="true" label="Disabled" />
    <hp-button style="margin-right: 12px" :isDisabled="true" :dropdown="true" />
  </div>`,
});

export const Primary = Template.bind({});
Primary.args = {
  label: "Button",
};

export const Secondary = Template.bind({});
Secondary.args = {
  label: "whats up",
};
