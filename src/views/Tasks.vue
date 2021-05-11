<template>
  <AppLoader v-if="loading"/>
  <AppAlert v-else-if="Alert" :alert="Alert"></AppAlert>
  <h1 class="text-white center" v-else-if="TaskList.length === 0">Задач пока нет</h1>
  <div v-else>
    <h3 class="text-white">Всего активных задач: {{ActiveTasks}}</h3>
    <div class="form-control">
      <select id="filter" v-model="Filter">
        <option value="all">Все задачи</option>
        <option value="active">Активные</option>
        <option value="pending">В работе</option>
        <option value="done">Выполненные</option>
        <option value="cancelled">Отменённые</option>
      </select>
    </div>
    <div class="card" v-for="Task in TaskList" :key="Task.id">
      <h2 class="card-title">
        {{Task.Title}}
        <AppStatus :Status="Task.Status"/>
      </h2>
      <p>
        <strong>
          <small>
            {{Task.Deadline}}
          </small>
        </strong>
      </p>
      <button class="btn primary" @click="ShowTask(Task.id)">Посмотреть</button>
    </div>
  </div>
</template>

<script>
import AppStatus from '../components/AppStatus'
import {useStore} from "vuex";
import {computed, onMounted, ref} from "vue";
import {useRouter} from "vue-router";
import AppAlert from "../components/AppAlert";
import AppLoader from "../components/AppLoader";

export default {
  components: {AppLoader, AppAlert, AppStatus},
  setup() {
    const Store = useStore()
    const Router = useRouter()

    const Filter = ref('all')
    const TaskList = computed(() => {return Store.getters[Filter.value]})
    const ActiveTasks = computed(() => {return Store.getters.ActiveTasks})
    const Alert = computed(() => {return Store.state.Alert})
    const loading = computed(() => {return Store.state.Loading})


    const ShowTask = id => {
      Router.push(`/Task/${id}`)
    }

    onMounted( () => {
      Store.dispatch('LoadTaskList')
    })

    return {
      Alert, loading, TaskList, ActiveTasks, Filter,
      ShowTask
    }
  }
}
</script>
