package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * J_210_技能神技.xlsx
 */
public class Struct_godskill_210 {
    /**神技id
	 * 1XXX：诛仙神雷，XXX为等级
	 * 2XXX：戮神巽风，XXX为等级
	 * 3XXX：屠魔业火，XXX为等级*/
    private int dengji;
    /**消耗*/
    private int[][] consume;
    /**效果
	 * [A,B]
	 * A=角色属性中id
	 * B=参数
	 * 
	 * */
    private int[][] result;
    /**下一级*/
    private int next;
    /**类型
	 * 1 诛仙神雷
	 * 2 戮神巽风
	 * 3 屠魔业火*/
    private int type;
    /**
     * 神技id
	 * 1XXX：诛仙神雷，XXX为等级
	 * 2XXX：戮神巽风，XXX为等级
	 * 3XXX：屠魔业火，XXX为等级
     */
    public int getDengji() {
        return dengji;
    }
    /**
     * 消耗
     */
    public int[][] getConsume() {
        return consume;
    }
    /**
     * 效果
	 * [A,B]
	 * A=角色属性中id
	 * B=参数
	 * 
	 * 
     */
    public int[][] getResult() {
        return result;
    }
    /**
     * 下一级
     */
    public int getNext() {
        return next;
    }
    /**
     * 类型
	 * 1 诛仙神雷
	 * 2 戮神巽风
	 * 3 屠魔业火
     */
    public int getType() {
        return type;
    }
    public Struct_godskill_210(int dengji,String consume,String result,int next,int type) {
        this.dengji = dengji;
        this.consume = ExcelJsonUtils.toObj(consume,int[][].class);
        this.result = ExcelJsonUtils.toObj(result,int[][].class);
        this.next = next;
        this.type = type;
    }
}