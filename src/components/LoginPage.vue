<template>
  <v-container class="login-container">
    <v-card class="login-card">
      <v-card-title class="login-card__title">Вход в систему</v-card-title>
      <v-card-text>
        <v-text-field
          v-model="username"
          label="Имя пользователя"
          outlined
          dense
        ></v-text-field>
        <v-text-field
          v-model="password"
          label="Пароль"
          type="password"
          outlined
          dense
        ></v-text-field>
      </v-card-text>
      <v-card-actions class="login-card__actions">
        <v-btn class="primary-btn" @click="login">Войти</v-btn>
        <v-btn text @click="$router.push('/register')">Регистрация</v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const username = ref('')
const password = ref('')
const router = useRouter()

function login() {
  let users = JSON.parse(localStorage.getItem('users') || '[]')
  const user = users.find(u => u.username === username.value && u.password === password.value)

  if (user) {
    localStorage.setItem('currentUser', JSON.stringify(user))
    router.push('/main')
  } else {
    alert('Неверное имя пользователя или пароль')
  }
}
</script>

<style scoped>
.login-container {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgb(245, 244, 244);
  font-family: 'LatoRegular', sans-serif;
}

.login-card {
  width: 400px;
  padding: 24px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  background-color: #fff;
}

.login-card__title {
  font-family: 'LatoBold', sans-serif;
  font-size: 22px;
  color: #2B4466;
  text-align: center;
  margin-bottom: 16px;
}

.login-card__actions {
  display: flex;
  justify-content: space-between;
  margin-top: 16px;
}

.primary-btn {
  background-color: #0074B8;
  color: #fff;
  font-family: 'LatoBold', sans-serif;
  font-size: 16px;
  text-transform: none;
}

.primary-btn:hover {
  background-color: #005a8c;
}
</style>
