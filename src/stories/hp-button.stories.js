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
    const buttonIsLoading = ref(true);
    return { args, buttonIsLoading };
  },
  template: `<div style="display:flex">
    <hp-button style="margin-right: 12px" v-bind="args"> </hp-button>
    <hp-button style="margin-right: 12px" @click="buttonIsLoading = !buttonIsLoading" label="Loading" :isLoading="buttonIsLoading" />
    <hp-button style="margin-right: 12px" :isDisabled="true" label="Disabled" />
    <hp-button style="margin-right: 12px" label="Dropdown" dropdownIcon="plus" :hasDropdown="true" />
    <hp-button style="margin-right: 12px" label="Icon" icon="plus" />
    <hp-button style="margin-right: 12px" icon="plus" />
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
