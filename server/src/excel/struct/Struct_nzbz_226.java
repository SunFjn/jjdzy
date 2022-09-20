package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * N_226_南征北战表.xlsx
 */
public class Struct_nzbz_226 {
    /**奖励id
	 * jingyu:
	 * 1x：国家排名
	 * 2x：个人排名
	 * */
    private int id;
    /**排名*/
    private int[][] rank;
    /**奖励*/
    private int[][] reward1;
    /**
     * 奖励id
	 * jingyu:
	 * 1x：国家排名
	 * 2x：个人排名
	 * 
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
    public int[][] getReward1() {
        return reward1;
    }
    public Struct_nzbz_226(int id,String rank,String reward1) {
        this.id = id;
        this.rank = ExcelJsonUtils.toObj(rank,int[][].class);
        this.reward1 = ExcelJsonUtils.toObj(reward1,int[][].class);
    }
}