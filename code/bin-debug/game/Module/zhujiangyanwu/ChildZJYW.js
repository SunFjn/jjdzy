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
var ChildZJYW = (function (_super) {
    __extends(ChildZJYW, _super);
    function ChildZJYW() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.items = [];
        return _this;
    }
    ChildZJYW.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        CommonManager.parseChildren(this, this);
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onShow, this);
        this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onHide, this);
        for (var i = 0; i < 7; i++) {
            var item = this.items[i] = this["item" + i];
            item._container.touchChildren = false;
            item.addClickListener(this.onHand, this);
        }
        this.txtDes.text = HtmlUtil.createLink("玩法说明");
        this.txtDes.addEventListener(egret.TextEvent.LINK, this.onLink, this);
        this.btnHand.addClickListener(this.onChallenge, this);
    };
    ChildZJYW.prototype.onLink = function () {
        GGlobal.layerMgr.open(UIConst.WFSM_PANEL, UIConst.CHILDZJYW);
    };
    ChildZJYW.prototype.onChallenge = function () {
        if (this.curSelData) {
            var maxCnt = Config.zjywdl_005[this.curSelData.id].cost;
            var tempData = ModelZJYW.getInfoByPos(this.curSelData.pos);
            if (ModelZJYW.remainCnt <= 0) {
                ViewCommonWarn.text("挑战次数不足");
            }
            else if (tempData && tempData.state != 1 && this.getItemCount() < maxCnt) {
                View_QuickBuy_Panel.show(VoItem.create(410100));
            }
            else {
                GGlobal.modelZJYW.CG4715(this.curSelData.pos);
            }
        }
    };
    ChildZJYW.prototype.onHand = function (evt) {
        var tar = evt.currentTarget;
        this.setSel(tar.getData());
    };
    ChildZJYW.prototype.onUpdate = function () {
        var datas = ModelZJYW.datas;
        //假设datas长度和items长度一样
        for (var i = 0; i < datas.length; i++) {
            var item = this.items[i];
            var data = datas[i];
            item.setData(data);
        }
        this.txtCnt.text = "挑战次数: " + HtmlUtil.fontNoSize(ModelZJYW.remainCnt + "/" + Config.xtcs_004[5501].num, ModelZJYW.remainCnt ? "#00ff00" : "#ff0000");
        if (!this.curSelData) {
            this.setSel(this.items[0].getData());
        }
        else {
            if (!this.getItemByData(this.curSelData)) {
                this.setSel(this.items[0].getData());
            }
            else {
                this.setSel(this.curSelData);
            }
        }
        var act = this.items[this.items.length - 1].getData(); //确定最后一个是活动？
        var actHasIn = act != null && act.id > 0;
        this.iconActTm.visible = actHasIn;
        if (actHasIn) {
            Timer.instance.listen(this.upTimer, this, 1000);
            var dstr = this.getActTimer();
            this.actTimer = new Date(dstr).getTime();
            this.upTimer();
            this.imgTime.visible = true;
        }
        else {
            this.actOver();
        }
    };
    ChildZJYW.prototype.upTimer = function () {
        var s = this;
        //倒计时用
        var d = Math.floor((s.actTimer - Model_GlobalMsg.getServerTime()) / 1000);
        if (d < 0) {
            s.actOver();
        }
        else {
            s.labTime.text = "活动武将剩余时间：" + DateUtil.getMSBySecond4(d);
        }
    };
    ChildZJYW.prototype.actOver = function () {
        this.labTime.text = "";
        this.imgTime.visible = false;
        Timer.instance.remove(this.upTimer, this);
    };
    ChildZJYW.prototype.getActTimer = function () {
        for (var k in Config.zjywwj_005) {
            var v = Config.zjywwj_005[k];
            if (Math.floor(v.id / 1000) == 2) {
                return v.hend;
            }
        }
        return "";
    };
    ChildZJYW.prototype.setSel = function (data) {
        this.curSelData = data;
        var hasChanged = false;
        if (data) {
            if (this.curSelItm) {
                this.curSelItm.selSel(false);
            }
            var curItm = this.getItemByData(data);
            if (this.curSelItm && curItm && this.curSelItm != curItm) {
                hasChanged = true;
            }
            (this.curSelItm = curItm).selSel(true);
            this.itemInfo.setData(data);
            this.itemUpdate();
            if (hasChanged) {
                this.playSkill();
            }
        }
    };
    ChildZJYW.prototype.playSkill = function () {
        var secSkill = JSON.parse(Config.hero_211[this.curSelData.id].skills)[1][0];
        this.curSelItm.playSkill(secSkill);
    };
    ChildZJYW.prototype.getItemByData = function (data) {
        var items = this.items;
        for (var i = 0; i < items.length; i++) {
            var tempData = items[i].getData();
            if (tempData.id == data.id) {
                return items[i];
            }
        }
        return null;
    };
    ChildZJYW.prototype.itemUpdate = function () {
        if (this.curSelData) {
            var maxCnt = Config.zjywdl_005[this.curSelData.id].cost;
            var curCnt = this.getItemCount();
            if (curCnt >= maxCnt) {
                this.txtCost.text = "消耗演武令: " + HtmlUtil.fontNoSize(maxCnt + "/" + curCnt, "#00ff00");
            }
            else {
                this.txtCost.text = "消耗演武令: " + HtmlUtil.fontNoSize(maxCnt + "/" + curCnt, "#ff0000");
            }
            this.txtCost.visible = this.curSelData.state == 0;
        }
    };
    ChildZJYW.prototype.getItemCount = function () {
        return Model_Bag.getItemCount(410100); //写死
    };
    ChildZJYW.prototype.onShow = function () {
        IconUtil.setImg(this.bg, Enum_Path.BACK_URL + "zjyw.jpg");
        GGlobal.modelZJYW.listen(ModelZJYW.msg_datas, this.onUpdate, this);
        GGlobal.control.listen(Enum_MsgType.MSG_BAG_ITME_UPDATE, this.itemUpdate);
        GGlobal.modelZJYW.CG4713();
        //虎牢关恢复次数加红点
        GGlobal.modelTigerPass.CGOpenUI8901();
    };
    ChildZJYW.prototype.onHide = function () {
        IconUtil.setImg(this.bg, null);
        GGlobal.control.remove(Enum_MsgType.MSG_BAG_ITME_UPDATE, this.itemUpdate);
        GGlobal.modelZJYW.remove(ModelZJYW.msg_datas, this.onUpdate, this);
        this.itemInfo.clean();
        for (var i = 0; i < this.items.length; i++) {
            var item = this.items[i];
            item.clean();
        }
        Timer.instance.remove(this.upTimer, this);
    };
    ChildZJYW.URL = "ui://7a366usaq5rfe";
    return ChildZJYW;
}(fairygui.GComponent));
__reflect(ChildZJYW.prototype, "ChildZJYW");
