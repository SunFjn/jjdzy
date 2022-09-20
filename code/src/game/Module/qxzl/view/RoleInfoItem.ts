/**
 * @author: lujiahao 
 * @date: 2019-09-29 11:53:48 
 */
class RoleInfoItem extends fairygui.GComponent {

    //>>>>start
    public countryCtrl: fairygui.Controller;
    public stateCtrl: fairygui.Controller;
    public role: RoleCom;
    public pbHp: fairygui.GProgressBar;
    public tfName: fairygui.GRichTextField;
    public tfPower: fairygui.GRichTextField;
    public imageAdd: fairygui.GImage;
    public tfLimit: fairygui.GRichTextField;
    public clickBg: fairygui.GGraph;
    //>>>>end

    public static URL: string = "ui://6d8dzzdgfmjxx";

    public static createInstance(): RoleInfoItem {
        return <RoleInfoItem><any>(fairygui.UIPackage.createObject("qxzl", "RoleInfoItem"));
    }

    private _curVo: VoPlayerQxzl;
    private _posIndex = 0;
    private _cityId = 0;

    private awatar: UIRole = null;

    public constructor() {
        super();
    }

    protected constructFromXML(xml: any): void {
        super.constructFromXML(xml);
        CommonManager.parseChildren(this, this);

        this.pbHp.titleType = fairygui.ProgressTitleType.ValueAndMax;
    }

    //=========================================== API ==========================================
    /**
     * 设置数据
     * @param pIndex 位置索引
     * @param pData 玩家数据
     */
    public setData(pIndex: number, pData: VoPlayerQxzl, pCityId: number) {
        let t = this;
        t._curVo = pData;
        t._posIndex = pIndex;
        t._cityId = pCityId;

        t.imageAdd.visible = false;
        t.tfLimit.visible = false;
        let t_myCountry = GGlobal.modelQxzl.myCountry;
        let t_cityVo = GGlobal.modelQxzl.getCityVoById(pCityId);
        if (t_cityVo) {
            if (!pData) {
                if (t_cityVo.countryId == t_myCountry || (t_cityVo.countryId == 0 && t_cityVo.isEmpty)) {
                    t.imageAdd.visible = true;
                    t.tfLimit.visible = true;
                    t.tfLimit.text = ConfigHelp.reTxt("体力≥{0}可驻守", t_cityVo.cfg.tl);
                }
            }
        }
        if (t._curVo) {
            t.stateCtrl.selectedIndex = 1;

            t.pbHp.value = t._curVo.stamina;
            t.pbHp.max = t._curVo.maxStamina;

            t.countryCtrl.selectedIndex = t._curVo.country;

            t.tfName.text = t._curVo.name;
            t.tfPower.text = "战力：" + t._curVo.power;

            t.showModel(true);
        }
        else {
            //空数据也有意义
            t.stateCtrl.selectedIndex = 0;
            t.countryCtrl.selectedIndex = 0;
            t.showModel(false);
        }
        t.registerEvent(true);
    }


    public clean() {
        this.registerEvent(false);
        this.showModel(false);
        super.clean();
    }

    public dispose() {
        this.clean();
        super.dispose();
    }

    //===================================== private method =====================================
    private showModel(pFlag: boolean) {
        let t = this;
        if (t.awatar) {
            t.awatar.onRemove();
            t.awatar = null;
        }
        if (pFlag && this._curVo) {
            if (!t.awatar) {
                t.awatar = UIRole.create();
                // t.awatar.setScaleXY(1, 1);
            }
            let fscfg = Config.sz_739[t._curVo.job];
            let moxing = 0;
            if (fscfg) {
                moxing = fscfg.moxing;
                t.awatar.setBody(moxing);
                t.awatar.setWeapon(t._curVo.job);
            } else {
                moxing = t._curVo.job;
                t.awatar.setBody(moxing);
                t.awatar.setWeapon(moxing);
            }
            t.awatar.setGodWeapon(t._curVo.weapon);
            t.awatar.setHorseId(t._curVo.horseId);
            if (t._curVo.horseId) {
                t.awatar.setScaleXY(0.6, 0.6)
            } else {
                t.awatar.setScaleXY(1, 1)
            }
            t.awatar.setPos(0, 0);
            t.awatar.setAction(0);
            t.awatar.uiparent = t.role.displayListContainer;
            t.awatar.onAdd();
        }
    }

    private registerEvent(pFlag: boolean) {
        let t = this;
        EventUtil.register(pFlag, t.clickBg, egret.TouchEvent.TOUCH_TAP, t.onClick, t);
    }

    //======================================== handler =========================================
    private onClick(e: egret.TouchEvent) {
        let t = this;
        GGlobal.modelQxzl.CG_QunXiongZhuLu_attack_8971(t._cityId, t._posIndex);
    }
}