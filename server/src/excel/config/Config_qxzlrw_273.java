package excel.config;
import com.teamtop.util.excel.ConfigBase;
import excel.struct.Struct_qxzlrw_273;
public class Config_qxzlrw_273 extends ConfigBase<Struct_qxzlrw_273> {
    private static Config_qxzlrw_273 ins = null;
    public static Config_qxzlrw_273 getIns(){
        if(ins==null){
            ins = new Config_qxzlrw_273();
        }
        return ins;
    }
    private Config_qxzlrw_273(){
        put(1101,new Struct_qxzlrw_273(1101,0,1,1,"[[1,411010,20],[1,416002,40],[4,0,250]]"));
        put(1201,new Struct_qxzlrw_273(1201,1202,2,20,"[[1,411010,20],[1,416002,40],[4,0,250]]"));
        put(1202,new Struct_qxzlrw_273(1202,1203,2,50,"[[1,411010,25],[1,416002,40],[4,0,350]]"));
        put(1203,new Struct_qxzlrw_273(1203,1204,2,100,"[[1,411010,35],[1,416002,80],[4,0,450]]"));
        put(1204,new Struct_qxzlrw_273(1204,1205,2,200,"[[1,411010,45],[1,416002,80],[4,0,550]]"));
        put(1205,new Struct_qxzlrw_273(1205,0,2,400,"[[1,416002,160],[4,0,700],[1,402013,2]]"));
        put(1301,new Struct_qxzlrw_273(1301,0,3,1,"[[18,0,60]]"));
        put(1401,new Struct_qxzlrw_273(1401,1402,4,1,"[[1,411010,20],[1,416002,40],[4,0,250]]"));
        put(1402,new Struct_qxzlrw_273(1402,1403,4,2,"[[1,411010,20],[1,416002,40],[4,0,250]]"));
        put(1403,new Struct_qxzlrw_273(1403,0,4,4,"[[1,411010,35],[1,416002,80],[4,0,450]]"));
    }
    public void reset(){
        ins = null;
    }
}