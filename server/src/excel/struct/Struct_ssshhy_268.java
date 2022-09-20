package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * S-268-圣兽降临-每日活跃表.xlsx
 */
public class Struct_ssshhy_268 {
    /**id
	 * 1XXX：全民BOSS
	 * 2XXX：单刀赴会
	 * 3XXX：三国战神
	 * 4XXX：南征北战
	 * 5XXX：BOSS战场*/
    private int id;
    /**参数*/
    private int c;
    /**奖励*/
    private int[][] reward;
    /**
     * id
	 * 1XXX：全民BOSS
	 * 2XXX：单刀赴会
	 * 3XXX：三国战神
	 * 4XXX：南征北战
	 * 5XXX：BOSS战场
     */
    public int getId() {
        return id;
    }
    /**
     * 参数
     */
    public int getC() {
        return c;
    }
    /**
     * 奖励
     */
    public int[][] getReward() {
        return reward;
    }
    public Struct_ssshhy_268(int id,int c,String reward) {
        this.id = id;
        this.c = c;
        this.reward = ExcelJsonUtils.toObj(reward,int[][].class);
    }
}