<script setup lang="ts">
const props = defineProps<{
    messages: string[];
}>();
const currentPlaceholder = computed(() => props.messages[messageIndex.value]);
const messageIndex = ref(0);
const isFocused = ref(false);
const inputEl = useTemplateRef("inputEl");

function cycleMessage() {
    messageIndex.value = (messageIndex.value + 1) % props.messages.length;
    setTimeout(cycleMessage, 4000);
}

onMounted(() => {
    setTimeout(cycleMessage, 4000);
});

function handleBlur() {
    isFocused.value = false;
}
function handleFocus() {
    isFocused.value = true;
}
</script>

<template>
    <u-input ref="inputEl" v-bind="$attrs" :ui="{ base: 'group ' }" @focus="handleFocus" @blur="handleBlur">
        <template #default>
            <div v-if="!isFocused && !inputEl?.inputRef?.value" class="absolute inset-0 typ-label flex items-center px-2 pointer-events-none">
                <Typewriter :text="currentPlaceholder!" :typing-speed="40"></Typewriter>
            </div>
        </template>
    </u-input>
</template>

<style scoped lang="css"></style>
