<template>
  <div>
    <hp-modal
      :isOpen="isAddCandidateModalOpen"
      @close="isAddCandidateModalOpen = false"
    >
      <h3>Add candidate</h3>
      <form @submit.prevent="onSubmit">
        <hp-input name="name"></hp-input>
        <hp-input name="email"></hp-input>
        <hp-button type="submit" label="Create candidate"></hp-button>
      </form>
    </hp-modal>
    <div
      class="candidate-list"
      :class="{ 'candidate-list--left': isCandidateDetailsOpen }"
      v-if="!isCandidateListLoading && opening.statistics?.templates"
    >
      <div class="candidate-list__header">
        <hp-abstract-avatar />
        <div class="candidate-list__header__button-group">
          <hp-button
            class="candidate-list__header__button-group__button"
            label="Compare"
          ></hp-button>
          <hp-button icon="pencil"></hp-button>
        </div>
      </div>
      <h2 class="candidate-list__opening-title">{{ opening.name }}</h2>
      <p class="candidate-list__opening-description">
        {{ opening.description }}
      </p>
      <div class="candidate-list__stats">
        <div class="candidate-list__stats__stat">
          <hp-icon
            class="candidate-list__stats__stat__icon"
            name="layers"
          ></hp-icon>
          <div class="candidate-list__stats__stat__number">
            {{ opening.statistics.templates }}
          </div>
          Candidates
        </div>
        <div class="candidate-list__stats__stat">
          <hp-icon
            class="candidate-list__stats__stat__icon"
            name="skills"
          ></hp-icon>
          <div class="candidate-list__stats__stat__number">
            {{ opening.statistics.skills.length }}
          </div>
          Skills
        </div>
        <div class="candidate-list__stats__stat">
          <hp-icon
            class="candidate-list__stats__stat__icon"
            name="candidates"
          ></hp-icon>
          <div class="candidate-list__stats__stat__number">
            {{ opening.statistics.candidates }}
          </div>
          Candidates
        </div>
      </div>
      <hp-button
        @handleClick="isAddCandidateModalOpen = true"
        label="add candidate"
      ></hp-button>
      <router-link :to="`/opening/${opening.reference}/compare`"
        >Compare results</router-link
      >
      <router-link :to="`/opening/${opening.reference}/edit`">Edit</router-link>
      <input class="candidate-list__search" v-model="search" />
      <ol v-if="candidates.length > 0">
        Candidate List
        <li
          class="candidate-list__candidate"
          @click="
            router.push(
              `/openings/${route.params.openingRef}?candidate=${candidate.reference}`
            )
          "
          :key="candidate.reference"
          v-for="candidate in candidateList"
        >
          <div class="candidate-list__candidate-info">
            {{ candidate.name }}
            {{ candidate.email }}
          </div>
          <div class="candidate-list__interview-ticks">
            <div
              :class="[
                `candidate-list__interview-tick`,
                isNextAction(template, candidate.opening.templates) &&
                  'candidate-list__interview-tick--next',
                isCompleted(template) &&
                  'candidate-list__interview-tick--completed',
              ]"
              v-for="template in candidate.opening.templates"
              :key="template"
            ></div>
          </div>
        </li>
      </ol>
    </div>
  </div>
</template>

<script setup>
//Vendor
import { ref, computed, defineAsyncComponent, watch } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useForm } from "vee-validate";
import { useDebounce } from "@vueuse/core";
import * as yup from "yup";

//Components
import HpModal from "@/components/hp-modal.vue";
import HpAbstractAvatar from "@/components/hp-abstract-avatar.vue";
import HpInput from "@/components/form/hp-input.vue";
import HpButton from "@/components/hp-button.vue";
import HpIcon from "@/components/hp-icon.vue";

// Hooks
import { usePost, useGet } from "@/hooks/useHttp";

const props = defineProps({
  isCandidateDetailsOpen: {
    type: String,
    default: null,
  },
  opening: {
    type: Object,
    default: {},
  },
});

