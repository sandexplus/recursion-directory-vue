<template>
    <div class="directive-item">
        <!--
            if the props has children (being a folder) we are creating same component and send that children as the props (basic recursion)
        -->
        <template v-if="data.children">
            <!--
                we are creating a block because every of folders are independent block
                why 500? because i wanted it. cleverly would be to calculate maximum block width but i'm too lazy. it's not a task
            -->
            <div :style="{paddingLeft: calculatePadding(data.id) + 'px', width: 500 - calculatePadding(data.id) + 'px'}" class="block folder">
                <div class="block__data">
                    <img src="@/assets/imgs/folder.svg" alt="File">
                    {{ data.name }} 
                </div>
                <div class="block__editing">
                    <button @click="editBlock(data.id, data.name)" class="btn"><img src="@/assets/imgs/pencil.svg" alt="Edit"></button>
                    <button @click="deleteBlock(data.id)" class="btn"><img src="@/assets/imgs/trash.svg" alt="Delete"></button>
                </div> 
            </div>
            <directive-folder :data="item" v-for="item in data.children" :key="item.id"></directive-folder>
        </template>
        <!--
            else we can create a file 
        -->
        <div class="block file" v-else :style="{paddingLeft: calculatePadding(data.id) + 'px', width: 500 - calculatePadding(data.id) + 'px'}">
            <div class="block__data">
                <img src="@/assets/imgs/file.svg" alt="File">
                {{ data.name }} 
            </div>
            <div class="block__editing">
                <button @click="editBlock(data.id, data.name)" class="btn"><img src="@/assets/imgs/pencil.svg" alt="Edit"></button>
                <button @click="deleteBlock(data.id)" class="btn"><img src="@/assets/imgs/trash.svg" alt="Delete"></button>
            </div> 
        </div>
    </div>
</template>

<script>
export default {
    props: ['data'],
    methods: {
        deleteBlock(id) {
            // creating array of ids
            const arrId = id.split('-');
            this.$store.commit('deleteDirective', {
                arrId: this.createNestedArray(arrId)
            })
        },
        editBlock(id, name) {
            this.$store.commit('changeEditModalStatus', true)
            // const newName = prompt('Write new name', name)
            const arrId = id.split('-');
            this.$store.commit('setOldData', {
                name, id: this.createNestedArray(arrId)
            })
            // this.$store.commit('editDirective', {
            //     arrId: this.createNestedArray(arrId), newName
            // })
        },
        // we can easily calculate left padding multiplying id length (1-1-1) by for example 20
        calculatePadding(id) {
            return id.length * 20
        },
        // method for creating a tree of ids from most grandparent to event target [3, 3-1, 3-1-1] etc
        createNestedArray(arr) {
            const newArr = [];
            const duplicateArray = (array) => {
                return JSON.parse(JSON.stringify(array))
            }
            // iteration array and creating ids form oldparent to parent to child etc
            const iteration = (array, index) => {
                if (index > arr.length) return;
                const tempArr = duplicateArray(array).splice(0, index)
                newArr.push(tempArr.join('-'))
                iteration(array, ++index);
            } 
            iteration(arr, 1)
            return newArr
        }
    },
}
</script>

<style lang="scss">
.directive-item {
    display: flex;
    flex-direction: column;
    gap: 10px;
}
.block {
    display: flex;
    justify-content: space-between;
    align-items: center;
    transition: .3s all;
    &__data {
        display: flex;
        align-items: center;
        gap: 10px;
        & img {
            width: 25px;
        }
    }
    &__editing {
        display: flex;
        gap: 7px;
        align-items: center;
    }
    &:hover {
        background: rgba(0,0,0,.2);
    }
}

.btn {
    width: 25px;
    height: 25px;
    border: none;
    background: transparent;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    & img {
        width: 15px;
    }
}
</style>