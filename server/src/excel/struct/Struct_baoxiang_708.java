package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * B_708_宝箱.xlsx
 */
public class Struct_baoxiang_708 {
    /**序号*/
    private int id;
    /**完成条件
	 * 值为活跃度*/
    private int condition;
    /**奖励*/
    private int[][] award;
    /**
     * 序号
     */
    public int getId() {
        return id;
    }
    /**
     * 完成条件
	 * 值为活跃度
     */
    public int getCondition() {
        return condition;
    }
    /**
     * 奖励
     */
    public int[][] getAward() {
        return award;
    }
    public Struct_baoxiang_708(int id,int condition,String award) {
        this.id = id;
        this.condition = condition;
        this.award = ExcelJsonUtils.toObj(award,int[][].class);
    }
}