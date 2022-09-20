package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * C_726_超值转盘奖励池.xlsx
 */
public class Struct_czzpreward_726 {
    /**序号*/
    private int id;
    /**奖励*/
    private int[][] reward;
    /**概率*/
    private int qz;
    /**大奖
	 * jingyu:
	 * 1为大奖，需要广播
	 * 0为普通奖励，不需要广播*/
    private int bigaward;
    /**
     * 序号
     */
    public int getId() {
        return id;
    }
    /**
     * 奖励
     */
    public int[][] getReward() {
        return reward;
    }
    /**
     * 概率
     */
    public int getQz() {
        return qz;
    }
    /**
     * 大奖
	 * jingyu:
	 * 1为大奖，需要广播
	 * 0为普通奖励，不需要广播
     */
    public int getBigaward() {
        return bigaward;
    }
    public Struct_czzpreward_726(int id,String reward,int qz,int bigaward) {
        this.id = id;
        this.reward = ExcelJsonUtils.toObj(reward,int[][].class);
        this.qz = qz;
        this.bigaward = bigaward;
    }
}