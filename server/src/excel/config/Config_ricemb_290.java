package excel.config;
import com.teamtop.util.excel.ConfigBase;
import excel.struct.Struct_ricemb_290;
public class Config_ricemb_290 extends ConfigBase<Struct_ricemb_290> {
    private static Config_ricemb_290 ins = null;
    public static Config_ricemb_290 getIns(){
        if(ins==null){
            ins = new Config_ricemb_290();
        }
        return ins;
    }
    private Config_ricemb_290(){
        put(1,new Struct_ricemb_290(1,20,"[[10,0,29],[1,400023,1]]"));
        put(2,new Struct_ricemb_290(2,40,"[[10,0,29],[1,400023,1]]"));
        put(3,new Struct_ricemb_290(3,60,"[[10,0,29],[1,400023,1]]"));
        put(4,new Struct_ricemb_290(4,80,"[[10,0,29],[1,400024,1]]"));
        put(5,new Struct_ricemb_290(5,120,"[[10,0,29],[1,400024,1]]"));
        put(6,new Struct_ricemb_290(6,160,"[[10,0,29],[1,400024,1]]"));
        put(7,new Struct_ricemb_290(7,200,"[[10,0,58],[1,400025,1]]"));
        put(8,new Struct_ricemb_290(8,300,"[[10,0,58],[1,400025,1]]"));
        put(9,new Struct_ricemb_290(9,400,"[[10,0,58],[1,400025,1]]"));
        put(10,new Struct_ricemb_290(10,500,"[[10,0,58],[1,400025,1]]"));
        put(11,new Struct_ricemb_290(11,600,"[[10,0,58],[1,400025,1]]"));
        put(12,new Struct_ricemb_290(12,800,"[[10,0,58],[1,400025,1]]"));
        put(13,new Struct_ricemb_290(13,1000,"[[10,0,116],[1,400026,1],[1,402026,2]]"));
        put(14,new Struct_ricemb_290(14,1200,"[[10,0,116],[1,400026,1]]"));
        put(15,new Struct_ricemb_290(15,1400,"[[10,0,174],[1,400026,1],[1,402026,2]]"));
        put(16,new Struct_ricemb_290(16,1600,"[[10,0,174],[1,400026,1]]"));
        put(17,new Struct_ricemb_290(17,1800,"[[10,0,232],[1,400026,1]]"));
        put(18,new Struct_ricemb_290(18,2000,"[[10,0,290],[1,400027,1],[1,402026,4]]"));
    }
    public void reset(){
        ins = null;
    }
}