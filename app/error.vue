<template>
    <NuxtLayout name="default">
        <div v-if="error" class="flex flex-col items-center justify-start self-center w-screen">
            <div class="max-w-2xl px-4 py-16 flex flex-col items-stretch gap-4">
                <div class="flex items-start gap-2 typ-subtitle">
                    <p>😵</p>
                    <p>Ops, sembra che ci siamo persi nel labirinto digitale.</p>
                </div>
                <div v-if="error.statusCode === 404" class="flex flex-col items-start gap-4">
                    <div>
                        <p>Prova a cercare qualcos'altro oppure potresti usare una mappa e una bussola?</p>
                        <p class="opacity-60">{{ error.statusMessage }}</p>
                    </div>
                </div>
                <div v-else>
                    <p>Uno strano errore.</p>
                    <h3>Per favore prova di nuovo, o prenditela con la luna che si trova nella fase sbagliata.</h3>
                    <p class="opacity-60">{{ error.statusMessage }}</p>
                </div>
                <u-button @click="backHome" variant="link" label="Vai alla pagina principale" class="w-fit"> </u-button>
            </div>
        </div>
    </NuxtLayout>
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
