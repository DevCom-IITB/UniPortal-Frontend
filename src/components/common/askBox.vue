<template>

    <form class="asker" @submit="OnSubmit" >
        <div class="name">Sanskar Gosavi</div>
        <textarea class="text" :style="{  borderColor : grey }" v-model="text" type="text" placeholder="Lessssgooooo" ></textarea>
        <div class="actions">
            <div class="photo" :style="{ background : background }"><add />&nbsp;&nbsp;<p>Add photo</p></div>
            <div class="decision">
                <div class="discard" :style="{ color : grey }" @click="$emit('discard')">Discard</div>
                <input class="post" :style="{ background : primary }" value="Post" type="submit" />
            </div>
        </div>


    </form>

</template>

<script>
import add from '../icons/add_circle.svg'
export default {
    name: 'askBox',
    props: {
        grey : String,
        background : String,
        primary : String,
    },
    data(){
        return {
            text : '',
        }
    },
    methods : {
        async OnSubmit(e){
            e.preventDefault();
            if(!this.text){
                alert('Please enter some text')
                return;
            }

            const newPost = {
                text : this.text,
            }

            this.$emit('post',newPost);
            this.text = '';
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