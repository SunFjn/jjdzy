package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * F_254_烽火狼烟积分奖励表.xlsx
 */
public class Struct_fhlypotion_254 {
    /**id*/
    private int id;
    /**积分*/
    private int potion;
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
    public int getPotion() {
        return potion;
    }
    /**
     * 奖励
     */
    public int[][] getReward() {
        return reward;
    }
    public Struct_fhlypotion_254(int id,int potion,String reward) {
        this.id = id;
        this.potion = potion;
        this.reward = ExcelJsonUtils.toObj(reward,int[][].class);
    }
}