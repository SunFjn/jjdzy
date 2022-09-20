package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * C_010_超级点将2.xlsx
 */
public class Struct_cjdj2_010 {
    /**期数*/
    private int qishu;
    /**抽奖次数*/
    private int cishu;
    /**RMB*/
    private int yuanbao;
    /**奖励
	 * [[类型，ID，数量，概率]]
	 * 100000为概率100%*/
    private int[][] reward;
    /**
     * 期数
     */
    public int getQishu() {
        return qishu;
    }
    /**
     * 抽奖次数
     */
    public int getCishu() {
        return cishu;
    }
    /**
     * RMB
     */
    public int getYuanbao() {
        return yuanbao;
    }
    /**
     * 奖励
	 * [[类型，ID，数量，概率]]
	 * 100000为概率100%
     */
    public int[][] getReward() {
        return reward;
    }
    public Struct_cjdj2_010(int qishu,int cishu,int yuanbao,String reward) {
        this.qishu = qishu;
        this.cishu = cishu;
        this.yuanbao = yuanbao;
        this.reward = ExcelJsonUtils.toObj(reward,int[][].class);
    }
}