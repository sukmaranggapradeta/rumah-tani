<template>
    <div class="container">
        <div class="row">
          <video
          controls loop
          autoplay 
          src="../../public/dashboardLandingPage.mp4"
          type="video/mp4"></video>
        </div>
    </div>
</template>

<script>
export default {
    name: 'dashboard-home',
}
</script>

<style scoped>
video {
    height: 75vh;
}
</style>