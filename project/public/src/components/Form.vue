<template>
    <container>
        <form @submit.prevent="submitForm" class="form">
            <h1 v-text="titleText"></h1>
            <div v-for="field in fields" :key="field.name">
                <textarea v-if="field.isParagraph" :type="field.type" :placeholder="field.label" v-model="fieldValues[field.name]" :class="{ 'writingMessage' : isWritingMessage }"></textarea>
                <input v-else :type="field.type" :placeholder="field.label" v-model="fieldValues[field.name]"/>
            </div>
            <button class="btn" type="submit" v-text="buttonText"></button>
        </form>
    </container>
</template>

<style scoped>
input {
    border: 1px solid #EEEEEE;
    padding: 10px 20px;
    margin: 5px;
    border-radius: 20px;
    background-color: #EEEEEE;
    font-family: 'Roboto', sans-serif;
    font-size: 18px;
    order: 1;
}

textarea {
    width: 250px;
    height: 100px;
    margin: 10px;
    border-radius: 5px;
    font-size: 18px;
    resize: none;
}

.writingMessage {
    width: 400px;
    height: 200px;
}

.form {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.btn {
    display: inline-block;
    padding: 10px 20px;
    background-color: #000000;
    color: white;
    text-decoration: none;
    transition: all 0.3s ease;
    font-family: 'Roboto', sans-serif;
    font-size: 18px;
    margin: 5px;
    border: 1px solid #FFFFFF;
    border-radius: 20px;
    order: 2;
    cursor: pointer;
}
.btn:hover {
    background-color: #555555;
    box-shadow: 0px 0px 10px #444444;
    transform: scale(1.05);
}

.btn:active {
    transition: transform 0.15s;
    transform: scale(0.9);
}
@media (max-width: 768px) {
    input {
        padding: 8px 16px;
        font-size: 15px;
        margin: 4px;
        border-radius: 16px;
    }
    textarea {
        width: 200px;
        height: 80px;
        margin: 8px;
        border-radius: 4px;
        font-size: 15px;
    }
    .btn {
        padding: 8px 16px;
        font-size: 15px;
        border-radius: 16px;
    }
    .writingMessage {
        width: 350px;
        height: 160px;
    }
}
@media (max-width: 520px) {
    input {
        padding: 7px 14px;
        font-size: 12px;
        margin: 3px;
        border-radius: 14px;
    }
    textarea {
        width: 175px;
        height: 70px;
        margin: 7px;
        border-radius: 3px;
        font-size: 12px;
    }
    .btn {
        padding: 7px 14px;
        font-size: 12px;
        border-radius: 14px;
    }
    .writingMessage {
        width: 300px;
        height: 130px;
    }
}
@media (max-width: 420px) {
    input {
        padding: 6px 12px;
        font-size: 10px;
        margin: 2px;
        border-radius: 12px;
    }
    textarea {
        width: 150px;
        height: 60px;
        margin: 6px;
        font-size: 10px;
    }
    .btn {
        padding: 6px 12px;
        font-size: 10px;
        border-radius: 12px;
    }
    .writingMessage {
        width: 260px;
        height: 100px;
    }
}
</style>

<script>
import Container from "./Container.vue";
export default {
    components: {
        Container
    },
    data() {
        return {
            fieldValues: {},
            cooldown: false
        }
    },
    methods: {
        submitForm() {
            if(this.cooldown) {
                return;
            }
            this.$emit("form-submitted", this.fieldValues);
            this.cooldown=true;
            setTimeout(() => {
                this.cooldown = false;
            }, 1000);
        }
    },
    name: "custom-form",
    props: {
        buttonText: {
            type: String,
            default: "Submit"
        },
        titleText: {
            type: String,
            default: "Title"
        },
        isWritingMessage: {
            type: Boolean,
            default: false
        },
        fields: Array
    }
};
</script>
