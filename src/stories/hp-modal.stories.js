import HpModal from "../components/hp-modal.vue";

export default {
  title: "Components/Modal",
  component: HpModal,
  argTypes: {},
};

import { ref } from "vue";
const Template = (args) => ({
  components: { HpModal },
  setup() {
    const isModalOpen = ref(false);
    return { args, isModalOpen };
  },
  template: `<div>
    <button @click="isModalOpen = true">Open Modal</button>
    <hp-modal v-bind="args" :isOpen="isModalOpen" @close="isModalOpen = false"> I'm a modal </hp-modal>
  </div>`,
});

export const Primary = Template.bind({});
Primary.args = {};
