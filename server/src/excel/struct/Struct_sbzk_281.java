package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * X_281_新活动-神兵折扣表.xlsx
 */
public class Struct_sbzk_281 {
    /**id*/
    private int id;
    /**打造次数
	 * 101,0
	 * 0为无限*/
    private int[][] time;
    /**折扣（百分比）*/
    private int off;
    /**
     * id
     */
    public int getId() {
        return id;
    }
    /**
     * 打造次数
	 * 101,0
	 * 0为无限
     */
    public int[][] getTime() {
        return time;
    }
    /**
     * 折扣（百分比）
     */
    public int getOff() {
        return off;
    }
    public Struct_sbzk_281(int id,String time,int off) {
        this.id = id;
        this.time = ExcelJsonUtils.toObj(time,int[][].class);
        this.off = off;
    }
}