package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * M_256_每日直购目标表.xlsx
 */
public class Struct_mrzgmb_256 {
    /**编号*/
    private int bianhao;
    /**系统id
	 * 5009  直购1-7
	 * 4526  直购8-28
	 * 5010  直购活动配置*/
    private int id;
    /**期数
	 * 0 表示无期数区分*/
    private int day;
    /**次数*/
    private int cishu;
    /**奖励*/
    private int[][] reward;
    /**
     * 编号
     */
    public int getBianhao() {
        return bianhao;
    }
    /**
     * 系统id
	 * 5009  直购1-7
	 * 4526  直购8-28
	 * 5010  直购活动配置
     */
    public int getId() {
        return id;
    }
    /**
     * 期数
	 * 0 表示无期数区分
     */
    public int getDay() {
        return day;
    }
    /**
     * 次数
     */
    public int getCishu() {
        return cishu;
    }
    /**
     * 奖励
     */
    public int[][] getReward() {
        return reward;
    }
    public Struct_mrzgmb_256(int bianhao,int id,int day,int cishu,String reward) {
        this.bianhao = bianhao;
        this.id = id;
        this.day = day;
        this.cishu = cishu;
        this.reward = ExcelJsonUtils.toObj(reward,int[][].class);
    }
}