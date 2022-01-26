import HpFlyout from "../components/hp-flyout.vue";

export default {
  title: "Components/Flyout",
  component: HpFlyout,
  argTypes: {},
};

const Template = (args) => ({
  components: { HpFlyout },
  setup() {
    const items = [
      { label: "Interview #1", value: false },
      { label: "Interview #2", value: false },
      { label: "Interview #3", value: false },
      { label: "Interview #4", value: false },
      { label: "Interview #5", value: false },
    ];
    return { args, items };
  },
  template: `<div>
    <hp-flyout v-bind="args" :items="items" ></hp-flyout>
  </div>`,
});

export const Primary = Template.bind({});
Primary.args = {};
