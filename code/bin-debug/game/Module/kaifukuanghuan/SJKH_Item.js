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
var SJKH_Item = (function (_super) {
    __extends(SJKH_Item, _super);
    function SJKH_Item() {
        var _this = _super.call(this) || this;
        _this.displayObject.addEventListener(egret.Event.REMOVED_FROM_STAGE, _this.onRemove, _this);
        _this.displayObject.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAdd, _this);
        return _this;
    }
    SJKH_Item.createInstance = function () {
        return (fairygui.UIPackage.createObject("kaifukuanghuan", "SJKH_Item"));
    };
    SJKH_Item.prototype.onRemove = function () {
        GGlobal.control.remove(Enum_MsgType.SJKHITEMREFRESH, this.update, this);
        this.displayObject.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAdd, this);
    };
    SJKH_Item.prototype.onAdd = function () {
        GGlobal.control.listen(Enum_MsgType.SJKHITEMREFRESH, this.update, this);
        this.displayObject.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemove, this);
    };
    SJKH_Item.prototype.update = function (arg) {
        ////console.log("argragrga", arg);
        ////console.log("this.voData.id", this.voData);
        if (this.voData.lib.id == arg.id) {
            if (arg.type == 0) {
                if (arg.state == 1) {
                    this.ylq.visible = true;
                    this.btnGoLeft.visible = false;
                    this.btnLeft.visible = false;
                }
                this.voData.reward = 2;
            }
            else {
                if (arg.state == 1) {
                    this.ylq2.visible = true;
                    this.yqw.visible = false;
                    this.voData.limitSt = 2;
                }
                else {
                    this.ylq2.visible = false;
                    this.yqw.visible = true;
                    this.voData.limitSt = 3;
                    this.voData.lastNum = arg.lastNum;
                }
                this.btnGoRight.visible = false;
                this.btnRight.visible = false;
                this.residue.text = "(" + arg.lastNum + "/" + this.voData.lib.sl + ")";
                //this.des.text = this.voData.lib.tips + "[color=#7bde2b](" + arg.lastNum + "/" + this.voData.lib.yq[0][1] + ")[/color]";
            }
        }
        GGlobal.control.notify(Enum_MsgType.SJKHREFRESHLIST, { data: this.voData });
    };
    SJKH_Item.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        this.btnGoLeft = (this.getChild("btnGoLeft"));
        this.btnGoLeft.addClickListener(this.onClickBtnGo, this);
        this.ylq = (this.getChild("ylq"));
        this.btnLeft = (this.getChild("btnLeft"));
        this.btnLeft.addClickListener(this.onClickBtnLeft, this);
        this.btnGoRight = (this.getChild("btnGoRight"));
        this.btnGoRight.addClickListener(this.onClickBtnGo, this);
        this.yqw = (this.getChild("yqw"));
        this.ylq2 = (this.getChild("ylq2"));
        this.btnRight = (this.getChild("btnRight"));
        this.btnRight.addClickListener(this.onClickBtnRight, this);
        // this.grid = <ViewGrid><any>(this.getChild("grid"));
        // this.grid_2 = <ViewGrid><any>(this.getChild("grid"));
        // this.grid_3 = <ViewGrid><any>(this.getChild("grid"));
        // this.grid_4 = <ViewGrid><any>(this.getChild("grid")); 
        this.des = (this.getChild("des"));
        this.residue = (this.getChild("residue"));
        this.girdListLeft = (this.getChild("girdListLeft"));
        this.girdListRight = (this.getChild("girdListRight"));
        this.noticeImgLeft = (this.getChild("noticeImgLeft"));
        this.noticeImgRight = (this.getChild("noticeImgRight"));
        this.girdListLeft.setVirtual();
        this.girdListLeft.itemRenderer = this.renderLeft;
        this.girdListRight.setVirtual();
        this.girdListRight.itemRenderer = this.renderRight;
        this.girdListLeft.callbackThisObj = this;
        this.girdListRight.callbackThisObj = this;
    };
    SJKH_Item.prototype.onClickBtnGo = function () {
        GGlobal.layerMgr.open(this.voData.lib.sys);
    };
    SJKH_Item.prototype.onClickBtnLeft = function () {
        if (this.voData.reward != 1) {
            ViewCommonWarn.text("领取条件不足");
        }
        else {
            GGlobal.model_KaiFKH.CG_GETREWARD(this.voData.id, 0);
        }
    };
    SJKH_Item.prototype.onClickBtnRight = function () {
        if (this.voData.limitSt != 1) {
            ViewCommonWarn.text("领取条件不足");
        }
        else {
            GGlobal.model_KaiFKH.CG_GETREWARD(this.voData.id, 1);
        }
    };
    //灰色是 1，绿色 2， 蓝色 3， 紫色 4，橙色 5， 红色6
    // #7bde2b
    SJKH_Item.prototype.setData = function (vo) {
        ////console.log("VVOVOVOVOVO", vo);
        this.voData = vo;
        this.des.text = this.voData.lib.tips;
        this.leftRaward = ConfigHelp.makeItemListArr(JSON.parse(this.voData.lib.reward));
        this.rightRaward = ConfigHelp.makeItemListArr(JSON.parse(this.voData.lib.xl));
        this.girdListLeft.numItems = this.leftRaward.length;
        this.girdListRight.numItems = this.rightRaward.length;
        this.showTips();
    };
    // /**限量奖励(特殊奖励)状态，0:未达到，1:可领取，2:已领取，3:已抢完 */
    // limitSt = 0;	//限量奖励
    // /**B:达标奖励状态，0:未达到，1:可领取，2:已领取 */ 
    // reward = 0;		//达标奖励 
    SJKH_Item.prototype.showTips = function () {
        var temp = 0;
        this.noticeImgLeft.visible = false;
        this.noticeImgRight.visible = false;
        var s = this.voData.lib.tips;
        var st = s.split("总");
        if (st.length <= 1) {
            temp = Model_WuJiang.getWUjiangStar(this.voData.lib.yq[0][0]).length;
        }
        else {
            temp = Model_WuJiang.getAllWujiangStarByPinzhi(this.voData.lib.yq[0][0]);
        }
        if ((this.voData.reward == 1 || this.voData.reward == 2) && temp >= this.voData.lib.yq[0][1]) {
            this.des.text = this.voData.lib.tips + "[color=#7bde2b](" + temp + "/" + this.voData.lib.yq[0][1] + ")[/color]";
        }
        else {
            this.des.text = this.voData.lib.tips + "[color=#FF0000](" + temp + "/" + this.voData.lib.yq[0][1] + ")[/color]";
        }
        if (this.voData.limitSt == 3) {
            this.residue.color = 0xff0000;
        }
        else {
            this.residue.color = 0x7bde2b;
        }
        this.residue.visible = true;
        this.yqw.visible = true;
        this.residue.text = "还剩" + this.voData.lastNum + "个"; //"(" + this.voData.lastNum +"/" + this.voData.lib.sl + ")";
        //前往按钮
        this.btnGoLeft.visible = this.voData.reward == 0;
        this.btnGoRight.visible = this.voData.limitSt == 0;
        //领取按钮
        this.btnLeft.visible = this.voData.reward == 1;
        this.btnRight.visible = this.voData.limitSt == 1;
        //领取标识
        this.ylq.visible = this.voData.reward == 2;
        this.yqw.visible = this.voData.limitSt == 3;
        this.ylq2.visible = this.voData.limitSt == 2;
        //红点
        this.noticeImgLeft.visible = this.voData.reward == 1;
        this.noticeImgRight.visible = this.voData.limitSt == 1;
        if (this.voData.lastNum == 0) {
            this.btnGoRight.visible = false;
            this.residue.visible = false;
            this.yqw.visible = true;
            this.btnRight.visible = false;
            this.noticeImgRight.visible = false;
        }
        if (this.voData.limitSt == 2) {
            this.residue.visible = false;
            this.btnGoRight.visible = false;
            this.ylq2.visible = true;
            this.btnRight.visible = false;
            this.yqw.visible = false;
        }
    };
    SJKH_Item.prototype.clean = function () {
        ConfigHelp.cleanGridview(this.girdListLeft);
        ConfigHelp.cleanGridview(this.girdListRight);
    };
    SJKH_Item.prototype.renderLeft = function (index, item) {
        var vo = this.leftRaward[index];
        item.vo = vo;
        item.tipEnabled = true;
        item.isShowEff = true;
    };
    SJKH_Item.prototype.renderRight = function (index, item) {
        var vo = this.rightRaward[index];
        item.vo = vo;
        item.tipEnabled = true;
        item.isShowEff = true;
    };
    SJKH_Item.URL = "ui://yk4rwc6rinpxl";
    return SJKH_Item;
}(fairygui.GComponent));
__reflect(SJKH_Item.prototype, "SJKH_Item");
