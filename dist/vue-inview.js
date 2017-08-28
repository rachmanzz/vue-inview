'use strict'
var inView = require('in-view')
var shortid = require('shortid')
/**
  * return boolen
    - check typeof object
**/
var isDefine = function (v) { return typeof v !== 'undefined' },
isString = function (v) { return typeof v === 'string' },
isNumber = function (v) { return typeof v === 'number' },
isFunc   = function (v) { return typeof v === 'function' },
isArray  = function (v) { return Array.isArray(v) },
isObject = function (v) { return !isArray(v) && typeof v === 'object' }
/**
  * return boolen
    - check if key has in object
**/
var hasKey = function (obj, src) {
  var result = false
  var key
  for (key in obj) {
    if (obj.hasOwnProperty(key) && key === src) result = true
  }
  return result
}

/**
  * return number
    - counting key of object
**/
var objLength = function (v) {
  var result = 0
  var key
  for (key in v) {
      v.hasOwnProperty(key) && result++
  }
  return result
}
/**
  * return number
    - check element class
**/
var hasClass = function (el, check) {
  var cls = el.classList
  var size = cls.length
  var result = false
  var i = 0
  for (i; i < size; i++) {
    if (cls[i].toString() === check) result = true
  }
  return result
}
/**
  * return object{is → boolen, count → number}
    - check object has defined in array
**/
var hasObj_Array = function (v, search, val) {
  var defined = Object.create(null)
  defined.is = false
  defined.count = 0
  var length = v.length
  var i
  for (i = 0; i < length; i++) {
    if (isDefine(v[i][search])) {
      if (isDefine(val) && v[i][search] === val) {
        defined.is = true
        defined.count += 1
      }
    }
  }
  return defined
}

// count* → number
var countEntered = 0
var countExits = 0

/**
  * return object{$enter → array, $exits → array, enter → string, exit → string, register → array, values → object{}}
    - create object
**/
var createEl = Object.create(null)
createEl.$enter = []
createEl.$exits = []
createEl.enter = ''
createEl.exit = ''
createEl.register = []
createEl.values = {}

/**
  * (el → dom, classid → string)
    - add element has enter
**/
var _element_enter = function (el, classid) {
  createEl.enter = el
  var cElm_exits = createEl.$exits.length

  // remove element if has in createEl.$exits
  var i
  if (cElm_exits > 0) {
    for (i = 0;i < cElm_exits; i++) {
      // make sure that element is exits
      if (isDefine(createEl.$exits[i]) && isDefine(createEl.$exits[i].class) && createEl.$exits[i].class === classid) {
        createEl.$exits.splice(i,1)
      }
    }
  }
  
  // push an element
  if (!hasObj_Array(createEl.$enter, 'class', classid).is) createEl.$enter.push({class: classid, el: el})
}

/**
  * (el → dom, classid → string)
    - add element has exit
**/
var element_exit = function (el, classid) {
  createEl.exit = el
  var cElm_enter = createEl.$enter.length

  // remove element if has in createEl.$enter
  var i
  if (cElm_enter > 0) {
    for (i = 0;i < cElm_enter; i++) {
      if (isDefine(createEl.$enter[i]) && isDefine(createEl.$enter[i].class) && createEl.$enter[i].class === classid) {
        createEl.$enter.splice(i,1)
      }
    }
  }

  // push an element
  if (!hasObj_Array(createEl.$exits, 'class', classid).is) createEl.$exits.push({class: classid, el: el})
}

/**
  * (rw → string)
  * return string
    - check and get class ID
**/
var obsclassreg = function (rw) {
  var result
  var rgsize = createEl.register.length
  var i
  for (i = 0;i < rgsize; i++) {
    if (createEl.register[i].rawName === rw) result = createEl.register[i].classid
  }
  return result
}
/**
  * (css → string)
  * return string
    - create javascript stylesheet name
**/
var cssjs = function (css) {
  css = css.split('-')
  var result = css[0] === 'float' ? 'cssFloat' : css[0]
  var size = css.length
  var i
  for (i = 0; i < size; i++) {
    if (i > 0) result += css[i].charAt(0).toUpperCase() + css[i].substr(1)
  }
  return result
}

/**
  * return object
    - define vue-inview object
**/
var vue_inview = function () {}

