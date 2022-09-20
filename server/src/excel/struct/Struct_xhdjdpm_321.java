package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * X-321-新活动-完美鉴定排名表.xlsx
 */
public class Struct_xhdjdpm_321 {
    /**id
	 * 1XXX：第一期
	 * 2XXX：第二期
	 * */
    private int id;
    /**排名*/
    private int[][] rank;
    /**大奖*/
    private int[][] big;
    /**奖励*/
    private int[][] reward;
    /**期数*/
    private int qs;
    /**
     * id
	 * 1XXX：第一期
	 * 2XXX：第二期
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
     * 大奖
     */
    public int[][] getBig() {
        return big;
    }
    /**
     * 奖励
     */
    public int[][] getReward() {
        return reward;
    }
    /**
     * 期数
     */
    public int getQs() {
        return qs;
    }
    public Struct_xhdjdpm_321(int id,String rank,String big,String reward,int qs) {
        this.id = id;
        this.rank = ExcelJsonUtils.toObj(rank,int[][].class);
        this.big = ExcelJsonUtils.toObj(big,int[][].class);
        this.reward = ExcelJsonUtils.toObj(reward,int[][].class);
        this.qs = qs;
    }
}