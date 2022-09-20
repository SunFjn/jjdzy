package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * M_708_每日任务.xlsx
 */
public class Struct_meirirenwu_708 {
    /**序号*/
    private int id;
    /**奖励*/
    private int[][] award;
    /**活跃增加*/
    private int add;
    /**开启条件
	 * jingyu:
	 * [[A,B]]
	 * A=玩家等级
	 * B=达到关卡*/
    private int[][] open;
    /**
     * 序号
     */
    public int getId() {
        return id;
    }
    /**
     * 奖励
     */
    public int[][] getAward() {
        return award;
    }
    /**
     * 活跃增加
     */
    public int getAdd() {
        return add;
    }
    /**
     * 开启条件
	 * jingyu:
	 * [[A,B]]
	 * A=玩家等级
	 * B=达到关卡
     */
    public int[][] getOpen() {
        return open;
    }
    public Struct_meirirenwu_708(int id,String award,int add,String open) {
        this.id = id;
        this.award = ExcelJsonUtils.toObj(award,int[][].class);
        this.add = add;
        this.open = ExcelJsonUtils.toObj(open,int[][].class);
    }
}