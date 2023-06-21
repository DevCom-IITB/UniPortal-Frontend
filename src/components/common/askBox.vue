<template>

    <form class="asker" @submit="OnSubmit" :style=" (selectedImages.length == 0) ? { height : '30vh'} : { height : '50vh'} ">
        <div class="name">{{ authStore.name }}</div>
        <textarea maxlength="1000" class="text" :style="{  borderColor : colourStore.grey }" v-model="text" type="text" placeholder="Lessssgooooo" ></textarea>
        <div class="preview" v-if="selectedImages.length > 0">
            <div v-for="(image, index) in previewImages" :key="index" class="PreImage">
                <div class="cancel" @click="RemoveImage(index)" />
                <img :src="image" alt="Preview Image">
            </div>
        </div>
        <div class="actions">
            <div class="decision">
                <div class="discard" :style="{ color : colourStore.grey }" @click="$emit('discard')">Discard</div>
                <input class="post" :style="{ background : colourStore.primary }" value="Post" type="submit" @click="decide" />
            </div>
            <div v-if="questionStore.addImage" class="photo" :style="{ background : colourStore.background }" @click="AddImages" ><input type="file" id="fileInput" @change="SelectingFiles" multiple /><add />&nbsp;&nbsp;<p>Add photo</p></div>
        </div>


    </form>

</template>

<script>
import add from '../icons/add_circle.svg'
import { useQuestionStore } from '@/stores/question'
import { useAuthStore } from '@/stores/auth';
import { useColourStore } from '../../stores/colour';
let posted = false;

export default {
    name: 'askBox',
    setup(){
        const questionStore = useQuestionStore()
        const authStore = useAuthStore()
        const colourStore = useColourStore()
        return { questionStore, authStore, colourStore }
    },
    props : {
        editBody : {
            type : String,
            default : ''
        }
    },
    data(){
        return{
            text : '',
            selectedImages : [],
            previewImages : [],
        }
    },
    mounted(){
        if(this.editBody && this.questionStore.action == 6){
            this.text = this.editBody
        }
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
        async decide(event){
            console.log(event);
            if(!this.text && !posted){
                alert('Please enter some text')
                return;
            }
            const decision = this.questionStore.action
            if(decision == 1){
                console.log('we will be answering the question with id:', this.questionStore.question['_id']);
                console.log('selected images are : ', this.selectedImages);
                await this.questionStore.AddAnswer(this.text, this.selectedImages)
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
                console.log('selected images are : ', this.selectedImages);
                await this.questionStore.PostQuestion(this.text, this.selectedImages)
                // await this.questionStore.AddCommentComment(this.text)
            }
            else if(decision == 5){
                console.log('we will be posting info post');
                await this.questionStore.PostInfoPost(this.text, this.selectedImages)
            }
            else if(decision == 6){
                console.log('we will be editing the infopost with id : ', this.questionStore.info_ID);
                await this.questionStore.EditInfoPost(this.text)
            }

            this.$emit('discard')
        },
        AddImages(){
            document.getElementById('fileInput').click();
        },
        SelectingFiles(e){
            this.selectedImages.push(...Array.from(e.target.files)); //Array.from() converts the filelist to an array
            console.log(this.selectedImages);

            Array.from(e.target.files).forEach((image) => {
                const reader = new FileReader();
                reader.onload = () => {
                    if(reader.readyState === 2){
                        this.previewImages.push(reader.result);
                    }
                }
                reader.readAsDataURL(image);
            })
            console.log(this.previewImages);
            // this.questionStore.AddImages(this.selectedImages);
        },
        RemoveImage(index){
            this.previewImages.splice(index,1);
            this.selectedImages.splice(index,1);
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
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: start;
}

.name{
    width: 100%;
    height: 20px;
    font-size: 16px;
    font-weight: 600;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    /* border: 1px solid; */
}

.text{
    width: 100%;
    height: 100px;
    border: 1px solid;
    border-radius: 10px;
    padding: 8px 8px ;
    resize: none;
}

.preview{
    width: 100%;
    height: 100px;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
}

.PreImage{
    width: 100px;
    height: 100px;
    border-radius: 10px;
    margin-right: 8px;
    background : #F0F2F5;
    overflow: hidden;
    box-shadow: 0px 0px 5px 0px rgba(0,0,0,0.75);
    display: flex;
    flex-direction: row-reverse;
    justify-content: flex-start;
    align-items: flex-start;
}

.cancel{
    position: fixed;
    z-index: 1;
    width: 15px;
    height: 15px;
    border-radius: 50px;
    background: #60b926;
    margin-top: 5px;
    margin-right: 5px;
}

.cancel:hover{
    background: #ff7c7c;
}

.PreImage img{
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.actions{
    width: 100%;
    height: 30px;
    display: flex;
    flex-direction : row-reverse;
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

input[type="file"] {
    display: none;
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
        justify-content: space-around;
        height: fit-content;
    }

    .name{
        height: 6%;
        font-size: 16px;
        padding-left: 8px;
        margin-bottom: 16px;
        display: flex;
        justify-content: start;
        align-items: center;
    }

    .text{
        height: 100px;
    }

    .actions{
        height: 30px;
    }

}

</style>