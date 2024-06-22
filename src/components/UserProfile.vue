<script setup lang="ts"></script>

<template>
  <div>
    <div class="user-container">
      <div>
        <img src="../assets/logo.svg" alt="logo" />
      </div>
      <div class="user-description">
        <slot name="username"></slot>
        <div class="time">
          <slot name="time"></slot>
          <slot name="karma"></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.user-container {
  display: flex;
  align-items: center;
  padding: 0.5rem;
}
.user-description {
  margin-left: 20px;
}
.time {
  font-size: 0.7rem;
}
</style>
