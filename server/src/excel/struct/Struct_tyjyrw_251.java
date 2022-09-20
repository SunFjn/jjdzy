package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * T_251_桃园结义任务表.xlsx
 */
public class Struct_tyjyrw_251 {
    /**任务id
	 * 1.每日登陆
	 * 2.挑战X次全民BOSS
	 * 3.挑战X次七擒孟获
	 * 4.消耗XX元宝
	 * 5.挑战三国战神
	 * 6.挑战南征北战
	 * 7.充值任意金额*/
    private int id;
    /**任务参数*/
    private int cs;
    /**1人完成奖励*/
    private int[][] reward1;
    /**2人完成奖励*/
    private int[][] reward2;
    /**3人完成奖励*/
    private int[][] reward3;
    /**
     * 任务id
	 * 1.每日登陆
	 * 2.挑战X次全民BOSS
	 * 3.挑战X次七擒孟获
	 * 4.消耗XX元宝
	 * 5.挑战三国战神
	 * 6.挑战南征北战
	 * 7.充值任意金额
     */
    public int getId() {
        return id;
    }
    /**
     * 任务参数
     */
    public int getCs() {
        return cs;
    }
    /**
     * 1人完成奖励
     */
    public int[][] getReward1() {
        return reward1;
    }
    /**
     * 2人完成奖励
     */
    public int[][] getReward2() {
        return reward2;
    }
    /**
     * 3人完成奖励
     */
    public int[][] getReward3() {
        return reward3;
    }
    public Struct_tyjyrw_251(int id,int cs,String reward1,String reward2,String reward3) {
        this.id = id;
        this.cs = cs;
        this.reward1 = ExcelJsonUtils.toObj(reward1,int[][].class);
        this.reward2 = ExcelJsonUtils.toObj(reward2,int[][].class);
        this.reward3 = ExcelJsonUtils.toObj(reward3,int[][].class);
    }
}