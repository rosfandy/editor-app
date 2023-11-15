<template>
    <div class="">
        <img src="/socialmedia.png"
            class="absolute object-cover object-center w-[70%] left-0 right-0 bottom-0 top-0 m-auto -z-10 md:block hidden"
            alt="">
        <p class="font-title text-center text-[#FC881D] text-base md:text-2xl">PARTY ROOM IO</p>
        <p id="title"
            class="font-title  text-white text-center mx-auto mt-2 md:mt-5 text-3xl md:text-5xl md:w-[680px] lg:text-7xl font-extrabold lg:w-[60%] px-3 md:px-0">
            Real Time Collaboration App Tools</p>
        <p
            class="text-center font-title font-normal text-white lg:max-w-[60%] mx-auto my-10 text-base md:text-lg px-4 md:px-0">
            Experience the future of collaboration with our cutting-edge web tools designed for real-time connectivity.
            Transforming the way you work together online.</p>

        <div class="flex md:flex-row flex-col items-center justify-center">
            <router-link to="/editor">
                <button
                    class="py-5 px-12 w-max text-white font-dmsans rounded-full bg-[#0F1217] shadow-xl border-white transition-all">Getting
                    Started</button>
            </router-link>

        </div>
    </div>
</template>

<script>
export default {

}
</script>
<style>
@import url('https://fonts.googleapis.com/css2?family=Khula:wght@300;400;600;700;800&display=swap');


.font-title {
    font-family: 'Khula', sans-serif;

}
</style>