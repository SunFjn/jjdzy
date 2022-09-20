/**
 * tab逻辑控制类
 * @author: lujiahao 
 * @date: 2019-06-17 10:30:03 
 */
class TabController {

    public static HORIZONTAL = "horizontal";
    public static VERTICAL = "vertical";

    private _layoutType = "";

    private _parentBaseView: UIPanelBase | UIModalPanel | fairygui.GComponent;
    private _parent: fairygui.GComponent;
    private _tabCon: fairygui.Controller;
    private _tempContainer: fairygui.GComponent;

    /** 按钮之间的间隔 */
    private _gap: number;
    private _initPos: number;

    public tabBtnList: TabBtnVo[] = [];
    public curPanel: IPanel;

    /** 
     * 如果这个方法返回false，则不能打开对应页面，可用于页面是否点击的判断（也可用使用页签的checkOpen静态方法实现）
     * 参数：
     * @pTabIndex 目标的tabIndex
     * @pTabBtnVo 标签数据代理，注意，这个时候页面还没初始化，拿不到页面的实例化对象，
     *            此时可以用pTabBtnVo.data来设置传入页面的数据，会通过IPanel的openPanel()接口传入页面
     */
    public tabChange: (pTabIndex: number, pTabBtnVo: TabBtnVo) => boolean;
    public tabChangeCaller: any;

    constructor() {
    }

