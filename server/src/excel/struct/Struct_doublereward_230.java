package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * S_230_三国无双奖池表.xlsx
 */
public class Struct_doublereward_230 {
    /**奖池id
	 * jingyu:
	 * 1：16强奖池
	 * 2:8强奖池
	 * 3:4强奖池
	 * 4:决赛奖池*/
    private int id;
    /**数量*/
    private int num;
    /**元宝范围*/
    private int[][] yb;
    /**
     * 奖池id
	 * jingyu:
	 * 1：16强奖池
	 * 2:8强奖池
	 * 3:4强奖池
	 * 4:决赛奖池
     */
    public int getId() {
        return id;
    }
    /**
     * 数量
     */
    public int getNum() {
        return num;
    }
    /**
     * 元宝范围
     */
    public int[][] getYb() {
        return yb;
    }
    public Struct_doublereward_230(int id,int num,String yb) {
        this.id = id;
        this.num = num;
        this.yb = ExcelJsonUtils.toObj(yb,int[][].class);
    }
}