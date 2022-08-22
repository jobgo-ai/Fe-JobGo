import HpTag from "../components/hp-tag.vue";

export default {
  title: "Components/Tag",
  component: HpTag,
  argTypes: {},
};

const Template = (args) => ({
  components: { HpTag },
  setup() {
    const item1 = { label: "Add label", isAdd: true };
    const item2 = { label: "Remove label", isAdd: false };

    const handleChangeFunc = (item) => {
      console.log(item);
    };

    return { args, item1, item2, handleChangeFunc };
  },
  template: `<div style="display:flex">
    <hp-tag :item="item1" @handleChange="handleChangeFunc" isAdd="true" />
    <hp-tag :item="item2" @handleChange="handleChangeFunc" />
  </div>`,
});

export const Primary = Template.bind({});
