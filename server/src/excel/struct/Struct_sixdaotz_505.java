package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * L_505_六道套装表.xlsx
 */
public class Struct_sixdaotz_505 {
    /**套装id*/
    private int id;
    /**套装类型
	 * 1 天道
	 * 2 人道
	 * 3 畜生道
	 * 4 饿鬼道
	 * 5 地狱道
	 * 6 修罗道*/
    private int type;
    /**需要件数*/
    private int num;
    /**需要品质*/
    private int pz;
    /**套装属性*/
    private int[][] attr;
    /**
     * 套装id
     */
    public int getId() {
        return id;
    }
    /**
     * 套装类型
	 * 1 天道
	 * 2 人道
	 * 3 畜生道
	 * 4 饿鬼道
	 * 5 地狱道
	 * 6 修罗道
     */
    public int getType() {
        return type;
    }
    /**
     * 需要件数
     */
    public int getNum() {
        return num;
    }
    /**
     * 需要品质
     */
    public int getPz() {
        return pz;
    }
    /**
     * 套装属性
     */
    public int[][] getAttr() {
        return attr;
    }
    public Struct_sixdaotz_505(int id,int type,int num,int pz,String attr) {
        this.id = id;
        this.type = type;
        this.num = num;
        this.pz = pz;
        this.attr = ExcelJsonUtils.toObj(attr,int[][].class);
    }
}