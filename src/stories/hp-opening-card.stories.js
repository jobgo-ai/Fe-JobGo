import HpOpeningCard from "../components/hp-opening-card.vue";

export default {
  title: "Components/Opening Card",
  component: HpOpeningCard,
  argTypes: {},
};

const Template = (args) => ({
  components: { HpOpeningCard },
  setup() {
    const opening = {
      reference: "jgu6fagb",
      name: "Lead Designer",
      description:
        "Lead Designer include research and analysis, overseeing a variety of design projects.",
      jobLevel: null,
      state: "active",
      statistics: {
        candidates: 3,
        templates: 3,
        competencies: [],
        skills: [
          { quantity: 1, value: { slug: "1010data", name: "1010data" } },
          { quantity: 1, value: { slug: "10base2", name: "10BASE2" } },
          {
            quantity: 1,
            value: {
              slug: "2d-gel-analysis-software",
              name: "2D Gel Analysis Software",
            },
          },
          { quantity: 1, value: { slug: "branding", name: "Branding" } },
          {
            quantity: 1,
            value: { slug: "design-management", name: "Design Management" },
          },
          {
            quantity: 1,
            value: {
              slug: "figma-design-software",
              name: "Figma (Design Software)",
            },
          },
          { quantity: 1, value: { slug: "logo-design", name: "Logo Design" } },
          {
            quantity: 1,
            value: { slug: "product-design", name: "Product Design" },
          },
          { quantity: 1, value: { slug: "typography", name: "Typography" } },
        ],
        jobLevels: [],
        types: [{ quantity: 5, value: { slug: "open", name: "Open" } }],
        scorings: [{ quantity: 5, value: { slug: "likert", name: "Likert" } }],
      },
      author: {
        reference: "nrvg1shn",
        email: "nick@hireproof.io",
        firstName: "nick@hireproof.io",
        lastName: null,
        organization: { slug: "hireproof", name: "Hireproof" },
      },
    };
    return { args, opening };
  },
  template: `<div style="display: flex">
        <hp-opening-card style="width: 236px; margin-right:24px" :opening="opening" v-bind="args">
        </hp-opening-card>
        <hp-opening-card style="width: 236px; margin-right:24px" :opening="opening" :isAddCard="true" v-bind="args">
        </hp-opening-card>
        <hp-opening-card style="width: 236px; margin-right:24px" :opening="opening" :isSelected="true" v-bind="args">
        </hp-opening-card>
        <hp-opening-card style="width: 236px" :opening="opening" :isArchived="true" v-bind="args">
        </hp-opening-card>
  </div>`,
});

export const Primary = Template.bind({});
Primary.args = {};