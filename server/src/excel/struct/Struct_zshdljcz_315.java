package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * Z_315_专属活动-累计充值表.xlsx
 */
public class Struct_zshdljcz_315 {
    /**序号*/
    private int id;
    /**期数*/
    private int qs;
    /**额度
	 * jjjjyyy:
	 * RMB*/
    private int coin;
    /**奖励*/
    private int[][] reward;
    /**
     * 序号
     */
    public int getId() {
        return id;
    }
    /**
     * 期数
     */
    public int getQs() {
        return qs;
    }
    /**
     * 额度
	 * jjjjyyy:
	 * RMB
     */
    public int getCoin() {
        return coin;
    }
    /**
     * 奖励
     */
    public int[][] getReward() {
        return reward;
    }
    public Struct_zshdljcz_315(int id,int qs,int coin,String reward) {
        this.id = id;
        this.qs = qs;
        this.coin = coin;
        this.reward = ExcelJsonUtils.toObj(reward,int[][].class);
    }
}