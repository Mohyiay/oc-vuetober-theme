<style lang="scss" scoped>
    .home-page {
        align-items: center;
        display: flex;
        height: 100%;
        justify-content: center;
        text-align: center;
    }

    nav {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        margin: -6px -10px;

        .v-button {
            margin: 6px 10px;
        }
    }
</style>

<template>
    <div class="home-page">
        <div>
            <h1>Welcome to your new Vuetober theme!</h1>
            <h2>It's time to build something amazing...</h2>
            <nav>
                <v-button :to="{ name: 'videos' }">Videos</v-button>
                <v-button  href="https://github.com/scottbedard/oc-vuetober-theme">GitHub</v-button>
            </nav>
        </div>
    </div>
</template>
