package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * D_225_单刀赴会表.xlsx
 */
public class Struct_ddfh_225 {
    /**胜利场次*/
    private int num;
    /**奖励*/
    private int[][] reward;
    /**
     * 胜利场次
     */
    public int getNum() {
        return num;
    }
    /**
     * 奖励
     */
    public int[][] getReward() {
        return reward;
    }
    public Struct_ddfh_225(int num,String reward) {
        this.num = num;
        this.reward = ExcelJsonUtils.toObj(reward,int[][].class);
    }
}