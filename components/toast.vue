<template>
    <li
        class="relative alert gap-2 flex flex-row text-start items-center justify-start overflow-clip border-none"
        :key="toastData.id"
        :class="{
            'alert-error': toastData.data.type === 'error',
            'alert-info': toastData.data.type === 'info',
            'alert-warning': toastData.data.type === 'warning',
            'alert-success': toastData.data.type === 'success',
        }"
    >
        <icon class="size-6" :name="iconName(toastData.data)"></icon>
        <span v-html="toastData.data.message" class="text-sm flex-1"></span>
        <button v-if="toastData.data.dismissible || true" class="btn btn-sm btn-circle btn-ghost right-2 top-2 ml-4" @click="toasts.dismiss(toastData.id)">
            <icon name="material-symbols:close-rounded"></icon>
        </button>
        <div
            class="absolute bottom-0 left-0 w-[var(--w)] right-0 bg-base-100/60 h-[0.3rem] origin-left ease-linear z-[10000]"
            :style="{ 'transition-duration': toastData.data.duration! + 'ms', '--w': width }"
        ></div>
    </li>
</template>

<script lang="ts" setup>
const toasts = useToast();
const prop = defineProps<{ toastData: WithId<ToastData> }>();

const width = ref("100%");
onMounted(() => {
    nextTick(() => {
        setTimeout(() => {
            width.value = "0%";
        }, 10);
    });
});

function iconName(toast: ToastData) {
    switch (toast.type) {
        case "error":
            return "ph:minus-circle-fill";
        case "warning":
            return "ic:round-warning";
        case "info":
            return "material-symbols:info-rounded";
        case "success":
            return "material-symbols:check-circle-rounded";
    }
}
</script>

<style lang="css" scoped></style>
