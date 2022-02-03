<template>
  <div>
    <hp-drawer
      :isOpen="isAddQuestionDrawerOpen"
      @close="isAddQuestionDrawerOpen = false"
    >
      <questions
        :handleClose="() => (isAddQuestionDrawerOpen = false)"
        v-if="isAddQuestionDrawerOpen"
      />
    </hp-drawer>
    <teleport to="#teleport-target-header">
      <!-- <hp-button
        class="edit-openings__teleport-button"
        icon="trash"
        @handleClick="archiveOpening"
      ></hp-button> -->
      <hp-button
        label="Save"
        type="submit"
        primary
        :isLoading="isSaving"
        @handleClick="onSubmit"
        :isDisabled="!meta.dirty"
      ></hp-button>
    </teleport>
    <div class="edit-interview" v-if="!isInterviewLoading && !isLoading">
      <div class="edit-interview__container">
        <form @submit.prevent="handleContextFormSave">
          <h2 class="edit-interview__title">Edit interview</h2>
          <p class="edit-interview__subtitle">
            Design the template by editing ceremonies and interview questions.
          </p>
          <hp-input label="Name" name="name"></hp-input>
          <div>
            <div class="edit-interview__ceremony">
              <div class="edit-interview__ceremony__header">
                <div>
                  <h3 class="edit-interview__ceremony__header__title">
                    Warmup
                  </h3>
                  <p class="edit-interview__ceremony__header__subtitle">
                    Set warmup instructions and expected duration
                  </p>
                </div>
                <hp-counter name="ceremony.warmup.duration" />
              </div>
              <div>
                <hp-textarea :rows="6" name="ceremony.warmup.content" />
              </div>
            </div>
            <div
              class="
                edit-interview__ceremony edit-interview__ceremony--cooldown
              "
            >
              <div class="edit-interview__ceremony__header">
                <div>
                  <h3 class="edit-interview__ceremony__header__title">
                    Cooldown
                  </h3>
                  <p class="edit-interview__ceremony__header__subtitle">
                    Set Cooldown instructions and expected duration
                  </p>
                </div>
                <hp-counter name="ceremony.cooldown.duration" />
              </div>
              <div>
                <hp-textarea :rows="6" name="ceremony.cooldown.content" />
              </div>
            </div>
          </div>
        </form>
        <h3 class="edit-interview__ceremony__header__title">Questions</h3>
        <ol>
          <draggable
            v-model="interview.questions"
            tag="transition-group"
            item-key="reference"
            handle=".edit-interview__handle"
            @change="handleDragChange"
            v-bind="dragOptions"
            @start="drag = true"
            @end="drag = false"
          >
            <template #item="{ element, index }">
              <li class="edit-interview__question-card" :key="index">
                <div class="edit-interview__question-card__container">
                  <hp-badge icon="questions" :content="index + 1" />
                  <hp-icon name="drag" class="edit-interview__handle"></hp-icon>
                </div>
                <div class="edit-interview__question-card__content">
                  {{ element.content }}
                </div>
                <hp-question-card-stats :question="element" />
                <div class="edit-interview__question-card__actions">
                  <hp-button
                    class="edit-interview__question-card__actions__button"
                    label="Edit question"
                    :to="`/FIGURE IT OUT`"
                  ></hp-button
                  ><hp-button
                    @handleClick="handleRemoveQuestion"
                    icon="trash"
                  ></hp-button>
                </div>
              </li>
            </template>
          </draggable>
        </ol>
        <hp-button
          class="edit-interview__questions-button"
          @handleClick="isAddQuestionDrawerOpen = true"
          label="Add question"
          type="button"
          icon="plus"
          dropzone
        ></hp-button>
      </div>
    </div>
    <hp-spinner v-else size="24" content />
  </div>
</template>

<script setup>
//Vendor
import { onMounted, ref, computed } from "vue";
import { useForm } from "vee-validate";
import { useRoute } from "vue-router";
import * as yup from "yup";
import draggable from "vuedraggable";

//Views
import Questions from "@/views/dashboard/opening/questions/questions.vue";

//Components
import HpInput from "@/components/form/hp-input.vue";
import HpButton from "@/components/hp-button.vue";
import HpCounter from "@/components/hp-counter.vue";
import HpIcon from "@/components/hp-icon.vue";
import HpBadge from "@/components/hp-badge.vue";
import HpDrawer from "@/components/hp-drawer.vue";
import HpTextarea from "@/components/form/hp-textarea.vue";
import HpSpinner from "@/components/hp-spinner.vue";
import HpQuestionCardStats from "@/components/hp-question-card-stats.vue";

