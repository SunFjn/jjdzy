package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * L_232_乱世枭雄刷新表.xlsx
 */
public class Struct_lsxxrank_232 {
    /**索引id*/
    private int id;
    /**排名区间*/
    private int[][] rank;
    /**对手筛选范围
	 * jingyu:
	 * 4个对手在玩家当前排名+范围数值中随机*/
    private int[][] range;
    /**
     * 索引id
     */
    public int getId() {
        return id;
    }
    /**
     * 排名区间
     */
    public int[][] getRank() {
        return rank;
    }
    /**
     * 对手筛选范围
	 * jingyu:
	 * 4个对手在玩家当前排名+范围数值中随机
     */
    public int[][] getRange() {
        return range;
    }
    public Struct_lsxxrank_232(int id,String rank,String range) {
        this.id = id;
        this.rank = ExcelJsonUtils.toObj(rank,int[][].class);
        this.range = ExcelJsonUtils.toObj(range,int[][].class);
    }
}