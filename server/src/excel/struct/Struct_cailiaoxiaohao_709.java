package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * C_709_材料副本消耗.xlsx
 */
public class Struct_cailiaoxiaohao_709 {
    /**购买次数
	 * 序号=次数
	 * */
    private int id;
    /**消耗*/
    private int[][] expend;
    /**
     * 购买次数
	 * 序号=次数
	 * 
     */
    public int getId() {
        return id;
    }
    /**
     * 消耗
     */
    public int[][] getExpend() {
        return expend;
    }
    public Struct_cailiaoxiaohao_709(int id,String expend) {
        this.id = id;
        this.expend = ExcelJsonUtils.toObj(expend,int[][].class);
    }
}