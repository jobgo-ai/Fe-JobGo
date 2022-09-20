<template>
  <div class="billing">
    <h1 class="billing__title">Upgrade</h1>
    <div class="billing__header">
      <p class="billing__header__plan">
        <hp-badge icon="diamond" type="positive" content="Free"></hp-badge>
        <hp-badge
          icon="template"
          type="positive"
          content="7 / 2 Openings"
        ></hp-badge>
      </p>
    </div>
    <hp-tabs
      class="billing__header__toggle"
      :options="[
        { value: 'yearly', label: 'Yearly' },
        { value: 'monthly', label: 'Monthly' },
      ]"
      v-model="billingPeriod"
    />
    <ol class="billing__grid">
      <li class="billing__tier">
        <h2 class="billing__tier__title">Startup</h2>
        <p class="billing__tier__description">
          Blah blah startup content here whats that ya chunks
        </p>
        <div class="billing__tier__price">
          {{ `${dictionary[billingPeriod].startup.price}€` }}
        </div>
        <hp-button fullWidth primary label="Switch to Startup"></hp-button>
        <ul class="billing__tier__features">
          <li class="billing__tier__feature">Up to 5 active job openings</li>
          <li class="billing__tier__feature">Unlimited interviews</li>
          <li class="billing__tier__feature">Unlimited candidates</li>
          <li class="billing__tier__feature">Unlimited interviewers</li>
          <li class="billing__tier__feature">
            Ready to use interview templates
          </li>
          <li class="billing__tier__feature">In depth candidate comparison</li>
          <li class="billing__tier__feature">Single sign on (SSO)</li>
          <li class="billing__tier__feature">Help Center / Knowledge base</li>
        </ul>
      </li>
      <li class="billing__tier">
        <h2 class="billing__tier__title">Growth</h2>
        <p class="billing__tier__description">
          Blah blah startup content here whats that ya chunks
        </p>
        <div class="billing__tier__price">
          {{ `${dictionary[billingPeriod].growth.price}€` }}
        </div>
        <hp-button fullWidth primary label="Switch to Growth"></hp-button>
        <ul class="billing__tier__features">
          <li class="billing__tier__feature">Up to 20 active job openings</li>
          <li class="billing__tier__feature">Unlimited interviews</li>
          <li class="billing__tier__feature">Unlimited candidates</li>
          <li class="billing__tier__feature">Unlimited interviewers</li>
          <li class="billing__tier__feature">
            Ready to use interview templates
          </li>
          <li class="billing__tier__feature">In depth candidate comparison</li>
          <li class="billing__tier__feature">Single sign on (SSO)</li>
          <li class="billing__tier__feature">Help Center / Knowledge base</li>
          <li class="billing__tier__feature">Panel interviewing</li>
          <li class="billing__tier__feature">
            Organization / Multi-user platform
          </li>
          <li class="billing__tier__feature">Integrations</li>
          <li class="billing__tier__feature">Customer support</li>
        </ul>
      </li>
      <li class="billing__tier">
        <h2 class="billing__tier__title">Enterprise</h2>
        <p class="billing__tier__description">
          Blah blah startup content here whats that ya chunks
        </p>
        <div class="billing__tier__price--enterprise">
          <p class="billing__tier__text">
            Reach out, we are open to new enterprise opportunities
          </p>
        </div>
        <hp-button
          href="https://meetings-eu1.hubspot.com/neea"
          target="_blank"
          fullWidth
          primary
          label="Setup a meeting"
        ></hp-button>
        <ul class="billing__tier__features">
          <li class="billing__tier__feature">Unlimited openings</li>
          <li class="billing__tier__feature">Unlimited interviews</li>
          <li class="billing__tier__feature">Unlimited candidates</li>
          <li class="billing__tier__feature">Unlimited interviewers</li>
          <li class="billing__tier__feature">
            Ready to use interview templates
          </li>
          <li class="billing__tier__feature">In depth candidate comparison</li>
          <li class="billing__tier__feature">Single sign on (SSO)</li>
          <li class="billing__tier__feature">Help Center / Knowledge base</li>
          <li class="billing__tier__feature">Panel interviewing</li>
          <li class="billing__tier__feature">
            Organization / Multi-user platform
          </li>
          <li class="billing__tier__feature">Integrations</li>
          <li class="billing__tier__feature">
            Dedicated Customer Support / CSM
          </li>
        </ul>
      </li>
    </ol>
  </div>
</template>

<script setup>
// Vendor
import { ref } from "vue";

// Components
import HpButton from "@/components/hp-button.vue";
import HpBadge from "@/components/hp-badge.vue";
import HpTabs from "@/components/hp-tabs.vue";
import HpIcon from "@/components/hp-icon.vue";

// Composables
import useToast from "@/composables/useToast";

const billingPeriod = ref("yearly");

const dictionary = {
  yearly: {
    billing: "per month, billed annually",
    startup: { price: 21 },
    growth: { price: 416 },
  },
  monthly: {
    billing: "per month, billed monthly",
    startup: { price: 25 },
    growth: { price: 499 },
  },
};
</script>

<styles lang="scss">
.billing {
  @include pageContainer;
  &__title {
    @include text-h1;
    margin-bottom: 12px;
  }
  &__header {
    display: flex;
    flex-direction: column;
    &__number {
      font-weight: bold;
    }
    &__openings {
      @include text-h3;
    }
    &__plan {
      display: flex;
      align-items: center;
      gap: 6px;
      @include text-h2;
      margin-bottom: 12px;
    }
    &__toggle {
      margin-top: 12px;
    }
  }
  &__grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 18px;
    margin-bottom: 64px;
  }
  &__tier {
    display: flex;
    flex-direction: column;
    margin-top: 24px;
    border-radius: $border-radius-md;
    border: $border;
    padding: 12px;
    &__title {
      @include text-h1;
    }
    &__description {
      @include text-h5;
      color: var(--color-text-secondary);
      margin-bottom: 12px;
    }
    &__price {
      font-weight: 600;
      font-size: 48px;
      margin-bottom: 12px;
      &--enterprise {
        display: flex;
        min-height: 56px;
        align-items: center;
        justify-content: center;
        gap: 12px;
        margin-bottom: 12px;
      }
    }
    &__text {
      font-size: 14px;
      font-weight: 400;
    }
    &__features {
      padding-top: 24px;
    }
    &__feature {
      text-align: left;
      background: url("@/assets/icons/check-circle.svg") no-repeat 0 0px;
      padding-left: 28px;
      padding-right: 28px;
      background-size: 18px;
      margin-bottom: 12px;
      font-size: 14px;
      padding-bottom: 4px;
    }
  }
}
</styles>
