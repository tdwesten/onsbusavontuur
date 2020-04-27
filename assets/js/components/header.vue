<template>
    <header class="header">
        <div class="header__inner">
            <router-link to="/" class="header__brand">{{website.name}}</router-link>
            <span class="header__underline">{{website.underline}}</span>
            <a href="https://www.instagram.com/onsbusavontuur" class="header__instagram hidden-mobile hidden-tablet" target="_blank">Volg ons op Instagram</a>
        </div>
    </header>
</template>

<script>
    export default {
        data() {
            return {
                website: {
                    name: "Ons Bus Avontuur",
                    underline: "Een overzicht van onze slaapplekjes, tips en route door europa."
                },
            };
        },
    };
</script>
