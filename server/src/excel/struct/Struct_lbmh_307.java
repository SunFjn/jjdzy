package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * L_307_吕布孟获动态血量表.xlsx
 */
public class Struct_lbmh_307 {
    /**序号
	 * 1XXX：吕布boss
	 * 2XXX：七擒孟获*/
    private int id;
    /**boss死亡时间
	 * 单位：秒
	 * [[X,9999]]:BOSS在X到9999秒内死亡，如果超过了活动时限，BOSS还未死亡，则BOSS用活动时限计算死亡时间，如魔神吕布是30分钟（1800秒），七擒孟获50分钟（3000秒）*/
    private int[][] time;
    /**boss气血上限（百分）
	 * 1：增加100%基础血量
	 * -1：减少100%基础血量
	 * 0：不变*/
    private int hp;
    /**
     * 序号
	 * 1XXX：吕布boss
	 * 2XXX：七擒孟获
     */
    public int getId() {
        return id;
    }
    /**
     * boss死亡时间
	 * 单位：秒
	 * [[X,9999]]:BOSS在X到9999秒内死亡，如果超过了活动时限，BOSS还未死亡，则BOSS用活动时限计算死亡时间，如魔神吕布是30分钟（1800秒），七擒孟获50分钟（3000秒）
     */
    public int[][] getTime() {
        return time;
    }
    /**
     * boss气血上限（百分）
	 * 1：增加100%基础血量
	 * -1：减少100%基础血量
	 * 0：不变
     */
    public int getHp() {
        return hp;
    }
    public Struct_lbmh_307(int id,String time,int hp) {
        this.id = id;
        this.time = ExcelJsonUtils.toObj(time,int[][].class);
        this.hp = hp;
    }
}