/**
  * (arg → string, classId → string, callback → function)
    - register inView handler
**/
var _$eventview = function (arg, classId, callback) {
  var view = inView('.' + classId)
  arg === 'on' ? view.on('enter', callback.enter).on('exit', callback.exit) :
  arg === 'once' ? view.once('enter', callback.enter).once('exit', callback.exit) :
  console.warn('[in-view] event handler not found')
}

/**
  * ($m → object{*})
  * return string
    - convert modifiers object as string
**/
var object_modifiers = function ($m) {
  var convert
  var key
  for (key in $m) {
    if ($m.hasOwnProperty(key) && $m[key] === true) {
      if (isDefine(convert)) convert += '.' + key
      else convert = key
    }
  }
  return convert
}

/**
  * (arg → string)
  * return string
    - check and get argument
**/
var $arg = function (arg) {
  var result
  switch (arg) {
    case 'on':
      result = arg
      break
    case 'once':
      result = arg
      break
    case 'class':
      result = arg
      break
    case 'style':
      result = arg
      break
    case 'enter':
      result = arg
      break
    case 'leave':
      result = arg
      break
    case 'animate':
      result = arg
      break  
    default:
      console.warn('[in-view] argument {{$arg}} undefined')
  }
  return result
}

/**
  * (bidd → object{arg → string, modifiers → array}, callback → function)
    - check and call callback action
**/
var defaultAction = function (bidd, callback) {
  if (!isDefine(bidd.arg)) callback()
  if (bidd.arg === 'on' || bidd.arg === 'once' && objLength(bidd.modifiers) === 0) callback()
}

/**
  * (clss → string | object | array, el → dom)
    - add and remove class of element
**/
var object_class = function (clss, el) {
  if (isString(clss)) el.classList.add(clss)
  if (isObject(clss)) {
    var classArr = el.className.split(' ')
    var key
    for (key in clss) {
      if (classArr.indexOf(key) && clss[key] === false) el.classList.remove(key)
      if (clss.hasOwnProperty(key) && clss[key] === true) el.classList.add(key)
    }
  }
  if (isArray(clss)) {
    var i
    for (i = 0;i < clss.length; i++) {
      el.classList.add(clss[i])
    }
  }
}

/**
  * (css →  object | array, el → dom)
    - add and remove style of element
**/
var object_style = function (css, el) {
  var style = el.style
  if (isObject(css)) {
    var key
    for (key in css) {
      if (isDefine(style[cssjs(key)])) style[cssjs(key)] = css[key]
    }
  }
  if (isArray(css)) {
    var size = css.length
    var i
    for (i = 0; i < size; i++){
      if (isDefine(style[cssjs(css[i])])) style[cssjs(css[i])] = ""
    }
  }
}

