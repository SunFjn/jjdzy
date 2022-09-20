package excel.struct;
/**
 * X_333_新活动-宝藏拼图任务表.xlsx
 */
public class Struct_bzptrwb_333 {
    /**编号*/
    private int id;
    /**任务类型
	 * 1.累计充值
	 * 2.累计消耗
	 * 3.吕布护送X次
	 * 4.开采红色矿X次(协助不算)
	 * 5.全民BOSS挑战XX次(100次起)
	 * 6.神将阁抽取XX次
	 * 7.消耗三国金印X个
	 * 8.乱世枭雄达到XX段位
	 * 9.三国战神挑战XX次(50次起)*/
    private int rw;
    /**参数*/
    private int cs;
    /**期数*/
    private int qs;
    /**
     * 编号
     */
    public int getId() {
        return id;
    }
    /**
     * 任务类型
	 * 1.累计充值
	 * 2.累计消耗
	 * 3.吕布护送X次
	 * 4.开采红色矿X次(协助不算)
	 * 5.全民BOSS挑战XX次(100次起)
	 * 6.神将阁抽取XX次
	 * 7.消耗三国金印X个
	 * 8.乱世枭雄达到XX段位
	 * 9.三国战神挑战XX次(50次起)
     */
    public int getRw() {
        return rw;
    }
    /**
     * 参数
     */
    public int getCs() {
        return cs;
    }
    /**
     * 期数
     */
    public int getQs() {
        return qs;
    }
    public Struct_bzptrwb_333(int id,int rw,int cs,int qs) {
        this.id = id;
        this.rw = rw;
        this.cs = cs;
        this.qs = qs;
    }
}