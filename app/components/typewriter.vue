<template>
    <div v-if="mounted" class="typewriter-container">
        <transition name="fade" mode="out-in">
            <p :key="props.text">
                <span class="typewriter-text">{{ displayedText }}</span>
                <span class="typewriter-caret" :class="{ blink: isComplete }">|</span>
            </p>
        </transition>
    </div>
</template>

<script setup lang="ts">
const props = withDefaults(defineProps<{ text: string; typeByWord?: boolean; typingDelay?: number; startDelay?: number }>(), { typingDelay: 100, startDelay: 200 });
const mounted = useMounted();
const displayedText = ref("");
const isComplete = ref(false);
const isTyping = ref(false);
const currentIndex = ref(0);
var timeout: NodeJS.Timeout;

const textItems = computed(() => {
    if (props.typeByWord) {
        return props.text.split(" ");
    } else {
        return props.text.split("");
    }
});

function startTyping() {
    isTyping.value = true;
    displayedText.value = "";
    isComplete.value = false;
    currentIndex.value = 0;
    clearTimeout(timeout);

    const typeNextItem = () => {
        if (currentIndex.value < textItems.value.length) {
            if (props.typeByWord) {
                displayedText.value += (currentIndex.value === 0 ? "" : " ") + textItems.value[currentIndex.value];
            } else {
                displayedText.value += textItems.value[currentIndex.value];
            }

            currentIndex.value++;
            timeout = setTimeout(typeNextItem, props.typingDelay);
        } else {
            isTyping.value = false;
            isComplete.value = true;
        }
    };

    timeout = setTimeout(typeNextItem, props.startDelay);
}

onMounted(() => {
    startTyping();
});
watch(() => props.text, startTyping);
</script>

<style scoped lang="css">
@reference "~/assets/css/main.css";

.typewriter-container {
    @apply inline-block;
}

.typewriter-caret {
    @apply ml-0.5 text-current;
}

.typewriter-caret.blink {
    animation: blink 1s step-end infinite;
}

@keyframes blink {
    from,
    to {
        opacity: 1;
    }
    50% {
        opacity: 0;
    }
}
</style>
