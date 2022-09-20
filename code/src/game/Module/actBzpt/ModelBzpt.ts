/**
 * 宝藏拼图管理器
 * @author: lujiahao 
 * @date: 2019-11-22 19:07:21 
 */
class ModelBzpt extends BaseModel {
    constructor() {
        super();
    }

    private _taskVoMap: { [id: number]: VoTaskBzpt } = {};
    private _boxVoMap: { [id: number]: VoBoxBzpt } = {};

    private _setupFlag = false;
    public setup() {
        if (this._setupFlag)
            return;
        this._setupFlag = true;

        {
            let t_cfg = Config.bzptrwb_333;
            for (let k in t_cfg) {
                let t_id = ~~k;
                let t_vo = new VoTaskBzpt();
                t_vo.id = t_id;
                this._taskVoMap[t_id] = t_vo;
            }
        }

        {
            let t_cfg = Config.bzptjlb_333;
            for (let k in t_cfg) {
                let t_id = ~~k;
                let t_vo = new VoBoxBzpt();
                t_vo.id = t_id;
                this._boxVoMap[t_id] = t_vo;
            }
        }
    }
    //========================================= 协议相关 ========================================
    //协议处理
    public listenServ(mgr: WebSocketMgr) {
        this.socket = mgr;
        //注册GC方法
        mgr.regHand(10650, this.GC_BaoZangPinTu_openUI_10650, this);
        mgr.regHand(10652, this.GC_BaoZangPinTu_activate_10652, this);
        mgr.regHand(10654, this.GC_BaoZangPinTu_gotAward_10654, this);
    }

    /**10650 [I-B-I]-[I-B] 打开界面返回 [I:任务idB:任务状态I:任务参数]任务信息taskInfos[I:宝箱idB:宝箱状态]宝箱信息boxInfos*/
    public GC_BaoZangPinTu_openUI_10650(self: ModelBzpt, data: BaseBytes): void {
        let t_change = false;
        {
            let len = data.readShort();
            for (let i = 0; i < len; i++) {
                let arg1 = data.readInt();
                let arg2 = data.readByte();
                let arg3 = data.readInt();

                let t_vo = self.getTaskVoById(arg1);
                if (t_vo && t_vo.update({ state: arg2, count: arg3 })) {
                    t_change = true;
                }
            }
        }
        {
            let len = data.readShort();
            for (let i = 0; i < len; i++) {
                let arg4 = data.readInt();
                let arg5 = data.readByte();

                let t_vo = self.getBoxVoById(arg4);
                if (t_vo && t_vo.update({ state: arg5 })) {
                    t_change = true;
                }
            }
        }

        if (t_change) {
            self.reddotCheck();
            GGlobal.control.notify(Enum_MsgType.BZPT_UPDATE);
        }
    }

    /**10651 I 激活拼图 I:任务配置idcfgId*/
    public CG_BaoZangPinTu_activate_10651(pTaskId: number): void {
        var bates = this.getBytes();
        bates.writeInt(pTaskId);
        this.sendSocket(10651, bates);
    }

    /**10652 B-I-B 激活拼图返回 B:状态:0-成功,1-失败stateI:任务idcfgIdB:任务状态taskState*/
    public GC_BaoZangPinTu_activate_10652(self: ModelBzpt, data: BaseBytes): void {
        let t_change = false;

        let arg1 = data.readByte();
        let arg2 = data.readInt();
        let arg3 = data.readByte();

        switch (arg1) {
            case 0: //成功
                let t_vo = self.getTaskVoById(arg2);
                if (t_vo && t_vo.update({ state: arg3 })) {
                    t_change = true;

                    let t_boxList = self.getBoxVoList();
                    for (let v of t_boxList) {
                        if (v.state == 0 && v.curCount >= v.maxCount) {
                            v.update({ state: 1 });
                        }
                    }
                }
                break;
            case 1:
                ViewCommonWarn.text("激活失败");
                break;
        }

        if (t_change) {
            self.reddotCheck();
            GGlobal.control.notify(Enum_MsgType.BZPT_CARD_OPEN, { id: arg2 });
        }
    }

