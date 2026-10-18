<template>
    <nuxt-layout>
        <nuxt-page></nuxt-page>
    </nuxt-layout>
</template>

<script lang="ts" setup>
/* Site-wide default social card. Pages override the copy via props. */
defineOgImage("Default.takumi");
</script>
