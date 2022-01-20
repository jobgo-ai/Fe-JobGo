import HpTextarea from "../components/form/hp-textarea.vue";

export default {
  title: "Components/Form/Textarea",
  component: HpTextarea,
  argTypes: {},
};

const Template = (args) => ({
  components: { HpTextarea },
  setup() {
    return { args };
  },
  template: `<div>
    <hp-textarea name="textarea" />
  </div>`,
});

export const Primary = Template.bind({});
Primary.args = {};
