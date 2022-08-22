import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    directive: [
      {
        id: '1',
        name: '1',
        children: [
          {
            id: '1-1',
            name: '1-1',
            children: [
              {
                id: '1-1-1',
                name: '1-1-1',
              }
            ]
          },
          {
            id: '1-2',
            name: '1-2',
          }
        ]
      },
      {
        id: '2',
        name: '2'
      },
      {
        id: '3',
        name: '3',
        children: [
          {
            id: '3-1',
            name: '3-1',
          },
          {
            id: '3-2',
            name: '3-2',
          },
          {
            id: '3-3',
            name: '3-3',
            children: [
              {
                id: '3-3-1',
                name: '3-3-1',
                children: [
                  {
                    id: '3-3-1-1',
                    name: '3-3-1-1',
                  }
                ]
              }
            ]
          }
        ]
      }
    ],
    edit: {
      status: false,
      curName: '',
      id: null,
    }
  },
  getters: {
    getDirective(state) {
      return state.directive
    },
    getEditModalStatus(state) {
      return state.edit.status
    },
    getOldName(state) {
      return state.edit.curName
    }
  },
  mutations: {
    deleteDirective(state, payload) {
      const { arrId } = payload;
      if (!Array.isArray(arrId)) return;
      // iterate every layer of array and increasing index by 1 every iteration
      function iterate(array, index) {
        array.forEach((item, i) => {
          // if current item's id equals index of array of tree indexes ([3, 3-1, 3-1-3] etc)
          if (item.id === arrId[index]) {
            // if we have the most outer layer just splice item from array by index
            if (arrId.length === 1) {
              deleteElem(array, i)
              return;
            }
            // else if length of tree array equals current index splice item
            if (arrId.length - 1 === index) {
              deleteElem(array, i)
              return;
            } 
            // else iterate next layer
            iterate(item.children, ++index);
          }
        })
      }

      const deleteElem = (array, startId) => {
        array.splice(startId, 1)
      }

      iterate(state.directive, 0)
    },
    editDirective(state, payload) {
      // same method as deleteDirective by one change. We are editing name 
      const { newName } = payload;
      const arrId = state.edit.id;
      if (!Array.isArray(arrId)) return;
      
      function iterate(array, index) {
        array.forEach((item, i) => {
          if (item.id === arrId[index]) {
            if (arrId.length === 1) {
              editElem(array, i)
              return;
            }
            if (arrId.length - 1 === index) {
              editElem(array, i)
              return;
            } 
            iterate(item.children, ++index);
          }
        })
      }

      const editElem = (array, elemIndex) => {
        array[elemIndex].name = newName
      }

      iterate(state.directive, 0)
    },
    changeEditModalStatus(state, payload) {
      state.edit.status = payload;
    },
    setOldData(state, payload) {
      // we need this for place into modal as old name
      // and for remembering editing id
      state.edit.curName = payload.name;
      state.edit.id = payload.id;
    }
  },
})
