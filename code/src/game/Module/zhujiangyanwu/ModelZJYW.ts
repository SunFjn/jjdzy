class ModelZJYW extends BaseModel {
    public static msg_act_state = "msg_act_state";
    public static msg_datas = "msg_datas";
    public listenServ(wsm: WebSocketMgr) {
        super.listenServ(wsm);
        wsm.regHand(4712, this.GC4712, this);
        wsm.regHand(4714, this.GC4714, this);
        wsm.regHand(4716, this.GC4716, this);
        wsm.regHand(4718, this.GC4718, this);
    }
    public static actState: number;
    public static datas: IDataZJYW[] = [];
    public static remainCnt: number;
    public static result: number = 0;
    private GC4712(self: ModelZJYW, bytes: BaseBytes) {
        ModelZJYW.actState = bytes.readByte();
        self.notify(ModelZJYW.msg_act_state, ModelZJYW.actState == 1);
    }
    /**打开界面 */
    public CG4713() { this.sendSocket(4713, this.getBytes()) }
    private GC4714(self: ModelZJYW, bytes: BaseBytes) {
        const state = bytes.readByte();
        const len = bytes.readShort();
        ModelZJYW.datas.length = 0;
        for (let i = 0; i < len; i++) {
            const pos: number = bytes.readShort();
            const id: number = bytes.readShort();
            const state: number = bytes.readByte();
            ModelZJYW.datas.push({ pos: pos, id: id, state: state });
        }
        ModelZJYW.remainCnt = bytes.readByte();
        GGlobal.reddot.setCondition(UIConst.CHILDZJYW, 0, self.getNotice());
        self.notify(ModelZJYW.msg_datas);
    }
    /**挑战 */
    public CG4715(id: number) {
        const bytes = this.getBytes();
        bytes.writeShort(id);
        ModelZJYW.curBoss = id;
        this.sendSocket(4715, bytes);
    }
    public static curBoss: number;
    public static enemyid:number=0;
    private GC4716(self: ModelZJYW, bytes: BaseBytes) {
        const state = bytes.readByte();
        ModelZJYW.enemyid = bytes.readLong();
        if (state == 1) {
            // self.enterBattle();
            GGlobal.mapscene.enterScene(SceneCtrl.ZJYWBAT);
        } else {
            //1开打 2该位置不存在 3没有挑战次数 4该位置今天没有武将 5活动未开启 6未激活，演武令不足
            ViewCommonWarn.text(["", "", "该位置不存在", "没有挑战次数", "该位置今天没有武将", "活动未开启", "未激活"][state]);
        }
    }
    /**挑战结果 */
    public CG4717(pos: number, state: number) {
        const bytes = this.getBytes();
        bytes.writeShort(pos);
        bytes.writeByte(state);
        this.sendSocket(4717, bytes);
    }
    private GC4718(self: ModelZJYW, bytes: BaseBytes) {
        const state = bytes.readByte();
        if (state == 1) {
            // var scenectrl: ZJYWSceneCtrl = SceneCtrl.getCtrl(SceneCtrl.ZJYWBAT) as ZJYWSceneCtrl;
            // scenectrl.truelyExit();
        } else {
            //1成功 2该位置不存在 3没有挑战次数 4该位置今天没有武将 5活动未开启 6未激活，演武令不足 7战斗失败
            ViewCommonWarn.text(["", "", "该位置不存在", "没有挑战次数", '该位置今天没有武将', "活动未开启", "未激活, 演武令不足", "战斗失败"][state]);
        }
    }
    public getNotice() {
        const datas = ModelZJYW.datas;
        if (ModelZJYW.remainCnt <= 0) {
            return false;
        }
        for (let i = 0; i < datas.length; i++) {
            const data = datas[i];
            if (data.state == 1 && ModelZJYW.remainCnt > 0) {
                return true;
            } else if (data.state == 0) {
                const cnt = Model_Bag.getItemCount(410100);
                const cfg = Config.zjywdl_005[data.id];
                if (cfg) {
                    const cost = cfg.cost;
                    if (cnt >= cost) {
                        return true;
                    }
                }
            }
        }
        return false;
    }
    public static getInfoByPos(pos: number) {
        const datas = this.datas;
        for (let i = 0; i < datas.length; i++) {
            const data = datas[i];
            if (data.pos == pos) {
                return data;
            }
        }
        return null;
    }
}
interface IDataZJYW {
    /**位置 */
    pos: number;
    /**武将id */
    id: number;
    state: number;
}