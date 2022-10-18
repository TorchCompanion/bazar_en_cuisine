<template>
    <div class="recipe-overlay">
        <div class="back-btn-container">
            <button class="btn"
                    @click.prevent="closeRecipe">🔙
            </button>
        </div>

        <div class="w-100 position-relative">
            <div class="img_wrapper">
                <img :src="getCoverImage(recipe)"
                     alt="recipe illustration"
                     class="cover">
            </div>
        </div>

        <div class="w-100 recipe-content px-4 py-4">
            <div class="content__inner text-center">
                <h2 class="mb-0">{{ recipe.content.details.name }}</h2>
                <span class="subtitle text-muted">by {{ recipe.display.source.sourceDisplayName }}</span>
                <div class="rating mt-4 d-flex justify-content-center">
                    <div class="rating-inner">40 min.</div>
                    <div class="rating-inner">⭐ {{ recipe.content.details.rating }}</div>
                </div>

                <div class="card mt-3 mb-3">
                    <div class="content-text_wrapper mt-2">
                        <div class="w-100"
                             v-html="toHTML(recipe.content.description.text)"></div>
                    </div>
                </div>


                <div class="tab-container">
                    <div class="tab__header d-flex justify-content-around">
                        <div :class="['tab__item', {'active__tab':tabIndex == 0}]"
                             @click.prevent="tabIndex = 0">
                            Ingredients
                        </div>
                        <div :class="['tab__item', {'active__tab':tabIndex == 1}]"
                             @click.prevent="tabIndex = 1">
                            Instructions
                        </div>
                        <div :class="['tab__item', {'active__tab' :tabIndex == 2}]"
                             @click.prevent="tabIndex = 2">
                            Reviews (150)
                        </div>
                    </div>

                    <div class="tab__content">
                        <div v-if="tabIndex == 0" class="tab__container tab0">
                            some content 0
                        </div>
                        <div v-else-if="tabIndex == 1" class="tab__container tab1">
                            <ul v-if="recipe.content.preparationSteps !== undefined"
                                class="">
                                <li v-for="(instruction, index) in recipe.content.preparationSteps"
                                    :key="index">
                                    {{ instruction }}
                                </li>
                            </ul>
                        </div>
                        <div v-else-if="tabIndex == 2" class="tab__container tab2">
                            some content 2
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {marked} from 'marked';

    export default {
        name: "recipe-overlay",
        props: {
            recipe: {
                type: Object,
                required: true
            }
        },
        data() {
            return {
                d: null,
                tabIndex: 0,
            }
        },
        watch: {},
        computed: {},
        created() {

        },
        mounted() {

        },
        methods: {
            toHTML(mkdwn) {
                return marked.parse(mkdwn);
            },
            getCoverImage(recipe) {
                let img = recipe.content?.details?.images[0]?.resizableImageUrl;
                if (img === undefined || img === null) {
                    return 'https://via.placeholder.com/350x150';
                }
                return img;
            },
            closeRecipe() {
                this.$emit('close-recipe');
            }
        },
        components: {},
        beforeUnmount() {
        }
    }
</script>

<style scoped>

</style>