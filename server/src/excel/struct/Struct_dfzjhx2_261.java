package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * D_506_登峰造极海选积分表.xlsx
 */
public class Struct_dfzjhx2_261 {
    /**id*/
    private int id;
    /**积分*/
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
     * 积分
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
    public Struct_dfzjhx2_261(int id,int point,String reward) {
        this.id = id;
        this.point = point;
        this.reward = ExcelJsonUtils.toObj(reward,int[][].class);
    }
}