package excel.config;
import com.teamtop.util.excel.ConfigBase;
import excel.struct.Struct_lbbd_277;
public class Config_lbbd_277 extends ConfigBase<Struct_lbbd_277> {
    private static Config_lbbd_277 ins = null;
    public static Config_lbbd_277 getIns(){
        if(ins==null){
            ins = new Config_lbbd_277();
        }
        return ins;
    }
    private Config_lbbd_277(){
        put(400945,new Struct_lbbd_277(400945,2,"[[1,1,1014,1,10000],[1,1,1024,1,10000],[1,1,1034,1,10000],[1,1,1044,1,10000],[1,1,1054,1,10000],[1,1,1064,1,10000],[1,1,1074,1,10000],[1,1,1084,1,10000],[1,1,1094,1,10000],[1,1,1104,1,10000]]","[[1,1,1015,1,700,800],[2,1,1025,1,1500,1600],[3,1,1035,1,2300,2400],[4,1,1045,1,3100,3200],[5,1,1055,1,3900,4000],[6,1,1065,1,4700,4800],[7,1,1075,1,5500,5600],[8,1,1085,1,6300,6400],[9,1,1095,1,7100,7200],[10,1,1105,1,7900,8000]]"));
    }
    public void reset(){
        ins = null;
    }
}