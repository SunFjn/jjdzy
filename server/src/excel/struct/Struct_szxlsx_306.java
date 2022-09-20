package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * S_306_神装洗练上限表.xlsx
 */
public class Struct_szxlsx_306 {
    /**装备阶数*/
    private int id;
    /**气血洗练上限*/
    private int hp;
    /**攻击洗练上限*/
    private int atk;
    /**防御洗练上限*/
    private int def;
    /**洗练消耗*/
    private int[][] cost;
    /**洗练概率
	 * 【A,B】
	 * A=属性类型
	 * b=洗练概率*/
    private int[][] gl;
    /**是否可以洗练*/
    private int xl;
    /**
     * 装备阶数
     */
    public int getId() {
        return id;
    }
    /**
     * 气血洗练上限
     */
    public int getHp() {
        return hp;
    }
    /**
     * 攻击洗练上限
     */
    public int getAtk() {
        return atk;
    }
    /**
     * 防御洗练上限
     */
    public int getDef() {
        return def;
    }
    /**
     * 洗练消耗
     */
    public int[][] getCost() {
        return cost;
    }
    /**
     * 洗练概率
	 * 【A,B】
	 * A=属性类型
	 * b=洗练概率
     */
    public int[][] getGl() {
        return gl;
    }
    /**
     * 是否可以洗练
     */
    public int getXl() {
        return xl;
    }
    public Struct_szxlsx_306(int id,int hp,int atk,int def,String cost,String gl,int xl) {
        this.id = id;
        this.hp = hp;
        this.atk = atk;
        this.def = def;
        this.cost = ExcelJsonUtils.toObj(cost,int[][].class);
        this.gl = ExcelJsonUtils.toObj(gl,int[][].class);
        this.xl = xl;
    }
}