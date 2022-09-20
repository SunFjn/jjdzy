package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * B_213_兵法升阶表.xlsx
 */
public class Struct_booklv_213 {
    /**id*/
    private int id;
    /**阶数*/
    private String jie;
    /**属性*/
    private int[][] attr;
    /**战力*/
    private int power;
    /**升级经验
	 * jingyu:
	 * 
	 * 道具id
	 * 411004
	 * 
	 * 1个道具=10点经验*/
    private int exp;
    /**
     * id
     */
    public int getId() {
        return id;
    }
    /**
     * 阶数
     */
    public String getJie() {
        return jie;
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
    public int getPower() {
        return power;
    }
    /**
     * 升级经验
	 * jingyu:
	 * 
	 * 道具id
	 * 411004
	 * 
	 * 1个道具=10点经验
     */
    public int getExp() {
        return exp;
    }
    public Struct_booklv_213(int id,String jie,String attr,int power,int exp) {
        this.id = id;
        this.jie = jie;
        this.attr = ExcelJsonUtils.toObj(attr,int[][].class);
        this.power = power;
        this.exp = exp;
    }
}