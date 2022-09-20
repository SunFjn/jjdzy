/**
 * 奇策展示界面
 * @author: lujiahao 
 * @date: 2019-10-24 16:47:34 
 */
class View_chat_Qice extends UIModalPanel {

    //>>>>start
	public frame: fairygui.GLabel;
	public backIcon: fairygui.GLoader;
	public ownerLb: fairygui.GLabel;
	public nameLb: fairygui.GLabel;
	public powerLb: fairygui.GLabel;
	public sjIcon: fairygui.GLoader;
	public starLb: fairygui.GRichTextField;
	public t0: fairygui.Transition;
	//>>>>end

    public static URL: string = "ui://fx4pr5qeeckr2w";

    public static createInstance(): View_chat_Qice {
        return <View_chat_Qice><any>(fairygui.UIPackage.createObject("chat", "View_chat_Qice"));
    }

    public constructor() {
        super();
        this.childrenCreated();
    }

    protected childrenCreated(): void {
        let s = this;
        s.view = fairygui.UIPackage.createObject("chat", "View_chat_Qice").asCom;
        s.contentPane = s.view;
        CommonManager.parseChildren(s.view, s);
        super.childrenCreated();
    }

    //=========================================== API ==========================================
    protected onShown() {
        let t = this;
        IconUtil.setImg(t.backIcon, Enum_Path.BACK_URL + "chatBg.png");
        IconUtil.setImg(t.backIcon, null);
        IconUtil.setImg(t.sjIcon, null);
        t.refreshData();
    }

    protected onHide() {
        let t = this;
         IconUtil.setImg1(null, t.sjIcon);
    }

    //===================================== private method =====================================
    public refreshData() {
        let t = this;
        let t_data: Vo_Chat = t._args;
        t.ownerLb.title = "拥有者：" + t_data.name;
        let t_list = t_data.content.split("_");
        let t_id = ~~t_list[0];
        let t_star = ~~t_list[1];
        let t_level = ~~t_list[2];
        let t_power = ~~t_list[3];

        let t_model = GGlobal.modelQice;
        let t_vo = t_model.getVoById(t_id);
        if (t_vo) {
            IconUtil.setImg1(Enum_Path.PIC_URL + t_vo.cfg.pic + ".png", t.sjIcon);

            t.starLb.text = t_star + "";

            let t_levelJie = ~~(t_level / 10);
            let t_levelJi = t_level % 10;

            let t_name = HtmlUtil.font(t_vo.cfg.name, Color.getColorStr(t_vo.cfg.pz));
            let t_levelStr = t_levelJie + "阶" + t_levelJi + "级";
            t.nameLb.title = t_name + "（" + t_levelStr + "）";
            t.powerLb.title = "战力：" + t_power;
        }
    }
    //======================================== handler =========================================
}