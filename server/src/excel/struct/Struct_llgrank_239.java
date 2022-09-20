package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * L_239_玲珑阁排名表.xlsx
 */
public class Struct_llgrank_239 {
    /**id*/
    private int id;
    /**配置id
	 * jingyu:
	 * 同玲珑阁表配置id字段*/
    private int llg;
    /**排名*/
    private int[][] rank;
    /**普通奖励*/
    private int[][] reward1;
    /**特殊奖励*/
    private int[][] reward2;
    /**
     * id
     */
    public int getId() {
        return id;
    }
    /**
     * 配置id
	 * jingyu:
	 * 同玲珑阁表配置id字段
     */
    public int getLlg() {
        return llg;
    }
    /**
     * 排名
     */
    public int[][] getRank() {
        return rank;
    }
    /**
     * 普通奖励
     */
    public int[][] getReward1() {
        return reward1;
    }
    /**
     * 特殊奖励
     */
    public int[][] getReward2() {
        return reward2;
    }
    public Struct_llgrank_239(int id,int llg,String rank,String reward1,String reward2) {
        this.id = id;
        this.llg = llg;
        this.rank = ExcelJsonUtils.toObj(rank,int[][].class);
        this.reward1 = ExcelJsonUtils.toObj(reward1,int[][].class);
        this.reward2 = ExcelJsonUtils.toObj(reward2,int[][].class);
    }
}