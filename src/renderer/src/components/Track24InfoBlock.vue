<template>
  <div class="track-info-card">
    <h2 class="track-code">
      Трек-код:
      <span class="track24highlight">{{ props.trackInfo.trackCode }}</span>
    </h2>
    <div class="info-grid">
      <div class="info-item">
        <p>
          Отправлено из: <strong>{{ props.trackInfo.fromCity }}</strong>
        </p>
      </div>
      <div class="info-item">
        <p>
          Пункт назначения: <strong>{{ props.trackInfo.destinationCity }}</strong>
        </p>
      </div>
      <div class="info-item">
        <p>
          Адрес: <strong>{{ props.trackInfo.destinationAddress }}</strong>
        </p>
      </div>
      <div class="info-item">
        <p>
          Доставка: <strong>{{ props.trackInfo.destinationCompany }}</strong>
        </p>
      </div>
      <div class="info-item">
        <p>
          Заказ оформлен: <strong>{{ props.trackInfo.fromName }}</strong>
        </p>
      </div>
      <div class="info-item">
        <p>
          Вес: <strong>{{ props.trackInfo.itemWeight }}</strong>
        </p>
      </div>
      <div class="info-item">
        <p>
          В пути: <strong>{{ props.trackInfo.daysInTransit }} дней</strong>
        </p>
      </div>
    </div>
    <hr />
    <div class="info-item status-item">
      <p>Статусы:</p>
      <ul class="status-list">
        <li
          v-for="(item, index) in props.trackInfo.events"
          :key="index"
          class="status-entry"
        >
          <div class="statusIndex">{{ ++index }}</div>
          <p><b>Дата:</b> {{ item.eventDateTime }}</p>
          <p><b>Событие:</b> {{ item.operationAttribute }}</p>
          <p><b>Описание:</b> {{ item.operationAttributeInformation }}</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
const props = defineProps(["trackInfo"]);
console.log(props);
</script>

<style scoped>
.statusIndex {
  position: absolute;
  right: 20px;
  top: 20px;
}
.track-info-card {
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 20px;
  max-width: 700px;
  margin: 0 auto;
}

.track-code {
  font-size: 1.5rem;
  color: #333;
  margin-bottom: 20px;
  border-bottom: 2px solid #f0f0f0;
  padding-bottom: 10px;
}

.track-code span {
  font-weight: bold;
}

.track24highlight {
  color: var(--track24color);
}

.info-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 15px;
}

.info-item {
  display: flex;
  align-items: center;
}

.info-item p {
  margin: 0;
  font-size: 1rem;
}

.info-item strong {
  color: #333;
}

.status-item {
  padding-top: 5px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.status-list {
  list-style-type: none;
  padding: 10px;
}

.status-entry {
  position: relative;

  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08);

  border-radius: 4px;
  padding: 10px;
  margin-bottom: 10px;
}

.status-entry p {
  margin: 5px 0;
  padding: 5px;
}
</style>
