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
        padding: 12px 20px;

        .v-button {
            margin: 6px 10px;
        }
    }
</style>

<template>
    <div class="home-page">
        <div>
            <h1 data-test-welcome>Welcome to your new Vuetober theme!</h1>
            <h2>It's time to build something amazing...</h2>
            <nav>
                <v-button :to="{ name: 'videos' }">Videos</v-button>
                <v-button href="https://github.com/scottbedard/oc-vuetober-theme">GitHub</v-button>
            </nav>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    created() {
        this.fetchStarCount();
    },
    data() {
        return {
            stars: 0,
        };
    },
    methods: {
        fetchStarCount() {
            // just for demonstration purposes we're going to make an xhr
            // request to get vuetober's star count. in our unit tests for
            // the home page, we'll mock the response object. in real apps,
            // it is recommended you make this request from a vuex action.
            axios.get('https://api.github.com/repos/scottbedard/oc-vuetober-theme').then((response) => {
                this.stars = response.data.stargazers_count;
            });
        },
    },
};
</script>