    /**10653 I 领取宝箱奖励 I:宝箱配置idcfgId*/
    public CG_BaoZangPinTu_gotAward_10653(pBoxId: number): void {
        let t = this;
        let t_vo = t.getBoxVoById(pBoxId);
        if (!t_vo)
            return;
        if (t_vo.state != 1)
            return;
        var bates = this.getBytes();
        bates.writeInt(pBoxId);
        this.sendSocket(10653, bates);
    }

    /**10654 B-I 领取宝箱奖励返回 B:状态:0-成功,1-失败stateI:宝箱idcfgId*/
    public GC_BaoZangPinTu_gotAward_10654(self: ModelBzpt, data: BaseBytes): void {
        let t_change = false;

        let arg1 = data.readByte();
        let arg2 = data.readInt();
        switch (arg1) {
            case 0: //成功
                let t_vo = self.getBoxVoById(arg2);
                if (t_vo && t_vo.update({ state: 2 })) {
                    t_change = true;
                }
                break;
            case 1: //失败
                break;
        }

        if (t_change) {
            self.reddotCheck();
            GGlobal.control.notify(Enum_MsgType.BZPT_BOX_OPEN, { id: arg2 });
        }
    }

    //=========================================== API ==========================================
    /** 获取当前活动期数 */
    public getCurQs(): number {
        let t_actVo = GGlobal.modelActivity.getActivityByID(UIConst.ACTCOM_BZPT);
        if (t_actVo)
            return t_actVo.qs;
        else
            return 1;
    }

    public getTaskVoById(pId: number): VoTaskBzpt {
        return this._taskVoMap[pId];
    }

    public getBoxVoById(pId: number): VoBoxBzpt {
        return this._boxVoMap[pId];
    }

    private _taskVoListMap: { [qs: number]: VoTaskBzpt[] } = {};
    /**
     * 获取当期的任务数据列表
     */
    public getTaskVoList(): VoTaskBzpt[] {
        let t = this;
        let t_qs = t.getCurQs();
        let t_list = t._taskVoListMap[t_qs];
        if (t_list === undefined) {
            t._taskVoListMap[t_qs] = t_list = [];
            for (let k in t._taskVoMap) {
                let t_vo = t._taskVoMap[k];
                if (t_vo && t_vo.cfg.qs == t_qs) {
                    t_list.push(t_vo);
                }
            }
        }
        return t_list;
    }

    private _boxVoListMap: { [qs: number]: VoBoxBzpt[] } = {};
    /**
     * 获取当期宝箱列表
     */
    public getBoxVoList(): VoBoxBzpt[] {
        let t = this;
        let t_qs = t.getCurQs();
        let t_list = t._boxVoListMap[t_qs];
        if (t_list === undefined) {
            t._boxVoListMap[t_qs] = t_list = [];
            for (let k in t._boxVoMap) {
                let t_vo = t._boxVoMap[k];
                if (t_vo && t_vo.cfg.qs == t_qs) {
                    t_list.push(t_vo);
                }
            }
        }
        return t_list;
    }
    //===================================== private method =====================================
    private reddotCheck() {
        let t = this;
        let t_value = false;
        let t_voList = t.getTaskVoList();
        for (let v of t_voList) {
            if (v.state == 1) {
                t_value = true;
                break;
            }
        }

        let t_boxList = t.getBoxVoList();
        for (let v of t_boxList) {
            if (v.state == 1) {
                t_value = true;
                break;
            }
        }

        // console.log("++++++++", t_value);
        GGlobal.reddot.setCondition(UIConst.ACTCOM_BZPT, 0, t_value);
        GGlobal.reddot.notify(UIConst.ACTCOM);
    }
    //======================================== handler =========================================
}