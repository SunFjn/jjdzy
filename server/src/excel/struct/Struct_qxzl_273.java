package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * Q_273_群雄逐鹿表.xlsx
 */
public class Struct_qxzl_273 {
    /**城池id*/
    private int id;
    /**城池类型
	 * 1.1级城池
	 * 2.2级城池
	 * 3.3级城池
	 * 4.魏国都城
	 * 5.蜀国都城
	 * 6.吴国都城*/
    private int type;
    /**城池名字*/
    private String name;
    /**可驻守玩家数量*/
    private int sl;
    /**相邻城池*/
    private int[][] behind;
    /**驻守体力要求*/
    private int tl;
    /**驻守体力消耗（每10分钟）*/
    private int conmuse;
    /**驻守积分奖励*/
    private int point;
    /**驻守鹿角奖励*/
    private int[][] lu;
    /**城池奖励*/
    private int[][] reward;
    /**NPC*/
    private int npc;
    /**
     * 城池id
     */
    public int getId() {
        return id;
    }
    /**
     * 城池类型
	 * 1.1级城池
	 * 2.2级城池
	 * 3.3级城池
	 * 4.魏国都城
	 * 5.蜀国都城
	 * 6.吴国都城
     */
    public int getType() {
        return type;
    }
    /**
     * 城池名字
     */
    public String getName() {
        return name;
    }
    /**
     * 可驻守玩家数量
     */
    public int getSl() {
        return sl;
    }
    /**
     * 相邻城池
     */
    public int[][] getBehind() {
        return behind;
    }
    /**
     * 驻守体力要求
     */
    public int getTl() {
        return tl;
    }
    /**
     * 驻守体力消耗（每10分钟）
     */
    public int getConmuse() {
        return conmuse;
    }
    /**
     * 驻守积分奖励
     */
    public int getPoint() {
        return point;
    }
    /**
     * 驻守鹿角奖励
     */
    public int[][] getLu() {
        return lu;
    }
    /**
     * 城池奖励
     */
    public int[][] getReward() {
        return reward;
    }
    /**
     * NPC
     */
    public int getNpc() {
        return npc;
    }
    public Struct_qxzl_273(int id,int type,String name,int sl,String behind,int tl,int conmuse,int point,String lu,String reward,int npc) {
        this.id = id;
        this.type = type;
        this.name = name;
        this.sl = sl;
        this.behind = ExcelJsonUtils.toObj(behind,int[][].class);
        this.tl = tl;
        this.conmuse = conmuse;
        this.point = point;
        this.lu = ExcelJsonUtils.toObj(lu,int[][].class);
        this.reward = ExcelJsonUtils.toObj(reward,int[][].class);
        this.npc = npc;
    }
}