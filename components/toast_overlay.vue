<template>
    <div class="fixed bottom-[2rem] w-full flex flex-row justify-center md:justify-end z-[1000]">
        <div class="md:px-8 px-4 max-w-[40rem]">
            <TransitionGroup name="list" tag="ul" class="flex flex-col gap-4">
                <Toast :key="t.id" v-for="(t, i) in toasts" :toast-data="t"></Toast>
            </TransitionGroup>
        </div>
    </div>
</template>

<script lang="ts" setup>
const { toasts } = toRefs(useToast());
</script>

<style lang="css">
.list-enter-active,
.list-leave-active {
    transition: all 0.25s ease-out;
}

.list-enter-from,
.list-leave-to {
    opacity: 0;
    @apply translate-y-[20px] lg:translate-x-[40px] lg:translate-y-0;
}
</style>
