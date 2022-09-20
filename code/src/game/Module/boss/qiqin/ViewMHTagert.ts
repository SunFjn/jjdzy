/** This is an automatically generated class by FairyGUI. Please do not modify it. **/
class ViewMHTagert extends UIModalPanel {

	public frame: fairygui.GComponent;
	public lst: fairygui.GList;

	public static URL: string = "ui://47jfyc6eg50q19";

	public static createInstance(): ViewMHTagert {
		return <ViewMHTagert><any>(fairygui.UIPackage.createObject("Boss", "ViewMHTagert"));
	}

	public constructor() {
		super();
		this.loadRes("Boss", "Boss_atlas0");
	}

	protected childrenCreated(): void {
		GGlobal.createPack("Boss");
		this.view = fairygui.UIPackage.createObject("Boss", "ViewMHTagert").asCom;
		this.contentPane = this.view;

		this.frame = <fairygui.GLabel><any>(this.view.getChild("frame"));
		this.lst = <fairygui.GList><any>(this.view.getChild("lst"));
		this.lst.itemRenderer = this.onRender;
		this.lst.callbackThisObj = this;
		this.lst.setVirtual();
		this.resetPosition();
		super.childrenCreated();
	}

	private onRender(index, obj) {
		var item: MHTargetItem = obj as MHTargetItem;
		item.setdata(this.lstDta[index]);
	}

	private lstDta: any[];
	private update() {
		this.lstDta = GGlobal.modelBoss.tagDta.concat();
		this.lstDta = this.lstDta.sort(function (a, b) {
			return getSort(a) < getSort(b) ? -1 : 1;
			function getSort(vo) {
				let st = vo.state;
				let id = vo.id;
				if (st == 1) {
					return id - 10000;
				} else if (st == 0) {
					return id - 1000;
				} else if (st == 2) {
					return id;
				}
			}
		});
		this.lst.numItems = this.lstDta.length;
	}

	protected onShown() {
		GGlobal.modelBoss.CG_MHTARGET_1715();
		GGlobal.control.listen(Enum_MsgType.MH_TAGERT, this.update, this);
	}

	protected onHide() {
		this.lst.numItems = 0;
		GGlobal.layerMgr.close(UIConst.MHAWARDS);
		GGlobal.control.remove(Enum_MsgType.MH_TAGERT, this.update, this);
	}

	public resetPosition(): void {
		this.setXY((fairygui.GRoot.inst.width - this.width) >> 1, (fairygui.GRoot.inst.height - this.height) >> 1);
	}
}