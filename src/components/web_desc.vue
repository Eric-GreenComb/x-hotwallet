<template>
    <div class="container" :style="'min-height:'+minHeight"></div>
</template>

<script>
    export default {
        data() {
            return {
                minHeight: '',
            }
        },
        created() {
            this.$dialog.loading.close();
            this.minHeight = localStorage.getItem('minHeight');


        },
        mounted() {


        },
        methods: {}
    }
</script>
<style scoped="true">

</style>
