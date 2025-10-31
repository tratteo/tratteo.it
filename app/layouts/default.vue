<template>
    <u-app>
        <u-header mode="slideover">
            <template #left>
                <u-user name="Matteo Beltrame" to="/" :avatar="{ src: '/favicon.svg' }"></u-user>
            </template>
            <template #right>
                <u-button color="neutral" variant="ghost" to="/articles" aria-label="Blog" class="group">
                    <AnimatedArrow>Go to blog</AnimatedArrow>
                </u-button>
            </template>
        </u-header>
        <u-main as="main">
            <u-container>
                <NuxtPage></NuxtPage>
            </u-container>
        </u-main>
        <Footer></Footer>
    </u-app>
</template>

<script lang="ts" setup></script>

<style></style>
