package excel.config;
import com.teamtop.util.excel.ConfigBase;
import excel.struct.Struct_fdyqs_019;
public class Config_fdyqs_019 extends ConfigBase<Struct_fdyqs_019> {
    private static Config_fdyqs_019 ins = null;
    public static Config_fdyqs_019 getIns(){
        if(ins==null){
            ins = new Config_fdyqs_019();
        }
        return ins;
    }
    private Config_fdyqs_019(){
        put(100001,new Struct_fdyqs_019(100001,750,350));
        put(100002,new Struct_fdyqs_019(100002,750,400));
        put(100003,new Struct_fdyqs_019(100003,1000,400));
        put(100004,new Struct_fdyqs_019(100004,1000,450));
        put(100005,new Struct_fdyqs_019(100005,1250,450));
        put(100006,new Struct_fdyqs_019(100006,1250,500));
        put(100007,new Struct_fdyqs_019(100007,1500,500));
        put(100008,new Struct_fdyqs_019(100008,1500,550));
        put(100009,new Struct_fdyqs_019(100009,1750,550));
        put(100010,new Struct_fdyqs_019(100010,1750,600));
        put(100011,new Struct_fdyqs_019(100011,2000,600));
        put(100012,new Struct_fdyqs_019(100012,2000,650));
        put(100013,new Struct_fdyqs_019(100013,2250,650));
        put(100014,new Struct_fdyqs_019(100014,2250,700));
        put(100015,new Struct_fdyqs_019(100015,2500,700));
        put(100016,new Struct_fdyqs_019(100016,2500,750));
        put(100017,new Struct_fdyqs_019(100017,2750,750));
        put(100018,new Struct_fdyqs_019(100018,2750,800));
        put(100019,new Struct_fdyqs_019(100019,3000,800));
        put(100020,new Struct_fdyqs_019(100020,3000,850));
    }
    public void reset(){
        ins = null;
    }
}