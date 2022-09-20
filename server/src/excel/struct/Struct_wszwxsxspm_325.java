package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * K-325跨服通用排名表.xlsx
 */
public class Struct_wszwxsxspm_325 {
    /**id*/
    private int id;
    /**排名*/
    private int[][] rank;
    /**奖励*/
    private int[][] reward;
    /**大奖*/
    private int[][] reward1;
    /**期数*/
    private int qs;
    /**系统id
	 * 新活动系统ID
	 * */
    private int xtid;
    /**
     * id
     */
    public int getId() {
        return id;
    }
    /**
     * 排名
     */
    public int[][] getRank() {
        return rank;
    }
    /**
     * 奖励
     */
    public int[][] getReward() {
        return reward;
    }
    /**
     * 大奖
     */
    public int[][] getReward1() {
        return reward1;
    }
    /**
     * 期数
     */
    public int getQs() {
        return qs;
    }
    /**
     * 系统id
	 * 新活动系统ID
	 * 
     */
    public int getXtid() {
        return xtid;
    }
    public Struct_wszwxsxspm_325(int id,String rank,String reward,String reward1,int qs,int xtid) {
        this.id = id;
        this.rank = ExcelJsonUtils.toObj(rank,int[][].class);
        this.reward = ExcelJsonUtils.toObj(reward,int[][].class);
        this.reward1 = ExcelJsonUtils.toObj(reward1,int[][].class);
        this.qs = qs;
        this.xtid = xtid;
    }
}