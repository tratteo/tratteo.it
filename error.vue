<template>
    <div v-if="error" class="flex flex-col items-center justify-start w-screen h-screen">
        <div class="max-w-[100rem] px-4 py-16">
            <h1>😵</h1>
            <div v-if="error.statusCode === 404" class="flex flex-col items-start gap-4">
                <div>
                    <h1>Lost at sea</h1>
                </div>
                <div>
                    <h3>
                        You seem to have strayed off the reef. Don't worry, we'll guide you back to the surface.<br />
                        In the meantime, why not explore our other aquatic adventures?
                    </h3>
                    <p class="opacity-60">{{ error.statusMessage }}</p>
                </div>
                <NuxtLink to="/">
                    <button class="btn btn-wide btn-primary">Return to known waters</button>
                </NuxtLink>
            </div>
            <div v-else>
                <h1>A bit of a snag</h1>
                <h3>We've encountered a bit of a snag. We're working on untangling the mess.</h3>
                <p class="opacity-60">{{ error.statusMessage }}</p>
                <p class="opacity-60">{{ error }}</p>
                <NuxtLink to="/">
                    <button class="btn btn-wide btn-primary">Back to home</button>
                </NuxtLink>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
const error = useError();

useSeoMeta({
    title: error.value?.statusCode.toString(),
    description: error.value?.statusMessage,
});
</script>

<style lang="css"></style>
