package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * X_776_许田围猎次数购买.xlsx
 */
public class Struct_xtwlcs_776 {
    /**序号*/
    private int id;
    /**购买消耗
	 * 道具类型，道具id，道具数量，*/
    private int[][] xh;
    /**
     * 序号
     */
    public int getId() {
        return id;
    }
    /**
     * 购买消耗
	 * 道具类型，道具id，道具数量，
     */
    public int[][] getXh() {
        return xh;
    }
    public Struct_xtwlcs_776(int id,String xh) {
        this.id = id;
        this.xh = ExcelJsonUtils.toObj(xh,int[][].class);
    }
}