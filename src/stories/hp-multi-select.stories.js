import HpMultiSelect from "../components/form/hp-multi-select.vue";

export default {
  title: "Components/Form/Multi Select",
  component: HpMultiSelect,
  argTypes: {},
};

import { ref } from "vue";

const Template = (args) => ({
  components: { HpMultiSelect },
  setup() {
    const options = ref(["ECMA Script 2016", "JavaScript", "TypeScript"]);
    const values = ref(["ECMA Script 2016"]);
    return { args, options, values };
  },
  template: `<div style="margin-left:400px;">
    <hp-multi-select v-model="values" :options="options" name="multi-select" />
  </div>`,
});

export const Primary = Template.bind({});
Primary.args = {};
