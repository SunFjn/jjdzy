package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * X_283_仙山寻兽积分表.xlsx
 */
public class Struct_xsxspoint_283 {
    /**id*/
    private int id;
    /**需要积分*/
    private int point;
    /**奖励*/
    private int[][] reward;
    /**
     * id
     */
    public int getId() {
        return id;
    }
    /**
     * 需要积分
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
    public Struct_xsxspoint_283(int id,int point,String reward) {
        this.id = id;
        this.point = point;
        this.reward = ExcelJsonUtils.toObj(reward,int[][].class);
    }
}