package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * X_753_新活动_三国宝藏-抽奖消耗.xlsx
 */
public class Struct_cjxh_753 {
    /**次数*/
    private int cs;
    /**消耗*/
    private int[][] xh;
    /**
     * 次数
     */
    public int getCs() {
        return cs;
    }
    /**
     * 消耗
     */
    public int[][] getXh() {
        return xh;
    }
    public Struct_cjxh_753(int cs,String xh) {
        this.cs = cs;
        this.xh = ExcelJsonUtils.toObj(xh,int[][].class);
    }
}