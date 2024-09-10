<template>
    <Datepicker :max-date="new Date()" v-model="dates" dark :enable-time-picker="true" format="dd/MM/yyyy HH:mm">
        <template #input-icon>
            <div class="flex flex-row items-center h-full">
                <icon class="pl-16 text-base-content" name="formkit:datetime"></icon>
            </div>
        </template>
        <template #clear-icon="{ clear }">
            <button class="mx-2 btn btn-sm btn-ghost btn-circle">
                <icon @click="clear" name="material-symbols:close-rounded"></icon>
            </button>
        </template>
    </Datepicker>
</template>

<script lang="ts" setup>
import Datepicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
const dates = defineModel<Date>({});
</script>

<style lang="css">
:root {
    --dp-preview-font-size: 1rem;
}

.dp__input_wrap {
    border-color: var(--fallback-bc, oklch(var(--bc) / 0.2));
    border-radius: var(--rounded-btn, 0.5rem);
    @apply h-[3rem] border-[1px] !important;
}
.dp__input {
    background: var(--fallback-b1, oklch(var(--b1) / var(--tw-bg-opacity)));
    @apply border-none outline-none h-full w-full;
}
.dp__btn {
    @apply rounded-lg !important;
}
.dp__btn.dp__inc_dec_button {
    @apply z-[1000]  hover:text-primary-content !important;
}
.dp__arrow_top {
    display: none;
}

.dp__input_focus {
    box-shadow: none;
    border-color: var(--fallback-bc, oklch(var(--bc) / 0.2));
    outline-style: solid;
    outline-width: 2px;
    outline-offset: 3px;
    outline-color: var(--fallback-bc, oklch(var(--bc) / 0.2));
}
.dp--tp-wrap {
    @apply w-full max-w-full overflow-hidden rounded-lg !important;
}
.dp--future {
    @apply opacity-50 !important;
}
.dp__theme_dark {
    --dp-background-color: theme("colors.base-300");
    --dp-text-color: theme("colors.base-content");
    --dp-hover-color: theme("colors.primary");
    --dp-hover-text-color: theme("colors.primary-content");
    --dp-hover-icon-color: theme("colors.primary-content");
    --dp-icon-color: theme("colors.base-content");
    --dp-primary-color: theme("colors.primary");
    --dp-primary-text-color: theme("colors.base-content");
    --dp-disabled-color: theme("colors.neutral");
    --dp-disabled-color-text: var(--fallback-bc, oklch(var(--bc) / 0.2));
    --dp-border-color: transparent;
    --dp-menu-border-color: theme("colors.base-100");
    --dp-border-color-hover: transparent;
    --dp-scroll-bar-background: theme("colors.base-200");
    --dp-success-color: theme("colors.success");
    --dp-danger-color: theme("colors.error");
    --dp-marker-color: theme("colors.error");
    --dp-highlight-color: theme("colors.primary");
    --dp-range-between-dates-background-color: var(--dp-hover-color);
    --dp-range-between-dates-text-color: var(--dp-hover-text-color);
    --dp-range-between-border-color: var(--dp-hover-color);
    --dp-border-radius: var(--rounded-btn, 0.5rem);
    --dp-cell-padding: 4px;
    --dp-action-buttons-padding: 16px 16px;
    --dp-font-family: inherit;
    --dp-button-height: 64px;
    --dp-cell-size: 40px;
    --dp-input-icon-padding: 3.5rem;
}
</style>
