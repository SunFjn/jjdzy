class VRunManLayer extends fairygui.GComponent {

	public imgBg: fairygui.GImage;
	public listDrop: fairygui.GList;
	public labDrop: fairygui.GRichTextField;
	public imgFirst: fairygui.GImage;
	public imgPass: fairygui.GImage;
	public labDropFirst: fairygui.GRichTextField;

	public static URL: string = "ui://pkuzcu87nphm2f";

	private awatar: UIRole = null;

	public static createInstance(): VRunManLayer {
		return <VRunManLayer><any>(fairygui.UIPackage.createObject("FuBen", "VRunManLayer"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.imgBg = <fairygui.GImage><any>(this.getChild("imgBg"));
		this.listDrop = <fairygui.GList><any>(this.getChild("listDrop"));
		this.labDrop = <fairygui.GRichTextField><any>(this.getChild("labDrop"));
		this.imgFirst = <fairygui.GImage><any>(this.getChild("imgFirst"));
		this.imgPass = <fairygui.GImage><any>(this.getChild("imgPass"));
		this.labDropFirst = <fairygui.GRichTextField><any>(this.getChild("labDropFirst"));

		this.listDrop.itemRenderer = this.renderHandle;
		this.listDrop.callbackThisObj = this;
	}

	public setVo(layer, cur: VoRunManInfo, max: VoRunManInfo) {
		//每层奖励
		var id
		if (layer <= 100) {
			id = 1 * 1000 + layer
		} else {
			if (layer % 100 == 0) {
				id = Math.floor(layer / 100) * 1000 + 100
			} else {
				id = (Math.floor(layer / 100) + 1) * 1000 + layer % 100
			}
		}
		let curLayer = cur ? Config.ggzj_008[cur.layerId].guan + 1 : 1;
		let maxLayer = max ? Config.ggzj_008[max.layerMaxId].guan : 0;

		var ggzj = Config.ggzj_008[id];


		this.imgPass.visible = curLayer > layer;
		this.imgFirst.visible = !(maxLayer >= layer);
		if (maxLayer >= layer) {
			this._dropReward = ggzj ? ConfigHelp.makeItemListArr(JSON.parse(ggzj.bd1)) : [];
			this.labDrop.text = "第" + layer + "关 通关奖励";
			this.labDropFirst.text = ""
		} else {
			this._dropReward = ggzj ? ConfigHelp.makeItemListArr(JSON.parse(ggzj.award)) : [];
			this.labDropFirst.text = "第" + layer + "关";
			this.labDrop.text = "";
		}
		this.listDrop.numItems = this._dropReward.length;

		if (!this.awatar) {
			this.awatar = UIRole.create();
			this.awatar.setPos(this.imgBg.x, this.imgBg.y + 10);
			this.awatar.setScaleXY(1, 1);
		}
		let v = Config.NPC_200[ggzj.boss]

		this.awatar.setBody(v.mod);
		if (v.weapon) {
			this.awatar.setWeapon(v.mod);
		} else {
			this.awatar.setWeapon(null);
		}
		this.addChild(this.imgPass);

		this.awatar.uiparent = this.displayListContainer;
		this.awatar.onAdd();


	}

	private renderHandle(index: number, obj: fairygui.GObject): void {
		var item: ViewGrid = obj as ViewGrid;
		var v = this._dropReward[index]
		item.isShowEff = true;
		item.vo = v;
		item.tipEnabled = true;
	}

	private _dropReward: IGridImpl[]

	public removeListen(): void {
		if (this.awatar) {
			this.awatar.onRemove();
			this.awatar = null;
		}
		this.listDrop.numItems = 0;
	}
}