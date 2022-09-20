/** This is an automatically generated class by FairyGUI. Please do not modify it. **/
class ItemYSBOSS extends fairygui.GComponent {

	public n0: fairygui.GImage;
	public n1: fairygui.GLoader;
	public n2: fairygui.GRichTextField;
	public lbName: fairygui.GRichTextField;
	public lbLayer: fairygui.GRichTextField;
	public imgNull: fairygui.GImage;

	public static URL: string = "ui://47jfyc6ehul73m";

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		CommonManager.parseChildren(this, this);
	}

	setdate = (data)=>{
		let rank = data[0];
		let name = data[1];
		let layer = data[2];
		let self = this;
		if(rank < 4){
			self.n1.visible = true;
			self.n1.url = CommonManager.getCommonUrl("rank_" + rank);
			self.n2.text = "";
		}else{
			self.n1.visible = false;
			self.n2.text = rank+"";
		}

		if(name){
			self.lbName.visible = true;
			self.imgNull.visible = false;
			self.lbName.text = name;
		}else{
			self.lbName.visible = false;
			self.imgNull.visible = true;
		}

		self.lbLayer.text = layer+"";
	}
}