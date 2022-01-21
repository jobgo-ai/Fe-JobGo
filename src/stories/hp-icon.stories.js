import HpIcon from "@/components/hp-icon.vue";

const files = Object.entries(import.meta.globEager("../assets/icons/*.svg"));
const iconNames = files.map((glob) => {
  return glob[0].replace("../assets/icons/", "").replace(".svg", "");
});

export default {
  title: "Components/Icon",
  component: HpIcon,
  argTypes: {},
};

const Template = (args) => ({
  components: { HpIcon },
  setup() {
    return { args, iconNames };
  },
  template: `<div style="display:flex">
    <div style="margin-right:8px">
        <hp-icon v-for="icon in iconNames" :name="icon" v-bind="args"> </hp-icon>
    </div>
  </div>`,
});

export const Primary = Template.bind({});