const router = useRouter();
const route = useRoute();

const isCandidateListLoading = ref(true);
const candidates = ref([]);

const isAddCandidateModalOpen = ref(false);

const schema = yup.object({
  name: yup.string().required("Name is required"),
  email: yup.string(),
});

const fetchCandidates = async () => {
  isCandidateListLoading.value = true;
  const getCandidates = useGet(
    `openings/${route.params.openingRef}/candidates`
  );
  await getCandidates.get();
  candidates.value = getCandidates.data.value?.candidates;
  isCandidateListLoading.value = false;
};

const { handleSubmit } = useForm({
  validationSchema: schema,
  initialValues: { name: "", email: "" },
});
const postCandidate = usePost("candidates");
const onSubmit = handleSubmit(async (values) => {
  const payload = {
    candidate: {
      ...values,
      opening: props.opening.reference,
    },
  };
  await postCandidate.post(payload);
  await fetchCandidates();
  isAddCandidateModalOpen.value = false;
});

const isNextAction = (template, templates) => {
  const nextRef = templates.find((t) => {
    return !t.interview?.started;
  }).interview?.token;
  return template.interview.token === nextRef;
};

const isCompleted = (template) => {
  return template.interview.started && template.interview.terminated;
};

const search = ref("");
const debouncedSearch = useDebounce(search, 450);

watch(
  () => route.params.openingRef,
  async () => {
    if (!route.params.openingRef) {
      return;
    }
    await fetchCandidates();
  },
  { immediate: true }
);

const candidateList = computed(() => {
  if (debouncedSearch.value) {
    return candidates.value.filter((candidate) => {
      return (
        candidate.name
          .toLowerCase()
          .includes(debouncedSearch.value.toLowerCase()) ||
        candidate.email
          .toLowerCase()
          .includes(debouncedSearch.value.toLowerCase())
      );
    });
  }
  return candidates.value;
});

const avatar = defineAsyncComponent(() =>
  import(/* @vite-ignore */ `../../../assets/abstracts/avatars/avatar_6.svg`)
);
</script>

<style lang="scss" scoped>
.candidate-list {
  padding: 10px;
  background-color: var(--color-panel);
  border-radius: 16px;
  border: 1px solid var(--color-border-subtle);
  position: absolute;
  transition: all 0.25s cubic-bezier(0.17, 0.67, 0.83, 0.67);
  transform: translateX(0);
  right: 16px;
  width: 400px;
  z-index: 10;
  &--left {
    right: calc(100% - 16px);
    transform: translateX(100%);
  }

  &__header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 16px;
    &__avatar {
      height: 40px;
      width: 40px;
    }
    &__button-group {
      display: flex;
      align-items: center;
      &__button {
        margin-right: 6px;
      }
    }
  }

  &__opening-title {
    font-weight: 500;
    font-size: 16px;
    line-height: 24px;
    margin-bottom: 4px;
  }

  &__opening-description {
    color: var(--color-text-secondary);
  }

  &__stats {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px dashed var(--color-border);
    margin-top: 16px;
    padding-bottom: 24px;
    margin-bottom: 24px;

    &__stat {
      display: flex;
      align-items: center;
      color: var(--color-text-primary);
      &__number {
        font-weight: 400;
        margin-right: 2px;
      }
      &__icon {
        color: var(--color-text-secondary);
        margin-right: 4px;
      }
    }
  }

  &__candidate {
    font-size: 12px;
    padding: 8px;
    border: 1px solid black;
    border-radius: 8px;
  }

  &__interview-ticks {
    display: flex;
  }
  &__interview-tick {
    width: 100%;
    height: 4px;
    background-color: red;
    margin-right: 2px;
    &--next {
      background-color: green;
    }
    &--completed {
      background-color: blue;
    }
    &:last-child {
      margin-right: 0;
    }
  }
}
</style>
