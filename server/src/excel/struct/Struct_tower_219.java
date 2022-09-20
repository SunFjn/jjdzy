package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * T_219_铜雀台表.xlsx
 */
public class Struct_tower_219 {
    /**层数*/
    private int id;
    /**boss*/
    private int[][] boss;
    /**BOSS掉落*/
    private String bd;
    /**大奖预览*/
    private int[][] reward;
    /**目标奖励*/
    private int[][] reward1;
    /**领取人数*/
    private int num;
    /**
     * 层数
     */
    public int getId() {
        return id;
    }
    /**
     * boss
     */
    public int[][] getBoss() {
        return boss;
    }
    /**
     * BOSS掉落
     */
    public String getBd() {
        return bd;
    }
    /**
     * 大奖预览
     */
    public int[][] getReward() {
        return reward;
    }
    /**
     * 目标奖励
     */
    public int[][] getReward1() {
        return reward1;
    }
    /**
     * 领取人数
     */
    public int getNum() {
        return num;
    }
    public Struct_tower_219(int id,String boss,String bd,String reward,String reward1,int num) {
        this.id = id;
        this.boss = ExcelJsonUtils.toObj(boss,int[][].class);
        this.bd = bd;
        this.reward = ExcelJsonUtils.toObj(reward,int[][].class);
        this.reward1 = ExcelJsonUtils.toObj(reward1,int[][].class);
        this.num = num;
    }
}