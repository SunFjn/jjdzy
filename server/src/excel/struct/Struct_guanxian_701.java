package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * G_701_官衔表.xlsx
 */
public class Struct_guanxian_701 {
    /**序号*/
    private int id;
    /**名称*/
    private String name;
    /**属性*/
    private int[][] attr;
    /**俸禄*/
    private int[][] award;
    /**升级所需功勋值*/
    private int lvup;
    /**品质
	 * jingyu:
	 * 1.白
	 * 2.绿
	 * 3.蓝
	 * 4.紫
	 * 5.橙
	 * 6.红*/
    private int pinzhi;
    /**
     * 序号
     */
    public int getId() {
        return id;
    }
    /**
     * 名称
     */
    public String getName() {
        return name;
    }
    /**
     * 属性
     */
    public int[][] getAttr() {
        return attr;
    }
    /**
     * 俸禄
     */
    public int[][] getAward() {
        return award;
    }
    /**
     * 升级所需功勋值
     */
    public int getLvup() {
        return lvup;
    }
    /**
     * 品质
	 * jingyu:
	 * 1.白
	 * 2.绿
	 * 3.蓝
	 * 4.紫
	 * 5.橙
	 * 6.红
     */
    public int getPinzhi() {
        return pinzhi;
    }
    public Struct_guanxian_701(int id,String name,String attr,String award,int lvup,int pinzhi) {
        this.id = id;
        this.name = name;
        this.attr = ExcelJsonUtils.toObj(attr,int[][].class);
        this.award = ExcelJsonUtils.toObj(award,int[][].class);
        this.lvup = lvup;
        this.pinzhi = pinzhi;
    }
}