package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * L_290_粮草争夺奖励表.xlsx
 */
public class Struct_ricemb_290 {
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
    public Struct_ricemb_290(int id,int point,String reward) {
        this.id = id;
        this.point = point;
        this.reward = ExcelJsonUtils.toObj(reward,int[][].class);
    }
}