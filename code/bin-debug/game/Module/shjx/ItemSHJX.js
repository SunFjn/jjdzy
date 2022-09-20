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
var ItemSHJX = (function (_super) {
    __extends(ItemSHJX, _super);
    function ItemSHJX() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.icons = [];
        _this.zhuanVali = 0; //转生记录
        return _this;
    }
    ItemSHJX.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        CommonManager.parseChildren(this, this);
        this.btnCD.addClickListener(this.onHand, this);
        this.btnXL.addClickListener(this.onHand, this);
        this.grid.tipEnabled = true;
        for (var i = 1; i < 5; i++) {
            var icon = this["icon" + i];
            this.icons.push(icon);
        }
    };
    ItemSHJX.prototype.onHand = function (evt) {
        switch (evt.currentTarget) {
            case this.btnCD:
                if (this.zhuanVali) {
                    ViewCommonWarn.text("需要主角" + Config.zhuansheng_705[this.zhuanVali].lv);
                }
                else {
                    if (this.btnCD.checkNotice) {
                        GGlobal.modelSHJX.CG855(this._data.yj, this._data.id);
                    }
                    else {
                        View_CaiLiao_GetPanel.show(VoItem.create(410052));
                    }
                }
                break;
            case this.btnXL:
                //洗练
                GGlobal.layerMgr.open(UIConst.SHJXXILIAN, this._data);
                break;
        }
    };
    ItemSHJX.prototype.setData = function (value) {
        this._data = value;
        this.zhuanVali &= 0;
        for (var i = 0; i < this.icons.length; i++) {
            this.icons[i].visible = false;
        }
        var tempData = ModelSH.getEquipByPos(this._data.yj, this._data.id);
        if (tempData && tempData.equipID) {
            var vo = VoEquip.create(tempData.equipID);
            this.grid.vo = vo;
            this.grid.grid.equipLb.visible = false;
            var len = tempData.datas && tempData.datas.length;
            var count = 0;
            for (var i = 0; i < len; i++) {
                var icon = this.icons[i];
                var cfg = tempData.datas[i];
                if (cfg.type == value.yj) {
                    count++;
                }
                icon.visible = true;
                IconUtil.setImg(icon, "resource/image/shouling/" + ModelSH.icUrls[cfg.type - 1] + ".png");
            }
            this.txtCnt.text = "\u5DF2\u6D17\u7EC3" + ["青龙", "白虎", "朱雀", "玄武"][value.yj - 1] + "\u5370: " + count + "/4";
            if (count >= 4) {
                this.txtCnt.color = 0x00ff00;
            }
            else {
                this.txtCnt.color = 0xff0000;
            }
            this.grid.visible = true;
            this.grayLD.visible = false;
            this.grayBg.visible = false;
            var betJug = ModelSH.hasBetterEQ(tempData.equipID, value.id);
            if (betJug && !betJug.zhuanCnt) {
                this.btnCD.visible = true;
                this.btnCD.text = "更换";
                this.btnXL.visible = false;
                this.btnCD.checkNotice = true;
                this.btnCD.enabled = true;
            }
            else {
                this.btnCD.visible = false;
                this.btnXL.visible = true;
                this.btnXL.checkNotice = !ModelSH.hasFullStar(tempData.datas) && Model_Bag.getItemCount(410049) >= JSON.parse(Config.xtcs_004[5601].other)[0][2];
            }
        }
        else {
            this.txtCnt.text = "\u5DF2\u6D17\u7EC3" + ["青龙", "白虎", "朱雀", "玄武"][value.yj - 1] + "\u5370: 0/4";
            this.txtCnt.color = 0xff0000;
            this.btnCD.visible = true;
            this.btnCD.text = "穿戴";
            var betJug = ModelSH.hasBetterEQ(0, value.id);
            if (betJug && !betJug.zhuanCnt) {
                this.btnCD.checkNotice = true;
            }
            else {
                this.btnCD.checkNotice = false;
                if (betJug && betJug.zhuanCnt) {
                    this.zhuanVali = betJug.zhuanCnt;
                }
            }
            this.btnXL.visible = false;
            this.grid.visible = false;
            this.grayLD.visible = true;
            this.grayBg.visible = true;
            IconUtil.setImg(this.grayLD, Enum_Path.ICON70_URL + ("gray" + value.id + ".png"));
        }
    };
    ItemSHJX.prototype.getData = function () {
        return this._data;
    };
    ItemSHJX.prototype.clean = function () {
        ConfigHelp.cleanGridEff(this.grid);
    };
    ItemSHJX.URL = "ui://4aepcdbwuikji";
    return ItemSHJX;
}(fairygui.GComponent));
__reflect(ItemSHJX.prototype, "ItemSHJX");
