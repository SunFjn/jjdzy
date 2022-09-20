package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * X_299_新活动-年兽闹喜积分表.xlsx
 */
public class Struct_nianpoint_299 {
    /**目标id*/
    private int id;
    /**需要积分*/
    private int point;
    /**奖励*/
    private int[][] reward;
    /**
     * 目标id
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
    public Struct_nianpoint_299(int id,int point,String reward) {
        this.id = id;
        this.point = point;
        this.reward = ExcelJsonUtils.toObj(reward,int[][].class);
    }
}