package groovyScript;
import com.teamtop.util.groovy.IFoo;
import com.teamtop.util.log.LogTool;

/**
 * @author Administrator
 * 
 */
public class Debug implements IFoo {
//	private Logger logger = LoggerFactory.getLogger(Debug.class);
	/**	 * 返回给界面的数据	 */
	private StringBuilder groovyResult = new StringBuilder();
	
	@Override
	public Object run(Object foo) {
		try {
			
			//GlobalData globalData = GlobalCache.getGlobalData(GlobalConst.RANKLIST_TITLE);
			//logger.info("globaldata:"+globalData.getContent());
			System.out.println("传入参数是："+foo);
		} catch (Exception e) {
			e.printStackTrace();
			LogTool.error(e, this, "Groovy.foo:"+foo);
			return "控制台报错，请查看console日志或err日志。";
		}
		return groovyResult.toString();
	}
}