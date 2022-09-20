package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * S-266-兽魂觉醒印记表.xlsx
 */
public class Struct_shjxyj_266 {
    /**印记id（同道具id）*/
    private int id;
    /**可使用部位*/
    private int[][] bw;
    /**必得印记
	 * 1 青龙
	 * 2 白虎
	 * 3 朱雀
	 * 4 玄武*/
    private int yj;
    /**随机星级
	 * 星级id取兽魂觉醒星级表
	 * A,B
	 * A=星级id
	 * B=概率（十万）*/
    private int[][] star;
    /**
     * 印记id（同道具id）
     */
    public int getId() {
        return id;
    }
    /**
     * 可使用部位
     */
    public int[][] getBw() {
        return bw;
    }
    /**
     * 必得印记
	 * 1 青龙
	 * 2 白虎
	 * 3 朱雀
	 * 4 玄武
     */
    public int getYj() {
        return yj;
    }
    /**
     * 随机星级
	 * 星级id取兽魂觉醒星级表
	 * A,B
	 * A=星级id
	 * B=概率（十万）
     */
    public int[][] getStar() {
        return star;
    }
    public Struct_shjxyj_266(int id,String bw,int yj,String star) {
        this.id = id;
        this.bw = ExcelJsonUtils.toObj(bw,int[][].class);
        this.yj = yj;
        this.star = ExcelJsonUtils.toObj(star,int[][].class);
    }
}