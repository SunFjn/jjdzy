package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * Z_773_坐骑升星表.xlsx
 */
public class Struct_zqsx_773 {
    /**星级id
	 * 品质*1000+LV*/
    private int id;
    /**下一级*/
    private int next;
    /**属性*/
    private int[][] sx;
    /**移动速度*/
    private int ydsd;
    /**竞技速度*/
    private int jjsd;
    /**
     * 星级id
	 * 品质*1000+LV
     */
    public int getId() {
        return id;
    }
    /**
     * 下一级
     */
    public int getNext() {
        return next;
    }
    /**
     * 属性
     */
    public int[][] getSx() {
        return sx;
    }
    /**
     * 移动速度
     */
    public int getYdsd() {
        return ydsd;
    }
    /**
     * 竞技速度
     */
    public int getJjsd() {
        return jjsd;
    }
    public Struct_zqsx_773(int id,int next,String sx,int ydsd,int jjsd) {
        this.id = id;
        this.next = next;
        this.sx = ExcelJsonUtils.toObj(sx,int[][].class);
        this.ydsd = ydsd;
        this.jjsd = jjsd;
    }
}