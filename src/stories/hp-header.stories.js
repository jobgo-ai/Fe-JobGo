import HpHeader from "../components/hp-header.vue";

export default {
  title: "Components/Header",
  component: HpHeader,
  argTypes: {},
};

import { useBreadcrumbs } from "@/hooks/useBreadcrumbs";
const Template = (args) => ({
  components: { HpHeader },
  setup() {
    const crumbz = [
      { label: "Openings", to: "/openings" },
      { label: "Lead Designer", to: "/opening/whatever" },
    ];
    const { setBreadcrumbs } = useBreadcrumbs();
    setBreadcrumbs(crumbz);
    return { args };
  },
  template: `<div>
    <hp-header />
  </div>`,
});

export const Primary = Template.bind({});
Primary.args = {};
