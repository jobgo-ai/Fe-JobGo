<template>
  <div class="hp-skill-search">
    <hp-input
      icon="skills"
      standalone
      :placeholder="placeholder"
      @update:modelValue="handleInputChange"
      v-model="skillSearch"
    ></hp-input>
    <transition name="flyout-transition">
      <div v-if="isFlyoutOpen" class="hp-skill-search__flyout">
        <div class="hp-skill-search__flyout__option" v-if="isAdd">
          Add "{{ skillSearch }}" to list of skills
        </div>
        <div v-if="isLoading">
          <hp-spinner></hp-spinner>
        </div>
        <div v-if="true">
          <ul>
            <li class="hp-skill-search__flyout__option" v-for="skill in skills">
              {{ skill }}
            </li>
          </ul>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref } from "vue";

// Components
import HpInput from "@/components/form/hp-input.vue";
import HpSpinner from "@/components/hp-spinner.vue";
import useSkillSearch from "@/composables/useSkillSearch";
import { useDebounceFn } from "@vueuse/core";

const props = defineProps({
  canAdd: {
    type: String,
    default: false,
  },
  placeholder: {
    type: String,
    required: false,
  },
});

const skills = ["JavaScript", "Vue", "Vuex", "Vue Router", "Vuex Router"];

const { handleSkillSearch } = useSkillSearch();

const isFlyoutOpen = ref(false);
const skillSearch = ref("");

const handleInputChange = useDebounceFn((value) => {
  if (value === "") {
    isFlyoutOpen.value = false;
  }

  if (!isFlyoutOpen.value && value !== "") {
    isFlyoutOpen.value = true;
  }
}, 500);
</script>

<style lang="scss">
.hp-skill-search {
  width: 100%;
  position: relative;
  &__flyout {
    @include flyout;
    padding: 12px;
    margin: auto;
    position: absolute;
    top: 42px;
    width: 100%;
    border-radius: 8px;
    &__option {
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 8px;
      border-radius: $border-radius-sm;
      outline: 0;
      color: var(--color-text);
      background-color: var(--color-background);
      border: 0;
      display: flex;
      text-align: left;
      width: 100%;
      transition: 0.15s ease-in-out opacity;
      &--disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }
      &:hover {
        background-color: var(--color-forground-floating);
      }
      &:focus {
        background-color: var(--color-forground-floating);
        outline: none;
      }
    }
  }
}
</style>
