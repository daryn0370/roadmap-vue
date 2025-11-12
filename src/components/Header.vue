<template>
  <header class="header">
    <h1 class="header__title">KMG</h1>
    <div class="header-right" v-if="userEmail">
      <span class="user-email">{{ userEmail }}</span>
      <v-btn text @click="logout">Выйти</v-btn>
    </div>
  </header>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const userEmail = ref('')

onMounted(() => {
  const user = JSON.parse(localStorage.getItem('currentUser'))
  if (user) {
    userEmail.value = user.username
  }
})

function logout() {
  localStorage.removeItem('currentUser')
  router.push('/login')
}
</script>

<style scoped>
.header {
  display: flex;
  justify-content: center; /* центрируем заголовок */
  align-items: center;
  padding: 12px 24px;
  background-color: #0074B8;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  position: relative; /* для позиционирования блока справа */
}

.header__title {
  font-size: 24px;
  font-weight: bold;
  text-align: center;
}

.header-right {
  display: flex;
  align-items: center;
  gap: 12px;
  position: absolute;
  right: 24px; /* отступ справа */
}
  
.user-email {
  font-weight: 500;
  color: #fff; /* белый текст на синем фоне */
}
</style>
