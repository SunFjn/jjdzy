package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * L_725_累计充值2.xlsx
 */
public class Struct_leichong2_725 {
    /**序号*/
    private int id;
    /**期数*/
    private int qishu;
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
    public int getQishu() {
        return qishu;
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
    public Struct_leichong2_725(int id,int qishu,int coin,String reward) {
        this.id = id;
        this.qishu = qishu;
        this.coin = coin;
        this.reward = ExcelJsonUtils.toObj(reward,int[][].class);
    }
}