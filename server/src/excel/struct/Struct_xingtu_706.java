package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * X_706_星图.xlsx
 */
public class Struct_xingtu_706 {
    /**序号
	 * 类型*100000+阶级*100+等级 【类型】1天枢、2天璇、3天玑、4天权、5玉衡、6开阳、7瑶光*/
    private int id;
    /**升级消耗*/
    private int[][] need;
    /**属性*/
    private int[][] attr;
    /**战力*/
    private int fight;
    /**下一级ID*/
    private int next;
    /**
     * 序号
	 * 类型*100000+阶级*100+等级 【类型】1天枢、2天璇、3天玑、4天权、5玉衡、6开阳、7瑶光
     */
    public int getId() {
        return id;
    }
    /**
     * 升级消耗
     */
    public int[][] getNeed() {
        return need;
    }
    /**
     * 属性
     */
    public int[][] getAttr() {
        return attr;
    }
    /**
     * 战力
     */
    public int getFight() {
        return fight;
    }
    /**
     * 下一级ID
     */
    public int getNext() {
        return next;
    }
    public Struct_xingtu_706(int id,String need,String attr,int fight,int next) {
        this.id = id;
        this.need = ExcelJsonUtils.toObj(need,int[][].class);
        this.attr = ExcelJsonUtils.toObj(attr,int[][].class);
        this.fight = fight;
        this.next = next;
    }
}