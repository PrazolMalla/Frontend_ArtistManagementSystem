<template>
    <div class="w-full flex justify-center items-center mt-5 gap-2 ">

        <v-icon @click="prevPage" :disabled="currentPage === 1" name="fa-chevron-left" scale="1.5"
            class="cursor-pointer hover:fill-secondary-color text-sm p-2 fill-light-primary-color rounded-l-full border bg-secondary-color hover:bg-light-primary-color hover:border-secondary-color" />
        <span class="text-sm text-primary-text-color font-semibold">Page {{ currentPage }} of {{ totalPages }}</span>
        <v-icon @click="nextPage" :disabled="currentPage === 1" name="fa-chevron-right" scale="1.5"
            class="cursor-pointer hover:fill-secondary-color text-sm p-2 fill-light-primary-color rounded-r-full border bg-secondary-color hover:bg-light-primary-color hover:border-secondary-color" />

    </div>
</template>

<script>
export default {
    props: {
        totalItems: {
            type: Number,
            required: true
        },
    },
    data() {
        return {
            currentPage: 1
        };
    },
    computed: {
        totalPages() {
            return Math.ceil(this.totalItems / 10);
        }
    },
    methods: {
        nextPage() {
            if (this.currentPage < this.totalPages) {
                this.currentPage++;
                this.$emit('action', this.currentPage);
            }
        },
        prevPage() {
            if (this.currentPage > 1) {
                this.currentPage--;
                this.$emit('action', this.currentPage);
            }
        }
    }
};
</script>
