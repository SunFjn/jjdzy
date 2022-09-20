package groovyScript;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.teamtop.util.groovy.IFoo;

/**
 * @author Administrator
 * 
 */
public class Debug implements IFoo {
	private Logger logger = LoggerFactory.getLogger(Debug.class);

	@Override
	public Object run(Object foo) {
		//GlobalData globalData = GlobalCache.getGlobalData(GlobalConst.RANKLIST_TITLE);
		//logger.info("globaldata:"+globalData.getContent());
		System.out.println("jfkl;ajdfkla");
		return null;
	}
}