package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * L_239_玲珑阁区服排名表.xlsx
 */
public class Struct_llgqf_239 {
    /**id*/
    private int id;
    /**配置id
	 * jingyu:
	 * 同玲珑阁表配置id字段*/
    private int llg;
    /**排名*/
    private int[][] rank;
    /**区服奖励*/
    private int[][] reward1;
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
     * 区服奖励
     */
    public int[][] getReward1() {
        return reward1;
    }
    public Struct_llgqf_239(int id,int llg,String rank,String reward1) {
        this.id = id;
        this.llg = llg;
        this.rank = ExcelJsonUtils.toObj(rank,int[][].class);
        this.reward1 = ExcelJsonUtils.toObj(reward1,int[][].class);
    }
}