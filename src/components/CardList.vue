<template>
  <div class="card-list">
    <div
      v-for="(card, index) in cards"
      :key="index"
      @click="$emit('card-selected', index)"
      :class="['card', { 'card--active': selectedCard === index }]"
    >
      {{ card.title }}
    </div>
  </div>
</template>

<script setup>
import { ref, watchEffect } from 'vue'
defineProps({
  cards: Array,
  selectedCard: Number
})
</script>
