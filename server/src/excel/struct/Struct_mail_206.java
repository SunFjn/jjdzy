package excel.struct;
/**
 * Y_206_邮件表.xlsx
 */
public class Struct_mail_206 {
    /**邮件ID
	 * 开服第二天早上9点，系统自动发放该邮件*/
    private int mailid;
    /**标题
	 * 新活动
	 * */
    private String title;
    /**
     * 邮件ID
	 * 开服第二天早上9点，系统自动发放该邮件
     */
    public int getMailid() {
        return mailid;
    }
    /**
     * 标题
	 * 新活动
	 * 
     */
    public String getTitle() {
        return title;
    }
    public Struct_mail_206(int mailid,String title) {
        this.mailid = mailid;
        this.title = title;
    }
}