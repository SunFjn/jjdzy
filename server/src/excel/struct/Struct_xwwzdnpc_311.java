package excel.struct;
/**
 * W_311_新王位争夺NPC表.xlsx
 */
public class Struct_xwwzdnpc_311 {
    /**id*/
    private int id;
    /**位置*/
    private int site;
    /**显示称号图的ID
	 * 读称号表*/
    private int ch;
    /**npc战力及属性ID
	 * 读NPC表*/
    private int npc;
    /**官位
	 * XXX1：王
	 * XXX2：相
	 * XXX3：大将军
	 * XXX4：皇城侍卫
	 * XXX5：平民
	 * 1XXX：魏国
	 * 2XXX：蜀国
	 * 3XXX：吴国*/
    private int num;
    /**
     * id
     */
    public int getId() {
        return id;
    }
    /**
     * 位置
     */
    public int getSite() {
        return site;
    }
    /**
     * 显示称号图的ID
	 * 读称号表
     */
    public int getCh() {
        return ch;
    }
    /**
     * npc战力及属性ID
	 * 读NPC表
     */
    public int getNpc() {
        return npc;
    }
    /**
     * 官位
	 * XXX1：王
	 * XXX2：相
	 * XXX3：大将军
	 * XXX4：皇城侍卫
	 * XXX5：平民
	 * 1XXX：魏国
	 * 2XXX：蜀国
	 * 3XXX：吴国
     */
    public int getNum() {
        return num;
    }
    public Struct_xwwzdnpc_311(int id,int site,int ch,int npc,int num) {
        this.id = id;
        this.site = site;
        this.ch = ch;
        this.npc = npc;
        this.num = num;
    }
}