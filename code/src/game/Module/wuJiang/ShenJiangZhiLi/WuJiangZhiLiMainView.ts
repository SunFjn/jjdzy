/**
 * 神将之力主界面
 */
class WuJiangZhiLiMainView extends UIModalPanel{
	public c1: fairygui.Controller;

	private tabArr: TabButton[];
	private _tabContronller: TabController;
	protected _viewParent: fairygui.GObject;

	private heroName : string;
	private heroType : number;
	/**当前神力等级 */
	private godPower : number;
	/**当前的星级 */
	private starLevel : number;
	
	public static URL:string = "ui://zyx92gzwf00b4x";

	public static createInstance():WuJiangZhiLiMainView {
		return <WuJiangZhiLiMainView><any>(fairygui.UIPackage.createObject("wuJiang","WuJiangZhiLiMainView"));
	}

	public constructor() {
		super();
		this.setExtends();
	    this.loadRes("wuJiang","wuJiang_atlas0");
	}

	protected setExtends() {
		let f = fairygui.UIObjectFactory;
		f.setPackageItemExtension(View_WuJiangZhiLi.URL, View_WuJiangZhiLi);
		f.setPackageItemExtension(ChildWuJiangZhiLiSkillUp.URL, ChildWuJiangZhiLiSkillUp);
	}

	protected childrenCreated(): void {
		let s = this;
		GGlobal.createPack("wuJiang");
		s.view = fairygui.UIPackage.createObject("wuJiang","WuJiangZhiLiMainView").asCom;
		s.contentPane = s.view;
		
		CommonManager.parseChildren(s.view, s); 
		s.tabArr = [s["tab0"], s["tab1"]];
		s._tabContronller = new TabController();
		s._tabContronller.initView(s, s.c1);
		s._tabContronller.setPanelClassMap(
			[
				View_WuJiangZhiLi,
				ChildWuJiangZhiLiSkillUp,
			]
		);
		s._tabContronller.tabChange = s.onTabChange;
		s._tabContronller.tabChangeCaller = s;
		super.childrenCreated();
	}

	protected onShown(){
		let s = this;
		s._tabContronller.registerEvent(true);
		let t_selectIndex = 0;
        if (s._args) {
            let t_arg = ~~s._args;
            if (t_arg < 10) {
                t_selectIndex = t_arg;
            }
            else {
                t_selectIndex = 0;
                s._targetId = t_arg;
            }
        }
		s._tabContronller.selectedIndex = -1;
		s._tabContronller.selectedIndex = t_selectIndex;
		let r = GGlobal.reddot;
		r.listen(UIConst.WUJIANGZHILI, s.checkTabNotice, s);
		r.listen(UIConst.WUJIANGZHILI_SKILL, s.checkTabNotice, s);
		GGlobal.control.listen(Enum_MsgType.WUJIANG_SHENGJIANGZHILI, s.checkTabNotice, s);
		GGlobal.control.listen(Enum_MsgType.WUJIANG_SHENGJIANGZHILI_SKILLUP,s.checkTabNotice, s);
		s.checkTabNotice();
	}

	protected onHide(){
		let s = this;
		s._tabContronller.registerEvent(false);
		s._tabContronller.close();
		GGlobal.layerMgr.close(UIConst.WUJIANGZHILI);
		GGlobal.layerMgr.close(UIConst.WUJIANGZHILI_SKILL);
		let r = GGlobal.reddot;
		r.remove(UIConst.WUJIANGZHILI, s.checkTabNotice, s);
		r.remove(UIConst.WUJIANGZHILI_SKILL, s.checkTabNotice, s);
		GGlobal.control.remove(Enum_MsgType.WUJIANG_SHENGJIANGZHILI, s.checkTabNotice, s);
		GGlobal.control.remove(Enum_MsgType.WUJIANG_SHENGJIANGZHILI_SKILLUP,s.checkTabNotice, s);
	}

	private _uidList = [UIConst.WUJIANGZHILI, UIConst.WUJIANGZHILI_SKILL];
	private _targetId = 0;
	private onTabChange(pTabIndex: number, pVo: TabBtnVo): boolean {
		let self = this;
		let arr = this._uidList;
		let t_id = arr[pTabIndex];
		if (!ModuleManager.isOpen(arr[pTabIndex], true)) {
			return false;
		}
		switch (pTabIndex) {
            case 0:
                pVo.data = self._targetId;
                self._targetId = 0;
                break;
        }
		return true;
	}

	private checkTabNotice() {
		let self = this;
		let red = GGlobal.reddot;
		self.tabArr[0].checkNotice = red.checkCondition(UIConst.WUJIANGZHILI, Model_WuJiang.wujiangzhiliType);
		self.tabArr[1].checkNotice = red.checkCondition(UIConst.WUJIANGZHILI_SKILL, Model_WuJiang.wujiangzhiliType);
	}
}