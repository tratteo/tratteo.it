<template>
    <div
        class="fixed bottom-[1rem] lg:bottom-[8rem] w-full flex flex-row justify-center lg:justify-end pointer-events-none z-[1000]"
    >
        <div class="lg:px-8">
            <TransitionGroup name="list" tag="ul" class="flex flex-col gap-4">
                <li
                    v-for="(t, i) in toast.toasts"
                    class="alert gap-2"
                    :key="t.id"
                    :class="{
                        'alert-error': t.type === ToastType.error,
                        'alert-info': t.type === ToastType.info,
                        'alert-warning': t.type === ToastType.warning,
                        'alert-success': t.type === ToastType.success,
                    }"
                >
                    <icon class="size-6" :name="iconName(t)"></icon>
                    <span>{{ t.message }}</span>
                </li>
            </TransitionGroup>
        </div>
    </div>
</template>

<script lang="ts" setup>
const toast = useToast();

function iconName(toast: ToastData) {
    switch (toast.type) {
        case ToastType.error:
            return "charm:circle-cross";
        case ToastType.warning:
            return "ic:round-warning";
        case ToastType.info:
            return "mdi:information-outline";
        case ToastType.success:
            return "material-symbols:check-circle-outline-rounded";
    }
}
</script>

<style lang="css" scoped>
.list-enter-active,
.list-leave-active {
    transition: all 0.5s ease;
}
.list-enter-from,
.list-leave-to {
    opacity: 0;
    transform: translateX(50px);
}
</style>