//Hooks
import { usePut } from "@/hooks/useHttp";
import { useBreadcrumbs } from "@/hooks/useBreadcrumbs";
import useContextSave from "@/hooks/useContextSave";
import useToast from "@/hooks/useToast";
import useInterviews from "@/hooks/useInterviews";

const props = defineProps({
  opening: {
    type: Object,
    required: true,
  },
});

const isLoading = ref(true);
const isSaving = ref(false);
const route = useRoute();
const isAddQuestionDrawerOpen = ref(false);
const { interview, fetchInterview, isInterviewLoading } = useInterviews();
const putInterview = usePut(`templates/${route.params.interviewRef}`);

const { setToast } = useToast();

const schema = yup.object({
  name: yup.string().required("Interview name is required"),
  description: yup.string().nullable(),
  ceremony: yup.object({
    cooldown: yup.object({
      content: yup.string(),
      duration: yup.number(),
    }),
    warmup: yup.object({
      content: yup.string(),
      duration: yup.number(),
    }),
  }),
  questions: yup.array(),
});

const { handleSubmit, resetForm, meta, setFieldValue } = useForm({
  validationSchema: schema,
  validateOnMount: false,
});

const onSubmit = handleSubmit(async (values) => {
  isSaving.value = true;
  const formattedQuestions = values?.questions.map((q) => q.reference) || [];
  await putInterview.put({
    template: { ...values, jobLevels: [], questions: formattedQuestions },
  });
  isSaving.value = false;
  setToast({
    type: "positive",
    title: "Well done!",
    message: "Interview updated",
  });
  resetForm({
    touched: false,
    dirty: false,
    values: putInterview.data.value.template,
  });
});

useContextSave(meta);

onMounted(async () => {
  await fetchInterview(route.params.interviewRef);
  resetForm({ touched: false, values: interview.value });

  const { setBreadcrumbs } = useBreadcrumbs();
  setBreadcrumbs(
    [
      {
        label: "Openings",
        to: "/openings",
      },
      {
        label: props.opening.name,
        to: `/opening/${props.opening.reference}/edit`,
      },
      {
        label: "Add interview",
        to: `/opening/${props.opening.reference}/edit/add-interview`,
      },
      {
        to: `/opening/${props.opening.reference}/edit/edit-interview/${route.params.interviewRef}`,
        label: "Edit interview",
      },
    ],
    true
  );
  isLoading.value = false;
});

const dragOptions = computed(() => {
  return {
    animation: 200,
    group: "description",
    disabled: false,
    ghostClass: "ghost",
  };
});

const handleDragChange = () => {
  setFieldValue("questions", interview.value.questions);
};

const handleRemoveQuestion = () => {
  console.log("hello");
};
</script>

<styles lang="scss">
.edit-interview {
  @include pageContainer;
  display: flex;
  flex-direction: column;
  &__container {
    display: flex;
    flex-direction: column;
    max-width: 552px;
    align-self: center;
  }
  &::-webkit-scrollbar {
    display: none;
  }
  &__title {
    @include text-h2;
    font-weight: 600;
  }
  &__subtitle {
    @include text-h5;
    color: var(--color-text-secondary);
    margin-bottom: 32px;
  }
  &__questions-button {
    margin-top: 16px;
    margin-bottom: 200px;
  }
  &__ceremony {
    &--cooldown {
      border-bottom: 1px dashed var(--color-border);
      margin-bottom: 16px;
    }
    &__header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 16px;
      &__title {
        @include text-h5;
        font-weight: 500;
        margin-bottom: 16px;
      }
      &__subtitle {
        color: var(--color-text-secondary);
      }
    }
  }
  &__question-card {
    @include flyout;
    margin-bottom: 16px;
    &__container {
      display: flex;
      justify-content: space-between;
      margin-bottom: 16px;
    }
    &__content {
      @include text-h5;
      font-weight: 500;
      margin-bottom: 16px;
    }
    &__actions {
      display: flex;
      align-items: center;
      margin-top: 16px;
      &__button {
        margin-right: 6px;
      }
    }
  }
  &__handle {
    cursor: grab;
  }
}

.flip-list-move {
  transition: transform 0.5s;
}
.no-move {
  transition: transform 0s;
}
.ghost {
  opacity: 0.5;
}
.list-group {
  min-height: 20px;
}
.list-group-item {
  cursor: move;
}
.list-group-item i {
  cursor: pointer;
}
</styles>
