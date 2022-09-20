package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * H_286_合服狂欢_充值返利奖励表.xlsx
 */
public class Struct_hfkhczfljl_286 {
    /**id
	 * jingyu:
	 * id=返利id*1000+id
	 * 1：挑战全民BOSS
	 * 2：挑战三国战神（包括扫荡）
	 * 3：挑战南征北战（包括扫荡）
	 * 4：完成每日任务*/
    private int id;
    /**参数*/
    private int cs;
    /**奖励*/
    private int[][] reward;
    /**
     * id
	 * jingyu:
	 * id=返利id*1000+id
	 * 1：挑战全民BOSS
	 * 2：挑战三国战神（包括扫荡）
	 * 3：挑战南征北战（包括扫荡）
	 * 4：完成每日任务
     */
    public int getId() {
        return id;
    }
    /**
     * 参数
     */
    public int getCs() {
        return cs;
    }
    /**
     * 奖励
     */
    public int[][] getReward() {
        return reward;
    }
    public Struct_hfkhczfljl_286(int id,int cs,String reward) {
        this.id = id;
        this.cs = cs;
        this.reward = ExcelJsonUtils.toObj(reward,int[][].class);
    }
}