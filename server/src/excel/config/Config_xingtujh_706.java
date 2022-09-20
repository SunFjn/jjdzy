package excel.config;
import com.teamtop.util.excel.ConfigBase;
import excel.struct.Struct_xingtujh_706;
public class Config_xingtujh_706 extends ConfigBase<Struct_xingtujh_706> {
    private static Config_xingtujh_706 ins = null;
    public static Config_xingtujh_706 getIns(){
        if(ins==null){
            ins = new Config_xingtujh_706();
        }
        return ins;
    }
    private Config_xingtujh_706(){
        put(1,new Struct_xingtujh_706(1,1001));
        put(2,new Struct_xingtujh_706(2,1002));
        put(3,new Struct_xingtujh_706(3,2001));
        put(4,new Struct_xingtujh_706(4,3001));
        put(5,new Struct_xingtujh_706(5,4001));
        put(6,new Struct_xingtujh_706(6,6001));
        put(7,new Struct_xingtujh_706(7,8002));
    }
    public void reset(){
        ins = null;
    }
}