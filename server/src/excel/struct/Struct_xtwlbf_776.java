package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * X_776_许田围猎buff表.xlsx
 */
public class Struct_xtwlbf_776 {
    /**序号*/
    private int id;
    /**类型
	 * buff类型
	 * 1.冰冻
	 * 2.减速
	 * 3.额外羽箭
	 * 4.加速射击
	 * 5.概率提升*/
    private int lx;
    /**buff
	 * Administrator:
	 * [[增幅/减幅,羽箭数量,持续时间]]
	 * 增幅/减幅：十万分比
	 * 羽箭数量为常数
	 * 持续时间：秒
	 * 注意与类型匹配*/
    private int[][] buff;
    /**坐骑模型*/
    private int mx;
    /**出场概率*/
    private int gl1;
    /**击中概率
	 * Administrator:
	 * 每次射击获得的概率
	 * 十万分比*/
    private int gl2;
    /**
     * 序号
     */
    public int getId() {
        return id;
    }
    /**
     * 类型
	 * buff类型
	 * 1.冰冻
	 * 2.减速
	 * 3.额外羽箭
	 * 4.加速射击
	 * 5.概率提升
     */
    public int getLx() {
        return lx;
    }
    /**
     * buff
	 * Administrator:
	 * [[增幅/减幅,羽箭数量,持续时间]]
	 * 增幅/减幅：十万分比
	 * 羽箭数量为常数
	 * 持续时间：秒
	 * 注意与类型匹配
     */
    public int[][] getBuff() {
        return buff;
    }
    /**
     * 坐骑模型
     */
    public int getMx() {
        return mx;
    }
    /**
     * 出场概率
     */
    public int getGl1() {
        return gl1;
    }
    /**
     * 击中概率
	 * Administrator:
	 * 每次射击获得的概率
	 * 十万分比
     */
    public int getGl2() {
        return gl2;
    }
    public Struct_xtwlbf_776(int id,int lx,String buff,int mx,int gl1,int gl2) {
        this.id = id;
        this.lx = lx;
        this.buff = ExcelJsonUtils.toObj(buff,int[][].class);
        this.mx = mx;
        this.gl1 = gl1;
        this.gl2 = gl2;
    }
}