var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var Item_HOnlyDBFanLi = (function (_super) {
    __extends(Item_HOnlyDBFanLi, _super);
    function Item_HOnlyDBFanLi() {
        return _super.call(this) || this;
    }
    Item_HOnlyDBFanLi.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        CommonManager.parseChildren(this, this);
        this.btnGo.addClickListener(this.onClickBtnGo, this);
        this.btnGet.addClickListener(this.onClickBtnGet, this);
    };
    Item_HOnlyDBFanLi.prototype.onClickBtnGo = function () {
        GGlobal.layerMgr.open(UIConst.CHONGZHI);
    };
    Item_HOnlyDBFanLi.prototype.onClickBtnGet = function () {
        if (this.VoDatas.canCt > 0) {
            GGlobal.modelHuoDOnly.CGDBFanLi_Get8361(this._act.id, this.VoDatas.id);
        }
        else {
            ViewCommonWarn.text("领取条件不足");
        }
    };
    Item_HOnlyDBFanLi.prototype.clean = function () {
        this.grid0.tipEnabled = false;
        this.grid0.isShowEff = false;
    };
    Item_HOnlyDBFanLi.prototype.setData = function (v, act) {
        this.VoDatas = v;
        this._act = act;
        var cfg = Config.zshddbfl_315[v.id];
        this.desc.text = "单笔充值[color=#33ff00]" + cfg.je + "[/color]元";
        this.count.visible = true;
        this.count.text = "可充值领奖次数：[color=#33ff00]" + this.VoDatas.hasCt + "[/color]";
        var reward = ConfigHelp.makeItemListArr(cfg.jl);
        this.grid0.tipEnabled = true;
        this.grid0.isShowEff = true;
        this.grid0.vo = reward[0];
        if (reward[0].count >= 199800) {
            this.grid0.lbNum.text = reward[0].count + "";
        }
        var state = this.VoDatas.hasCt == 0;
        this.ylq.visible = (state && this.VoDatas.canCt == 0);
        if (state) {
            this.count.visible = false;
        }
        this.noticeImg.visible = this.VoDatas.canCt > 0;
        this.btnGet.visible = this.VoDatas.canCt > 0;
        this.btnGo.visible = this.VoDatas.hasCt > 0 && this.VoDatas.canCt <= 0;
        //返利
        // let back = Math.floor(cfg.je * 10000 / reward[0].count)
        var back = Math.floor(reward[0].count / cfg.je);
        this.lbBack.text = "返利" + back + "%";
    };
    Item_HOnlyDBFanLi.URL = "ui://mk3gp0vrhndya";
    return Item_HOnlyDBFanLi;
}(fairygui.GComponent));
__reflect(Item_HOnlyDBFanLi.prototype, "Item_HOnlyDBFanLi");
