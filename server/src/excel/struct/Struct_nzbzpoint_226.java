package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * N_226_南征北战积分表.xlsx
 */
public class Struct_nzbzpoint_226 {
    /**所需积分*/
    private int point;
    /**奖励*/
    private int[][] reward;
    /**
     * 所需积分
     */
    public int getPoint() {
        return point;
    }
    /**
     * 奖励
     */
    public int[][] getReward() {
        return reward;
    }
    public Struct_nzbzpoint_226(int point,String reward) {
        this.point = point;
        this.reward = ExcelJsonUtils.toObj(reward,int[][].class);
    }
}