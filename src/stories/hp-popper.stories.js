import HpPopper from "../components/hp-popper.vue";

export default {
  title: "Components/Popper",
  component: HpPopper,
  argTypes: {},
};

const Template = (args) => ({
  components: { HpPopper },
  setup() {
    return { args };
  },
  template: `<div>
        <hp-popper v-bind="args">
            <div>Hover me</div>
            <template #content>
                I'm popper content
            </template>
        </hp-popper>
  </div>`,
});

export const onClick = Template.bind({});
onClick.args = {};

export const onHover = Template.bind({});
onHover.args = {
  hover: true,
};
