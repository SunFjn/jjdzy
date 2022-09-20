package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * Q_235_群英表.xlsx
 */
public class Struct_qy_235 {
    /**id（对应星期）*/
    private int id;
    /**比拼道具(货币）*/
    private int[][] item;
    /**获得积分*/
    private int point;
    /**
     * id（对应星期）
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
    public Struct_qy_235(int id,String item,int point) {
        this.id = id;
        this.item = ExcelJsonUtils.toObj(item,int[][].class);
        this.point = point;
    }
}