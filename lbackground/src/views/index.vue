<template>
  <div class="index">
    <HeadNew></HeadNew>
    <LeftNew></LeftNew>
     <!-- 路由匹配到的组件将显示在这里 -->
    <div class="right">
    <router-view></router-view>
    </div>
  </div>
</template>

<script>
import HeadNew from '../components/HeadNew'
import LeftNew from '../components/LeftNew'
export default {
  name: "index",
  components: {
    HeadNew,
    LeftNew
  }
};
</script>


<style>
.index{
  width:100%;
  height: 100%;
  overflow: hidden;
}
.right {
  position: relative;
  top: 0;
  left: 180px;
  width: calc(100% - 180px);
  height: calc(100% - 71px);
  overflow: auto;
}
</style>

