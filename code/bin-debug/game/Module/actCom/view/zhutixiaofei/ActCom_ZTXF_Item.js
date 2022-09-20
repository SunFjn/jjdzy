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
var ActCom_ZTXF_Item = (function (_super) {
    __extends(ActCom_ZTXF_Item, _super);
    function ActCom_ZTXF_Item() {
        var _this = _super.call(this) || this;
        _this._actId = 0;
        return _this;
    }
    ActCom_ZTXF_Item.createInstance = function () {
        return (fairygui.UIPackage.createObject("ActCom_ZTXF", "ActCom_ZTXF_Item"));
    };
    ActCom_ZTXF_Item.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        CommonManager.parseChildren(this, this);
        this.list.callbackThisObj = this;
        this.list.itemRenderer = this.itemRender;
    };
    ActCom_ZTXF_Item.prototype.itemRender = function (idx, obj) {
        var item = obj;
        item.isShowEff = true;
        item.tipEnabled = true;
        item.vo = this._listdata[idx];
    };
    ActCom_ZTXF_Item.prototype.clean = function () {
        var s = this;
        s.list.numItems = 0;
        s.btnGo.removeClickListener(s.onClickGo, s);
        s.btnGet.removeClickListener(s.getAwardHD, s);
    };
    ActCom_ZTXF_Item.prototype.setdata = function (obj) {
        var s = this;
        if (!obj)
            return;
        s._cfg = Config.ztxfb_329[obj.id];
        var model = GGlobal.model_ZTXF;
        s.idx = obj.id;
        var status = obj.status;
        var color = (status == 1 || status == 2) ? Color.GREENSTR : Color.REDSTR;
        var count = 0;
        if (s._cfg.yb <= 0) {
            count = (status == 1 || status == 2) ? 1 : 0;
            if (s._cfg.lx == 1) {
                s.lbpro.text = BroadCastManager.reTxt("激活符文主题<font color='{0}'>({1}/1)</font>", color, count);
            }
            else if (s._cfg.lx == 2) {
                s.lbpro.text = BroadCastManager.reTxt("激活兽魂主题<font color='{0}'>({1}/1)</font>", color, count);
            }
            else if (s._cfg.lx == 3) {
                s.lbpro.text = BroadCastManager.reTxt("激活少主主题<font color='{0}'>({1}/1)</font>", color, count);
            }
            else if (s._cfg.lx == 4) {
                s.lbpro.text = BroadCastManager.reTxt("激活异兽主题<font color='{0}'>({1}/1)</font>", color, count);
            }
            else if (s._cfg.lx == 5) {
                s.lbpro.text = BroadCastManager.reTxt("激活奇策主题<font color='{0}'>({1}/1)</font>", color, count);
            }
            else if (s._cfg.lx == 6) {
                s.lbpro.text = BroadCastManager.reTxt("激活坐骑主题<font color='{0}'>({1}/1)</font>", color, count);
            }
            else if (s._cfg.lx == 7) {
                s.lbpro.text = BroadCastManager.reTxt("激活武将主题<font color='{0}'>({1}/1)</font>", color, count);
            }
            else if (s._cfg.lx == 8) {
                s.lbpro.text = BroadCastManager.reTxt("激活神兵主题<font color='{0}'>({1}/1)</font>", color, count);
            }
        }
        else {
            s.lbpro.text = BroadCastManager.reTxt("消耗{0}元宝<font color='{1}'>({2}/{3})</font>", s._cfg.yb, color, model.expenditure, s._cfg.yb);
        }
        s.btnGo.visible = false;
        s.btnGo.checkNotice = false;
        s.lbBuff.visible = false;
        if (status <= 0 && model.type <= 0) {
            if (s._cfg.yb <= 0) {
                s.btnGo.visible = true;
            }
            else {
                s.lbBuff.visible = true;
            }
            s.btnGo.text = "激活";
            s.lbBuff.text = "尚未激活";
            var needCharge = Config.xtcs_004[7630].num;
            if (model.rechargeNum >= needCharge) {
                s.btnGo.checkNotice = true;
            }
        }
        else if (status <= 0) {
            if (s._cfg.lx == model.type) {
                s.btnGo.visible = true;
            }
            else {
                s.lbBuff.visible = true;
            }
            s.btnGo.text = "前往";
            s.lbBuff.text = "已激活其他主题";
        }
        s.btnGet.visible = status == 1;
        s.imgYlq.visible = status == 2;
        s._listdata = ConfigHelp.makeItemListArr(s._cfg.jl);
        s.list.numItems = s._listdata.length;
        s.btnGo.addClickListener(s.onClickGo, s);
        s.btnGet.addClickListener(s.getAwardHD, s);
        s.btnGet.checkNotice = true;
    };
    /**
     * 激活按钮事件
     */
    ActCom_ZTXF_Item.prototype.onClickGo = function (e) {
        var model = GGlobal.model_ZTXF;
        var needCharge = Config.xtcs_004[7630].num;
        if (model.type <= 0 && model.rechargeNum < needCharge) {
            ViewChongZhi.tryToOpenCZ();
            e.stopImmediatePropagation();
            e.stopPropagation();
            return;
        }
        else if (model.type <= 0 && model.rechargeNum >= needCharge) {
            ViewAlert.show("本次活动只能激活一个主题消费，激活后不可更换，确认激活？", Handler.create(this, function () { GGlobal.model_ZTXF.CG_ACTIVATION(this._cfg.lx); }));
            return;
        }
        else {
            GGlobal.layerMgr.open(UIConst.CANGBAOGE);
            e.stopImmediatePropagation();
            e.stopPropagation();
        }
    };
    /**
     * 领取按钮事件
     */
    ActCom_ZTXF_Item.prototype.getAwardHD = function () {
        GGlobal.model_ZTXF.CG_GET_AWARD(this._cfg.id);
    };
    ActCom_ZTXF_Item.URL = "ui://904git2zglgpd";
    return ActCom_ZTXF_Item;
}(fairygui.GComponent));
__reflect(ActCom_ZTXF_Item.prototype, "ActCom_ZTXF_Item");
