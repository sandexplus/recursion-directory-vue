<template>
    <div :class="['edit-modal', {'edit-modal_active': editActive}]">
        <div @click.self="closeModal" class="overlay">
            <div class="modal">
                <button @click="closeModal" class="modal__close"><img src="@/assets/imgs/close_modal.svg" alt="Close"></button>
                <label for="dirName" class="modal__label">
                    <span>Write new name</span>
                    <input :value="oldName" @input="newName = $event.target.value" class="modal__input" type="text" id="dirName">
                </label>
                <button @click="sendNewName" class="modal__submit">Submit</button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            newName: ''
        }
    },
    computed: {
        editActive() {
            return this.$store.getters.getEditModalStatus
        },
        oldName() {
            return this.$store.getters.getOldName
        },
    },
    methods: {
        closeModal() {
            this.$store.commit('changeEditModalStatus', false)
        },
        sendNewName() {
            console.log(this.newName, this.oldName);
            this.$store.commit('editDirective', {newName: this.newName ? this.newName : this.oldName})
            this.closeModal()
        }
    },
}
</script>

<style lang="scss" scoped>
.edit-modal {
    position: fixed;
    width: 100vw;
    height: 100vh;
    top: 0;
    left: 0;
    opacity: 0;
    pointer-events: none;
    transition: .3s all;
    &_active {
        opacity: 1;
        pointer-events: all;
    }
}
.overlay {
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,.5);
    position: absolute;
    top: 0;
    left: 0;
}
.modal {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    background: #fff;
    padding: 50px;
    padding-top: 75px;
    width: 500px;
    &__close {
        width: 50px;
        height: 50px;
        background: transparent;
        border: none;
        cursor: pointer;
        position: absolute;
        top: 10px;
        right: 10px;
    }
    &__submit {
        width: 150px;
        height: 35px;
        margin-top: 50px;
        font-size: 25px;
        cursor: pointer;
    }
    &__label {
        font-size: 20px;
        display: flex;
        flex-direction: column;
        text-align: left;
        width: 100%;
    }
    &__input {
        padding: 10px 18px;
        margin-top: 10px;
        border: 1px solid #000;
    }
}
</style>