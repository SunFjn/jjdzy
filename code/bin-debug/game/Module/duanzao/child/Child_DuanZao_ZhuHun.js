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
var Child_DuanZao_ZhuHun = (function (_super) {
    __extends(Child_DuanZao_ZhuHun, _super);
    function Child_DuanZao_ZhuHun() {
        var _this = _super.call(this) || this;
        _this.isUpdate = true;
        return _this;
    }
    Child_DuanZao_ZhuHun.createInstance = function () {
        return (fairygui.UIPackage.createObject("DuanZao", "Child_DuanZao_ZhuHun"));
    };
    Child_DuanZao_ZhuHun.prototype.initView = function (pParent) {
        this._viewParent = pParent;
        this.addRelation(this._viewParent, fairygui.RelationType.Size);
    };
    Child_DuanZao_ZhuHun.prototype.openPanel = function (pData) {
        this.setVo(pData);
        this.grid.gridSource = ViewGrid.ROLE;
    };
    Child_DuanZao_ZhuHun.prototype.closePanel = function (pData) {
        this.clean();
    };
    Child_DuanZao_ZhuHun.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var a = this;
        CommonManager.parseChildren(a, a);
        a.grid.isShowEff = true;
        a.iconBt0.data = 1;
        a.iconBt1.data = 2;
        a.iconBt2.data = 3;
        // a.zhuHunBt.addClickListener(a.zhuHunHandle, a);
        a.keyZhuHunBt.addClickListener(a.keyZhuHunHandle, a);
        // a.checkbox0.addClickListener(a.checkHandle, a);
        // a.checkbox1.addClickListener(a.checkHandle, a);
        // a.checkbox2.addClickListener(a.checkHandle, a);
        a.iconBt0.addClickListener(a.iconHandle, a);
        a.iconBt1.addClickListener(a.iconHandle, a);
        a.iconBt2.addClickListener(a.iconHandle, a);
    };
    Child_DuanZao_ZhuHun.prototype.iconHandle = function (event) {
        var btn = event.target;
        GGlobal.layerMgr.open(UIConst.DUANZAO_ZHUHUN_SHIHUN, { id: btn.data });
    };
    Child_DuanZao_ZhuHun.prototype.checkHandle = function (event) {
        var a = this;
        var btn = event.target;
        if (btn.id == a.check.id)
            return;
        if (a.check)
            a.check.selected = false;
        a.check = btn;
    };
    Child_DuanZao_ZhuHun.prototype.keyZhuHunHandle = function () {
        var a = this;
        var cfg = Config.dzsoul_209[a.vo.zhuHunLv];
        for (var i = 0; i < 3; i++) {
            var num = Model_Bag.getItemCount(Model_DuanZao.itemIDArr[i]);
            if (num > 0 && cfg.exp > 0) {
                GGlobal.modelDuanZao.CG_DUANZAO_KEY_ZHUHUN(a.vo.type, 0);
                return;
            }
        }
        if (cfg.exp <= 0) {
            ViewCommonWarn.text("已满阶");
        }
        else {
            View_CaiLiao_GetPanel.show(VoItem.create(Model_DuanZao.itemIDArr[2]));
        }
    };
    Child_DuanZao_ZhuHun.prototype.setVo = function (vo) {
        var a = this;
        a.vo = vo;
        a.grid.vo = vo;
        if (vo) {
            a.grid.tipEnabled = true;
            var cfg = Config.dzsoul_209[vo.zhuHunLv];
            var itemVo0 = VoItem.create(Model_DuanZao.itemIDArr[0]);
            var itemVo1 = VoItem.create(Model_DuanZao.itemIDArr[1]);
            var itemVo2 = VoItem.create(Model_DuanZao.itemIDArr[2]);
            var num0 = Model_Bag.getItemCount(Model_DuanZao.itemIDArr[0]);
            var num1 = Model_Bag.getItemCount(Model_DuanZao.itemIDArr[1]);
            var num2 = Model_Bag.getItemCount(Model_DuanZao.itemIDArr[2]);
            a.nameLb.text = Model_Equip.getPartName(vo.type);
            a.countLb0.setCount(num0);
            a.countLb1.setCount(num1);
            a.countLb2.setCount(num2);
            a.countLb0.setImgUrl(itemVo0.icon);
            a.countLb1.setImgUrl(itemVo1.icon);
            a.countLb2.setImgUrl(itemVo2.icon);
            a.jieLb.text = vo.zhuHunLv + "阶";
            var attArr = JSON.parse(cfg["attr" + vo.type]);
            var attstr = "";
            for (var i = 0; i < attArr.length; i++) {
                if (i == 0) {
                    attstr += Vo_attr.getShowStr(attArr[i][0], attArr[i][1]);
                }
                else {
                    attstr += "\n" + Vo_attr.getShowStr(attArr[i][0], attArr[i][1]);
                }
            }
            a.curLb.text = attstr;
            a.needExp = 0;
            if (cfg.exp > 0) {
                a.expBar.value = vo.zhuHunExp;
                a.expBar.max = cfg.exp;
                a.needExp = cfg.exp - vo.zhuHunExp;
                a.keyZhuHunBt.checkNotice = (num0 * Model_DuanZao.expArr[0] + num1 * Model_DuanZao.expArr[1] + num2 * Model_DuanZao.expArr[2]) >= a.needExp;
                var nectCfg = Config.dzsoul_209[vo.zhuHunLv + 1];
                var attArr1 = JSON.parse(nectCfg["attr" + vo.type]);
                var attstr1 = "";
                for (var i = 0; i < attArr.length; i++) {
                    if (i == 0) {
                        attstr1 += Vo_attr.getShowStr(attArr1[i][0], attArr1[i][1]);
                    }
                    else {
                        attstr1 += "\n" + Vo_attr.getShowStr(attArr1[i][0], attArr1[i][1]);
                    }
                }
                a.nextLb.text = attstr1;
            }
            else {
                a.expBar.value = 1;
                a.expBar.max = 1;
                a.nextLb.text = "已满阶";
                a.expBar._titleObject.text = "已满阶";
                // a.zhuHunBt.checkNotice = false;
                a.keyZhuHunBt.checkNotice = false;
            }
            a.iconBt0.checkNotice = Model_DuanZao.checkShiHunNotice(1);
            a.iconBt1.checkNotice = Model_DuanZao.checkShiHunNotice(2);
            a.iconBt2.checkNotice = Model_DuanZao.checkShiHunNotice(3);
        }
    };
    Child_DuanZao_ZhuHun.prototype.clean = function () {
        ConfigHelp.cleanGridEff(this.grid);
        this.isUpdate = true;
    };
    //>>>>end
    Child_DuanZao_ZhuHun.URL = "ui://pofv8989z1r84";
    return Child_DuanZao_ZhuHun;
}(fairygui.GComponent));
__reflect(Child_DuanZao_ZhuHun.prototype, "Child_DuanZao_ZhuHun", ["IPanel"]);
