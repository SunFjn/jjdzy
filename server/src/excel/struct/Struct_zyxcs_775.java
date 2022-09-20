package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * X_775_新活动-做元宵-次数购买消耗.xlsx
 */
public class Struct_zyxcs_775 {
    /**掠夺次数*/
    private int cs;
    /**购买消耗
	 * 道具类型，道具id，道具数量，*/
    private int[][] xh;
    /**
     * 掠夺次数
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
    public Struct_zyxcs_775(int cs,String xh) {
        this.cs = cs;
        this.xh = ExcelJsonUtils.toObj(xh,int[][].class);
    }
}