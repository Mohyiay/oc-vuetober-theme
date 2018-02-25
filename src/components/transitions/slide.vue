<style lang="scss" scoped>
    .v-slide-enter-active,
    .v-slide-leave-active {
        transition: all 150ms ease;
    }

    .v-slide-enter {
        opacity: 0;
        transform: translateX(2rem);
    }

    .v-slide-enter-to,
    .v-slide-leave {
        opacity: 1;
        transform: translateX(0);
    }

    .v-slide-leave-to {
        opacity: 0;
        transform: translateX(-2rem);
    }
</style>

<template>
  <transition name="v-slide" mode="out-in">
    <slot />
  </transition>
</template>
