/**
 * @author: lujiahao 
 * @date: 2019-10-28 16:23:30 
 */
class ViewResource2 extends fairygui.GLabel {

    //>>>>start
	//>>>>end

    public static URL: string = "ui://jvxpx9emtaxk3gl";

    public static createInstance(): ViewResource2 {
        return <ViewResource2><any>(fairygui.UIPackage.createObject("common", "ViewResource2"));
    }

    public constructor() {
        super();
    }

    protected constructFromXML(xml: any): void {
        super.constructFromXML(xml);
        CommonManager.parseChildren(this, this);
    }

    //=========================================== API ==========================================
    public setCount(v: any) {
		this.text = v + "";
    }
    
    public setLb(hascount: any, needCount: any) {
        let ownCnt: number = hascount;
        let needCnt: number = needCount;
        if (typeof hascount == "string") {
            ownCnt = Number(hascount);
        }
        if (typeof needCnt == "string") {
            needCnt = Number(needCnt);
        }
        this.color = ownCnt >= needCnt ? Color.GREENINT : Color.REDINT;
        this.text = ConfigHelp.numToStr(hascount) + "/" + ConfigHelp.numToStr(needCount);
    }

    private _imgUrl;
    public setImgUrl(v = null): void {
        if (v) {
            this._iconObject.visible = true;
            if (this._imgUrl != v) {
                this._imgUrl = v;
                IconUtil.setImg(this._iconObject.asLoader, Enum_Path.ICON70_URL + this._imgUrl + ".png");
            }
        } else {
            this._imgUrl = null;
            this._iconObject.visible = false;
            IconUtil.setImg(this._iconObject.asLoader, null);
        }
    }

    private _itemId: number;
    public setItemId(pItemId: number) {
        let t = this;
        let t_cfg = Config.daoju_204[pItemId];
        t._itemId = pItemId;
        if (t_cfg) {
            t.setImgUrl(t_cfg.icon);
            EventUtil.register(true, t, egret.TouchEvent.TOUCH_TAP, t.onClick, t);
        }
        else {
            EventUtil.register(false, t, egret.TouchEvent.TOUCH_TAP, t.onClick, t);
        }
    }

    private onClick(e: egret.TouchEvent) {
        FastAPI.showItemTips(this._itemId);
    }

    public setType(type) {
		if (type == 1) {//文字左对齐
			let t = this.getTextField()
			t.align = fairygui.AlignType.Left;
		} else if (type == 0) { //文字居中显示
			let t = this.getTextField()
			t.align = fairygui.AlignType.Center;
		}
	}

    public dispose() {
        this.setItemId(0);
        super.dispose();
    }
    //===================================== private method =====================================
    //======================================== handler =========================================
}