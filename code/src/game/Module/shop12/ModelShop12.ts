/**
 * 双12商城管理器
 * @author: lujiahao 
 * @date: 2019-11-28 10:15:47 
 */
class ModelShop12 extends BaseModel {
    constructor() {
        super();
    }

    private _shopVoMap: { [id: number]: VoShop12 } = {};
    /** 购物车map表 */
    public shopCartMap: { [id: number]: number } = {};
    private _shopCartChangeFlag = false;

    private _setupFlag = false;
    public setup() {
        if (this._setupFlag)
            return;
        this._setupFlag = true;

        {
            let t_cfg = Config.s12sc_771;
            for (let k in t_cfg) {
                let t_id = ~~k;
                let t_vo = new VoShop12();
                t_vo.id = t_id;
                this._shopVoMap[t_id] = t_vo;
            }
        }
    }
    //========================================= 协议相关 ========================================
    //协议处理
    public listenServ(mgr: WebSocketMgr) {
        this.socket = mgr;
        //注册GC方法
        mgr.regHand(10700, this.GC_DoubleTwelveShop_openUI_10700, this);
        mgr.regHand(10702, this.GC_DoubleTwelveShop_buyItems_10702, this);
    }

    /**10700 [I-I] 打开界面返回 [I:商品idI:商品可购买次数] 商品列表itemInfos*/
    public GC_DoubleTwelveShop_openUI_10700(self: ModelShop12, data: BaseBytes): void {
        let t_change = false;

        let len = data.readShort();
        for (let i = 0; i < len; i++) {
            let arg1 = data.readInt();
            let arg2 = data.readInt();

            let t_vo = self.getShopVoById(arg1);
            if (t_vo && t_vo.update({ buyCount: arg2 })) {
                t_change = true;
            }
        }

        if (t_change) {
            GGlobal.control.notify(Enum_MsgType.SHOP12_UPDATE);
        }
    }

    /**10701 [I-I] 购买商品 [I:商品idI:购买数量]商品信息itemInfos*/
    public CG_DoubleTwelveShop_buyItems_10701(): void {
        let t = this;
        let t_goodList = [];
        for (let k in t.shopCartMap) {
            let t_id = ~~k;
            let t_count = t.shopCartMap[k];
            if (t_count > 0)
                t_goodList.push([t_id, t_count]);
        }
        var bates = this.getBytes();
        var len = t_goodList.length;
        bates.writeShort(len);
        for (let i = 0; i < len; i++) {
            bates.writeInt(t_goodList[i][0]);
            bates.writeInt(t_goodList[i][1]);
        }
        this.sendSocket(10701, bates);
    }

    /**10702 B 购买商品返回 B:状态:0-成功,1-失败state*/
    public GC_DoubleTwelveShop_buyItems_10702(self: ModelShop12, data: BaseBytes): void {
        let arg1 = data.readByte();
        switch (arg1) {
            case 0:
                //成功购买后重新请求数据
                GGlobal.modelActivity.CG_OPENACT(UIConst.ACTCOM_SHOP12);
                //购买成功后清空购物车
                self.clearShopCart();
                break;
            case 1:
                ViewCommonWarn.text("配置不存在");
                break;
            case 2:
                ViewCommonWarn.text("已达限购次数");
                break;
            case 3:
                ViewCommonWarn.text("抵金券不足");
                break;
            case 4:
                ViewCommonWarn.text("元宝不足");
                break;
            case 5:
                ViewCommonWarn.text("参数错误");
                break;
        }
    }

    //=========================================== API ==========================================
    /**
     * 添加进购物车
     * @param pId 
     * @param pCount 
     */
    public addToShopCart(pId: number, pCount: number) {
        let t = this;
        let t_oldCount = ~~t.shopCartMap[pId];
        if (t_oldCount != pCount) {
            t.shopCartMap[pId] = pCount;
            t._shopCartChangeFlag = true;

            GGlobal.control.notify(Enum_MsgType.SHOP12_CART_CHANGE);
        }
    }

    /** 清空购物车 */
    public clearShopCart() {
        let t = this;
        let t_change = false;
        for (let k in t.shopCartMap) {
            let t_old = t.shopCartMap[k];
            if (t_old != 0) {
                t.shopCartMap[k] = 0;
                t_change = true;
                t._shopCartChangeFlag = true;
            }
        }
        if (t_change) {
            GGlobal.control.notify(Enum_MsgType.SHOP12_CART_CLEAR);
        }
    }

    private _shopCartList: number[][] = [];
    public getShopCartList(): number[][] {
        let t = this;
        if (t._shopCartChangeFlag) {
            t._shopCartChangeFlag = false;
            t._shopCartList.length = 0;
            for (let k in t.shopCartMap) {
                let t_id = ~~k;
                let t_value = ~~t.shopCartMap[k];
                if (t_value > 0) {
                    t._shopCartList.push([t_id, t_value]);
                }
            }
        }
        return t._shopCartList;
    }

    /** 获取当前活动期数 */
    public getCurQs(): number {
        let t_actVo = GGlobal.modelActivity.getActivityByID(UIConst.ACTCOM_SHOP12);
        if (t_actVo)
            return t_actVo.qs;
        else
            return 1;
    }

    public getShopVoById(pId: number): VoShop12 {
        return this._shopVoMap[pId];
    }

    private _shopVoListMap: { [qs: number]: VoShop12[] } = {};
    /** 获取商品数据列表 */
    public getShopVoList(): VoShop12[] {
        let t = this;
        let t_qs = t.getCurQs();
        let t_list = t._shopVoListMap[t_qs];
        if (t_list === undefined) {
            t._shopVoListMap[t_qs] = t_list = [];
            for (let k in t._shopVoMap) {
                let t_vo = t._shopVoMap[k];
                if (t_vo && t_vo.cfg.qs == t_qs) {
                    t_list.push(t_vo);
                }
            }
        }
        return t_list;
    }

    private _discountListMap: { [qs: number]: Is12yh_771[] } = {};
    /** 获取优惠列表 */
    public getDiscountCfgList(): Is12yh_771[] {
        let t = this;
        let t_qs = t.getCurQs();
        let t_list = t._discountListMap[t_qs];
        if (t_list === undefined) {
            t._discountListMap[t_qs] = t_list = [];
            let t_cfg = Config.s12yh_771;
            for (let k in t_cfg) {
                if (t_cfg[k].qs == t_qs) {
                    t_list.push(t_cfg[k]);
                }
            }
        }
        return t_list;
    }
    //===================================== private method =====================================
    //======================================== handler =========================================
}