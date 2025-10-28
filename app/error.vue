<template>
    <u-app>
        <u-header mode="slideover">
            <template #left>
                <u-user name="Matteo Beltrame" to="/" :avatar="{ src: '/favicon.svg' }"></u-user>
            </template>
        </u-header>
        <u-main class="px-4">
            <u-container>
                <u-error
                    :error="{
                        statusCode: error?.statusCode,
                        statusMessage: error?.statusMessage,
                        message: error?.message,
                    }"
                />
            </u-container>
        </u-main>
        <Footer></Footer>
    </u-app>
</template>

<script lang="ts" setup>
const error = useError();

useSeoMeta({
    title: error.value?.statusCode.toString(),
    description: error.value?.statusMessage,
});

function backHome() {
    clearError({ redirect: "/" });
}
</script>

<style lang="css"></style>
