const inView = require('in-view'),
      shortid = require('shortid')
// check if is defined
const isDefine = (v) =>{return typeof v !== 'undefined'}
// check if in object in array has same value
const hasObj_Array = (v,search,val) => {
  const defined = Object.create(null)
  defined.is = false
  defined.count = 0
  let length = v.length
  for(let i=0; i < length; i++){
    if(isDefine(v[i]) && isDefine(v[i][search])){
      if(isDefine(val) && v[i][search] === val){
        defined.is = true
        defined.count += 1
      }
    }
  }
  return defined
}
let countUpdate = 0
// create element object
const createEl = Object.create(null)
createEl.$enter= []
createEl.$exits= []
createEl.enter = ''
createEl.exit = ''
// ######################################

// add element antered
const _element_enter = (el,classid) => {
  createEl.enter = el
  let cElm_exits =createEl.$exits.length
  // remove element if has exits
  for(let i=0;i < cElm_exits; i++){
    if(isDefine(createEl.$exits[i]) && isDefine(createEl.$exits[i]) && createEl.$exits[i].class === classid){
      createEl.$exits.splice(i,1)
    }
  }
  // push element entered
  if(!hasObj_Array(createEl.$enter,'class',classid).is) createEl.$enter.push({class:classid,el:el})
}
// add element exits
const element_exit = (el, classid) => {
  createEl.exit = el
  let cElm_enter =createEl.$enter.length
  // remove element if has enter
  for(let i=0;i < cElm_enter; i++){
    if(isDefine(createEl.$enter[i]) && isDefine(createEl.$enter[i].class) && createEl.$enter[i].class === classid){
      createEl.$enter.splice(i,1)
    }
  }
  // push element is exits
  if(!hasObj_Array(createEl.$exits,'class',classid).is) createEl.$exits.push({class:classid,el:el})

}

// define plugin
const vue_inview = () => {}

// define directive object
const _directObj = {
  inserted : (el) => {
    let classId = shortid.generate()
    el.classList.add(classId)
    inView('.'+classId)
    .on('enter',(el)=>{
      countUpdate += 1
      _element_enter(el,classId)
    })
    .on('exit',(el)=>{
      countUpdate += 1
      element_exit(el,classId)
    })
  }
}
const _$objectMixin = {}
//setTimeout
const updateLifeCycle=(update) =>{
  let sync=()=>{
    update()
    setTimeout(sync,)
  }
  sync()
}
// define methods inview
const _$inview = ($_on) => {
  let lastUpdate=0
  updateLifeCycle(function(){
    if(countUpdate>lastUpdate){
      //update here
      $_on('baba')
      lastUpdate=countUpdate;
    }
  })
}
// define directive
const _directive = ($vm) => {
  $vm.directive('inview',_directObj)
}
// define methods
const _$methods = ($vm) => {
  $vm.prototype._$inview = _$inview
}
const _install = (Vue, Option)=>{
  _directive(Vue)
  _$methods(Vue)
}
vue_inview.install = _install

module.exports = vue_inview
