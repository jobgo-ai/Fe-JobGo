import HpBreadcrumbs from "../components/hp-breadcrumbs.vue";

export default {
  title: "Components/Breadcrumbs",
  component: HpBreadcrumbs,
  argTypes: {},
};

const Template = (args) => ({
  components: { HpBreadcrumbs },
  setup() {
    return { args };
  },
  template: `<div>
    <hp-breadcrumbs v-bind="args"> </hp-breadcrumbs>
  </div>`,
});

export const Primary = Template.bind({});
Primary.args = {};
