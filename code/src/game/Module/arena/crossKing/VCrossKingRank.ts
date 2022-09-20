class VCrossKingRank extends fairygui.GComponent {

	public lbRank:fairygui.GTextField;
	public lbName:fairygui.GTextField;
	public imgRank:fairygui.GLoader;

	public static URL:string = "ui://me1skowlhfct41";

	public static createInstance():VCrossKingRank {
		return <VCrossKingRank><any>(fairygui.UIPackage.createObject("crossKing","VCrossKingRank"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.lbRank = <fairygui.GTextField><any>(this.getChild("lbRank"));
		this.lbName = <fairygui.GTextField><any>(this.getChild("lbName"));
		this.imgRank = <fairygui.GLoader><any>(this.getChild("imgRank"));
	}


	public set vo(v:Vo_CrossKingPly){
		this.lbName.text = v.name;
		
		if(v.rank > 3){
			this.lbRank.text = "" + v.rank
			this.imgRank.visible = false;
		}else{
			this.lbRank.text = ""
			this.imgRank.visible = true;
			// if(v.rank == 1){
			// 	this.imgRank.url = "ui://yqpfulefqxiv1c"
			// }else if(v.rank == 2){
			// 	this.imgRank.url = "ui://yqpfulefqxiv1d"
			// }else{
			// 	this.imgRank.url = "ui://yqpfulefqxiv1e"
			// }
			this.imgRank.url = CommonManager.getCommonUrl("rank_" + v.rank);
		}
	}
}