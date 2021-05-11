<template>
  <AppLoader v-if="loading"/>
  <AppAlert v-else-if="Alert" :alert="Alert"></AppAlert>
  <div class="card" v-else-if="TaskIDList.includes(TaskID)">
    <h2>{{Task.Title}}</h2>
    <p><strong>Статус</strong>: <AppStatus :Status="Task.Status"/></p>
    <p><strong>Дэдлайн</strong>: {{Task.Deadline}}</p>
    <p><strong>Описание</strong>: {{Task.Description}}</p>
    <div>
      <button v-if="Task.Status !== 'pending'" class="btn" @click="SetPending">Взять в работу</button>
      <button v-if="Task.Status !== 'done'" class="btn primary" @click="SetDone">Завершить</button>
      <button v-if="Task.Status !== 'cancelled'" class="btn danger" @click="SetCancelled">Отменить</button>
    </div>
  </div>
  <h3 class="text-white center" v-else>
    Задачи с id «<strong>{{TaskID}}</strong>» нет.
  </h3>
</template>

<script>
import AppStatus from '../components/AppStatus'
import {useRoute} from "vue-router";
import {useStore} from "vuex";
import {computed, onMounted} from "vue";
import AppAlert from "../components/AppAlert";
import AppLoader from "../components/AppLoader";

export default {
  components: {AppLoader, AppAlert, AppStatus},
  setup() {
    const Store = useStore()
    const Route = useRoute()

    const loading = computed(() => {return Store.state.Loading})
    const Alert = computed(() => {return Store.state.Alert})
    const TaskID = Route.params.id
    const Task = computed(() => { return Store.state.TaskList.find(t => t.id === TaskID)})
    const TaskIDList = computed(() => { return Store.getters.TaskIDList})

    const SetPending = () => {
      Store.dispatch('ChangeStatus', {id: TaskID, Status: 'pending'})
    }
    const SetDone = () => {
      Store.dispatch('ChangeStatus', {id: TaskID, Status: 'done'})
    }
    const SetCancelled = () => {
      Store.dispatch('ChangeStatus', {id: TaskID, Status: 'cancelled'})
    }

    onMounted(() => {
      Store.dispatch('LoadTaskList')
    })

    return {
      Alert, loading,
      Task, TaskID, TaskIDList,
      SetPending, SetDone, SetCancelled
    }
  }
}
</script>

<style scoped>

</style>