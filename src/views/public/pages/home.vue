<template>
  <div>
    <ul id="background" class="background-logo">
      <li v-for="n in 10" v-bind:key="n+'background'"></li>
    </ul>
    <div id="firework" class="">
      <template v-for="n in 8" >
      <div class="explosion" v-bind:key="n+'firework'"><div :class="{'spark': true, 'color1': [1,4,7].includes(n), 'color2': [2,5,8].includes(n), 'color3': [3,6].includes(n)}"></div></div>
      </template>
    </div>
    <div class="card">
      <div class="d-flex mb-2">
        <h1 class="col title">
          <img v-if="logo" :src="logo" height="45px" /> {{title}}
        </h1>
        <div class="col text-right h1"><a @click="selectElement()" class="btn-raffle-1 btn-block">{{$lang.buttonText}}</a></div>
      </div>
      <div v-if="errorText" class="text-danger text-center">
        {{$lang.emptyText}}
      </div>
      <div class="answer-box text-center">
        <h1>
          {{selectedElement}}
        </h1>
      </div>
      <h4 v-if="prevSelected.length > 0">{{$lang.selectedTitle}}</h4>
      {{prevSelected.join(', ')}}
      <div v-if="listElements.length > 0">
        <h4>{{$lang.currentListTitle}}</h4>
        {{listElements.join(', ')}}
      </div>
      <div class="text-right mt-2">
        <a class="btn-raffle-2 btn-sm" v-if="jsonList.length > 0" @click="loadJson()">{{$lang.jsonButtonText}}</a>
      </div>
      <h4 class="text-center">
        {{$lang.reloadInstrucctions}}
      </h4>
      <div class="text-right">
        <textarea v-model="list" :placeholder="$lang.reloadInstrucctions" rows="6"></textarea>
        <a class="btn-raffle-3 btn-block" @click="changeList()">{{$lang.reloadButtonText}}</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
    name: 'home-public',
    props:{
  },
  data(){ 
    return{
      jsonList: [],
      listElements: [],
      title: process.env.VUE_APP_NAME,
      logo: require('@/assets/images/logo.png'),
      list: '',
      selectedElement: null,
      errorText: false,
      prevSelected: []
    }
  },
  mounted(){
    try {
      /* PRE ENTERED DATA FOR EASY USE */
      this.jsonList = require("@/assets/json/data.json").filter(function (elem, index, self) { return elem.length > 0 && self.indexOf(elem) === index });
    } catch (e) {
      this.jsonList = [];
    }
    document.title = this.title;
    this.cleanData();
  },
  methods: {
    selectElement(){
      document.getElementById('firework').classList.remove('firework');
      if(this.prevSelected.length == this.listElements.length){
        this.errorText = true;
      }else{
        let elementUniverse = this.listElements.filter(element => !this.prevSelected.includes(element));
        this.selectedElement = elementUniverse[Math.floor(Math.random() * elementUniverse.length)];
        this.prevSelected.push(this.selectedElement);
        void document.getElementById('firework').offsetWidth;
        document.getElementById('firework').classList.add('firework');
      }
      this.resizeBackground();
    },
    changeList(){
      if(this.list.length == 0)
        return;
      this.listElements = this.list.split(",").map(elem => elem.trim()).filter(function (elem, index, self) { return elem.length > 0 && self.indexOf(elem) === index});
      this.cleanData();
      this.resizeBackground();
    },
    loadJson(){
      this.listElements = this.jsonList;
      this.cleanData();
      this.resizeBackground();
	},
	cleanData(){
      this.prevSelected = [];
      this.list = "";
      this.errorText = false;
      this.selectedElement = this.$lang.noSelected;
	},
    resizeBackground(){
      setTimeout(() => {  document.getElementById('background').style.height = (document.documentElement.offsetHeight)+'px'; }, 200);
    }
  },
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
</style>
