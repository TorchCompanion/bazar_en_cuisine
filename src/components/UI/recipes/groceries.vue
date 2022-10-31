<template>
    <div class="groceries">
        <h3 class="d-flex align-items-center justify-content-center">Here's what you need</h3>
        <div class="container-fluid w-100 mt-8">
            <div class="w-100">
                <div v-for=" ingredient in savedIngredients"
                     :class="['grocery-item btn btn-primary d-flex my-2 w-100',{'item-ok':isBought(ingredient)}]"
                     @click="elementClicked(ingredient)"
                     :key="ingredient.id">
                    <div class="groceries-selector px-2">
                        <input type="checkbox"
                               id="checkbox"
                               @click.prevent
                               :checked="isBought(ingredient)">
                        <label for="checkbox"></label>
                    </div>
                    <div class="groceries-content flex-grow-1">
                        <span>
                            {{ ingredient.name }}
                        </span>
                        <ul>
                            <li v-for="(disp, index) in ingredient.display"
                                :key="index">
                                {{ humanQuantity(disp.quantity) }} {{ disp.label }}
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    name: "groceries",
    props: {},
    data() {
        return {
            d: null,
            unit: undefined,
            quantity: undefined,
            active: false,
        }
    },
    watch: {},
    computed: {
        savedIngredients() {
            return this.$store.getters.getAllIngredients;
        },
        boughtIngredients() {
            return this.$store.getters.getBoughtIngredients;
        },
    },
    created() {

    },
    mounted() {

    },
    methods: {
        elementClicked(el) {
            if (this.isBought(el)) {
                this.$store.commit('remove_bought_ingredient', el.id);
            } else {
                this.$store.commit('add_bought_ingredient', el.id);
            }
        },

        isBought(ingredient) {
            if (ingredient !== undefined && ingredient.id !== undefined) {
                return (this.boughtIngredients.indexOf(ingredient.id) !== -1);
            }
            return false
        },

        humanQuantity(input) {
            return Math.ceil(input)
        },
    },
    components: {},
    beforeUnmount() {
    }
}

</script>

<style scoped>

</style>