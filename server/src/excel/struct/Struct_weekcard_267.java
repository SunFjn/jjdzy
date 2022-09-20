package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * Z-267-尊享周卡表.xlsx
 */
public class Struct_weekcard_267 {
    /**索引id*/
    private int id;
    /**每日奖励*/
    private int[][] reward;
    /**增加升阶秘境扫荡次数*/
    private int tq1;
    /**增加升阶秘境协助次数*/
    private int tq2;
    /**增加材料副本免费次数*/
    private int tq3;
    /**
     * 索引id
     */
    public int getId() {
        return id;
    }
    /**
     * 每日奖励
     */
    public int[][] getReward() {
        return reward;
    }
    /**
     * 增加升阶秘境扫荡次数
     */
    public int getTq1() {
        return tq1;
    }
    /**
     * 增加升阶秘境协助次数
     */
    public int getTq2() {
        return tq2;
    }
    /**
     * 增加材料副本免费次数
     */
    public int getTq3() {
        return tq3;
    }
    public Struct_weekcard_267(int id,String reward,int tq1,int tq2,int tq3) {
        this.id = id;
        this.reward = ExcelJsonUtils.toObj(reward,int[][].class);
        this.tq1 = tq1;
        this.tq2 = tq2;
        this.tq3 = tq3;
    }
}