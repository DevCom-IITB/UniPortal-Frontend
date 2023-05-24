<template>

    <div class="asker" >
        <div class="name">Sanskar Gosavi</div>
        <div class="text" :style="{  borderColor : grey }"></div>
        <div class="actions">
            <div class="photo" :style="{ background : background }"><add />&nbsp;&nbsp;<p>Add photo</p></div>
            <div class="decision">
                <div class="discard" :style="{ color : grey }" @click="$emit('discard')">Discard</div>
                <div class="post" :style="{ background : primary }">Post</div>
            </div>
        </div>


    </div>

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
}

.actions{
    width: 100%;
    height: 16%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
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
    margin-right: 8px;
    border-radius: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 16px;
    font-weight: 500;
    cursor: pointer;
}


</style>