package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * S-266-兽魂觉醒洗练表.xlsx
 */
public class Struct_shjxxl_266 {
    /**索引id*/
    private int id;
    /**洗练次数
	 * 结尾为0 则为无上限*/
    private int[][] time;
    /**洗练星级
	 * 读兽魂觉醒星级表中对应星级id
	 * A,B
	 * A=星级id
	 * B=概率（十万）*/
    private int[][] star;
    /**
     * 索引id
     */
    public int getId() {
        return id;
    }
    /**
     * 洗练次数
	 * 结尾为0 则为无上限
     */
    public int[][] getTime() {
        return time;
    }
    /**
     * 洗练星级
	 * 读兽魂觉醒星级表中对应星级id
	 * A,B
	 * A=星级id
	 * B=概率（十万）
     */
    public int[][] getStar() {
        return star;
    }
    public Struct_shjxxl_266(int id,String time,String star) {
        this.id = id;
        this.time = ExcelJsonUtils.toObj(time,int[][].class);
        this.star = ExcelJsonUtils.toObj(star,int[][].class);
    }
}