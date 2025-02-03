<template>
    <div v-if="mounted" role="alert" class="alert-class" :style="getStyle">
        <icon :name="getIconName" class="text-[var(--c)]"></icon>
        <div class="flex-1 flex flex-col items-stretch">
            <slot></slot>
        </div>
    </div>
</template>

<script lang="ts" setup>
export type AlertType = "warning" | "info" | "error" | "success";
const props = withDefaults(defineProps<{ type?: AlertType; outlined?: boolean }>(), { type: "info" });
const mounted = useMounted();
const getIconName = computed(() => {
    switch (props.type) {
        case "error":
            return "ph:minus-circle-fill";
        case "warning":
            return "material-symbols:warning-rounded";
        case "info":
            return "material-symbols:info-rounded";
        case "success":
            return "material-symbols:check-circle-rounded";
    }
});

const getStyle = computed(() => {
    switch (props.type) {
        case "error":
            var c = daisyUiColorHex("--er");
            var cContent = daisyUiColorHex("--erc");
            return {
                "--c": props.outlined ? c : cContent,
                "border-color": c,
                "border-width": "1px",
                "background-color": props.outlined ? daisyUiColorRgba("--er", 0.05) : c,
                color: props.outlined ? daisyUiColorHex("--bc") : cContent,
            };
        case "warning":
            var c = daisyUiColorHex("--wa");
            var cContent = daisyUiColorHex("--wac");
            return {
                "--c": props.outlined ? c : cContent,
                "border-color": c,
                "border-width": "1px",
                "background-color": props.outlined ? daisyUiColorRgba("--wa", 0.05) : c,
                color: props.outlined ? daisyUiColorHex("--bc") : cContent,
            };
        case "info":
            var c = daisyUiColorHex("--in");
            var cContent = daisyUiColorHex("--inc");
            return {
                "--c": props.outlined ? c : cContent,
                "border-color": c,
                "border-width": "1px",
                "background-color": props.outlined ? daisyUiColorRgba("--in", 0.05) : c,
                color: props.outlined ? daisyUiColorHex("--bc") : cContent,
            };
        case "success":
            var c = daisyUiColorHex("--su");
            var cContent = daisyUiColorHex("--suc");
            return {
                "--c": props.outlined ? c : cContent,
                "border-color": c,
                "border-width": "1px",
                "background-color": props.outlined ? daisyUiColorRgba("--su", 0.05) : c,
                color: props.outlined ? daisyUiColorHex("--bc") : cContent,
            };
    }
});
</script>

<style lang="css">
.alert-class {
    @apply flex flex-col md:flex-row items-center rounded-box p-4 gap-2 md:gap-4;
}
</style>
