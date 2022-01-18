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
    >
      <h2>{{ opening.name }}</h2>
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
import { ref, computed } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useForm } from "vee-validate";
import { useDebounce } from "@vueuse/core";
import * as yup from "yup";

//Components
import HpModal from "@/components/hp-modal.vue";
import HpInput from "@/components/form/hp-input.vue";
import HpButton from "@/components/hp-button.vue";

// Hooks
import { usePost } from "@/hooks/useHttp";

const emit = defineEmits(["updateCandidateList"]);

const props = defineProps({
  candidates: {
    type: Array,
    default: [],
  },
  isCandidateDetailsOpen: {
    type: String,
    default: null,
  },
  opening: {
    type: Object,
    default: [],
  },
});

const router = useRouter();
const route = useRoute();

const isAddCandidateModalOpen = ref(false);

const schema = yup.object({
  name: yup.string().required("Name is required"),
  email: yup.string(),
});

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
  emit("updateCandidateList");
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

const candidateList = computed(() => {
  const { candidates } = props;
  if (debouncedSearch.value) {
    return candidates.filter((candidate) => {
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
  return candidates;
});
</script>

<style lang="scss" scoped>
.candidate-list {
  padding: 10px;
  background-color: var(--color-primary);
  position: absolute;
  transition: all 0.35s linear;
  transform: translateX(0);
  right: 16px;
  width: 400px;
  z-index: 2;
  &--left {
    right: calc(100% - 16px);
    transform: translateX(100%);
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
