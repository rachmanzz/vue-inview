# vue-inview Beta

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



#credit
this vue-inview base on https://github.com/camwiegert/in-view
