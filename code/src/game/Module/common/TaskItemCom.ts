class TaskItemCom extends fairygui.GComponent {

	//>>>>start
	public tfName: fairygui.GRichTextField;
	public imageIcon: fairygui.GLoader;
	public tfValue: fairygui.GRichTextField;
	//>>>>end

	public static URL: string = "ui://jvxpx9emo8ip29";

	public vo: IGridImpl;

	public static createInstance(): TaskItemCom {
		return <TaskItemCom><any>(fairygui.UIPackage.createObject("actHolyBeast", "TaskItemCom"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		CommonManager.parseChildren(this, this);
	}

	//=========================================== API ==========================================
	public setData(pVo: IGridImpl) {
		this.vo = pVo;
		if (pVo) {
			this.tfName.text = HtmlUtil.font(pVo.name, pVo.qColor);
			this.tfValue.text = pVo.count + "";

			ImageLoader.instance.loader(Enum_Path.ICON70_URL + pVo.icon + ".png", this.imageIcon);

			EventUtil.register(true, this.imageIcon, egret.TouchEvent.TOUCH_TAP, this.onIconClick, this);
		}
		else {
		}
	}

	public dispose() {
		EventUtil.register(false, this.imageIcon, egret.TouchEvent.TOUCH_TAP, this.onIconClick, this);
		super.dispose();
	}

	//===================================== private method =====================================
	private onIconClick(e: egret.TouchEvent) {
		if (this.vo) {
			FastAPI.showItemTips(this.vo);
		}
	}
	//======================================== handler =========================================
}