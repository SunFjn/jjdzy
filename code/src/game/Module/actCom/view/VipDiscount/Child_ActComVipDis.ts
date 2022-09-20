/**
 * vip折扣活动
 */
class Child_ActComVipDis extends fairygui.GComponent implements IPanel{
	public list: fairygui.GList;
	private datas: Ixhdvip_402[] = [];
    public timeTxt: fairygui.GRichTextField;
    private _act;
    private _sortDta = [];
    private _vip:number = 0;

	public static URL: string = "ui://mpjztentog19r";

	/** 设置包名（静态属性） */
    public static pkg = "actComVipDis";
    /** 绑定ui的方法（静态方法） */
    public static setExtends() {
        //子类ui组件的绑定放在这里，此类就不用绑定了，在上层已经自动实现
        fairygui.UIObjectFactory.setPackageItemExtension(VipDiscountItem.URL, VipDiscountItem);
    }

	public static createInstance(): Child_ActComVipDis {
        return <Child_ActComVipDis><any>(fairygui.UIPackage.createObject("actComVipDis", "Child_ActComVipDis"));
    }

	public constructor() {
		super();
	}

	protected _viewParent: fairygui.GObject;
    initView(pParent: fairygui.GObject) {
        let self = this;
        this._viewParent = pParent;
        this.addRelation(this._viewParent, fairygui.RelationType.Size);

		self.list.callbackThisObj = self;
		self.list.itemRenderer = self.tabHD;
    }

	openPanel(pData?: any) {
        let self = this;
        self.datas = [];
        var role: Vo_Player = Model_player.voMine;
        for (let key in Config.xhdvip_402) {
            let cfg:Ixhdvip_402 = Config.xhdvip_402[key];
            if(role.viplv + 3 >= cfg.ID)
            {
                self.datas.push(Config.xhdvip_402[key]);
            }
        }
        // self.list.numItems = self.datas.length;
        self._act =pData// GGlobal.modelActivity.get(UIConst.ACTCOM, UIConst.ACTCOM_VIPZK);
        GGlobal.modelVipDiscount.CG_OPEN_UI();
        GGlobal.control.listen(UIConst.ACTCOM_VIPZK, self.updateChildShow, self);
        Timer.instance.listen(this.onUpdate, this);
    }

    closePanel(pData?: any) {
        let self = this;
        self.datas = [];
        GGlobal.control.remove(UIConst.ACTCOM_VIPZK, self.updateChildShow, self);
        Timer.instance.remove(this.onUpdate, this);
    }

	protected constructFromXML(xml: any): void {
        super.constructFromXML(xml);
        let s = this;
		CommonManager.parseChildren(s, s);
    }

    private onUpdate() {
		const end = this._act ? this._act.end : 0;
		const servTime = Model_GlobalMsg.getServerTime() / 1000 >> 0;
		if (end - servTime > 0) {
			this.timeTxt.text = "剩余时间：<font color='#15f234'>" + DateUtil.getMSBySecond4(end - servTime) + "</font>";
		} else {
			this.timeTxt.text = "00:00:00";
		}
	}

    private tabHD(idx, obj) {
		let item: VipDiscountItem = obj as VipDiscountItem;
        item.setdata(this.datas[idx], this._vip == this.datas[idx].ID);
	}

    /**
     * 更新页面数据 
     */
    private updateChildShow(vip:number = 0) {
        let self = this;
        self._vip = vip;
        // let noGetArr = [];//可领取数组
        // let hasGetArr = [];//已领取数组
        // let len:number = self.datas.length;
        // for(let i:number = 0;i < len;i ++)
        // {
        //     let cfg:Ixhdvip_402 = self.datas[i];
        //     let vo:Vo_VipDisData = Model_VipDiscount.getVipDisData(cfg.ID);
        //     if(!vo)
        //     {
        //         noGetArr.push(cfg);
        //     }else{
        //         if(vo.buyCount < cfg.time)
        //         {
        //             noGetArr.push(cfg);
        //         }else
        //         {
        //             hasGetArr.push(cfg);
        //         }
        //     }
        // }
        // self._sortDta = noGetArr.concat(hasGetArr);
        self.list.numItems = self.datas.length;
    }

}