package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * H_323_虎牢关雇佣表.xlsx
 */
public class Struct_hlggyb_323 {
    /**顺序*/
    private int id;
    /**战力区间
	 * 单位;万*/
    private int[][] zl;
    /**雇佣消耗*/
    private int[][] gy;
    /**
     * 顺序
     */
    public int getId() {
        return id;
    }
    /**
     * 战力区间
	 * 单位;万
     */
    public int[][] getZl() {
        return zl;
    }
    /**
     * 雇佣消耗
     */
    public int[][] getGy() {
        return gy;
    }
    public Struct_hlggyb_323(int id,String zl,String gy) {
        this.id = id;
        this.zl = ExcelJsonUtils.toObj(zl,int[][].class);
        this.gy = ExcelJsonUtils.toObj(gy,int[][].class);
    }
}