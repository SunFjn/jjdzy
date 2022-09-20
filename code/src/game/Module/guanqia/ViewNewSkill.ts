/** This is an automatically generated class by FairyGUI. Please do not modify it. **/
class ViewNewSkill extends UIModalPanel {

	public n0: fairygui.GLoader;
	public headImg: fairygui.GLoader;
	public lbName: fairygui.GRichTextField;

	public static URL: string = "ui://r92dp953h0ag1q";

	public static createInstance(): ViewNewSkill {
		return <ViewNewSkill><any>(fairygui.UIPackage.createObject("guanqia", "ViewNewSkill"));
	}

	public constructor() {
		super();
		this.isShowOpenAnimation = false;
		this.loadRes("guanqia", "guanqia_atlas0");
	}

	protected childrenCreated(): void {
		GGlobal.createPack("guanqia");
		let s = this;
		s.view = fairygui.UIPackage.createObject("guanqia", "ViewNewSkill").asCom;
		s.contentPane = s.view;

		s.n0 = <fairygui.GLoader><any>(s.view.getChild("n0"));
		s.headImg = <fairygui.GLoader><any>(s.view.getChild("headImg"));
		s.lbName = <fairygui.GRichTextField><any>(s.view.getChild("lbName"));
		super.childrenCreated();
	}

	protected onShown() {
		let vo = this._args;
		let midX = (640 - this.width)>>1;
		let lib = vo.cfg;
		IconUtil.setImg1(Enum_Path.PIC_URL+ "skillbg.png", this.n0);
		IconUtil.setImg(this.headImg, Enum_Path.SKILL_URL + lib.icon + ".png");
		this.lbName.text = lib.n;
		let endX =  - this.width; 
		this.setXY(640+this.width, App.stage.stageHeight * 0.6);
		egret.Tween.get(this).to({ x: midX }, 300, egret.Ease.backInOut).wait(1000).to({ x: endX }, 300, egret.Ease.backIn).call(this.closeHD, this);
	}

	protected onHide() {
		GGlobal.layerMgr.close(UIConst.NEWSKILL);
		IconUtil.setImg(this.headImg, null);
		IconUtil.setImg1(null, this.n0);
		IconUtil.setImg(this.headImg, null);
	}

	private closeHD(){
		this.doHideAnimation();
	}
}