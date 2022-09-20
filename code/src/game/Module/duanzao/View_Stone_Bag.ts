class View_Stone_Bag extends UIModalPanel {

	public list: fairygui.GList;
	public curMsgLb: fairygui.GRichTextField;
	public nextMsgLb: fairygui.GRichTextField;
	public curGrid: ViewGrid;
	public nextGrid: ViewGrid;
	public xqBt: Button1;
	public hcBt: Button0;
	public keyhcBt: Button1;
	public delBt: Button0;
	public nameLb0: fairygui.GRichTextField;
	public nameLb1: fairygui.GRichTextField;
	public curGroup: fairygui.GGroup;
	public nextGroup: fairygui.GGroup;

	public static URL: string = "ui://pofv8989pzg76";

	public constructor() {
		super();
		this.loadRes();
	}

	protected childrenCreated(): void {
		let a = this;
		a.view = fairygui.UIPackage.createObject("DuanZao", "View_Stone_Bag").asCom;
		a.contentPane = a.view;
		a.list = <fairygui.GList><any>(a.view.getChild("list"));
		a.list.callbackThisObj = a;
		a.list.itemRenderer = a.renderHandle;
		a.list.setVirtual();
		a.list.addEventListener(fairygui.ItemEvent.CLICK, a.listHandle, a);
		a.curMsgLb = <fairygui.GRichTextField><any>(a.view.getChild("curMsgLb"));
		a.nextMsgLb = <fairygui.GRichTextField><any>(a.view.getChild("nextMsgLb"));
		a.curGrid = <ViewGrid><any>(a.view.getChild("curGrid"));
		a.nextGrid = <ViewGrid><any>(a.view.getChild("nextGrid"));
		a.xqBt = <Button1><any>(a.view.getChild("xqBt"));
		a.hcBt = <Button0><any>(a.view.getChild("hcBt"));
		a.delBt = <Button0><any>(a.view.getChild("delBt"));
		a.keyhcBt = <Button1><any>(a.view.getChild("keyhcBt"));
		a.curGroup = <fairygui.GGroup><any>(a.view.getChild("curGroup"));
		a.nextGroup = <fairygui.GGroup><any>(a.view.getChild("nextGroup"));
		a.nameLb0 = <fairygui.GRichTextField><any>(a.view.getChild("nameLb0"));
		a.nameLb1 = <fairygui.GRichTextField><any>(a.view.getChild("nameLb1"));
		super.childrenCreated();
		a.xqBt.addClickListener(a.xqHandle, a);
		a.hcBt.addClickListener(a.hcHandle, a);
		a.keyhcBt.addClickListener(a.keyhcHandle, a);
		a.delBt.addClickListener(a.delHandle, a);
	}

	private delHandle(): void {
		GGlobal.modelDuanZao.CG_DUANZAO_STONE_DEL(this.equipVo.type, this._args.stonePart + 1, this.curItem.vo.id);
	}

	private listHandle(event: fairygui.ItemEvent): void {
		let grid: ViewGridRender = event.itemObject as ViewGridRender;
		if (!grid.vo) return;
		if (grid.data == this.curItem.data) return;
		if (this.curItem) this.curItem.choose = false;
		grid.choose = true;
		this.curItem = grid;
		this.updateGrid();
	}

	private keyhcHandle(): void {
		//一键合成宝石
		if (this.keyhcBt.checkNotice) {
			GGlobal.modelDuanZao.CG_DUANZAO_KEY_HECHENG(this.curItem.vo.id);
		} else {
			ViewCommonWarn.text("宝石不足无法合成");
		}
	}

	private hcHandle(): void {
		if (this.stoneVo && this.curItem.data == 0) {
			if (this.hcBt.checkNotice) {
				let vo: VoItem = this.curItem.vo as VoItem;
				GGlobal.modelDuanZao.CG_DUANZAO_STONEID_HECHENG_BYEQUIP(this.curItem.vo.id, this.equipVo.type, this._args.stonePart + 1);
			} else {
				ViewCommonWarn.text("宝石不足无法合成");
			}
		} else {
			if (this.curItem.vo.count > 1) {
				GGlobal.modelDuanZao.CG_DUANZAO_STONEID_HECHENG(this.curItem.vo.id);
			} else {
				ViewCommonWarn.text("宝石不足无法合成");
			}
		}
	}

	private xqHandle(): void {
		if (this.curGrid.vo.id == this._args.stoneId) {
			ViewCommonWarn.text("更换的宝石和当前镶嵌的宝石一样");
			return;
		}
		GGlobal.modelDuanZao.CG_DUANZAO_STONE_EQUIP(this.equipVo.type, this._args.stonePart + 1, this.curGrid.vo.id);
	}

	private renderHandle(index: number, obj: fairygui.GObject): void {
		let grid: ViewGridRender = obj as ViewGridRender;
		grid.data = index;
		grid.tipEnabled = false;
		grid.isinsert = false;
		if (this.stoneVo) {
			if (index == 0) {
				grid.vo = this.stoneVo;
			} else {
				if (index - 1 < this.itemArr.length) {
					grid.vo = this.itemArr[index - 1];
				} else {
					grid.vo = null;
				}
			}
			if (index - 1 < this.itemArr.length) {
				if (index > 0) {
					grid.showNotice = grid.vo.count > 1;
				} else if (this._args.stoneId > 0 && index == 0) {
					grid.isinsert = true;
					grid.showNotice = Model_Bag.getItemCount(this._args.stoneId) > 0;
				}
			}
		} else {
			if (index < this.itemArr.length) {
				grid.vo = this.itemArr[index];
				grid.showNotice = grid.vo.count > 1;
				grid.isinsert = false;
			} else {
				grid.vo = null;
			}
		}

		if ((!this.curItem || !this.curItem.vo || this.curItem.data >= this.list.numItems) && index == this._sel) {
			if (this.curItem) this.curItem.choose = false;
			grid.choose = true;
			this.curItem = grid;
		}
	}

	private equipVo: VoEquip;
	private curItem: ViewGridRender;
	private itemArr: Array<VoItem> = [];
	private stoneVo: VoItem;
	public updateShow(): void {
		let len = Model_Bag.gemList.length;
		this.itemArr = [];
		for (let i = 0; i < len; i++) {
			let cfg = Config.dzgem_209[Model_Bag.gemList[i].id];
			if (cfg.position == this._args.stonePart + 1) {
				this.itemArr.push(Model_Bag.gemList[i]);
			}
		}
		this.stoneVo = null;
		this.equipVo = this._args.equipVo;
		let num;
		if (this._args.stoneId > 0) {
			this.stoneVo = VoItem.create(this._args.stoneId);
			num = this.itemArr.length + 1;
		} else {
			num = this.itemArr.length;
		}

		let sel = 0;
		for (let i = num - 1; i >= 0; i--) {
			if(i == 0)break;
			let v
			if (this._args.stoneId > 0) {
				v = this.itemArr[i - 1];
			} else {
				v = this.itemArr[i]
			}
			if (v.count > 1) {
				sel = i;
				break;
			}
		}
		if (this.curItem) { this.curItem.choose = false; this.curItem = null }
		this._sel = sel;

		if (num < 15) {
			this.list.numItems = num = 15;
		} else {
			this.list.numItems = Math.ceil(num / 5) * 5;
		}

		this.list.scrollToView(Math.floor(sel / 5) * 5);

		this.updateGrid();
	}
	private _sel = 0;

	public updateGrid(): void {
		if (!this.curItem || !this.curItem.vo) {
			this.nextGroup.visible = this.curGroup.visible = false;
			this.curGrid.isinsert = false;
		} else {
			this.curGroup.visible = true;
			this.curGrid.vo = this.curItem.vo;
			let curVo: VoItem = this.curGrid.vo as VoItem;
			let curCfg = Config.dzgem_209[curVo.id];
			this.nameLb0.text = curVo.name;
			this.nameLb0.color = curVo.qColor;
			this.curMsgLb.text = "战力：" + curCfg.power + "\n" + curVo.cfg.miaoshu;
			if (curCfg.next > 0) {
				this.nextGroup.visible = true;
				let nextVo: VoItem = VoItem.create(curCfg.next);
				this.nextGrid.vo = nextVo;
				let nextCfg = Config.dzgem_209[nextVo.id];
				this.nameLb1.text = nextVo.name;
				this.nameLb1.color = nextVo.qColor;
				this.nextMsgLb.text = "战力：" + nextCfg.power + "\n" + nextVo.cfg.miaoshu;
			} else {
				this.nextGroup.visible = false;
			}
			this.xqBt.visible = this.delBt.visible = this.keyhcBt.visible = true;
			if (this.stoneVo) {
				if (this.curItem.data > 0) {
					this.delBt.visible = false;
					this.curGrid.isinsert = false;
					this.keyhcBt.checkNotice = this.hcBt.checkNotice = this.curItem.vo.count >= curCfg.consume;
				} else {
					this.xqBt.visible = this.keyhcBt.visible = false;
					this.curGrid.isinsert = true;
					this.hcBt.checkNotice = Model_Bag.getItemCount(this.curItem.vo.id) >= curCfg.consume - 1;
				}
			} else {
				this.delBt.visible = false;
				this.curGrid.isinsert = false;
				this.keyhcBt.checkNotice = this.hcBt.checkNotice = this.curItem.vo.count >= curCfg.consume;
			}
		}
	}

	public getStoneHandle(vo: VoItem, self: any): boolean {
		if (vo.type == 4 || vo.type == 5 || vo.type == 6 || vo.type == 7) {
			let pos: number = Config.dzgem_209[vo.id].position;
			if (pos == self._args.stonePart + 1) {
				return true;
			}
		}

		return false;
	}

	public updateGemBag(value: any = null): void {
		//自动选中最小的可合成的
		// if (this.curItem) {
		// 	let index:number = this.curItem.data
		// 	let nextItem:ViewGridRender = null;
		// 	for (let i = 0; i < this.list._children.length; i++) {
		// 		let item = this.list._children[i] as ViewGridRender;
		// 		if (Number(item.data) == index - 1) {
		// 			nextItem = item
		// 			break;
		// 		}
		// 	}
		// 	if(nextItem){
		// 		this.curItem.choose = false;
		// 		this.curItem = nextItem
		// 		this.curItem.choose = true;
		// 	}
		// }
		if (value) this._args = value;
		this.updateShow();
	}

	protected onShown(): void {
		this.updateShow();
		GGlobal.control.listen(Enum_MsgType.DUANZAO_STONEBAG_UPDATE, this.updateGemBag, this);
	}

	protected onHide(): void {
		GGlobal.layerMgr.close(UIConst.DUANZAO_STONE_BAG);
		this.list.numItems = 0;
		if (this.curItem) this.curItem.choose = false;
		this.curItem = null;
		GGlobal.control.remove(Enum_MsgType.DUANZAO_STONEBAG_UPDATE, this.updateGemBag, this);
	}

	public resetPosition(): void {
		super.resetPosition();
	}
}