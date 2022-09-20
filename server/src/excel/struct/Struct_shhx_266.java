package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * S-266-兽魂幻形表.xlsx
 */
public class Struct_shhx_266 {
    /**id
	 * 1XXX：青龙外显
	 * 2XXX：白虎外显
	 * 3XXX：朱雀外显
	 * 4XXX：玄武外显
	 * 
	 * 尾数为1都是默认外显*/
    private int id;
    /**类型
	 * 1 青龙
	 * 2 白虎
	 * 3 朱雀
	 * 4 玄武*/
    private int type;
    /**激活消耗*/
    private int[][] conmuse;
    /**属性*/
    private int[][] attr;
    /**
     * id
	 * 1XXX：青龙外显
	 * 2XXX：白虎外显
	 * 3XXX：朱雀外显
	 * 4XXX：玄武外显
	 * 
	 * 尾数为1都是默认外显
     */
    public int getId() {
        return id;
    }
    /**
     * 类型
	 * 1 青龙
	 * 2 白虎
	 * 3 朱雀
	 * 4 玄武
     */
    public int getType() {
        return type;
    }
    /**
     * 激活消耗
     */
    public int[][] getConmuse() {
        return conmuse;
    }
    /**
     * 属性
     */
    public int[][] getAttr() {
        return attr;
    }
    public Struct_shhx_266(int id,int type,String conmuse,String attr) {
        this.id = id;
        this.type = type;
        this.conmuse = ExcelJsonUtils.toObj(conmuse,int[][].class);
        this.attr = ExcelJsonUtils.toObj(attr,int[][].class);
    }
}