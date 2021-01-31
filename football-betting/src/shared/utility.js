import moment from 'moment'


export const updateObject = (oldObject, updatedProperties) => {
    return {
        ...oldObject,
        ...updatedProperties
    };
};

export const getNextPlayDate=(daysOffset, hoursToGo)=>{

    const i = 6;
    var d = new Date();
    d.setTime(d.getTime() + (hoursToGo *60*60*1000));
    d.setDate(d.getDate() + (i + 7 - d.getDay()) % 7);
    d.setDate(d.getDate() + daysOffset);
    return moment(d).format("YYYY-MM-DD");
}


export function uuid() {
    let d = moment(Date.now()).format("SSSSS-MMssDD-HHYYYYmm");
    let str = Math.floor(Math.random() * 10000);
    d += "-" + str
    return d;
  }

  export function addCommaToAmounts(nStr){
    nStr += '';
    var x = nStr.split('.');
    var x1 = x[0];
    var x2 = x.length > 1 ? '.' + x[1] : '';
    var rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1)) {
            x1 = x1.replace(rgx, '$1,$2');
    }
    let num = x1+x2;
    if(num.includes("."))
    num = num.substr(0, num.indexOf(".") + 3)
    return (num);
  }
