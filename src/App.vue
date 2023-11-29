<template>
  <div class="container">
    <router-view />
  </div>
</template>

<style scoped lang="scss">
.container {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;

  &:after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: -1;
    background-image: linear-gradient(
      to right top,
      #409eff,
      #00b3fd,
      #00c0d1,
      #00c58a,
      #67c23a
    );
    opacity: 0.3;
  }
}
</style>
