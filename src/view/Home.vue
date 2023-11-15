<!-- eslint-disable  -->
<template>
    <div class="h-screen background">
        <NavComponent />
        <div class="lg:mt-24 mt-12">
            <HeaderComponent />
        </div>
    </div>
</template>
<!-- eslint-disable  -->

<script>
import HeaderComponent from '@/components/HeaderComponent.vue';
import NavComponent from '@/components/NavComponent.vue'
export default {
    components: {
        NavComponent,
        HeaderComponent
    }
}
</script>

<style>
.background {
    background-image: url("https://wallpapercave.com/wp/wp3354887.jpg   ");
    @apply h-screen bg-cover
}
</style>