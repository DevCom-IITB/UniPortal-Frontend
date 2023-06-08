<template>

    <form class="asker" @submit="OnSubmit" >
        <div class="name">Sanskar Gosavi</div>
        <textarea class="text" :style="{  borderColor : grey }" v-model="text" type="text" placeholder="Lessssgooooo" ></textarea>
        <div class="actions">
            <div class="photo" :style="{ background : background }"><add />&nbsp;&nbsp;<p>Add photo</p></div>
            <div class="decision">
                <div class="discard" :style="{ color : grey }" @click="$emit('discard')">Discard</div>
                <input class="post" :style="{ background : primary }" value="Post" type="submit" @click="decide" />
            </div>
        </div>


    </form>

</template>

<script>
import add from '../icons/add_circle.svg'
import { useQuestionStore } from '@/stores/question'

let posted = false;

export default {
    name: 'askBox',
    setup(){
        const questionStore = useQuestionStore()
        return { questionStore }
    },
    props: {
        grey : String,
        background : String,
        primary : String,
    },
    methods : {
        async OnSubmit(e){
            e.preventDefault();
            if(!this.text && !posted){
                alert('Please enter some text')
                return;
            }

            const newPost = {
                text : this.text,
            }

            this.$emit('post',newPost);
        },
        async decide(){
            const decision = this.questionStore.action
            if(decision == 1){
                console.log('we will be answering the question with id:', this.questionStore.question['_id']);
                await this.questionStore.AddAnswer(this.text)
            }
            else if(decision == 2){
                console.log('we will be commenting on the question with id:', this.questionStore.question['_id']);
                await this.questionStore.AddCommentQuestion(this.text)
            }
            else if(decision == 3){
                console.log('we will be commenting on the answer with id:', this.questionStore.answer_ID, "with question id : ", this.questionStore.question_ID);
                await this.questionStore.AddCommentAnswer(this.text)
            }
            else if(decision == 4){
                console.log('we will be posting a new question');
                await this.questionStore.PostQuestion(this.text)
                // await this.questionStore.AddCommentComment(this.text)
            }

            this.$emit('discard')
        }
    },
    components : {
        add,
    },
    emits : ['discard'],
}

</script>

<style scoped>

.asker{
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: start;
}

.name{
    width: 100%;
    height: 16%;
    font-size: 16px;
    font-weight: 600;
}

.text{
    width: 100%;
    height: 56%;
    border: 1px solid;
    border-radius: 10px;
    padding: 8px 8px ;
    resize: none;
}

.actions{
    width: 100%;
    height: 16%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: end;
}

.photo{
    height: 100%;
    border-radius: 50px;
    padding-left: 8px;
    padding-right: 8px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
}

p{
    font-size: 16px;
    font-weight: 600;
}

.decision{
    height: 100%;
    border-radius: 10px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}

.discard{
    padding-left: 16px;
    padding-right: 16px;
    margin-right: 8px;
    border: 1px solid;
    border-radius: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 16px;
    font-weight: 500;
    cursor: pointer;
}

.post{
    padding-left: 16px;
    padding-right: 16px;
    border: none;
    border-radius: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 16px;
    font-weight: 500;
    cursor: pointer;
}

@media only screen and (max-width:750px){

    .asker{
        justify-content: start;
    }

    .name{
        height: 6%;
        font-size: 24px;
        padding-left: 8px;
        margin-bottom: 16px;
        display: flex;
        justify-content: start;
        align-items: center;
    }

    .text{
        height: 20%;
    }

    .actions{
        
        height: 70%
    }
    .photo{
        height: 8%;
    }

    .decision{
        height:8%;
    }

}

</style>