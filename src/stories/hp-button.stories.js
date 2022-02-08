import HpButton from "../components/hp-button.vue";
import vueRouter from "storybook-vue3-router";

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
  template: `<div>
    <div style="display:flex; margin-bottom: 16px;">
      <hp-button style="margin-right: 12px" v-bind="args"> </hp-button>
      <hp-button style="margin-right: 12px" :to="{ name: 'home' }" label="Link button"> </hp-button>
      <hp-button style="margin-right: 12px" @click="buttonIsLoading = !buttonIsLoading" label="Loading" :isLoading="buttonIsLoading" />
      <hp-button style="margin-right: 12px" :isDisabled="true" label="Disabled" />
      <hp-button style="margin-right: 12px" label="Dropdown" dropdownIcon="plus" :hasDropdown="true" />
      <hp-button style="margin-right: 12px" label="Icon" icon="plus" />
      <hp-button style="margin-right: 12px" icon="plus" />
    </div>
    <div style="display:flex">
      <hp-button primary style="margin-right: 12px" v-bind="args"> </hp-button>
      <hp-button primary style="margin-right: 12px" :to="{ name: 'home' }" label="Link button"> </hp-button>
      <hp-button primary style="margin-right: 12px" @click="buttonIsLoading = !buttonIsLoading" label="Loading" :isLoading="buttonIsLoading" />
      <hp-button primary style="margin-right: 12px" :isDisabled="true" label="Disabled" />
      <hp-button primary style="margin-right: 12px" label="Dropdown" dropdownIcon="plus" :hasDropdown="true" />
      <hp-button primary :iconRight="true" style="margin-right: 12px" label="Icon" icon="plus" />
      <hp-button primary style="margin-right: 12px" icon="plus" />
    </div>
    <div style="display:flex; width: 240px; margin-top:24px;">
    <hp-button dropzone label="Add candidate" icon="plus" />
  </div>
  </div>`,
});

export const Primary = Template.bind({});
Primary.args = {
  label: "Button",
};

Primary.decorators = [vueRouter()];
