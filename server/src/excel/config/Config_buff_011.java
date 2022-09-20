package excel.config;
import com.teamtop.util.excel.ConfigBase;
import excel.struct.Struct_buff_011;
public class Config_buff_011 extends ConfigBase<Struct_buff_011> {
    private static Config_buff_011 ins = null;
    public static Config_buff_011 getIns(){
        if(ins==null){
            ins = new Config_buff_011();
        }
        return ins;
    }
    private Config_buff_011(){
        put(100001,new Struct_buff_011(100001,1,1,2,"[[203,5000]]","[[203,750]]",10000,2000,5000,20000,0));
        put(100002,new Struct_buff_011(100002,1,1,1,"[[320,10000]]","[[320,1500]]",15000,2000,5000,20000,0));
        put(100003,new Struct_buff_011(100003,3,3,2,"[[321,6000]]","[[321,200]]",100000,0,0,0,0));
        put(200001,new Struct_buff_011(200001,1,1,2,"[[117,12000]]","[[117,2000]]",100000,0,6000,30000,0));
        put(300001,new Struct_buff_011(300001,2,2,1,"[[101,30000]]","[[101,2600]]",30000,2600,0,0,0));
        put(100004,new Struct_buff_011(100004,1,4,2,"[[322,100000]]","[[322,0]]",10000,3000,8000,20000,0));
    }
    public void reset(){
        ins = null;
    }
}