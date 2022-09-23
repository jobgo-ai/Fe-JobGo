<template>
  <div class="hp-member-permission">
    <hp-modal @close="isModalOpen = false" :isOpen="isModalOpen">
      <div class="hp-member-permission__modal">
        <div class="hp-member-permission__modal__title">Manage permissions</div>
        <ol class="hp-member-permission__modal__list">
          <member v-for="member in members" :member="member"> </member>
        </ol>
      </div>
    </hp-modal>
    <p class="hp-member-permission__title">Manage permissions</p>
    <p>
      8 members have access.
      <span class="hp-member-permission__link" @click="isModalOpen = true"
        >Manage permissions</span
      >
    </p>
  </div>
</template>

<script setup>
// Vendor
import { onMounted, ref } from "vue";

// Components
import HpModal from "@/components/hp-modal.vue";
import Member from "./member.vue";

// Composables
import useOrganization from "@/composables/useOrganization";
import useAuth from "@/composables/useAuth";

const { members, fetchMembers } = useOrganization();
const { organization } = useAuth();

const isLoading = ref(true);
const isModalOpen = ref(false);

onMounted(async () => {
  await fetchMembers();
  isLoading.value = false;
});
</script>

<style lang="scss">
.hp-member-permission {
  margin-bottom: 24px;
  &__title {
    @include text-h5;
    margin: 0;
    color: var(--color-text-secondary);
    margin-bottom: 12px;
    font-weight: 500;
  }
  &__link {
    text-decoration: underline;
    cursor: pointer;
  }
  &__modal {
    padding: 24px;
    &__title {
      @include text-h3;
    }
    &__list {
      display: flex;
      flex-direction: column;
      margin-top: 12px;
    }
  }
}
</style>
