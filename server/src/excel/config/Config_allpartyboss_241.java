package excel.config;
import com.teamtop.util.excel.ConfigBase;
import excel.struct.Struct_allpartyboss_241;
public class Config_allpartyboss_241 extends ConfigBase<Struct_allpartyboss_241> {
    private static Config_allpartyboss_241 ins = null;
    public static Config_allpartyboss_241 getIns(){
        if(ins==null){
            ins = new Config_allpartyboss_241();
        }
        return ins;
    }
    private Config_allpartyboss_241(){
        put(1,new Struct_allpartyboss_241(1,1,"[[4,0,500],[1,400057,5]]",1803,29001));
        put(2,new Struct_allpartyboss_241(2,3,"[[4,0,1000],[1,400057,5]]",1803,29002));
        put(3,new Struct_allpartyboss_241(3,6,"[[4,0,1500],[1,400057,5],[1,410015,1]]",1803,29003));
        put(4,new Struct_allpartyboss_241(4,10,"[[4,0,2000],[1,400057,5],[1,410015,1]]",1803,29004));
        put(5,new Struct_allpartyboss_241(5,15,"[[4,0,2000],[1,400057,10],[1,410015,1]]",1803,29005));
        put(6,new Struct_allpartyboss_241(6,20,"[[4,0,2500],[1,400057,10],[1,410015,1]]",1803,29006));
        put(7,new Struct_allpartyboss_241(7,30,"[[4,0,3000],[1,400057,15],[1,410015,1]]",1803,29007));
        put(8,new Struct_allpartyboss_241(8,40,"[[4,0,3500],[1,400057,20],[1,410015,1]]",1803,29008));
        put(9,new Struct_allpartyboss_241(9,50,"[[4,0,4000],[1,400057,20],[1,410015,2]]",1803,29009));
        put(10,new Struct_allpartyboss_241(10,60,"[[4,0,4500],[1,400057,25],[1,410015,2]]",1803,29010));
        put(11,new Struct_allpartyboss_241(11,70,"[[4,0,5000],[1,400057,30],[1,410015,2]]",1803,29011));
        put(12,new Struct_allpartyboss_241(12,80,"[[4,0,5000],[1,400057,30],[1,410015,2]]",1803,29012));
        put(13,new Struct_allpartyboss_241(13,90,"[[4,0,6488],[1,400057,40],[1,410015,3]]",1803,29013));
        put(14,new Struct_allpartyboss_241(14,100,"[[4,0,9488],[1,400057,50],[1,410015,3]]",1803,29014));
    }
    public void reset(){
        ins = null;
    }
}