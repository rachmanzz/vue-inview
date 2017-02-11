# vue-inview Beta


## Install

    npm install --save vueinview
    or later version
    npm install --save rachmanzz/vue-inview


## Usage

### set Vue Directive

    <elementName v-inview></elementName>
    <div id="viewMe" v-inview>text or other element</div>

## Load plugin

    import vueInview from 'vueinview'

    Vue.use(vueInview)
    //or
    Vue.use(vueInview,{/*set Inview offset*/})

    // vue Instance

    new Vue(
        {
          el : '#app',
          mounted(){
            // magic properties
            this._$inview('#viewMe',{
                enter:(el)=>{
                  el.style.backgroundColor = "#D93600";
                  console.log("is enter name")
                },


                exit:(el)=>{
                  el.style.backgroundColor = "#000";
                  console.log("is exit name")
                }
              })


          }
        }
      )

# Directive with argument (without magic properties)

    v-inview="methodsName" || v-inview:on="methodsName" || v-inview:once="methodsName"

## Vue Instance

    new Vue({
        el :"#app",
        methods:{
          methodsName(node){
            node.enter = (el)=>{/* logic code */}
            node.exit = (el)=>{/* logic code */}  
          }
        }
      })

## modifiers

    v-inview:on.class="{'home':true}" // add class
    v-inview:on.class.enter="{'home':false}" // remove class
    v-inview:on.class.enter="'home'" // add single class
    v-inview:on.class.enter="['home','page']" // add many class

enter modifiers : when a DOM element enters

leave modifiers : when a DOM element exits

class without modifiers enter or leave, that same mean with enter

    v-inview:on.enter="methodsName" || v-inview:once.enter="methodsName"
    v-inview:on.leave="methodsName" || v-inview:once.leave="methodsName"


### Vue Instance

    methodsName(el){
      el.style.backgroundColor='#000'
    }


## in-view offset & threshold

    Vue.use(vueInview,{/*set Inview offset*/})
    //or
    vueInview.offset(/*set Inview offset*/)
    vueInview.threshold(/* set threshold */)

### aviliable next time

    v-inview:on.style.enter="{'background-color':'#000'}" // add style

#credit
this vue-inview base on https://github.com/camwiegert/in-view
