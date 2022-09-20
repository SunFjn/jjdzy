package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * X_283_仙山寻兽奖励表.xlsx
 */
public class Struct_xsxsreward_283 {
    /**id*/
    private int id;
    /**普通奖励
	 * 道具类型，道具id，道具数量，概率，是否广播*/
    private String reward1;
    /**高级奖励
	 * 道具类型，道具id，道具数量，概率，是否广播*/
    private String reward2;
    /**元宝消耗*/
    private int[][] conmuse;
    /**
     * id
     */
    public int getId() {
        return id;
    }
    /**
     * 普通奖励
	 * 道具类型，道具id，道具数量，概率，是否广播
     */
    public String getReward1() {
        return reward1;
    }
    /**
     * 高级奖励
	 * 道具类型，道具id，道具数量，概率，是否广播
     */
    public String getReward2() {
        return reward2;
    }
    /**
     * 元宝消耗
     */
    public int[][] getConmuse() {
        return conmuse;
    }
    public Struct_xsxsreward_283(int id,String reward1,String reward2,String conmuse) {
        this.id = id;
        this.reward1 = reward1;
        this.reward2 = reward2;
        this.conmuse = ExcelJsonUtils.toObj(conmuse,int[][].class);
    }
}