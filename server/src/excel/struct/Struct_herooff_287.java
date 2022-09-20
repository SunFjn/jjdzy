package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * S_287_神将折扣表.xlsx
 */
public class Struct_herooff_287 {
    /**id*/
    private int id;
    /**寻宝次数
	 * 600,0
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
     * 寻宝次数
	 * 600,0
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
    public Struct_herooff_287(int id,String time,int off) {
        this.id = id;
        this.time = ExcelJsonUtils.toObj(time,int[][].class);
        this.off = off;
    }
}