var animateClass = [
  'bounce', 'flash', 'pulse', 'rubberBand', 'shake', 'headShake', 'swing', 'tada',
  'wobble', 'jello', 'bounceIn', 'bounceInDown', 'bounceInLeft', 'bounceInRight',
  'bounceInUp', 'bounceOut', 'bounceOutDown', 'bounceOutLeft', 'bounceOutRight',
  'bounceOutUp', 'fadeIn', 'fadeInDown', 'fadeInDownBig', 'fadeInLeft', 'fadeInLeftBig',
  'fadeInRight', 'fadeInRightBig', 'fadeInUp', 'fadeInUpBig', 'fadeOut', 'fadeOutDown',
  'fadeOutDownBig', 'fadeOutLeft', 'fadeOutLeftBig', 'fadeOutRight', 'fadeOutRightBig',
  'fadeOutUp', 'fadeOutUpBig', 'flipInX', 'flipInY', 'flipOutX', 'flipOutY', 'lightSpeedIn',
  'lightSpeedOut', 'rotateIn', 'rotateInDownLeft', 'rotateInDownRight', 'rotateInUpLeft', 'rotateInUpRight',
  'rotateOut', 'rotateOutDownLeft', 'rotateOutDownRight', 'rotateOutUpLeft', 'rotateOutUpRight',
  'hinge', 'jackInTheBox', 'rollIn', 'rollOut', 'zoomIn', 'zoomInDown', 'zoomInLeft', 'zoomInRight',
  'zoomInUp', 'zoomOut', 'zoomOutDown', 'zoomOutLeft', 'zoomOutRight', 'zoomOutUp', 'slideInDown', 'slideInLeft',
  'slideInRight', 'slideInUp', 'slideOutDown', 'slideOutLeft', 'slideOutRight', 'slideOutUp'
]
var animate_inverse = function (data) {
  var inverse = [
    ['In', 'Out'],
    ['X', 'Y'],
    ['Down', 'Up'],
    ['Left', 'Right']
  ]
  var i = 0
  var size = inverse.length
  var result
  for (i; i < size; i++) {
    var index = inverse[i]
    if (index.indexOf(data) >= 0) {
      var colm = index.indexOf(data)
      result = colm === 0 ? index[1] : index[0]
    }
  }
  return result
}
var animate_direction = function (an, type) {
  var data = an
  var animate
  var result
  
  if (/^[a-z]+[A-Z][a-z]+$/.test(data)) {
    animate = data.match(/^([a-z]+)([A-Z][a-z]+)$/)
    if (type === 'toggle' && isDefine(animate_inverse(animate[2]))) {
      result = animate[1] + animate_inverse(animate[2])
    }
  }
  if (/^[a-z]+[A-Z][a-z]+[A-Z]$/.test(data)) {
    animate = data.match(/^([a-z]+)([A-Z][a-z]+)([A-Z])$/)
    if (type === 'toggle' && isDefine(animate_inverse(animate[2]))) {
      result = animate[1] + animate_inverse(animate[2])  + animate[3]
    }
    if (type === 'toggle.inverse' && isDefine(animate_inverse(animate[2]))) {
      result = animate[1] + animate_inverse(animate[2])  + (isDefine(animate_inverse(animate[3])) ? animate_inverse(animate[3]) : animate[3])
    }
  }
  if (/^[a-z]+[A-Z][a-z]+[A-Z][a-z]+$/.test(data)) {
    animate = data.match(/^([a-z]+)([A-Z][a-z]+)([A-Z][a-z]+)$/)
    if (type === 'toggle' && isDefine(animate_inverse(animate[2]))) {
      result = animate[1] + animate_inverse(animate[2])  + animate[3]
    }
    if (type === 'toggle.inverse' && isDefine(animate_inverse(animate[2]))) {
      result = animate[1] + animate_inverse(animate[2])  + (isDefine(animate_inverse(animate[3])) ? animate_inverse(animate[3]) : animate[3])
    }
  }
  if (/^[a-z]+[A-Z][a-z]+[A-Z][a-z]+[A-Z][a-z]+$/.test(data)) {
    animate = data.match(/^([a-z]+)([A-Z][a-z]+)([A-Z][a-z]+)([A-Z][a-z]+)$/)
    if (type === 'toggle' && isDefine(animate_inverse(animate[2]))) {
      result = animate[1] + animate_inverse(animate[2])  + animate[3]
    }
    if (type === 'toggle.inverse' && isDefine(animate_inverse(animate[2]))) {
      result = animate[1] + animate_inverse(animate[2])  + (isDefine(animate_inverse(animate[3])) ? animate_inverse(animate[3]) : animate[3]) + 
      (isDefine(animate_inverse(animate[4])) ? animate_inverse(animate[4]) : animate[4])
    }
  }
  return result
}

var object_animation = function (cls, el, mdf) {
  if (isString(cls)) {
    if (isDefine(mdf) && hasClass(el, cls) && mdf !== 'infinite') {
      var rmClass = {}
      rmClass[cls] = false
      object_class(rmClass, el)
      var inverseAnim = animate_direction(cls, mdf)
      if (isDefine(inverseAnim) && animateClass.indexOf(inverseAnim) >= 0){
        object_class(inverseAnim, el)
      }
    } else {
      var inverseAnim = animate_direction(cls, mdf)
      if (isDefine(mdf) && isDefine(inverseAnim) && hasClass(el, inverseAnim)) {
        var rmClass = {}
        rmClass[inverseAnim] = false
        object_class(rmClass, el)
      }
      if (hasClass(el, cls)) {
        var rmClass = {}
        rmClass[cls] = false
        object_class(rmClass, el)
      }
      var animate = !hasClass(el, 'animated') ? ['animated', cls] : cls
      object_class(animate, el)
    }
  }
  if (isArray(cls)) {
    var i = 0
    var size = cls.length
    var iClass
    var animate
    for (i; i < size; i++) {
      console.log(rmClass)
      if (hasClass(el, cls[i])) {
        var rmClass = {}
        rmClass[cls[i]] = false
        iClass = i
        console.log(rmClass)
        object_class(rmClass, el)
      }
    }
    if (isDefine(mdf) && mdf === 'toggle') {
      var getClass = !isDefine(iClass) && size >= 0 ? cls[0] : (iClass + 1) < size ? cls[(iClass + 1)] : cls[0]
      animate = !hasClass(el, 'animated') ? ['animated', getClass] : getClass
    } else {
      animate = !hasClass(el, 'animated') ? cls.push('animated') : cls
    }
    object_class(animate, el)
  }
}

