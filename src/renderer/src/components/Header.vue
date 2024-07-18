<template>
  <header
    class="header"
    :class="{ headerTrack: useApiTrack24, headerGdyposylka: !useApiTrack24 }"
  >
    <nav class="navbar">
      <div class="container">
        <span class="brand">gdeposylka.ru/api.v4</span>

        <label class="switch">
          <input type="checkbox" v-model="useApiTrack24" @change="toggleApi" />
          <span class="slider round"></span>
        </label>
        <span class="brand">api.track24.ru</span>
        <!--  и gdeposylka.ru/tracking-api.v4 -->
      </div>
    </nav>
  </header>
</template>

<script setup>
import { ref } from "vue";
const emits = defineEmits(["useApiTrack24"]);
const useApiTrack24 = ref(true);

const toggleApi = () => {
  console.log(useApiTrack24.value);
  emits("useApiTrack24", useApiTrack24.value);
};
</script>

<style scoped>
.header {
  /* background: linear-gradient(to right, #3498db, #2c3e50); */
  /* background: linear-gradient(to right, var(--track24color), var(--gdeposylkacolor)); */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.headerTrack {
  background: linear-gradient(to right, var(--track24color), var(--gdeposylkacolor));
  /* transition: 0.4s; */
}

.headerGdyposylka {
  background: linear-gradient(to right, var(--gdeposylkacolor), var(--track24color));
  /* transition: 0.4s; */
}

.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

.brand {
  font-size: 1.2rem;
  font-weight: bold;
  color: #ffffff;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.switch {
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
}

.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: var(--gdeposylkacolor);
  transition: 0.4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 26px;
  width: 26px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  transition: 0.4s;
}

input:checked + .slider {
  background-color: var(--track24color);
}

input:focus + .slider {
  box-shadow: 0 0 1px var(--track24color);
}

input:checked + .slider:before {
  transform: translateX(26px);
}

.slider.round {
  border-radius: 34px;
}

.slider.round:before {
  border-radius: 50%;
}
</style>
