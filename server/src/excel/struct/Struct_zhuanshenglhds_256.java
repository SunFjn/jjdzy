package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * Z_256_转生炼魂大师表.xlsx
 */
public class Struct_zhuanshenglhds_256 {
    /**序号*/
    private int id;
    /**所需炼魂等级*/
    private int lv;
    /**属性*/
    private int[][] attr;
    /**战力*/
    private int fight;
    /**
     * 序号
     */
    public int getId() {
        return id;
    }
    /**
     * 所需炼魂等级
     */
    public int getLv() {
        return lv;
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
    public Struct_zhuanshenglhds_256(int id,int lv,String attr,int fight) {
        this.id = id;
        this.lv = lv;
        this.attr = ExcelJsonUtils.toObj(attr,int[][].class);
        this.fight = fight;
    }
}