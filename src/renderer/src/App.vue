<script setup>
import Header from "./components/Header.vue";
import TrackInfoBlock from "./components/TrackInfoBlock.vue";
import { ref } from "vue";
const track = ref("");
const trackInfo = ref();
const errorMsg = ref();

const checkTrack = () => {
  trackInfo.value = 0;
  window.electron.ipcRenderer
    .invoke("checkTrack", track.value)
    .then((data) => {
      data.status == "error" ? (errorMsg.value = data) : (trackInfo.value = data.data);
    })
    .catch(console.error);
};
</script>

<template>
  <Header />
  <div class="page-content">
    <h1 class="page-title">Поиск посылок</h1>
    <div class="search-container">
      <input
        v-model="track"
        class="search-input"
        type="text"
        placeholder="Введите трек-номер"
      />
      <button @click="checkTrack" class="search-button">Проверить</button>
    </div>
    <div class="info-container">
      <TrackInfoBlock v-if="trackInfo" :trackInfo="trackInfo" />
      <div v-else-if="errorMsg" class="preview-info">
        <p>{{ errorMsg.message }}</p>
        <p>Лимит в минуту: {{ errorMsg.limits.minute }}</p>
        <p>Лимит в день: {{ errorMsg.limits.day }}</p>
        <p>Лимит в день: {{ errorMsg.limits.month }}</p>
      </div>
      <div v-else class="preview-info">
        <p>Здесь появится информация о посылке...</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.page-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  min-height: 100vh;
  background-color: #f5f7fa;
}

.page-title {
  font-size: 2.5rem;
  color: #2c3e50;
  margin-bottom: 2rem;
}

.search-container {
  display: flex;
  width: 100%;
  max-width: 600px;
  margin-bottom: 2rem;
}

.search-input {
  flex-grow: 1;
  padding: 0.75rem 1rem;
  font-size: 1rem;
  border: 2px solid #e0e0e0;
  border-radius: 8px 0 0 8px;
  transition: border-color 0.3s ease;
}

.search-input:focus {
  outline: none;
  border-color: #3498db;
}

.search-button {
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  color: #fff;
  background-color: #3498db;
  border: none;
  border-radius: 0 8px 8px 0;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.search-button:hover {
  background-color: #2980b9;
}

.info-container {
  width: 100%;
  max-width: 1200px;
  background-color: #3498dbc4;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 2rem;
  min-height: 250px;
}

.preview-info {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: #000000;
}

.preview-info p {
  font-size: 1.1rem;
}
</style>
