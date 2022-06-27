import HpTable from "../components/hp-table.vue";

export default {
  title: "Components/Table",
  component: HpTable,
  argTypes: {},
};

const Template = (args) => ({
  components: { HpTable },
  setup() {
    const data = [
      { name: "Booty Chance Ohallahan", score1: 3, score2: 5 },
      { name: "Shaft Factory Johnson", score1: 3, score2: 4 },
      { name: "Poundtown Mayor O'Keefe", score1: 1, score2: 5 },
    ];

    const headers = [
      {
        value: "name",
        label: "Name",
      },
      {
        value: "score1",
        label: "Interview #1",
      },
      {
        value: "score2",
        label: "Interview #2",
      },
    ];
    return { args, headers, data };
  },
  template: `<div>
  <hp-table :data="data" :headers="headers"></hp-table>
  </div>`,
});

export const Primary = Template.bind({});
Primary.args = {};
