Component({
  options: {
    addGlobalClass: true,
  },
  data: {
    selected: 0,
    list: [{
      pagePath: "/pages/index/index",
      iconPath: "/images/tabbar/basics.png",
      selectedIconPath: "/images/tabbar/basics_cur.png",
      text: "量化策略"
    },
    {
      pagePath: "/pages/single/single",
      iconPath: "/images/tabbar/component.png",
      selectedIconPath: "/images/tabbar/component_cur.png",
      text: "量化理论"
    },
      {
        pagePath: "/pages/strategy/strategy",
        iconPath: "/images/tabbar/plugin.png",
        selectedIconPath: "/images/tabbar/plugin_cur.png",
        text: "热门讨论"
      },
      {
        pagePath: "/pages/about/about",
        iconPath: "/images/tabbar/about.png",
        selectedIconPath: "/images/tabbar/about_cur.png",
        text: "个人中心"
      }
    ]
  },
  methods: {
    switchTab(e) {
      const url = e.currentTarget.dataset.path
      wx.switchTab({
        url
      })
    }
  },
  pageLifetimes: {
  },
})