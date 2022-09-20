package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * W_211_武将神将之力技能表.xlsx
 */
public class Struct_herogodskill_211 {
    /**id
	 * id=武将id*100+等级*/
    private int id;
    /**需要对应神将之力等级*/
    private int star;
    /**升至该等级消耗*/
    private int[][] consume;
    /**属性*/
    private int[][] attr;
    /**提升伤害百分比
	 * A,B
	 * A=技能id
	 * B=提升数值（十万分比）*/
    private int[][] attpg;
    /**提升技能评分*/
    private int zlg;
    /**
     * id
	 * id=武将id*100+等级
     */
    public int getId() {
        return id;
    }
    /**
     * 需要对应神将之力等级
     */
    public int getStar() {
        return star;
    }
    /**
     * 升至该等级消耗
     */
    public int[][] getConsume() {
        return consume;
    }
    /**
     * 属性
     */
    public int[][] getAttr() {
        return attr;
    }
    /**
     * 提升伤害百分比
	 * A,B
	 * A=技能id
	 * B=提升数值（十万分比）
     */
    public int[][] getAttpg() {
        return attpg;
    }
    /**
     * 提升技能评分
     */
    public int getZlg() {
        return zlg;
    }
    public Struct_herogodskill_211(int id,int star,String consume,String attr,String attpg,int zlg) {
        this.id = id;
        this.star = star;
        this.consume = ExcelJsonUtils.toObj(consume,int[][].class);
        this.attr = ExcelJsonUtils.toObj(attr,int[][].class);
        this.attpg = ExcelJsonUtils.toObj(attpg,int[][].class);
        this.zlg = zlg;
    }
}