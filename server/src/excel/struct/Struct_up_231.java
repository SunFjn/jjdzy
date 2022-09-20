package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * J_231_晋升表.xlsx
 */
public class Struct_up_231 {
    /**晋级id*/
    private int id;
    /**下级经验*/
    private int exp;
    /**晋级品数*/
    private String pin;
    /**奖励*/
    private int[][] reward;
    /**限时奖励*/
    private int[][] time;
    /**激活奖励1（赵云）*/
    private int[][] reward1;
    /**激活奖励2（诸葛亮）*/
    private int[][] reward2;
    /**激活奖励3（貂蝉）*/
    private int[][] reward3;
    /**
     * 晋级id
     */
    public int getId() {
        return id;
    }
    /**
     * 下级经验
     */
    public int getExp() {
        return exp;
    }
    /**
     * 晋级品数
     */
    public String getPin() {
        return pin;
    }
    /**
     * 奖励
     */
    public int[][] getReward() {
        return reward;
    }
    /**
     * 限时奖励
     */
    public int[][] getTime() {
        return time;
    }
    /**
     * 激活奖励1（赵云）
     */
    public int[][] getReward1() {
        return reward1;
    }
    /**
     * 激活奖励2（诸葛亮）
     */
    public int[][] getReward2() {
        return reward2;
    }
    /**
     * 激活奖励3（貂蝉）
     */
    public int[][] getReward3() {
        return reward3;
    }
    public Struct_up_231(int id,int exp,String pin,String reward,String time,String reward1,String reward2,String reward3) {
        this.id = id;
        this.exp = exp;
        this.pin = pin;
        this.reward = ExcelJsonUtils.toObj(reward,int[][].class);
        this.time = ExcelJsonUtils.toObj(time,int[][].class);
        this.reward1 = ExcelJsonUtils.toObj(reward1,int[][].class);
        this.reward2 = ExcelJsonUtils.toObj(reward2,int[][].class);
        this.reward3 = ExcelJsonUtils.toObj(reward3,int[][].class);
    }
}