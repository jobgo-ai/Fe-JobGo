import HpFlyoutMenu from "../components/hp-flyout-menu.vue";

export default {
  title: "Components/FlyoutMenu",
  component: HpFlyoutMenu,
  argTypes: {},
};

import { ref } from "vue";
const Template = (args) => ({
  components: { HpFlyoutMenu },
  setup() {
    const fakeItems = ref([
      { icon: "cog", label: "Item one", action: () => console.log("wow") },
      { icon: "cog", label: "Openings", action: () => console.log("wow2") },
      { icon: "cog", label: "Item 4", action: () => console.log("wow3") },
    ]);
    return { args, fakeItems };
  },
  template: `<div>
    <hp-flyout-menu v-bind="args" :items="fakeItems"> I'm a Drawer </hp-flyout-menu>
  </div>`,
});

export const Primary = Template.bind({});
Primary.args = {};
