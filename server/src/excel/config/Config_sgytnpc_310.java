package excel.config;
import com.teamtop.util.excel.ConfigBase;
import excel.struct.Struct_sgytnpc_310;
public class Config_sgytnpc_310 extends ConfigBase<Struct_sgytnpc_310> {
    private static Config_sgytnpc_310 ins = null;
    public static Config_sgytnpc_310 getIns(){
        if(ins==null){
            ins = new Config_sgytnpc_310();
        }
        return ins;
    }
    private Config_sgytnpc_310(){
        put(301001,new Struct_sgytnpc_310(301001,6,"[[1,400899,1],[3,0,120000]]",20,7,"[[1,400899,1],[3,0,120000]]",20,"宝箱","0"));
        put(301002,new Struct_sgytnpc_310(301002,10,"0",30,12,"0",30,"群雄精英","0"));
        put(301003,new Struct_sgytnpc_310(301003,3,"0",60,3,"0",60,"群雄头目","[[200,1200],[1800,1200],[1000,500]]"));
        put(301004,new Struct_sgytnpc_310(301004,1,"0",100,1,"0",100,"群雄首领","[[1000,1000]]"));
    }
    public void reset(){
        ins = null;
    }
}