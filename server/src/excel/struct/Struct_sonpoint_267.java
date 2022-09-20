package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * S_267_少主祈愿积分表.xlsx
 */
public class Struct_sonpoint_267 {
    /**id*/
    private int id;
    /**所需积分*/
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
    public Struct_sonpoint_267(int id,int point,String reward) {
        this.id = id;
        this.point = point;
        this.reward = ExcelJsonUtils.toObj(reward,int[][].class);
    }
}