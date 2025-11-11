<template> 
  <div class="main-page">
    <Header />

    <nav class="breadcrumbs">
      <p class="text-regular">
        Главная / Мероприятия / Дорожная карта мероприятий
      </p>
    </nav>

    <h1 class="main-h1">Дорожная карта мероприятий</h1>

    <CardList
      :cards="cards"
      :selectedCard="selectedCard"
      @card-selected="onCardSelected"
    />

    <section v-if="selectedCard !== null" class="card-detail">
      <template v-if="selectedCard === 0">
        <div
          v-for="(sub, index) in subsections"
          :key="sub.id"
          class="card-subsection"
        >
          <div class="card-subsection__header">
            <h2 class="card-detail__title">
              Подраздел дорожной карты мероприятий №{{ index + 1 }}
            </h2>

            <v-btn
              v-if="index !== 0"
              icon
              class="delete-btn"
              @click="removeSubsection(index)"
            >
              <img src="@/assets/delete.png" alt="Удалить" />
            </v-btn>
          </div>

          <!-- Главная секция -->
          <div class="card-detail__section full-width">
            <label>Направление работ / Ключевые инициативы</label>
            <textarea v-model="sub.mainText" placeholder="Введите текст..."></textarea>
          </div>

          <!-- Двухколоночная форма -->
          <div class="card-detail__row">
            <!-- Левая колонка -->
            <div class="card-detail__col card-detail__col--main">
              <div class="card-detail__section small-field">
                <label>Наименование мероприятия</label>
                <textarea v-model="sub.eventName" placeholder="Введите текст..."></textarea>
              </div>

              <div class="card-detail__section small-field">
                <label>Сроки завершения</label>
                <textarea v-model="sub.deadline" placeholder="Введите текст..."></textarea>
              </div>
            </div>

            <!-- Правая колонка -->
            <div class="card-detail__col card-detail__col--side">
              <div class="card-detail__section small-field">
                <label>Ответственные исполнители</label>
                <textarea v-model="sub.responsible" placeholder="Введите текст..."></textarea>
              </div>

              <div class="card-detail__section small-field">
                <label>Форма завершения</label>
                <textarea v-model="sub.completionForm" placeholder="Введите текст..."></textarea>
              </div>
            </div>

            <!-- Общая кнопка добавления справа -->
            <v-btn icon class="add-btn-single" @click="addSubsection">
              <img src="@/assets/plus.png" alt="Добавить" />
            </v-btn>
          </div>
        </div>

        <!-- Кнопка сохранить -->
        <v-btn class="save-btn" @click="saveData">Сохранить</v-btn>

      </template>

      <template v-else>
        <h2 class="card-detail__title">Hello</h2>
      </template>
    </section>
  </div>
</template>

<script setup>
import Header from '../components/Header.vue'
import CardList from '../components/CardList.vue'
import { ref, onMounted } from 'vue'

const cards = [
  { title: 'СИСТЕМА МЕНЕДЖМЕНТА В ОБЛАСТИ ПБ, ОТ И ОС' },
  { title: 'ПОВЫШЕНИЕ КОМПЕТЕНЦИЙ В ОБЛАСТИ ПБ, ОТ И ОС' },
  { title: 'ЦИФРОВИЗАЦИЯ ПБ, ОТ И ОС' },
  { title: 'ВЗАИМОДЕЙСТВИЕ С ПОДРЯДНЫМИ ОРГАНИЗАЦИЯМИ В ОБЛАСТИ ПБ, ОТ И ОС' },
]

const selectedCard = ref(null)
const subsections = ref([])

// Инициализация данных из localStorage
onMounted(() => {
  const savedData = localStorage.getItem('roadmapSubsections')
  if (savedData) {
    subsections.value = JSON.parse(savedData)
  } else {
    subsections.value = [{ id: Date.now(), mainText: '', eventName: '', deadline: '', responsible: '', completionForm: '' }]
  }
})

function onCardSelected(index) {
  selectedCard.value = index
}

function addSubsection() {
  subsections.value.push({ id: Date.now(), mainText: '', eventName: '', deadline: '', responsible: '', completionForm: '' })
} 

function removeSubsection(index) { 
  subsections.value.splice(index, 1) 
}

// Сохранение данных
function saveData() {
  localStorage.setItem('roadmapSubsections', JSON.stringify(subsections.value))
  alert('Данные сохранены!')
}
</script>
