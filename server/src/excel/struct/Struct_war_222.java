package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * S_222_三国战神表.xlsx
 */
public class Struct_war_222 {
    /**索引id*/
    private int id;
    /**排名*/
    private int[][] rank;
    /**筛选对手范围
	 * jingyu:
	 * 刷新对手=玩家当前排名+范围数值*/
    private int[][] range;
    /**
     * 索引id
     */
    public int getId() {
        return id;
    }
    /**
     * 排名
     */
    public int[][] getRank() {
        return rank;
    }
    /**
     * 筛选对手范围
	 * jingyu:
	 * 刷新对手=玩家当前排名+范围数值
     */
    public int[][] getRange() {
        return range;
    }
    public Struct_war_222(int id,String rank,String range) {
        this.id = id;
        this.rank = ExcelJsonUtils.toObj(rank,int[][].class);
        this.range = ExcelJsonUtils.toObj(range,int[][].class);
    }
}