package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * X_297_新活动-对联奖励表.xlsx
 */
public class Struct_ddlreward_297 {
    /**id*/
    private int id;
    /**期数*/
    private int qs;
    /**需对联数量*/
    private int num;
    /**奖励*/
    private int[][] reward;
    /**
     * id
     */
    public int getId() {
        return id;
    }
    /**
     * 期数
     */
    public int getQs() {
        return qs;
    }
    /**
     * 需对联数量
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
    public Struct_ddlreward_297(int id,int qs,int num,String reward) {
        this.id = id;
        this.qs = qs;
        this.num = num;
        this.reward = ExcelJsonUtils.toObj(reward,int[][].class);
    }
}