package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * S_762_三英战吕布次数购买.xlsx
 */
public class Struct_sycs_762 {
    /**购买次数*/
    private int cs;
    /**购买消耗
	 * 道具类型，道具id，道具数量，*/
    private int[][] xh;
    /**
     * 购买次数
     */
    public int getCs() {
        return cs;
    }
    /**
     * 购买消耗
	 * 道具类型，道具id，道具数量，
     */
    public int[][] getXh() {
        return xh;
    }
    public Struct_sycs_762(int cs,String xh) {
        this.cs = cs;
        this.xh = ExcelJsonUtils.toObj(xh,int[][].class);
    }
}