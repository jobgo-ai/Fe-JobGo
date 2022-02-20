<template>
  <div class="edit-interview__container">
    <hp-drawer :isOpen="isAddQuestionDrawerOpen" @close="handleCloseEditDrawer">
      <questions
        :handleClose="handleCloseEditDrawer"
        v-if="isAddQuestionDrawerOpen"
      />
    </hp-drawer>
    <hp-drawer
      :isOpen="isEditQuestionDrawerOpen"
      @close="handleCloseEditDrawer"
    >
      <edit-question
        @handleClose="handleCloseEditDrawer"
        :question="isEditQuestionDrawerOpen"
      />
    </hp-drawer>
    <hp-drawer
      :isOpen="isViewQuestionDrawerOpen"
      @close="isViewQuestionDrawerOpen = false"
    >
      <view-question
        :question="isViewQuestionDrawerOpen"
        :handleClose="() => (isViewQuestionDrawerOpen = false)"
        v-if="isViewQuestionDrawerOpen"
      />
    </hp-drawer>
    <teleport to="#teleport-target-header">
      <div ref="overviewTarget" class="edit-interview__overview-button">
        <hp-button
          @handleClick="isOverviewFlyoutOpen = !isOverviewFlyoutOpen"
          icon="file"
        >
        </hp-button>
        <transition name="flyout-transition">
          <div
            v-if="isOverviewFlyoutOpen"
            class="edit-interview__overview-button__flyout"
          >
            <div class="edit-interview__overview-button__flyout__header">
              Overview
            </div>
            <div class="edit-interview__overview-button__flyout__stats">
              <div class="edit-interview__overview-button__flyout__stats__stat">
                <hp-icon
                  class="
                    edit-interview__overview-button__flyout__stats__stat__icon
                  "
                  name="chronometer"
                ></hp-icon>
                <div
                  class="
                    edit-interview__overview-button__flyout__stats__stat__text
                  "
                >
                  {{ (interview.statistics.duration / 60).toFixed(0) }} minutes
                </div>
              </div>
              <div class="edit-interview__overview-button__flyout__stats__stat">
                <hp-icon
                  class="
                    edit-interview__overview-button__flyout__stats__stat__icon
                  "
                  name="questions"
                ></hp-icon>
                <div
                  class="
                    edit-interview__overview-button__flyout__stats__stat__text
                  "
                >
                  {{ interview.statistics.questions }} questions
                </div>
              </div>
            </div>
            <div class="edit-interview__overview-button__flyout__header">
              Top skills evaluated
              <ol class="edit-interview__overview-button__skills">
                <hp-badge-tag
                  v-for="skill in interview.statistics.skills"
                  :quantity="skill.quantity"
                  :label="skill.value.name"
                ></hp-badge-tag>
              </ol>
            </div>
          </div>
        </transition>
      </div>
      <hp-button
        label="Save changes"
        type="submit"
        primary
        :isLoading="isSaving"
        @handleClick="onSubmit"
        :isDisabled="!meta.dirty || !meta.valid"
      ></hp-button>
    </teleport>
    <div class="edit-interview" v-if="!isInterviewLoading && !isLoading">
      <form @submit.prevent="handleContextFormSave">
        <h2 class="edit-interview__title">Edit interview</h2>
        <p class="edit-interview__subtitle">
          Design the template by editing ceremonies and interview questions.
        </p>
        <hp-input label="Name" name="name"></hp-input>
        <hp-input label="Description" name="description"></hp-input>
        <h3 class="edit-interview__ceremony__header__title">Questions</h3>
        <ol class="edit-interview__question-cards">
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
                <hp-question-card-stats hasTooltips :question="element" />
                <div class="edit-interview__question-card__actions">
                  <div
                    class="edit-interview__question-card__actions__button-group"
                  >
                    <hp-button
                      v-if="hasEditPermission(element)"
                      class="edit-interview__question-card__actions__button"
                      label="Edit question"
                      @handleClick="isEditQuestionDrawerOpen = element"
                    ></hp-button>
                    <hp-tooltip
                      :delay="500"
                      class="edit-interview__question-card__actions__button"
                    >
                      <hp-button
                        @handleClick="isViewQuestionDrawerOpen = element"
                        icon="eye"
                      ></hp-button>
                      <template #content>View question</template>
                    </hp-tooltip>
                  </div>
                  <hp-tooltip
                    :delay="500"
                    class="edit-interview__question-card__actions__button"
                  >
                    <hp-button
                      @handleClick="handleRemoveQuestion(element)"
                      icon="trash"
                      danger
                    ></hp-button>
                    <template #content>Remove question from interview</template>
                  </hp-tooltip>
                </div>
              </li>
            </template>
          </draggable>
        </ol>
        <div class="edit-interview__questions-button">
          <hp-button
            @handleClick="isAddQuestionDrawerOpen = true"
            label="Add question"
            type="button"
            icon="plus"
            dropzone
          ></hp-button>
        </div>
        <div>
          <div class="edit-interview__ceremony">
            <div class="edit-interview__ceremony__header">
              <div>
                <h3 class="edit-interview__ceremony__header__title">Warmup</h3>
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
            class="edit-interview__ceremony edit-interview__ceremony--cooldown"
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
        <hp-danger-zone
          v-if="hasEditPermission(interview)"
          class="edit-interview__danger-zone"
          label="Delete interview template"
          :onConfirm="handleDeleteInterviewTemplate"
        ></hp-danger-zone>
      </form>
    </div>
    <hp-spinner v-else size="24" content />
  </div>
