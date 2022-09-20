package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * M_224_魔神吕布BOSS表.xlsx
 */
public class Struct_lvbuboss_224 {
    /**boss*/
    private int boss;
    /**秒伤百分比
	 * jingyu:
	 * 百分之X*/
    private int ap;
    /**秒伤固定值*/
    private int p;
    /**界面原画*/
    private int pic;
    /**击杀奖励*/
    private int[][] joinreward;
    /**最后一击奖励*/
    private int[][] killreward;
    /**验证时间*/
    private int time;
    /**
     * boss
     */
    public int getBoss() {
        return boss;
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
     * 界面原画
     */
    public int getPic() {
        return pic;
    }
    /**
     * 击杀奖励
     */
    public int[][] getJoinreward() {
        return joinreward;
    }
    /**
     * 最后一击奖励
     */
    public int[][] getKillreward() {
        return killreward;
    }
    /**
     * 验证时间
     */
    public int getTime() {
        return time;
    }
    public Struct_lvbuboss_224(int boss,int ap,int p,int pic,String joinreward,String killreward,int time) {
        this.boss = boss;
        this.ap = ap;
        this.p = p;
        this.pic = pic;
        this.joinreward = ExcelJsonUtils.toObj(joinreward,int[][].class);
        this.killreward = ExcelJsonUtils.toObj(killreward,int[][].class);
        this.time = time;
    }
}