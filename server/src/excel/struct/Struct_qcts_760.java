package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * Q_760_奇策-吞噬表.xlsx
 */
public class Struct_qcts_760 {
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
    /**固定属性
	 * Windows 用户:
	 * 
	 * 填0：读十万分比属性
	 * */
    private int[][] attr1;
    /**十万分比属性
	 * Windows 用户:
	 * 
	 * 填0：读固定属性
	 * 具体数值：读十万分比属性
	 * 实际加成=具体数值/100000
	 * 例如：数值为500
	 * 则实际增加 0.005
	 * 前段显示时要换算成百分比*/
    private int attr2;
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
     * 固定属性
	 * Windows 用户:
	 * 
	 * 填0：读十万分比属性
	 * 
     */
    public int[][] getAttr1() {
        return attr1;
    }
    /**
     * 十万分比属性
	 * Windows 用户:
	 * 
	 * 填0：读固定属性
	 * 具体数值：读十万分比属性
	 * 实际加成=具体数值/100000
	 * 例如：数值为500
	 * 则实际增加 0.005
	 * 前段显示时要换算成百分比
     */
    public int getAttr2() {
        return attr2;
    }
    public Struct_qcts_760(int list,int id,int sys,String name,String attr1,int attr2) {
        this.list = list;
        this.id = id;
        this.sys = sys;
        this.name = name;
        this.attr1 = ExcelJsonUtils.toObj(attr1,int[][].class);
        this.attr2 = attr2;
    }
}