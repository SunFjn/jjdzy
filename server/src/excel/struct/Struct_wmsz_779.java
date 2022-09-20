package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * X_779_新活动_武庙十哲.xlsx
 */
public class Struct_wmsz_779 {
    /**id
	 * Administrator:
	 * AXX
	 * A:期数
	 * XX:序号*/
    private int id;
    /**比拼道具(货币）*/
    private int[][] item;
    /**获得积分*/
    private int point;
    /**
     * id
	 * Administrator:
	 * AXX
	 * A:期数
	 * XX:序号
     */
    public int getId() {
        return id;
    }
    /**
     * 比拼道具(货币）
     */
    public int[][] getItem() {
        return item;
    }
    /**
     * 获得积分
     */
    public int getPoint() {
        return point;
    }
    public Struct_wmsz_779(int id,String item,int point) {
        this.id = id;
        this.item = ExcelJsonUtils.toObj(item,int[][].class);
        this.point = point;
    }
}