    //=========================================== API ==========================================
    /**
     * 初始化
     * @param pBaseView 父类容器
     * @param pTabCon tab的控制器
     * @param pTabBtns 指定TabButton的数组，默认为空，则会自动遍历容器编入TabButton的数组
     * @param pLayout 排版方向，默认为水平
     */
    public initView(pBaseView: UIPanelBase | UIModalPanel | fairygui.GComponent, pTabCon: fairygui.Controller, pTabBtns: TabButton[] = null, pLayout: string = TabController.HORIZONTAL) {
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

        let t_n = this._parent.numChildren;
        let t_minIndex = t_n - 1;
        if (pTabBtns && pTabBtns.length > 0) { //指定了tab数组
            for (let i = 0; i < pTabBtns.length; i++) {
                let t_btn = pTabBtns[i];
                if (t_btn instanceof TabButton) {
                    let t_vo = new TabBtnVo();
                    t_vo.btn = t_btn;
                    this.tabBtnList.push(t_vo);
                    let t_index = this._parent.getChildIndex(t_btn);
                    if (t_index <= t_minIndex) {
                        t_minIndex = t_index;
                    }
                }
            }
        }
        else { //没有指定tab数组
            for (let i = 0; i < t_n; i++) {
                let t_btn = this._parent.getChildAt(i);
                if (t_btn instanceof TabButton) {
                    let t_vo = new TabBtnVo();
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
        let t_pro = this.getPosPro();
        let t_sizePro = this.getSizePro();

        //根据位置进行重排序，区分竖直位置还是水平位置
        this.tabBtnList.sort((pA: TabBtnVo, pB: TabBtnVo) => {
            if (pA.btn[t_pro] < pB.btn[t_pro])
                return -1;
            else
                return 1;
        });

        for (let i = 0; i < this.tabBtnList.length; i++) {
            this.tabBtnList[i].index = i;
        }

        this._initPos = this.tabBtnList[0].btn[t_pro];

        if (this.tabBtnList.length > 1) {
            this._gap = this.tabBtnList[1].btn[t_pro] - this.tabBtnList[0].btn[t_pro] - this.tabBtnList[0].btn[t_sizePro];
        }
    }

    public set selectedIndex(pIndex: number) {
        this._tabCon.selectedIndex = pIndex;
    }

    public get selectedIndex() {
        return this._tabCon.selectedIndex;
    }

    /**
     * 强制更新某个页签（不建议使用，应该通过子页面自己侦听对应事件来更新页面的数据）
     * @param pIndex 
     */
    public forceUpdate(pIndex: number) {
        this.selectedIndex = -1;
        this.selectedIndex = pIndex;
    }

    public close() {
        if (this.curPanel) {
            this.curPanel.closePanel();
            if (this.curPanel instanceof fairygui.GObject)
                this.curPanel.removeFromParent();
            this.curPanel = null;
        }
    }

    /**
     * 设定页签对应的类
     * @param pPanelClassMap 
     */
    public setPanelClassMap(pPanelClassMap: any[]) {
        for (let i = 0; i < this.tabBtnList.length; i++) {
            this.tabBtnList[i].classDef = pPanelClassMap[i];
        }
    }

    public showOrHideTabBtnByIndex(pIndex: number, pFlag: boolean) {
        let t_vo = this.getTabBtnVoByIndex(pIndex);
        if (!t_vo)
            return;
        if (t_vo.visible == pFlag)
            return;
        t_vo.visible = pFlag;
        this.reLayout();
    }

    public getTabBtnVoByIndex(pIndex: number): TabBtnVo {
        return this.tabBtnList[pIndex];
    }

    /**
     * 通过tabindex获取面板实例化对象（可能为null）
     * @param pIndex 
     */
    public getTabPanelInstByIndex(pIndex: number): IPanel {
        let t_vo = this.getTabBtnVoByIndex(pIndex);
        if (t_vo)
            return t_vo.panelInst;
        else
            return null;
    }

    public getTabBtnByIndex(pIndex: number): TabButton {
        let t_vo = this.getTabBtnVoByIndex(pIndex);
        if (t_vo)
            return t_vo.btn;
    }

    public destroy() {
        this.registerEvent(false);

        this._parentBaseView = null;
        this._parent = null;
        for (let i = this.tabBtnList.length - 1; i >= 0; i--) {
            this.tabBtnList[i].destroy();
        }
        this.tabBtnList.length = 0;
    }

    //===================================== private method =====================================
    private getPosPro(): string {
        let t_pro = "";
        switch (this._layoutType) {
            case TabController.VERTICAL:
                t_pro = "y";
                break;
            default:
                t_pro = "x";
                break;
        }
        return t_pro;
    }

    private getSizePro(): string {
        let t_pro = "";
        switch (this._layoutType) {
            case TabController.VERTICAL:
                t_pro = "height";
                break;
            default:
                t_pro = "width";
                break;
        }
        return t_pro;
    }

    private reLayout() {
        let t_posPro = this.getPosPro();
        let t_sizePro = this.getSizePro();
        let t_posPoint = this._initPos;
        for (let i = 0; i < this.tabBtnList.length; i++) {
            let t_vo = this.tabBtnList[i];
            if (t_vo.visible) {
                t_vo.btn[t_posPro] = t_posPoint;
                t_posPoint += t_vo.btn[t_sizePro] + this._gap;
            }
            t_vo.btn.visible = t_vo.visible;
        }
    }

    public registerEvent(pFlag: boolean) {
        EventUtil.register(pFlag, this._tabCon, fairygui.StateChangeEvent.CHANGED, this.onChangerHandler, this);
    }

    //======================================== handler =========================================
    private _lastTabIndex: number = 0;
    private onChangerHandler(e: fairygui.StateChangeEvent) {
        //============ 这段可以直接复制了 ===================
        if (!(e.currentTarget instanceof fairygui.Controller))
            return;
        let t_selectedIndex = e.currentTarget.selectedIndex;
        if (t_selectedIndex < 0)
            return;

        let t_btnVo = this.getTabBtnVoByIndex(t_selectedIndex);
        let t_canOpen = true;
        do {
            if (this.tabChange != null)
                t_canOpen = this.tabChange.call(this.tabChangeCaller, t_selectedIndex, t_btnVo);
            if (!t_canOpen)
                break;

            let t_cls = t_btnVo.classDef;
            if (t_cls) {
                try {
                    t_canOpen = t_cls.checkOpen(t_btnVo.data);
                } catch (error) {
                    t_canOpen = true;
                }
            }
        } while (false);
        if (!t_canOpen) {
            let t_lastVo = this.getTabBtnVoByIndex(this._lastTabIndex);
            if (t_lastVo && t_lastVo.panelInst)
                e.currentTarget.setSelectedIndex(this._lastTabIndex);
            else
                e.currentTarget.selectedIndex = this._lastTabIndex;
            return;
        }
        this._lastTabIndex = t_selectedIndex;

        let t_targetPanel: IPanel = t_btnVo.panelInst;
        if (!t_targetPanel) {
            let t_cls = t_btnVo.classDef;
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
                this._tempContainer.addChild(<fairygui.GComponent><any>this.curPanel);
            }
            this.curPanel.openPanel(t_btnVo.data);
            t_btnVo.data = null;
        }
    }
}

class TabBtnVo {
    public index: number = -1;
    public btn: TabButton;
    public classDef: any;
    public panelInst: IPanel;
    public data: any;
    public visible: boolean = true;

    public destroy() {
        this.btn = null;
        this.classDef = null;
        this.data = null;

        if (this.panelInst && !this.panelInst['parent']) {
            this.panelInst.dispose();
        }
    }
}