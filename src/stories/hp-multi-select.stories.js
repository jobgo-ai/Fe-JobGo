import HpMultiSelect from "../components/form/hp-multi-select.vue";

export default {
  title: "Components/Form/Multi Select",
  component: HpMultiSelect,
  argTypes: {},
};

import { ref } from "vue";
import useSkillSearch from "@/hooks/useSkillSearch";

const Template = (args) => ({
  components: { HpMultiSelect },
  setup() {
    const options = ref([
      "ECMA Script 2016",
      "JavaScript",
      "TypeScript",
      "ECMA Script 2016",
      "JavaScript",
      "TypeScript",
      "ECMA Script 2016",
      "JavaScript",
      "TypeScript",
      "ECMA Script 2016",
      "JavaScript",
      "TypeScript",
    ]);
    const values = ref(["ECMA Script 2016"]);

    const searchFunction = async (value) => {
      const { handleSkillSearch } = useSkillSearch();
      const res = await handleSkillSearch(value);
      options.value = ["other skills", "yes, indeed"];
    };
    return { args, options, values, searchFunction };
  },
  template: `<div style="margin-left:200px;">
    <hp-multi-select v-model="values" label="Skills" :options="options" name="multi-select" />
  </div>
  <div style="margin-left:600px;">
    <hp-multi-select v-model="values" selectedMessage="items selected" :onSearch="searchFunction" :options="options" name="multi-select" />
  </div>`,
});

export const Primary = Template.bind({});
Primary.args = {};
