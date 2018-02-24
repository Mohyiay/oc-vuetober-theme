<!-- global styles -->
<style lang="scss" src="../scss/global.scss"></style>

<!-- tailwind -->
<style lang="scss">@tailwind preflight</style>
<style lang="scss" src="../scss/tailwind/tailwind.scss"></style>
<style lang="scss">@tailwind utilities</style>


<template>
    <div id="app" class="h-full bg-grey-lighter flex items-center justify-center">
        <v-slide-transition>
            <router-view />
        </v-slide-transition>
    </div>
</template>

