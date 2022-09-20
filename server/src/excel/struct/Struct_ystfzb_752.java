package excel.struct;
/**
 * Y_752_异兽录-天赋装备.xlsx
 */
public class Struct_ystfzb_752 {
    /**天赋装备
	 * 
	 * 1xx：穷奇
	 * 2xx：天狗
	 * 3xx：麒麟
	 * 4xx：毕方
	 * 5xx：虎蛟
	 * 6xx：狰
	 * 7xx：九尾狐
	 * 8xx：白泽
	 * xx：具体装备部位*/
    private int id;
    /**道具id*/
    private int daoju;
    /**
     * 天赋装备
	 * 
	 * 1xx：穷奇
	 * 2xx：天狗
	 * 3xx：麒麟
	 * 4xx：毕方
	 * 5xx：虎蛟
	 * 6xx：狰
	 * 7xx：九尾狐
	 * 8xx：白泽
	 * xx：具体装备部位
     */
    public int getId() {
        return id;
    }
    /**
     * 道具id
     */
    public int getDaoju() {
        return daoju;
    }
    public Struct_ystfzb_752(int id,int daoju) {
        this.id = id;
        this.daoju = daoju;
    }
}