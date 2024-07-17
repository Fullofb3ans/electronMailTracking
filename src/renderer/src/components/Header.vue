<template>
  <header class="header">
    <nav class="navbar">
      <div class="container">
        <span class="brand">Основано на api.track24.ru</span>
      </div>
    </nav>
  </header>
</template>

<script setup></script>

<style scoped>
.header {
  background: linear-gradient(to right, #3498db, #2c3e50);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
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
</style>
