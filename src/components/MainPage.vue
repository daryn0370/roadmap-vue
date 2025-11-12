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
          v-for="(sub, subIndex) in subsections"
          :key="sub.id"
          class="card-subsection"
        >
          <div class="card-subsection__header">
            <h2 class="card-detail__title">
              Подраздел дорожной карты мероприятий №{{ subIndex + 1 }}
            </h2>

            <v-btn
              v-if="subIndex !== 0"
              icon
              class="delete-btn"
              @click="removeSubsection(subIndex)"
            >
              <img src="@/assets/delete.png" alt="Удалить" />
            </v-btn>

            <v-btn
              v-if="subIndex === subsections.length - 1"
              color="green"
              class="ml-4"
              @click="addSubsection"
            >
              <img src="@/assets/plus.png" alt="Добавить раздел" />
            </v-btn>
          </div>

          <!-- Главная секция -->
          <div class="card-detail__section full-width">
            <label>Направление работ / Ключевые инициативы</label>
            <textarea v-model="sub.mainText" placeholder="|"></textarea>
          </div>

          <!-- Горизонтальные ряды -->
          <div class="card-detail__row-container">
            <div
              v-for="(row, rowIndex) in sub.rows"
              :key="row.id"
              class="card-detail__row card-detail__row--horizontal"
            >
              <!-- Левая колонка -->
              <div class="card-detail__col card-detail__col--main">
                <div class="card-detail__section small-field">
                  <label>Наименование мероприятия</label>
                 <textarea alt="Поле ввода" class="enter-icon" placeholder="|"></textarea>
                </div>
                <div class="card-detail__section small-field">
                  <label>Сроки завершения</label>
                  <textarea alt="Поле ввода" class="enter-icon" placeholder="|"></textarea>
                </div>
              </div>

              <!-- Правая колонка -->
              <div class="card-detail__col card-detail__col--side">
                <div class="card-detail__section small-field">
                  <label>Ответственные исполнители</label>
                  <textarea alt="Поле ввода" class="enter-icon" placeholder="|"></textarea>
                </div>
                <div class="card-detail__section small-field">
                  <label>Форма завершения</label>
                  <textarea alt="Поле ввода" class="enter-icon" placeholder="|"></textarea>
                </div>

                <v-btn
                  icon
                  class="delete-btn mt-2"
                  @click="removeRow(subIndex, rowIndex)"
                >
                  <img src="@/assets/delete.png" alt="Удалить ряд" />
                </v-btn>
              </div>
            </div>

            <!-- Кнопка добавления ряда -->
            <v-btn icon class="add-btn-single1" @click="addRow(subIndex)">
              <img src="@/assets/plus.png" alt="Добавить ряд" />
            </v-btn>
          </div>
        </div>

        <!-- Кнопка сохранить -->
        <v-btn class="save-btn mt-4" @click="saveData">Сохранить</v-btn>
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

onMounted(() => {
  const savedData = localStorage.getItem('roadmapSubsections')
  if (savedData) {
    subsections.value = JSON.parse(savedData)
  } else {
    subsections.value = [
      {
        id: Date.now(),
        mainText: '',
        rows: [
          {
            id: Date.now() + 1,
            eventName: '',
            deadline: '',
            responsible: '',
            completionForm: '',
          },
        ],
      },
    ]
  }
})

function onCardSelected(index) {
  selectedCard.value = index
}

function addSubsection() {
  subsections.value.push({
    id: Date.now(),
    mainText: '',
    rows: [
      {
        id: Date.now() + Math.random(),
        eventName: '',
        deadline: '',
        responsible: '',
        completionForm: '',
      },
    ],
  })
}

function removeSubsection(index) {
  subsections.value.splice(index, 1)
}

function addRow(subIndex) {
  const sub = subsections.value[subIndex]
  if (!sub.rows) sub.rows = []
  sub.rows.push({
    id: Date.now() + Math.random(),
    eventName: '',
    deadline: '',
    responsible: '',
    completionForm: '',
  })
}

function removeRow(subIndex, rowIndex) {
  subsections.value[subIndex].rows.splice(rowIndex, 1)
}

function saveData() {
  localStorage.setItem('roadmapSubsections', JSON.stringify(subsections.value))
  alert('Данные сохранены!')
}
</script>

<style scoped>
.enter-icon {
  width: 533px;
  height: 46px;
  margin-top: 8px;
  border-radius: 4px;
}
</style>