/**
  * (el →  dom, $bd → object{*})
    - inview directive handler
**/
var _$elinview = function (el, $bd) {

  // generate class indetities
  var classId = shortid.generate()
  var elSize = el.classList.length

  // register class element
  el.classList.add(classId)
  createEl.register.push({classid: classId,rawName: $bd.rawName})

  // if directive value not registed
  if (!hasKey(createEl.values, classId) && isDefine($bd.value)) createEl.values[classId] = $bd.value

  // register handler
  var regHdlr = !isDefine($bd.arg) ? 'on' : isDefine($arg($bd.arg)) && $arg($bd.arg) === 'once' ? 'once' : isDefine($arg($bd.arg)) ?
                'on' : 'undefined'

  // create Object for handling element enter and exit
  var funcEvent = Object.create(null)

  // default event handler
  defaultAction($bd, function () {
    if (isDefine(createEl.values[classId]) && isFunc(createEl.values[classId])) createEl.values[classId](funcEvent)
  })
  var _$arg = isDefine($arg($bd.arg)) && $arg($bd.arg) !== 'on' || $arg($bd.arg) === 'once' ? $arg($bd.arg) : 'undefined'
  _$eventview(regHdlr,classId,{
    enter: function(el) {
      var elvalue
      // check the value of the directive has been registered
      if(hasKey(createEl.values,classId)) elvalue = createEl.values[classId]

      // for magic properties
      countEntered += 1
      _element_enter(el, classId)
      // end magic properties

      if (_$arg !== 'undefined' && objLength($bd.modifiers) === 0 && isDefine(elvalue)){
          _$arg === 'class' && object_class(elvalue,el)
          _$arg === 'style' && object_style(elvalue,el)
          _$arg === 'animate' && object_animation(elvalue,el)
          if (_$arg === 'enter') isFunc(elvalue) ? elvalue(el) : console.warn('[in-view:${$bd.expression}] invalid method')
      }

      if (_$arg !== 'undefined' && _$arg === 'animate' && objLength($bd.modifiers) > 0 && isDefine(elvalue)){
        // register modifiers
        var $mdf = object_modifiers($bd.modifiers)
        if ($mdf === 'toggle' || $mdf === 'toggle.inverse') object_animation(elvalue, el, $mdf)
      }
      
      if (_$arg === 'on' || _$arg === 'once' && objLength($bd.modifiers) > 0 && isDefine(elvalue)){
        // register modifiers
        var $mdf = object_modifiers($bd.modifiers)
        // modifiers enter
        if ($mdf === 'enter') isFunc(elvalue) ? elvalue(el) : console.warn('[in-view:${$bd.expression}] invalid method')
        // modifiers class
        $mdf === 'class' && object_class(elvalue, el)
        // modifiers style
        $mdf === 'style' && object_style(elvalue, el)
        // modifiers animate
        $mdf === 'animate' && object_animation(elvalue, el)
      }

      isDefine(funcEvent.enter) && funcEvent.enter(el)
    },
    exit: function (el) {
      var elvalue

      // check the value of the directive has been registered
      if (hasKey(createEl.values,classId)) elvalue = createEl.values[classId]
      // for magic properties
      countExits += 1
      element_exit(el,classId)
      // end magic properties

      if (_$arg !== 'undefined' && isDefine(elvalue)) {
        if (_$arg === 'leave' && objLength($bd.modifiers)===0) isFunc(elvalue) ? elvalue(el) : console.warn('[in-view:${$bd.expression}] invalid method')
        if (objLength($bd.modifiers) > 0 && object_modifiers($bd.modifiers) === 'leave') {
          _$arg === 'class' && object_class(elvalue,el)
          _$arg === 'style' && object_style(elvalue,el)
          _$arg === 'animate' && object_animation(elvalue,el)
        }
        if (_$arg === 'animate' && objLength($bd.modifiers) > 0 && isDefine(elvalue)){
          // register modifiers
          var $mdf = object_modifiers($bd.modifiers)
          if ($mdf === 'toggle' || $mdf === 'toggle.inverse' || $mdf === 'toggle.infinite') object_animation(elvalue,el, $mdf)
        }
      }

      // check if has modifiers
      if (_$arg === 'on' || _$arg === 'once' && objLength($bd.modifiers)>0 && isDefine(elvalue)) {
        // register modifiers
        var $mdf = object_modifiers($bd.modifiers)
        // modifiers leave
        if ($mdf === 'leave') isFunc(elvalue) ? elvalue(el) : console.warn('[in-view:${$bd.expression}] invalid method')
        // leave : class modifiers
        $mdf === 'class.leave' && object_class(elvalue,el)
        // leave : style modifiers
        $mdf === 'style.leave' && object_style(elvalue,el)
        // leave : animate modifiers
        _$arg === 'animate' && object_animation(elvalue,el)
      }
      isDefine(funcEvent.exit) && funcEvent.exit(el)
    }
  })
}

