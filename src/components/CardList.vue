<template>
  <div class="card-list">
    <div
      class="card-list__title"
      v-for="(card, index) in cards"
      :key="index"
      @click="$emit('card-selected', index)"
      :class="['card', { 'card--active': selectedCard === index }]"
    >
      <div class="card-list__title-text">
        {{ card.title }}
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  cards: Array,
  selectedCard: Number
})
</script>