</template>

<script setup>
// Vendor
import { onMounted, ref, computed } from "vue";
import { useForm } from "vee-validate";
import { useRoute, useRouter } from "vue-router";
import * as yup from "yup";
import draggable from "vuedraggable";
import { onClickOutside } from "@vueuse/core";

// Views
import Questions from "@/views/dashboard/opening/questions/questions.vue";
import EditQuestion from "@/views/dashboard/opening/questions/edit-question.vue";
import ViewQuestion from "@/views/dashboard/opening/questions/view-question.vue";

// Components
import HpInput from "@/components/form/hp-input.vue";
import HpTooltip from "@/components/hp-tooltip.vue";
import HpButton from "@/components/hp-button.vue";
import HpCounter from "@/components/hp-counter.vue";
import HpIcon from "@/components/hp-icon.vue";
import HpBadgeTag from "@/components/hp-badge-tag.vue";
import HpBadge from "@/components/hp-badge.vue";
import HpDrawer from "@/components/hp-drawer.vue";
import HpTextarea from "@/components/form/hp-textarea.vue";
import HpSpinner from "@/components/hp-spinner.vue";
import HpQuestionCardStats from "@/components/cards/hp-question-card-stats.vue";
import HpDangerZone from "@/components/cards/hp-danger-zone-card.vue";

// Composables
import { hasEditPermission } from "@/composables/usePermissions";
import { usePut, useDelete } from "@/composables/useHttp";
import { useBreadcrumbs } from "@/composables/useBreadcrumbs";
import useContextSave from "@/composables/useContextSave";
import useQuestionContext from "@/composables/useQuestionContext";
import useToast from "@/composables/useToast";
import useInterviews from "@/composables/useInterviews";

const props = defineProps({
  opening: {
    type: Object,
    required: true,
  },
});

const isLoading = ref(true);
const isSaving = ref(false);
const route = useRoute();
const router = useRouter();
const isOverviewFlyoutOpen = ref(false);
const isAddQuestionDrawerOpen = ref(false);
const isViewQuestionDrawerOpen = ref(false);
const isEditQuestionDrawerOpen = ref(false);
const { interview, fetchInterview, isInterviewLoading, setInterview } =
  useInterviews();
const putInterview = usePut(`templates/${route.params.interviewRef}`);

const { setToast } = useToast();

