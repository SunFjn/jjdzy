package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * H_286_合服狂欢_张飞醉酒表.xlsx
 */
public class Struct_hfkhzfzj_286 {
    /**id*/
    private int id;
    /**下个id*/
    private int next;
    /**所需醉意值*/
    private int zui;
    /**BOSSid*/
    private int boss;
    /**奖励*/
    private int[][] reward;
    /**参与奖励*/
    private int[][] reward1;
    /**最后一击奖励*/
    private int[][] reward2;
    /**秒伤百分比
	 * jingyu:
	 * 百分之X*/
    private int ap;
    /**秒伤固定值*/
    private int p;
    /**验证时间*/
    private int time;
    /**
     * id
     */
    public int getId() {
        return id;
    }
    /**
     * 下个id
     */
    public int getNext() {
        return next;
    }
    /**
     * 所需醉意值
     */
    public int getZui() {
        return zui;
    }
    /**
     * BOSSid
     */
    public int getBoss() {
        return boss;
    }
    /**
     * 奖励
     */
    public int[][] getReward() {
        return reward;
    }
    /**
     * 参与奖励
     */
    public int[][] getReward1() {
        return reward1;
    }
    /**
     * 最后一击奖励
     */
    public int[][] getReward2() {
        return reward2;
    }
    /**
     * 秒伤百分比
	 * jingyu:
	 * 百分之X
     */
    public int getAp() {
        return ap;
    }
    /**
     * 秒伤固定值
     */
    public int getP() {
        return p;
    }
    /**
     * 验证时间
     */
    public int getTime() {
        return time;
    }
    public Struct_hfkhzfzj_286(int id,int next,int zui,int boss,String reward,String reward1,String reward2,int ap,int p,int time) {
        this.id = id;
        this.next = next;
        this.zui = zui;
        this.boss = boss;
        this.reward = ExcelJsonUtils.toObj(reward,int[][].class);
        this.reward1 = ExcelJsonUtils.toObj(reward1,int[][].class);
        this.reward2 = ExcelJsonUtils.toObj(reward2,int[][].class);
        this.ap = ap;
        this.p = p;
        this.time = time;
    }
}