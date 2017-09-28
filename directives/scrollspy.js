import _ from 'lodash'

let scrollSections = []

const bodyScrollEl = {}

// For ff, ie
Object.defineProperty(bodyScrollEl, 'scrollTop', {
  get() {
    return document.body.scrollTop || document.documentElement.scrollTop
  },
  set(val) {
    document.body.scrollTop = val
    document.documentElement.scrollTop = val
  }
})

function init(el) {
  scrollSections = []
  const sections = []

  for (const key in el.children) {
    const child = el.children[key]

    if (child.id) {
      sections.push(child)

      for (const subKey in child.children) {
        const subChild = child.children[subKey]

        if (subChild.id) sections.push(subChild)
      }
    }
  }

  if (sections[0] && sections[0].offsetParent !== el) {
    el[scrollSpyContext].eventEl = window
    el[scrollSpyContext].scrollEl = bodyScrollEl
  }

  for (let i = 0; i < sections.length; i++) {
    if (sections[i].offsetTop >= 0) {
      scrollSections.push({ offset: sections[i].offsetTop, id: sections[i].id })
    }
  }
}

const scrollSpyContext = '@@scrollSpyContext'

export default function install(Vue) {
  Vue.directive('scroll-spy', {
    bind: function (el, binding, vnode) {
      let scrolling = false

      const onScroll = _.throttle(() => {
        if (scrolling) return

        const { scrollEl } = el[scrollSpyContext]
        const pos = scrollEl.scrollTop

        let i = 0
        while (pos >= scrollSections[i].offset) {
          i++
        }

        vnode.context.$store.dispatch('setScroll', scrollSections[i - 1].id)
      }, 50)

      function scrollTo(id) {
        const { scrollEl } = el[scrollSpyContext]
        const current = scrollEl.scrollTop
        const target = scrollSections.find((section) => section.id === id)

        if (!target) return

        scrolling = true

        const time = 100
        const steps = 30
        const timems = parseInt(time / steps)
        const gap = target.offset - current

        for (let i = 0; i <= steps; i++) {
          const pos = current + (gap / steps) * i

          setTimeout(() => {
            scrollEl.scrollTop = pos
          }, timems * i)
        }

        setTimeout(() => {
          scrolling = false
          vnode.context.$router.replace(`#${target.id}`)
        }, timems * steps)
      }

      el[scrollSpyContext] = {
        onScroll,
        scrollTo,
        eventEl: el,
        scrollEl: el
      }

      vnode.context.$store.subscribe((mutation, state) => {
        if (mutation.type === 'SET_SCROLL') vnode.context.$router.replace(`#${mutation.payload}`)
        if (mutation.type === 'UPDATE_SCROLL') scrollTo(mutation.payload)
      })
    },
    inserted: function (el) {
      init(el)

      const { eventEl, onScroll } = el[scrollSpyContext]

      eventEl.addEventListener('scroll', onScroll)

      setTimeout(() => onScroll(), 0)
    },
    componentUpdated: function (el) {
      init(el)
    },
    unbind: function (el) {
      const { eventEl, onScroll } = el[scrollSpyContext]

      eventEl.removeEventListener('scroll', onScroll)
    }
  })
}