const schema = yup.object({
  name: yup.string().required("Interview name is required"),
  description: yup.string().nullable(),
  ceremony: yup.object({
    cooldown: yup.object({
      content: yup.string(),
      duration: yup.number().min(0).max(60),
    }),
    warmup: yup.object({
      content: yup.string(),
      duration: yup.number().min(0).max(60),
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
  const formattedQuestions =
    interview.value?.questions.map((q) => q.reference) || [];
  await putInterview.put({
    template: {
      ...values,
      questions: formattedQuestions,
      ceremony: {
        warmup: {
          ...values.ceremony.warmup,
          duration: values.ceremony.warmup.duration * 60,
        },
        cooldown: {
          ...values.ceremony.cooldown,
          duration: values.ceremony.cooldown.duration * 60,
        },
      },
    },
  });
  isSaving.value = false;
  const formattedInterview = setInterview(putInterview.data.value.template);
  setToast({
    type: "positive",
    title: "Well done!",
    message: "Interview updated",
  });
  resetForm({
    touched: false,
    dirty: false,
    values: formattedInterview,
  });
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
        to: `/opening/${props.opening.reference}/edit/edit-interview/${route.params.interviewRef}`,
        label: interview.value.name,
      },
    ],
    true
  );
});
const { setBreadcrumbs } = useBreadcrumbs();
useContextSave(meta);

const overviewTarget = ref(null);

onClickOutside(overviewTarget, (event) => {
  if (!isOverviewFlyoutOpen.value) {
    return;
  }
  isOverviewFlyoutOpen.value = false;
});

onMounted(async () => {
  await fetchInterview(route.params.interviewRef);
  resetForm({ touched: false, values: interview.value });

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
        to: `/opening/${props.opening.reference}/edit/edit-interview/${route.params.interviewRef}`,
        label: interview.value.name,
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

const handleRemoveQuestion = async (template) => {
  const putInterview = usePut(`templates/${route.params.interviewRef}`);

  await putInterview.put({
    template: {
      ...interview.value,
      ceremony: {
        warmup: {
          ...interview.value.ceremony.warmup,
          duration: interview.value.ceremony.warmup.duration * 60,
        },
        cooldown: {
          ...interview.value.ceremony.cooldown,
          duration: interview.value.ceremony.cooldown.duration * 60,
        },
      },
      questions: interview.value.questions
        .map((q) => q.reference)
        .filter((q) => q !== template.reference),
    },
  });
  setInterview(putInterview.data.value.template);
  setToast({
    type: "positive",
    title: "Well done!",
    message: "Interview updated",
  });
};

const handleDeleteInterviewTemplate = async () => {
  const deleteInterview = useDelete(`templates/${route.params.interviewRef}`);
  await deleteInterview.remove();
  router.push(`/opening/${route.params.openingRef}/edit`);
  setToast({
    type: "positive",
    title: "It had to be done!",
    message: "That nasty interview is finally gone",
  });
};

const handleCloseEditDrawer = () => {
  const handleClose = () => {
    isEditQuestionDrawerOpen.value = false;
    isAddQuestionDrawerOpen.value = false;
  };

  const { isDirty, type, clearIsDirty } = useQuestionContext();

  if (!isDirty.value) {
    handleClose();
  } else {
    const dialogText =
      "You have unsaved changes, are you sure you want to continue?";
    const confirm = window.confirm(dialogText);
    if (!confirm) {
      return;
    }
    if (confirm) {
      clearIsDirty();
      handleClose();
    }
  }
};
</script>

<styles lang="scss">
.edit-interview {
  display: flex;
  flex-direction: column;
  width: 552px;
  &__container {
    display: flex;
    flex-direction: column;
    align-self: center;
    align-items: center;
    height: 100vh;
    overflow: auto;
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
    padding-bottom: 24px;
    border-bottom: 1px dashed var(--color-border);
    margin-bottom: 16px;
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
      }
      &__subtitle {
        color: var(--color-text-secondary);
      }
    }
  }
  &__question-cards {
    padding-top: 16px;
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
      justify-content: space-between;
      margin-top: 16px;
      &__button-group {
        display: flex;
        align-items: center;
      }
      &__button {
        margin-right: 6px;
      }
    }
  }
  &__handle {
    cursor: grab;
  }

  &__overview-button {
    margin-right: 6px;
    position: relative;
    &__skills {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
      margin-top: 6px;
    }
    &__flyout {
      @include flyout;
      position: absolute;
      right: 0;
      top: calc(100% + 6px);
      width: 600px;
      &__header {
        color: var(--color-text-secondary);
        font-weight: 500;
        @include text-h5;
        padding-bottom: 12px;
      }
      &__stats {
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-gap: 16px;
        padding-bottom: 16px;
        border-bottom: 1px dashed var(--color-border);
        margin-bottom: 16px;
        &__stat {
          border-radius: $border-radius-sm;
          border: $border;
          padding: 4px;
          display: flex;
          align-content: center;
          align-items: center;
          padding: 8px;
          &__icon {
            color: var(--color-text-secondary);
            margin-right: 6px;
          }
          &__text {
            white-space: nowrap;
          }
        }
      }
    }
  }
  &__danger-zone {
    margin-bottom: 164px;
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
