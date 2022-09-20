package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * S-266-兽魂觉醒表.xlsx
 */
public class Struct_shjx_266 {
    /**部位id*/
    private int id;
    /**套装印记
	 * 1 青龙
	 * 2 白虎
	 * 3 朱雀
	 * 4 玄武*/
    private int yj;
    /**类型套装属性*/
    private int[][] attr;
    /**
     * 部位id
     */
    public int getId() {
        return id;
    }
    /**
     * 套装印记
	 * 1 青龙
	 * 2 白虎
	 * 3 朱雀
	 * 4 玄武
     */
    public int getYj() {
        return yj;
    }
    /**
     * 类型套装属性
     */
    public int[][] getAttr() {
        return attr;
    }
    public Struct_shjx_266(int id,int yj,String attr) {
        this.id = id;
        this.yj = yj;
        this.attr = ExcelJsonUtils.toObj(attr,int[][].class);
    }
}