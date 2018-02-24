<template functional>
    <transition
        enter-active-class="transition"
        enter-class="opacity-0 tx-4"
        enter-to-class="opacity-100 tx-0"
        leave-active-class="transition"
        leave-class="opacity-100 tx-0"
        leave-to-class="opacity-0 -tx-4"
        mode="out-in">
        <slot />
    </transition>
</template>
