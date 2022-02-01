import HpMultiSelect from "../components/form/hp-multi-select.vue";

export default {
  title: "Components/Form/Multi Select",
  component: HpMultiSelect,
  argTypes: {},
};

const Template = (args) => ({
  components: { HpMultiSelect },
  setup() {
    const options = [
      { value: "foo", label: "Foo" },
      { value: "bar", label: "Bar" },
    ];
    return { args, options };
  },
  template: `<div style="margin-left:400px;">
    <hp-multi-select :options="options" name="multi-select" />
  </div>`,
});

export const Primary = Template.bind({});
Primary.args = {};
