<template>
    <div class="hello">
        <h1 id="h1cool">AAAAAAAAAAH CHEH 🦆 🤡</h1>
        <h2>{{ message }}</h2>
        <div v-if="user !== undefined" class="w-100">
            <p>
                Salut {{ user.name }} !
                <a href="https://cli.vuejs.org" rel="noopener" target="_blank">vue-cli documentation</a>.
            </p>
        </div>
        <div v-else class="w-100">
            <p>Aucun utilisateur chargé</p>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'HelloWorld',
        props: {
            msg: String,
            user: Object,
        },
        // =========================================
        data() {
            return {
                d: null,
                message: '',
                h1coolElement: null,
            }
        },
        created() {
            this.updateTime();
            setInterval(() => {
                this.updateTime();
            }, 1000);
        },
        mounted() {
            this.h1coolElement = document.querySelector('#h1cool');
        },
        methods: {
            updateTime() {
                this.d = new Date();
                this.message = this.msg + ' ' + this.d;
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    h3 {
        margin: 40px 0 0;
    }

    ul {
        list-style-type: none;
        padding: 0;
    }

    li {
        display: inline-block;
        margin: 0 10px;
    }

    a {
        color: #42b983;
    }
</style>
