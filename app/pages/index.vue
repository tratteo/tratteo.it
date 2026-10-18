<template>
    <div class="landing ds-page">
        <LandingHeroSection />
        <LandingMarqueeStrip />
        <LandingServicesSection />
        <LandingWorkSection />
        <LandingAboutSection />
        <LandingInterestsSection />
        <LandingModsSection />
        <LandingContactSection />
    </div>
</template>

<script lang="ts" setup>
useSeoMeta({
    title: "Matteo Beltrame · Problems in, products out",
    description:
        "CTO at Hybrida, founder of Reviy. I design, build and ship software: AI platforms, web apps and embedded systems. And I help brands get found on Google and on AI search. Tell me what's stuck.",
    ogTitle: "Matteo Beltrame · Problems in, products out",
    ogDescription: "CTO at Hybrida, founder of Reviy. I build software that ships, and I'll help you get found on Google and AI search.",
});

defineOgImage("Default.takumi", { avatarUrl: "/web-app-manifest-512x512.png" });
</script>
