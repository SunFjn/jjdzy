package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * M_224_魔神吕布表.xlsx
 */
public class Struct_lvbu_224 {
    /**地图*/
    private int map;
    /**个人第1奖励*/
    private int[][] reward1;
    /**个人第2奖励*/
    private int[][] reward2;
    /**个人第3奖励*/
    private int[][] reward3;
    /**个人第4-10奖励*/
    private int[][] reward4;
    /**最后一击奖励预览*/
    private int[][] reward5;
    /**
     * 地图
     */
    public int getMap() {
        return map;
    }
    /**
     * 个人第1奖励
     */
    public int[][] getReward1() {
        return reward1;
    }
    /**
     * 个人第2奖励
     */
    public int[][] getReward2() {
        return reward2;
    }
    /**
     * 个人第3奖励
     */
    public int[][] getReward3() {
        return reward3;
    }
    /**
     * 个人第4-10奖励
     */
    public int[][] getReward4() {
        return reward4;
    }
    /**
     * 最后一击奖励预览
     */
    public int[][] getReward5() {
        return reward5;
    }
    public Struct_lvbu_224(int map,String reward1,String reward2,String reward3,String reward4,String reward5) {
        this.map = map;
        this.reward1 = ExcelJsonUtils.toObj(reward1,int[][].class);
        this.reward2 = ExcelJsonUtils.toObj(reward2,int[][].class);
        this.reward3 = ExcelJsonUtils.toObj(reward3,int[][].class);
        this.reward4 = ExcelJsonUtils.toObj(reward4,int[][].class);
        this.reward5 = ExcelJsonUtils.toObj(reward5,int[][].class);
    }
}