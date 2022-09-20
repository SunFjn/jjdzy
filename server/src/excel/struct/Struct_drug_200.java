package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * T_200_吞噬丹表.xlsx
 */
public class Struct_drug_200 {
    /**索引id*/
    private int list;
    /**道具id*/
    private int id;
    /**对应系统
	 * jingyu:
	 * 
	 * 对应功能开启表id*/
    private int sys;
    /**道具名字*/
    private String name;
    /**道具属性*/
    private int[][] attr;
    /**
     * 索引id
     */
    public int getList() {
        return list;
    }
    /**
     * 道具id
     */
    public int getId() {
        return id;
    }
    /**
     * 对应系统
	 * jingyu:
	 * 
	 * 对应功能开启表id
     */
    public int getSys() {
        return sys;
    }
    /**
     * 道具名字
     */
    public String getName() {
        return name;
    }
    /**
     * 道具属性
     */
    public int[][] getAttr() {
        return attr;
    }
    public Struct_drug_200(int list,int id,int sys,String name,String attr) {
        this.list = list;
        this.id = id;
        this.sys = sys;
        this.name = name;
        this.attr = ExcelJsonUtils.toObj(attr,int[][].class);
    }
}