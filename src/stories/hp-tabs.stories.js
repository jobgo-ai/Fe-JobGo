import HpTabs from "../components/hp-tabs.vue";

export default {
  title: "Components/Tabs",
  component: HpTabs,
  argTypes: {},
};

import { ref } from "vue";
const Template = (args) => ({
  components: { HpTabs },
  setup() {
    const state = ref("tab1");
    const options = ["tab1", "longtab", "super freaking long tab"];
    return { args, state, options };
  },
  template: `<div style="display:flex">
    <hp-tabs :options="options" v-model="state" />
  </div>`,
});

export const Primary = Template.bind({});
Primary.args = {
  size: 16,
};
