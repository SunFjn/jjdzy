package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * S-267-少主升星表.xlsx
 */
public class Struct_sonstar_267 {
    /**序列id
	 * 少主id*1000+星级*/
    private int id;
    /**下一星级*/
    private int next;
    /**升星消耗*/
    private int[][] conmuse;
    /**属性*/
    private int[][] attr;
    /**主动技能等级上限*/
    private int max;
    /**奖励*/
    private int[][] reward;
    /**
     * 序列id
	 * 少主id*1000+星级
     */
    public int getId() {
        return id;
    }
    /**
     * 下一星级
     */
    public int getNext() {
        return next;
    }
    /**
     * 升星消耗
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
    /**
     * 主动技能等级上限
     */
    public int getMax() {
        return max;
    }
    /**
     * 奖励
     */
    public int[][] getReward() {
        return reward;
    }
    public Struct_sonstar_267(int id,int next,String conmuse,String attr,int max,String reward) {
        this.id = id;
        this.next = next;
        this.conmuse = ExcelJsonUtils.toObj(conmuse,int[][].class);
        this.attr = ExcelJsonUtils.toObj(attr,int[][].class);
        this.max = max;
        this.reward = ExcelJsonUtils.toObj(reward,int[][].class);
    }
}