/**
  * return object{ inserted → function(*), componentUpdated: function(*) }
    - directive object
**/
var _directObj = {
  inserted: function (el,$bd) {
    _$elinview(el,$bd)
  },
  componentUpdated: function (el,$bd) {
    var elSize = el.classList.length
    var getclass
    // check the class has been registered
    var i
    for (i = 0; i < elSize; i++) {
      if (isDefine(obsclassreg($bd.rawName)) && obsclassreg($bd.rawName)===el.classList[i]) getclass = el.classList[i]
    }
    if (isDefine(getclass) && isDefine($bd.value)) createEl.values[getclass] = $bd.value
  }
}

/**
  * (el → dom, att → string)
  * return boolen
    - check if has attribute
**/
var hasAtt = function (el, att) {
  var result = false
  if (/^\.[\w]+/.test(att)) {
    var className = att.match(/^\.([\w]+)/)[1]
    var gClass = el.className.split(' ')
    if (gClass.indexOf(className)>-1) {
      result = true
    }
  }
  if (/^\#[\w]+/.test(att)) {
    var idName = att.match(/^\#([\w]+)/)[1]
    if (el.hasAttribute('id') && el.getAttribute('id')===idName) result = true
  }
  if (/^\[[\w]+=\"[\w]+\"\]$/.test(att)) {
    var attr = att.match(/^\[([\w]+)=\"([\w]+)\"\]$/)
    var attName = attr[1]
    var attval = attr[2]
    if (el.hasAttribute(attName) && el.getAttribute(attName)===attval) result = true
  }
  if (/^\[[\w]+=\'[\w]+\'\]$/.test(att)){
    var attr = att.match(/^\[([\w]+)=\'([\w]+)\'\]$/)
    var attName = attr[1]
    var attval = attr[2]
    if (el.hasAttribute(attName) && el.getAttribute(attName)===attval) result = true
  }
  return result
}

/**
  * (update → function)
    - life cycle update
**/
var updateLifeCycle = function (update) {
  var sync = function () {
    update()
    setTimeout(sync,0)
  }
  sync()
}

/**
  * ($arg → string, $opt → object{ * })
    - check and send notification if component has enter or exit
**/
var _$inview = function ($arg, $opt) {
  var lastEnter = 0
  var lastExit = 0
  updateLifeCycle(function () {
    if (isDefine($opt) && isObject($opt) && isString($arg)) {
      if (countEntered > lastEnter) {
        isDefine($opt.enter) && hasAtt(createEl.enter, $arg) && $opt.enter(createEl.enter)
        lastEnter = countEntered
      }
      if (countExits > lastExit) {
        isDefine($opt.exit) && hasAtt(createEl.exit,$arg) && $opt.exit(createEl.exit)
        lastExit = countExits
      }
    }
  })
}

/**
  * ($vm → vue Object)
    - set directive
**/
var _directive = function ($vm) {
  $vm.directive('inview', _directObj)
}

/**
  * ($vm → vue Object)
    - set prototype
**/
var _$methods = function ($vm) {
  $vm.prototype._$inview = _$inview
}

var _install = function (Vue, Option) {
  if (isDefine(Option) && isObject(Option)) inView.offset(Option)
  _directive(Vue)
  _$methods(Vue)
}

vue_inview.install = _install

vue_inview.threshold = function (c) {
  inView.threshold(c)
}

vue_inview.offset = function (c) {
  inView.offset(c)
}

module.exports = vue_inview
