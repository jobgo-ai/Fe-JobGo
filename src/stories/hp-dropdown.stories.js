import HpDropdown from "../components/hp-dropdown.vue";
import HpFlyoutMenu from "../components/hp-flyout-menu.vue";
import vueRouter from "storybook-vue3-router";

//console.log

export default {
  title: "Components/Dropdown",
  component: HpDropdown,
  argTypes: {},
};

import { ref } from "vue";
const Template = (args) => ({
  components: { HpDropdown, HpFlyoutMenu },
  setup() {
    const fakeItems = ref([
      { icon: "cog", label: "Item one", action: () => console.log("wow") },
      { icon: "cog", label: "Openings", action: () => console.log("wow2") },
      { icon: "cog", label: "Item 4", action: () => console.log("wow3") },
    ]);

    return { args, fakeItems };
  },
  template: `<div>
    <div style="display:flex; margin-bottom: 16px; margin-left:64px;">
      <hp-dropdown style="margin-right: 12px" v-bind="args"> <template v-slot:dropdown><hp-flyout-menu :items="fakeItems"></hp-flyout-menu> </template> </hp-dropdown>
    </div>
  </div>
  </div>`,
});

export const Primary = Template.bind({});
Primary.args = {
  label: "Button",
};

Primary.decorators = [vueRouter()];
