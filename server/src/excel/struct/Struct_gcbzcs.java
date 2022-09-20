package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * G_777_攻城拔次数购买.xlsx
 */
public class Struct_gcbzcs {
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
    public Struct_gcbzcs(int id,String xh) {
        this.id = id;
        this.xh = ExcelJsonUtils.toObj(xh,int[][].class);
    }
}