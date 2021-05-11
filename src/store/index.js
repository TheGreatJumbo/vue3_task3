import { createStore, createLogger } from 'vuex'
import axios from 'axios'

export default createStore({
  plugins: [createLogger()],
  state() {
    return {
      TaskList: [],
      Loading: false,
      Alert: null
    }
  },
  mutations: {
    Loading(state, payload) {
      state.Loading = payload
    },
    ChangeStatus(state, Task) {
      state.TaskList.find(task => task.id === Task.id).Status = Task.Status
    },
    ClearList(state) {
      state.TaskList = []
    },
    AddTask(state, NewTask) {
      state.TaskList.push(NewTask)
    },
    Alert(state, alert) {
      state.Alert = alert
    }
  },
  actions: {
    async LoadTaskList({commit}) {
      commit('Loading', true)
      try {
        const {data} = await axios.get('https://vue3-task3-default-rtdb.firebaseio.com/TaskList.json')
        commit('ClearList')
        const LoadedList = Object.keys(data).map(id => {
          return {...data[id], id}
        })
        LoadedList.forEach(task => commit('AddTask', task))
        commit('Alert', null)
        commit('Loading', false)
      }
      catch (e) {
        commit('Alert', {
          type: 'danger',
          text: e.message
        })
        commit('Loading', false)
      }
    },

    async AddTask({commit}, Task) {
      try {
        await axios.post('https://vue3-task3-default-rtdb.firebaseio.com/TaskList.json', JSON.stringify({...Task}))
        commit('Alert', null)
      }
      catch (e) {
        commit('Alert', {
          type: 'danger',
          text: e.message
        })
      }
    },

    async ChangeStatus({commit}, Task) {
      try {
        await axios.put(`https://vue3-task3-default-rtdb.firebaseio.com/TaskList/${Task.id}/Status.json`, JSON.stringify(Task.Status))
        commit('ChangeStatus', Task)
        commit('Alert', null)
      }
      catch (e) {
        commit('Alert', {
          type: 'danger',
          text: e.message
        })
      }
    }
  },
  getters: {
    all(state) {
      return state.TaskList
    },
    active(state) {
      return state.TaskList.filter(task => {
        return task.Status === 'active'
      })
    },
    pending(state) {
      return state.TaskList.filter(task => {
        return task.Status === 'pending'
      })
    },
    done(state) {
      return state.TaskList.filter(task => {
        return task.Status === 'done'
      })
    },
    cancelled(state) {
      return state.TaskList.filter(task => {
        return task.Status === 'cancelled'
      })
    },
    TaskIDList(state) {
      const IDs = []
      state.TaskList.forEach(task => IDs.push(task.id))
      return IDs
    },
    ActiveTasks(state) {
      let a = 0
      state.TaskList.forEach(task => {if (task.Status === 'active') a++})
      return a
    }
  }
})
