var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * tab逻辑控制类
 * @author: lujiahao
 * @date: 2019-06-17 10:30:03
 */
var TabController = (function () {
    function TabController() {
        this._layoutType = "";
        this.tabBtnList = [];
        //======================================== handler =========================================
        this._lastTabIndex = 0;
    }
    //=========================================== API ==========================================
    /**
     * 初始化
     * @param pBaseView 父类容器
     * @param pTabCon tab的控制器
     * @param pTabBtns 指定TabButton的数组，默认为空，则会自动遍历容器编入TabButton的数组
     * @param pLayout 排版方向，默认为水平
     */
    TabController.prototype.initView = function (pBaseView, pTabCon, pTabBtns, pLayout) {
        if (pTabBtns === void 0) { pTabBtns = null; }
        if (pLayout === void 0) { pLayout = TabController.HORIZONTAL; }
        this._parentBaseView = pBaseView;
        this._tabCon = pTabCon;
        if (pBaseView instanceof UIPanelBase || pBaseView instanceof UIModalPanel) {
            this._parent = pBaseView.view;
        }
        else if (pBaseView instanceof fairygui.GComponent) {
            this._parent = pBaseView;
        }
        if (!this._parent)
            return;
        var t_n = this._parent.numChildren;
        var t_minIndex = t_n - 1;
        if (pTabBtns && pTabBtns.length > 0) {
            for (var i = 0; i < pTabBtns.length; i++) {
                var t_btn = pTabBtns[i];
                if (t_btn instanceof TabButton) {
                    var t_vo = new TabBtnVo();
                    t_vo.btn = t_btn;
                    this.tabBtnList.push(t_vo);
                    var t_index = this._parent.getChildIndex(t_btn);
                    if (t_index <= t_minIndex) {
                        t_minIndex = t_index;
                    }
                }
            }
        }
        else {
            for (var i = 0; i < t_n; i++) {
                var t_btn = this._parent.getChildAt(i);
                if (t_btn instanceof TabButton) {
                    var t_vo = new TabBtnVo();
                    t_vo.btn = t_btn;
                    this.tabBtnList.push(t_vo);
                    if (i <= t_minIndex) {
                        t_minIndex = i;
                    }
                }
            }
        }
        if (this.tabBtnList.length > 0) {
            this._tempContainer = new fairygui.GComponent();
            this._parent.addChildAt(this._tempContainer, t_minIndex);
        }
        this._layoutType = pLayout;
        var t_pro = this.getPosPro();
        var t_sizePro = this.getSizePro();
        //根据位置进行重排序，区分竖直位置还是水平位置
        this.tabBtnList.sort(function (pA, pB) {
            if (pA.btn[t_pro] < pB.btn[t_pro])
                return -1;
            else
                return 1;
        });
        for (var i = 0; i < this.tabBtnList.length; i++) {
            this.tabBtnList[i].index = i;
        }
        this._initPos = this.tabBtnList[0].btn[t_pro];
        if (this.tabBtnList.length > 1) {
            this._gap = this.tabBtnList[1].btn[t_pro] - this.tabBtnList[0].btn[t_pro] - this.tabBtnList[0].btn[t_sizePro];
        }
    };
    Object.defineProperty(TabController.prototype, "selectedIndex", {
        get: function () {
            return this._tabCon.selectedIndex;
        },
        set: function (pIndex) {
            this._tabCon.selectedIndex = pIndex;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * 强制更新某个页签（不建议使用，应该通过子页面自己侦听对应事件来更新页面的数据）
     * @param pIndex
     */
    TabController.prototype.forceUpdate = function (pIndex) {
        this.selectedIndex = -1;
        this.selectedIndex = pIndex;
    };
    TabController.prototype.close = function () {
        if (this.curPanel) {
            this.curPanel.closePanel();
            if (this.curPanel instanceof fairygui.GObject)
                this.curPanel.removeFromParent();
            this.curPanel = null;
        }
    };
    /**
     * 设定页签对应的类
     * @param pPanelClassMap
     */
    TabController.prototype.setPanelClassMap = function (pPanelClassMap) {
        for (var i = 0; i < this.tabBtnList.length; i++) {
            this.tabBtnList[i].classDef = pPanelClassMap[i];
        }
    };
    TabController.prototype.showOrHideTabBtnByIndex = function (pIndex, pFlag) {
        var t_vo = this.getTabBtnVoByIndex(pIndex);
        if (!t_vo)
            return;
        if (t_vo.visible == pFlag)
            return;
        t_vo.visible = pFlag;
        this.reLayout();
    };
    TabController.prototype.getTabBtnVoByIndex = function (pIndex) {
        return this.tabBtnList[pIndex];
    };
    /**
     * 通过tabindex获取面板实例化对象（可能为null）
     * @param pIndex
     */
    TabController.prototype.getTabPanelInstByIndex = function (pIndex) {
        var t_vo = this.getTabBtnVoByIndex(pIndex);
        if (t_vo)
            return t_vo.panelInst;
        else
            return null;
    };
    TabController.prototype.getTabBtnByIndex = function (pIndex) {
        var t_vo = this.getTabBtnVoByIndex(pIndex);
        if (t_vo)
            return t_vo.btn;
    };
    TabController.prototype.destroy = function () {
        this.registerEvent(false);
        this._parentBaseView = null;
        this._parent = null;
        for (var i = this.tabBtnList.length - 1; i >= 0; i--) {
            this.tabBtnList[i].destroy();
        }
        this.tabBtnList.length = 0;
    };
    //===================================== private method =====================================
    TabController.prototype.getPosPro = function () {
        var t_pro = "";
        switch (this._layoutType) {
            case TabController.VERTICAL:
                t_pro = "y";
                break;
            default:
                t_pro = "x";
                break;
        }
        return t_pro;
    };
    TabController.prototype.getSizePro = function () {
        var t_pro = "";
        switch (this._layoutType) {
            case TabController.VERTICAL:
                t_pro = "height";
                break;
            default:
                t_pro = "width";
                break;
        }
        return t_pro;
    };
    TabController.prototype.reLayout = function () {
        var t_posPro = this.getPosPro();
        var t_sizePro = this.getSizePro();
        var t_posPoint = this._initPos;
        for (var i = 0; i < this.tabBtnList.length; i++) {
            var t_vo = this.tabBtnList[i];
            if (t_vo.visible) {
                t_vo.btn[t_posPro] = t_posPoint;
                t_posPoint += t_vo.btn[t_sizePro] + this._gap;
            }
            t_vo.btn.visible = t_vo.visible;
        }
    };
    TabController.prototype.registerEvent = function (pFlag) {
        EventUtil.register(pFlag, this._tabCon, fairygui.StateChangeEvent.CHANGED, this.onChangerHandler, this);
    };
    TabController.prototype.onChangerHandler = function (e) {
        //============ 这段可以直接复制了 ===================
        if (!(e.currentTarget instanceof fairygui.Controller))
            return;
        var t_selectedIndex = e.currentTarget.selectedIndex;
        if (t_selectedIndex < 0)
            return;
        var t_btnVo = this.getTabBtnVoByIndex(t_selectedIndex);
        var t_canOpen = true;
        do {
            if (this.tabChange != null)
                t_canOpen = this.tabChange.call(this.tabChangeCaller, t_selectedIndex, t_btnVo);
            if (!t_canOpen)
                break;
            var t_cls = t_btnVo.classDef;
            if (t_cls) {
                try {
                    t_canOpen = t_cls.checkOpen(t_btnVo.data);
                }
                catch (error) {
                    t_canOpen = true;
                }
            }
        } while (false);
        if (!t_canOpen) {
            var t_lastVo = this.getTabBtnVoByIndex(this._lastTabIndex);
            if (t_lastVo && t_lastVo.panelInst)
                e.currentTarget.setSelectedIndex(this._lastTabIndex);
            else
                e.currentTarget.selectedIndex = this._lastTabIndex;
            return;
        }
        this._lastTabIndex = t_selectedIndex;
        var t_targetPanel = t_btnVo.panelInst;
        if (!t_targetPanel) {
            var t_cls = t_btnVo.classDef;
            if (t_cls) {
                if (t_canOpen) {
                    t_targetPanel = t_cls.createInstance();
                    this._parent.setSize(this._parent.initWidth, this._parent.initHeight);
                    t_targetPanel.initView(this._parent);
                    // this._parentBaseView.resize();
                    t_btnVo.panelInst = t_targetPanel;
                }
            }
        }
        if (this.curPanel != t_targetPanel) {
            if (this.curPanel) {
                this.curPanel.closePanel();
                if (this.curPanel instanceof fairygui.GObject) {
                    this.curPanel.removeFromParent();
                }
            }
            this.curPanel = t_targetPanel;
        }
        if (this.curPanel) {
            if (!this.curPanel["parent"]) {
                this._tempContainer.addChild(this.curPanel);
            }
            this.curPanel.openPanel(t_btnVo.data);
            t_btnVo.data = null;
        }
    };
    TabController.HORIZONTAL = "horizontal";
    TabController.VERTICAL = "vertical";
    return TabController;
}());
__reflect(TabController.prototype, "TabController");
var TabBtnVo = (function () {
    function TabBtnVo() {
        this.index = -1;
        this.visible = true;
    }
    TabBtnVo.prototype.destroy = function () {
        this.btn = null;
        this.classDef = null;
        this.data = null;
        if (this.panelInst && !this.panelInst['parent']) {
            this.panelInst.dispose();
        }
    };
    return TabBtnVo;
}());
__reflect(TabBtnVo.prototype, "TabBtnVo");
