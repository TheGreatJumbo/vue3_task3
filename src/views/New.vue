<template>
  <form class="card" @submit.prevent="CreateTask">
    <h1>Создать новую задачу</h1>
    <div class="form-control">
      <label for="title">Название</label>
      <input type="text" id="title" v-model="Title">
    </div>

    <div class="form-control">
      <label for="date">Дата дэдлайна</label>
      <input type="date" id="date" v-model="Deadline">
    </div>

    <div class="form-control">
      <label for="description">Описание</label>
      <textarea id="description" v-model="Description"></textarea>
    </div>

    <button class="btn primary" type="submit" :disabled="Title === '' || Deadline === '' || Description === ''">Создать</button>
  </form>
</template>


<script>
import {ref} from "vue";
import {useRouter} from "vue-router";
import {useStore} from "vuex";

export default {
  name: 'New',
  setup() {
    const Store = useStore()
    const Router = useRouter()

    const Title = ref('')
    const Deadline = ref('')
    const Description = ref('')

    const CreateTask = () => {
      Store.dispatch('AddTask',{
        Title: Title.value,
        Deadline: Deadline.value,
        Description: Description.value,
        Status: Date.parse(Deadline.value) >= new Date() ? 'active' : 'cancelled'
      })
      Router.push('/')
    }

    return {
      Title, Deadline, Description,
      CreateTask
    }
  }
}
</script>