<template>
  <b-container>
    <b-card>
      <b-row class="my-5">
        <b-col>
          <h2>
          <b-img v-if="logo" :src="logo" height="40px"></b-img> {{title}}
          </h2>
        </b-col>
        <b-col>
          <b-button @click="selectElement()" variant="primary" block size="lg">{{$lang.buttonText}}</b-button>
        </b-col>
      </b-row>
      <b-row v-if="finalText">
        <b-col>
          <h3 class="text-danger text-center">
            {{$lang.emptyText}}
          </h3>
        </b-col>
      </b-row>
      <b-row>
        <b-col cols="12">
          <b-badge variant="success" class="my-5 w-100">
            <h3>
              {{selectedElement}}
            </h3>
          </b-badge>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <h4 v-if="prevSelected.length > 0">{{$lang.selectedTitle}}</h4>
          <ul>
            <li v-for="(prev, key) in prevSelected" :key="key">{{prev}}</li>
          </ul>
        </b-col>
      </b-row>
      <b-row>
        <b-col cols="12" class=" my-2">
          <h4 class="text-center">
            {{$lang.reloadInstrucctions}}
          </h4>
        </b-col>
        <b-col cols="12">
          <b-form-textarea v-model="list" :placeholder="$lang.reloadInstrucctions" rows="3" max-rows="6"></b-form-textarea>
        </b-col>
        <b-col cols="12" class="text-right my-3">
          <b-button variant="danger" @click="changeList()">{{$lang.reloadButtonText}}</b-button>
        </b-col>
      </b-row>
      <b-row>
        <b-col v-if="listElements.length > 0">
          <h4>{{$lang.currentListTitle}}</h4>
          {{listElements.join(', ')}}
        </b-col>
      </b-row>
    </b-card>
  </b-container>
</template>

<script>
export default {
	name: 'home-public',
    props:{
  },
  data(){ 
    return{
      listElements: require("@/assets/json/data.json").filter(function (elem, index, self) { return elem.length > 0 && self.indexOf(elem) === index }), /* PRE ENTERED DATA FOR EASY USE */
      title: process.env.VUE_APP_NAME,
      logo: require('@/assets/logo.png'),
      list: '',
      selectedElement: null,
      finalText: false,
      prevSelected: []
    }
  },
  mounted(){
    document.title = this.title;
    this.selectedElement = this.$lang.noSelected;
  },
  methods: {
    selectElement(){
      if(this.prevSelected.length == this.listElements.length){
        this.finalText = true;
      }else{
        let elementUniverse = this.listElements.filter(element => !this.prevSelected.includes(element));
        this.selectedElement = elementUniverse[Math.floor(Math.random() * elementUniverse.length)];
        this.prevSelected.push(this.selectedElement);
      }
    },
    changeList(){
      if(this.list.length == 0)
        return;
      this.prevSelected = [];
      this.listElements = this.list.split(",").filter(function (elem, index, self) { return elem.length > 0 && self.indexOf(elem) === index });
      this.list = "";
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
</style>
